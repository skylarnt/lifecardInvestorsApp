<template>
  <div>
    <v-card>
      <VueElementLoading
        :active="loading"
        spinner="line-scale"
        color="var(--primary)"
      />
      <v-card-title class="text-h5 grey lighten-2">
        Attach Marketer
      </v-card-title>

      <v-card-text>
        <b-row>
          <b-col>
            <Widget title="" customHeader>
              <h5 class="d-inline-block">
                My <span class="fw-semi-bold">Property</span>
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
                    v-model="filter.status"
                    @change="searchData"
                  >
                    <option value="">Filter By Status</option>
                    <option value="pending">pending</option>
                    <option value="sold">sold</option>
                    <option value="completed">completed</option>
                  </select>
                </div>
              </div>
              <div class="mt-3" v-if="property.data">
                <div class="table-responsive mt-4">
                  <table class="table table-hover table-sm mb-0 requests-table">
                    <thead>
                      <tr>
                        <th class="hidden-sm-down">#</th>
                        <th class="hidden-sm-down">Marketers Info</th>
                        <th class="hidden-sm-down">Property</th>
                        <th class="hidden-sm-down">Price</th>
                        <th class="hidden-sm-down">Status</th>
                        <th class="hidden-sm-down text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(p, index) in property.data" :key="p.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <span class="d-flex pt-2">
                            <span>
                              <span
                                class="b-avatar rounded-circle"
                                :class="getRandomBadgeClass()"
                                style="
                                  width: 38px;
                                  height: 38px;
                                  font-weight: 600;
                                "
                              >
                                {{ getInitials(p.marketer.fullname) }}
                              </span>
                            </span>
                            <span class="ml-3">
                              <!-- <p class="mb-0"> -->
                              <span class="fw-semi-bold"
                                >&nbsp; {{ p.marketer.fullname }}</span
                              >
                              <!-- </p> -->
                              <p>
                                <small>
                                  <span class="text-semi-muted"
                                    >&nbsp; {{ p.marketer.email }}</span
                                  >
                                </small>
                              </p>
                            </span>
                          </span>
                        </td>
                        <td>
                          {{ p.approved_request.property.name }}
                        </td>
                        <td>
                          {{ Number(p.amount).toLocaleString() }}
                        </td>
                        <td>
                          <span
                            class="badge badge-pill"
                            :class="
                              p.status == 'pending'
                                ? 'badge-light-warning'
                                : 'badge-light-info'
                            "
                          >
                            {{ p.status }}
                          </span>
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
                              <v-btn
                                color="black"
                                icon
                                v-bind="attrs"
                                v-on="on"
                              >
                                <i class="fa fa-list-ul"></i>
                              </v-btn>
                            </template>

                            <v-list>
                              <v-list-item v-if="p.status == 'pending'">
                                <v-list-item-title
                                  style="cursor: pointer"
                                  @click="
                                    openConfirm = true;
                                    dynamic_status = 'sold';
                                    setCurrent(p);
                                  "
                                >
                                  <i
                                    class="mdi mdi-square-edit-outline mr-1"
                                  ></i>
                                  Sold
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item v-if="p.status == 'sold'">
                                <v-list-item-title
                                  style="cursor: pointer"
                                  @click="
                                    openConfirm = true;
                                    dynamic_status = 'pending';
                                    setCurrent(p);
                                  "
                                >
                                  <i
                                    class="mdi mdi-square-edit-outline mr-1"
                                  ></i>
                                  Pending
                                </v-list-item-title>
                              </v-list-item>
                              <!-- <v-list-item v-if="p.status != 'completed'">
                                                                <v-list-item-title style="cursor: pointer" @click="
                                                                    openConfirm = true;
                                                                dynamic_status = 'completed';
                                                                setCurrent(p);
                                                                ">
                                                                    <i class="mdi mdi-square-edit-outline mr-1"></i>
                                                                    Completed
                                                                </v-list-item-title>
                                                            </v-list-item> -->
                            </v-list>
                          </v-menu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else class="col-md-12 mt-3 alert alert-info text-center">
                <p>No record found</p>
              </div>
              <div class="col-md-12">
                <Pagination
                  :data="property"
                  @pagination-change-page="fetchData"
                />
              </div>
            </Widget>
          </b-col>
        </b-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="closeMe()"> Close </v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn color="primary" text @click="
                    attachMarkerter()"> Attach Marketer</v-btn> -->
      </v-card-actions>
    </v-card>
    <v-dialog v-model="openConfirm" max-width="390">
      <v-card>
        <v-card-title class="text-h5">
          Change property status to Completed
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
              toggle_status('completed');
              openConfirm = false;
            "
          >
            Yes, continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import VueElementLoading from "vue-element-loading";
import laravelVuePagination from "laravel-vue-pagination";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Widget,
    VueElementLoading,
    laravelVuePagination,
    Pagination: laravelVuePagination,
  },
  data() {
    return {
      status_id: 0,
      del_id: 0,
      dynamic_status: "",
      openConfirm: false,
      openConfirm2: false,
      dialog: false,
      current: {},
      property: {},
      filter: {
        status: "",
      },
      loading: false,
      isDialogVisible: false,
      closeOnContentClick: true,
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
        .post(
          this.dynamic_route(
            `/properties/manage-marketers-property?page=${page}`
          ),
          { filter: this.filter }
        )
        .then((res) => {
          if (res.status == 200) {
            res.data.data.data.forEach((user) => {
              if (user.marketer.mname) {
                user.marketer.fullname = `${user.marketer.lname} ${user.marketer.fname} ${user.marketer.mname}`;
              } else {
                user.marketer.fullname = `${user.marketer.lname} ${user.marketer.fname}`;
              }
            });
            this.property = res.data.data;
          } else {
            this.toast(res);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchData() {
      this.fetchData();
    },
    setCurrent(property) {
      this.current = property;
    },
    // toggle_status(status) {
    //   this.loading = true;
    //   this.$api
    //     .post(
    //       this.dynamic_route(
    //         `/properties/toggle-status/${this.current.property_id}`
    //       ),
    //       { status: status }
    //     )
    //     .then((res) => {
    //       this.$toast.success(res.data.message, {
    //         position: "top-right",
    //         timeout: 5000,
    //         closeOnClick: true,
    //         pauseOnFocusLoss: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         draggablePercent: 0.6,
    //         showCloseButtonOnHover: false,
    //         hideProgressBar: true,
    //         closeButton: "button",
    //         icon: true,
    //         rtl: false,
    //       });
    //       this.fetchData();
    //     })
    //     .catch((err) => {
    //       this.$toast.err(err.response.data.message, {
    //         position: "top-right",
    //         timeout: 5000,
    //         closeOnClick: true,
    //         pauseOnFocusLoss: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         draggablePercent: 0.6,
    //         showCloseButtonOnHover: false,
    //         hideProgressBar: true,
    //         closeButton: "button",
    //         icon: true,
    //         rtl: false,
    //       });
    //     })
    //     .finally(() => {
    //       this.loadng = false;
    //     });
    // },
    getInitials(fullname) {
      const allNames = fullname.trim().split(" ");
      const initials = allNames.reduce((acc, curr, index) => {
        if (index === 0 || index === allNames.length - 1) {
          acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
      }, "");
      return initials;
    },
    getRandomBadgeClass() {
      //   const {primary, success, info, danger} = this.appConfig.colors;
      const colors = [
        "badge-light-info",
        "badge-light-primary",
        "badge-light-danger",
        "badge-light-success",
        "badge-light-warning",
        "badge-light-secondary",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    toggle_status(status) {
      this.loading = true;
      this.$api
        .post(
          this.dynamic_route(
            `/properties/toggle-status/${this.current.approved_request_id}/${this.current.marketer_id}`
          ),
          { status: status }
        )
        .then((res) => {
          this.$toast.success(res.data.message, {
            position: "top-right",
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
          this.fetchData();
        })
        .catch((err) => {
          this.$toast.err(err.response.data.message, {
            position: "top-right",
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
        })
        .finally(() => {
          this.loadng = false;
        });
    },
  },
};
</script>