<template>
  <v-app class="p-4">
    <b-row>
      <b-col>
        <Widget title="" customHeader>
          <h5 class="d-inline-block">
            Sell <span class="fw-semi-bold">Property</span>
          </h5>

          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <div class="mt-3" v-if="completedRequests.length">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Index</th>
                    <th class="text-left">Property</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Amount</th>
                    <th class="text-left">Paid</th>
                    <th class="text-left">Attached</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p, i) in completedRequests" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>
                      {{ p.request && p.request.name }}
                    </td>
                    <td>
                      {{ p.name }}
                    </td>
                    <td>
                      {{ Number(p.amount).toLocaleString() }}
                    </td>
                    <td>
                      {{ Number(p.amount_paid).toLocaleString() }}
                    </td>
                    <td class="text-center">
                      {{ Number(p.attached_marketer_count).toLocaleString() }}
                    </td>

                    <td>
                      <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                        :close-on-content-click="closeOnContentClick"
                        left
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn color="black" icon v-bind="attrs" v-on="on">
                            <i class="fa fa-list-ul"></i>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor: pointer"
                              @click="
                                setCurrent(p);
                                $bvModal.show('attach');
                              "
                            >
                              <i class="mdi mdi-square-edit-outline mr-1"></i>
                              Attach Marketer
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor: pointer"
                              @click="
                                setCurrent(p);
                                $bvModal.show('manage');
                              "
                            >
                              <i class="mdi mdi-square-edit-outline mr-1"></i>
                              Manage Marketer
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
            <!-- <laravelVuePagination :data="properties" @pagination-change-page="fetchData" /> -->
          </div>
        </Widget>
      </b-col>
    </b-row>

    <!-- Modals -->
    <b-modal title="Make a request" id="create" hide-footer size="lg">
      <make-request :my_model="$bvModal" @submitted="fetchData()" />
    </b-modal>
    <b-modal
      :title="`Attach ${current.name} to a marketer`"
      id="attach"
      hide-footer
      size="xl"
    >
      <AttachMarketer :my_model="$bvModal" :property="current" @attached="fetchData()"/>
    </b-modal>
    <b-modal title="Manage Marketers" id="manage" hide-footer size="xl">
      <ManageMarketers :my_model="$bvModal" :property="current" />
    </b-modal>

    <!-- Modals end -->
    <!-- V Dialog -->
    <v-dialog v-model="openConfirm" max-width="390">
      <v-card>
        <v-card-title class="text-h5">
          Change property status to {{ dynamic_status }}
        </v-card-title>

        <v-card-text>
          Are you sure you want to perform this operation ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color=" darken-1" text @click="openConfirm = false">
            No, exit
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="
              toggle_status(status_id, dynamic_status);
              openConfirm = false;
            "
          >
            Yes, continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openConfirm2" max-width="390">
      <v-card>
        <v-card-title class="text-h5"> Delete property </v-card-title>

        <v-card-text>
          Are you sure you want to perform this operation ?
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
              deleteProperty(del_id);
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
import AttachMarketer from "@/pages/SellProperty/partials/attach";
import ManageMarketers from "@/pages/SellProperty/partials/manage";
import VueElementLoading from "vue-element-loading";
import laravelVuePagination from "laravel-vue-pagination";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Widget,
    VueElementLoading,
    laravelVuePagination,
    AttachMarketer,
    ManageMarketers,
  },
  data() {
    return {
      status_id: 0,
      del_id: 0,
      dynamic_status: "",
      openConfirm: false,
      openConfirm2: false,
      dialog: false,
      completedRequests: [],
      filters: {},
      loading: false,
      isDialogVisible: false,
      closeOnContentClick: true,
      current: {},
    };
  },
  computed: {
    ...mapState("page", ["authToken"]),
  },
  mounted() {
    this.fetchData();
    this.getAuthData();
  },
  methods: {
    ...mapActions("page", ["getAuthData"]),

    fetchData(page = 1) {
      this.loading = true;
      this.$api
        .post(this.dynamic_route("/requests/completed_request"))
        .then((res) => {
          this.loading = false;

          if (res.status == 200) {
            this.completedRequests = res.data.data;
          } else {
            this.toast(res);
          }
        });
    },
    setCurrent(property) {
      this.current = property;
    },
  },
};
</script>
<style>
.modal-body {
  background: white !important;
}
</style>