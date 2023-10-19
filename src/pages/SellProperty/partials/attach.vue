<template>
  <div>
    <v-card>
      <VueElementLoading :active="loading" spinner="line-scale" color="var(--primary)" />
      <v-card-title class="text-h5 grey lighten-2">
        Attach Marketer
      </v-card-title>
      <div class="alert alert-warning mx-3" role="alert">
        <b>Please Read and Accept the Terms and Conditions Before Attaching a Marketer</b>
      </div>
      <v-card-text>
        <div class="table-responsive mt-4">
          <table class="table table-hover table-sm mb-0 requests-table">
            <thead>
              <tr>
                <th class="hidden-sm-down">#</th>
                <th class="hidden-sm-down">Marketers Info</th>
                <th class="hidden-sm-down">Phone</th>
                <th class="hidden-sm-down">Gender</th>
                <th class="hidden-sm-down">Country</th>
                <th class="hidden-sm-down text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in markerters" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <span class="d-flex pt-2">
                    <span>
                      <!-- <span
                        class="b-avatar rounded-circle"
                        :class="getRandomBadgeClass()"
                        style="width: 38px; height: 38px; font-weight: 600"
                      >
                        {{ getInitials(user.fullname) }}
                      </span> -->
                      <img :src="user.avatar" alt="" class="img-fluid rounded-circle" width="38" height="38">
                    </span>
                    <span class="ml-3">
                      <!-- <p class="mb-0"> -->
                      <span class="fw-semi-bold">&nbsp; {{ user.fullname }}</span>
                      <!-- </p> -->
                      <p>
                        <small>
                          <span class="text-semi-muted">&nbsp; {{ user.email }}</span>
                        </small>
                      </p>
                    </span>
                  </span>
                </td>

                <td class="text-dark">
                  {{ user.phone ? user.phone : "-" }}
                </td>
                <td class="text-dark text-capitalize">
                  {{ user.gender }}
                </td>
                <td class="text-dark">
                  {{ user.country ? user.country : "-" }}
                </td>
                <td class="text-center" style="font-size: 18px">
                  <v-btn outlined color="blue" @click="addMarketer(user)">
                    Add
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-responsive mt-4" v-if="addmarketers.length > 0">
          <table class="table table-hover table-sm mb-0 requests-table">
            <thead>
              <tr>
                <th class="hidden-sm-down">#</th>
                <th class="hidden-sm-down">Marketers Info</th>
                <th class="hidden-sm-down">Set Price</th>
                <th class="hidden-sm-down">Action</th>
                <!-- <th class="hidden-sm-down text-center">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in addmarketers" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <span class="d-flex pt-2">
                    <span>
                      <!-- <span
                        class="b-avatar rounded-circle"
                        :class="getRandomBadgeClass()"
                        style="width: 38px; height: 38px; font-weight: 600"
                      >
                        {{ getInitials(user.fullname) }}
                      </span> -->
                      <img :src="user.avatar" alt="" class="img-fluid rounded-circle" width="38" height="38">
                    </span>
                    <span class="ml-3">
                      <!-- <p class="mb-0"> -->
                      <span class="fw-semi-bold">&nbsp; {{ user.fullname }}</span>
                      <!-- </p> -->
                      <p>
                        <small>
                          <span class="text-semi-muted">&nbsp; {{ user.email }}</span>
                        </small>
                      </p>
                    </span>
                  </span>
                </td>
                <td>
                  <input type="text" v-model="user.amount" class="form-control" />
                </td>
                <td>
                  <button class="fa fa-trash fa-2x text-center btn" @click="
                    settCurrent(user);
                  openConfirm = true;
                  "></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <input type="checkbox" v-model="checkboxChecked" />
        <label>
           Do you agree to the <a href="#" @click="term()">terms and
            conditions</a>
        </label>
      </v-card-text>
      <v-dialog v-model="openConfirm" max-width="390">
        <v-card>
          <v-card-title class="text-h5">
            Dettach {{ user.fullname }}
          </v-card-title>

          <v-card-text>
            Are you sure you want to perform this operation ?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color=" darken-1" text @click="openConfirm = false">
              No, exit
            </v-btn>

            <v-btn color="primary darken-1" text @click="
              deleteMarketer(user);
            openConfirm = false;
            ">
              Yes, continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modalConfirm" persistent max-width="1000">
        <v-card>
          <v-card-title class="text-h5">
            Terms & Conditions
          </v-card-title>

          <v-card-text>
            <h5 class="py-5">This Disclaimer stems from the fact that the Client wishes to sell a property he/she
              purchased from
              Lifecard International Investment Ltd and has requested Lifecard to recommend a realtor to aid in the sale
              of said property/properties.</h5>
            <h5 class="py-5">Client's Engagement with Realtors
              WHEREAS: Lifecard may recommend certain realtors to assist the Client with the sale of properties acquired
              from Lifecard;
              WHEREAS: Lifecard is not a party to the transaction or agreement between the client and the realtor
              recommended and shall have no liability or responsibility for any actions, omissions, representations,
              warranties, or any other aspect of the relationship or transaction between the client and the realtor;
              NOW, THEREFORE, it is expressly understood that any engagement with a realtor is at the sole discretion of
              the Client.</h5>
            <h5 class="py-5">
              Use of Realtor for Non-Lifecard Properties:
              In the event that the Client chooses to engage the services of the same realtor recommended by Lifecard in
              respect to properties that are not Lifecard properties, it is understood that Lifecard is not a party to
              such engagements and transactions. Lifecard shall not be liable for any aspect of these non-Lifecard
              property transactions and shall not be called upon for assistance or involvement in any disputes or claims
              arising from such transactions.
            </h5>
            <h5 class="py-5">By accepting to engage the services of a realtor recommended by Lifecard, the Client
              acknowledges and agrees to the above terms and disclaims Lifecard's liability in any transaction with the
              recommended realtor.</h5>

            <label>
              <input type="checkbox" v-model="checkboxChecked1" /> I have read and understood
            </label>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color=" darken-1" :disabled="!checkboxChecked1" text @click="modalConfirm = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="closeMe()"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="attachMarkerter()" :disabled="!checkboxChecked || !checkboxChecked1">
          Attach Marketer</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
export default {
  props: {
    my_modal: Object,
    property: Object,
    // package : Object
  },
  data() {
    return {
      checkboxChecked: false,
      modalConfirm: false,
      dialog: false,
      loading: false,
      markerters: [],
      addmarketers: [],
      form: {},
      user: {},
      openConfirm: false,
      checkboxChecked1: false
    };
  },
  components: {
    VueElementLoading,
  },
  methods: {
    term() {
      this.modalConfirm = true
    },
    closeMe() {
      this.$bvModal.hide("attach");
    },
    settCurrent(user) {
      this.user = user;
    },
    addMarketer(user) {
      var sta = true;
      this.addmarketers.forEach((element) => {
        if (user.id == element.id) {
          sta = false;
        }
      });

      // const payload = {
      //     marketer_id:user.id,
      //     property_id:this.property.id
      // }
      if (sta) this.addmarketers.push(user);
      else
        this.$toast.error("Cannot Add Marketers Twice", {
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
      // console.log(this.addmarketers);
    },
    getMarketers() {
      this.$api
        .get(this.dynamic_auth_route("/getmarketer"))
        .then((res) => {
          // return console.log(res.data);
          res.data.forEach((user) => {
            if (user.mname) {
              Object.assign(user, {
                fullname: user.lname + " " + user.fname + " " + user.mname,
              });
            } else {
              Object.assign(user, {
                fullname: user.lname + " " + user.fname,
              });
            }
          });
          this.markerters = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.text = "";
        });
    },
    getPropertyMarketers() {
      this.$api
        .post(
          this.dynamic_auth_route(`/getmarketer-property/${this.property.id}`)
        )
        .then((res) => {
          // console.log(res.data.propertywithmarketers);
          res.data.propertywithmarketers.forEach((user) => {
            if (user.mname) {
              Object.assign(user, {
                fullname: user.lname + " " + user.fname + " " + user.mname,
              });
            } else {
              Object.assign(user, {
                fullname: user.lname + " " + user.fname,
              });
            }
          });
          this.addmarketers = res.data.propertywithmarketers;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.text = "";
        });
    },
    attachMarkerter() {
      this.loading = true;
      this.$api
        .post(
          this.dynamic_route(
            `/properties/attach-marketers/${this.property.id}`
          ),
          this.addmarketers
        )
        .then((res) => {
          this.$emit('attached')
          this.loading = false;
          this.closeMe();
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMarketer(data) {
      this.loading = true;
      const payload = {
        marketer_id: data.id,
      };
      this.$api
        .post(
          this.dynamic_route(
            `/properties/delete-marketers/${this.property.id}`
          ),
          payload
        )
        .then((res) => {
          this.loading = false;
          this.getPropertyMarketers()
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  },
  mounted() {
    this.getMarketers();
    this.getPropertyMarketers();
    // this.form.package_id = this.package.id
  },
};
</script>