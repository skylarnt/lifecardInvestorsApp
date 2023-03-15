<template>
  <v-app class="p-4">
    <b-row>
      <b-col>
        <Widget title="" customHeader>
          <h5 class="d-inline-block">
            Manage <span class="fw-semi-bold">Requests</span>
          </h5>

          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <div class="row">
            <div class="p-3 col-md-6 mb-3">
              <select
                name=""
                id=""
                class="form-control form-control-lg"
                v-model="filters.status"
                @change="searchData"
              >
                <option value="">Filter By Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="p-3 col-md-6 mb-3">
              <input
                type="text"
                v-model="filters.search"
                @keyup="searchData"
                class="form-control form-control-lg"
                placeholder="Search users by email, name, username or phone"
              />
            </div>
          </div>
          <div class="mt-3" v-if="data.data.length">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Index</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Customer's Name</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Conversations</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p, i) in data.data" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{ p.name }}
                      <p>
                        <span
                          class="badge"
                          v-if="p.is_special == 'yes'"
                          :class="{
                            'badge-info': p.is_special == 'yes',
                          }"
                        >
                          Special request
                        </span>
                      </p>
                    </td>
                    <td>
                      {{
                        p.investor && p.investor.fname + " " + p.investor.lname
                      }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        :class="{
                          'badge-success': p.status == 'approved',
                          'badge-warning': p.status == 'pending',
                          'badge-secondary': p.status == 'processing',
                          'badge-info': p.status == 'completed',
                        }"
                      >
                        {{ p.status }}
                      </span>
                    </td>
                    <td>
                      <p
                        class="mb-0 text-info"
                        @click="
                          $bvModal.show('conversation');
                          current = p;
                        "
                      >
                        <span style="cursor: pointer">
                          <span class="mdi mdi-chat-processing-outline"></span>
                          <sup>
                            {{ p.request_conversation_count }}
                          </sup>
                        </span>
                      </p>
                    </td>
                    <td>
                      <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                        :close-on-content-click="closeOnContentClick"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn v-bind="attrs" color="primary" v-on="on">
                            <i class="text-white mdi mdi-cog-outline"></i>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor: pointer"
                              @click="
                                p.investor_property_id == null
                                  ? pass_data(p)
                                  : other_process(p)
                              "
                              v-if="
                                p.status != 'approved' &&
                                p.status != 'completed'
                              "
                            >
                              Approve Request
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div v-else class="col-md-12 mt-3 alert alert-info text-center">
            <p>No record found</p>
          </div>
          <div class="col-md-12">
            <div class="col-md-12">
              <Pagination :data="data" @pagination-change-page="fetchData" />
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <!-- Modals -->

    <b-modal
      :title="`Your conversation for request ${current.name} `"
      id="conversation"
      hide-footer
    >
      <convo
        @message_in="fetchData"
        :my_model="$bvModal"
        :auth_token="auth_token"
        :data="current"
      />
    </b-modal>
    <b-modal
      :title="`Approve  ${current.name} request`"
      id="approve"
      hide-footer
    >
      <approve
        :my_model="$bvModal"
        :auth_token="auth_token"
        @done="fetchData()"
        :data="current"
      />
    </b-modal>

    <!-- Modals end -->
    <!-- V Dialog -->
    <v-dialog v-model="openConfirm" max-width="390">
      <v-card>
        <v-card-title class="text-h5">
          Change Request status to {{ dynamic_status }}
        </v-card-title>

        <v-card-text>
          Are you sure you want to perform this operation ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color=" darken-1" text @click="openConfirm = false">
            No, exit
          </v-btn>

          <v-btn color="primary darken-1" text @click="openPriceModal()">
            Yes, continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openConfirmPrice" max-width="490">
      <!-- <form action="" @submit.prevent=""> -->

      <v-card>
        <v-card-title class="text-h5"> Select user price </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-6">
              <span>
                Current Property Price
                <input
                  type="radio"
                  required
                  v-model="ptype"
                  name="ptype"
                  value="current"
                  id=""
                />
              </span>
            </div>
            <div class="col-6">
              <span>
                Custom Property Price
                <input
                  type="radio"
                  required
                  v-model="ptype"
                  name="ptype"
                  value="custom"
                  id=""
                />
              </span>
            </div>
            <div class="col-12" v-if="ptype == 'custom'">
              Custom price for this user only
              <input
                type="number"
                required
                v-model="custom_price"
                class="form-control"
                name=""
                id=""
              />
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color=" darken-1"
            text
            type="button"
            @click="openConfirmPrice = false"
          >
            Exit
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            type="button"
            @click="toggle_status(status_id)"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openConfirm2" max-width="390">
      <v-card>
        <v-card-title class="text-h5"> Delete Request </v-card-title>

        <v-card-text>
          Are you sure you want to perform this operation ?
        </v-card-text>
        <v-card-text>
          <strong>Note</strong>
          You cannot delete a request if it has been approved or has a
          conversation.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color=" darken-1" text @click="openConfirm2 = false">
            No, exit
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="
              deleteRequest(del_id);
              openConfirm2 = false;
            "
          >
            Yes, continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- V Dialog End -->
  </v-app>
</template>
<script>
import Widget from "@/components/Widget/Widget";

import Convo from "@/pages/ManageInvestors/requests/partials/convo";
import Approve from "@/pages/ManageInvestors/requests/partials/approve";

import axios from "axios";
import VueElementLoading from "vue-element-loading";
import laravelVuePagination from "laravel-vue-pagination";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Widget,
    VueElementLoading,
    Pagination: laravelVuePagination,
    Convo,
    Approve,
  },
  data() {
    return {
      status_id: 0,
      del_id: 0,
      dynamic_status: "",
      openConfirm: false,
      openConfirm2: false,
      openConfirmPrice: false,
      dialog: false,
      current: {},
      data: [],
      filters: {
        status: ""
      },
      loading: false,
      isDialogVisible: false,
      closeOnContentClick: true,
      ptype: "current",
      custom_price: "",
    };
  },
  computed: {
    ...mapState("auth", ["auth_token", "auth_data"]),
  },
  mounted() {
    this.getAuthData();
    if (this.auth_data && this.auth_data.user_type == "admin") {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions("page", ["getAuthData"]),
    searchData() {
        this.fetchData();
    },
    fetchData(page = 1) {
      this.loading = true;
      axios
        .post(
          this.dynamic_route(`/requests/admin/all?page=${page}`),
          this.filters,
          {
            headers: {
              authorization: `Bearer ${this.auth_token}`,
            },
          }
        )
        .then((res) => {
          this.loading = false;
          this.data = res.data.data;
          this.loading = false;
        })
        .catch((err) => {
          if (
            err.response.status == 401 &&
            err.response.statusText == "Unauthorized"
          ) {
            return this.logoutUser();
          }
          // eslint-disable-next-line no-console
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toggle_status(id) {
      if (this.ptype == "custom" && this.custom_price == "") {
        this.$toast.error("Please input custom price", {
          position: "top-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        return;
      }
      this.openConfirmPrice = false;
      this.loading = true;

      let payload = {
        name: this.current.property.name,
        amount:
          this.current.square_meter_price == null
            ? this.current.property.amount
            : this.current.square_meter_price,
        request_id: id,
        pi: this.current.property.id,
        type: this.current.property.type,
      };

      if (this.custom_price != "") {
        payload.amount = this.custom_price;
        payload.custom_price = true;
      }

      this.$api
        .post(this.dynamic_route("/requests/admin/approve_request"), payload)
        .then((res) => {
          this.loading = false;

          if (res.status == 200) {
            this.fetchData();
          } else {
            if (
              res.status == 422 &&
              res.data.message == "The given data was invalid."
            )
              this.error_messg = res.data.errors;
          }
          this.toast(res);
        });
    },
    pass_data(p) {
      this.current = p;
      this.$bvModal.show("approve");
    },
    other_process(p) {
      this.dynamic_status = "approved";
      this.openConfirm = true;
      this.status_id = p.id;
      this.current = p;
    },
    openPriceModal() {
      this.openConfirm = false;
      // setTimeout(() => {
      this.openConfirmPrice = true;

      // }, 1000);
    },
  },
};
</script>
<style>
.modal-body {
  background: white !important;
}
</style>