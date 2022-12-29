<template>
  <div class="tables-basic" data-app>
    <h4 class="page-title">User Transactions
        <span class="fw-semi-bold" v-if="transactions.length">
            ({{ transactions[0].user.lname }} {{ transactions[0].user.fname }} {{ transactions[0].user.mname }})
        </span></h4>
    <b-row>
      <b-col>
          <Widget
                title="<h5>All <span class='fw-semi-bold'>transactions</span></h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                />
                <!-- <div class="p-3 col-md-5 float-md-right mb-3">
                    <input type="text" v-model="filter.search" @keyup="searchData"
                        class="form-control form-control-lg" placeholder="Search users by email, name, username or phone">
                </div> -->
                <div class="table-responsive mt-4" v-if="transactions.length">
                    <table class="table table-hover table-sm mb-0 requests-table">
                        <thead>
                            <tr>
                                <th class="hidden-sm-down">#</th>
                                <th class="hidden-sm-down">Transaction ID</th>
                                <th class="hidden-sm-down">Property Purchased</th>
                                <th class="hidden-sm-down">Amount Paid (₦)</th>
                                <th class="hidden-sm-down">Installment (%)</th>
                                <th class="hidden-sm-down">Status</th>
                                <th class="hidden-sm-down">Date</th>
                                <th class="hidden-sm-down text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(trans, index) in transactions" :key="trans.id">
                                <td>{{index+1}}</td>
                                <td class="text-dark">
                                    {{trans.transaction_id}}
                                </td>
                                <td class="text-dark">
                                    {{trans.main_property_group.main_property.name}}
                                </td>
                                <td class="text-dark text-capitalize">
                                    {{Number(trans.amount).toLocaleString()}}
                                </td>
                                <td class="text-dark">
                                    {{trans.installment.name}}
                                </td>
                                <td>
                                    <span class="badge badge-pill"
                                        :class="trans.status == 'approved' ? 'badge-light-success' : 
                                        trans.status == 'pending' ? 'badge-light-info' : 'badge-light-danger'"> 
                                        {{trans.status}} 
                                    </span>
                                </td>
                                <td class="text-dark">
                                    {{trans.created_at | moment("D MMM, YYYY, h:mm a")}}
                                </td>
                                <td class="text-center" style="font-size: 18px">
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
                                            <v-list-item @click="checkStatus(trans)">
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                v-if="trans.status != 'approved'"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Check Status
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <div class="alert alert-info text-center">
                        No Transaction Record
                    </div>
                </div>
            </Widget>
      </b-col>
    </b-row>

    <!-- toggle status dialog -->
    <v-dialog
        v-model="openConfirm"
        max-width="550"
    >
        <v-card>
            <v-card-title class="text-h5 text-success">
            {{dynamic_status == 'inactive' ? 'Deactivate' : 'Activate'}} &nbsp; <b>{{currentUser.fullname}}</b>'s account
            </v-card-title>

            <v-card-text>
            Are you sure you want to perform this operation ?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=" darken-1"
                text
                @click="openConfirm = false"
            >
                No, exit
            </v-btn>

            <v-btn
                color="primary darken-1"
                text
                @click="toggle_status(status_id, dynamic_status);openConfirm=false"

            >
                Yes, continue
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- delete user dialog -->
    <v-dialog
        v-model="openConfirm2"
        max-width="485"
    >
        <v-card>
            <v-card-title class="text-h5 text-success">
                <p>Delete User account. </p>
                <p><small><b>Note: </b> This action is irreversible and will delete all records associated with this user including transactions,
                groups, profile etc.</small></p>
            </v-card-title>

            <v-card-text>
            Are you sure you want to perform this operation ?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=" darken-1"
                text
                @click="openConfirm2 = false"
            >
                No, exit
            </v-btn>

            <v-btn
                color="primary darken-1"
                text
                @click="deleteUser(del_id);openConfirm2=false"


            >
                Yes, continue
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Password Reset dialog -->
    <v-dialog
        v-model="openConfirm3"
        max-width="450"
    >
        <v-card>
            <v-card-title class="text-h5">
                <p class="text-success">Reset <b>{{currentUser.fullname}}</b>'s password </p>
                <p><small><b>Note: </b> This will change user password to <b>12345678</b></small></p>
            </v-card-title>

            <v-card-text>
                Are you sure you want to perform this operation ?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=" darken-1"
                text
                @click="openConfirm3 = false"
            >
                No, exit
            </v-btn>

            <v-btn
                color="primary darken-1"
                text
                @click="resetPassword(reset_id);openConfirm3=false"
            >
                Yes, continue
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
import moment from 'moment';

export default {
  name: 'ManageUsers',
  components: { Widget, VueElementLoading},
  data() {
    return {
        loading: false,
        transactions: {},
        status_id:0,
        del_id:0,
        reset_id: 0,
        dynamic_status:'',
        openConfirm:false,
        openConfirm2:false,
        openConfirm3:false,
        dialog:false,
        isDialogVisible: false,
        closeOnContentClick: true,
        currentUser: {},
        filter: {
            search: '',
            userId: this.$route.params.userId
        }
    };
  },
  computed:{
    ...mapState('auth', ['auth_data','auth_token']),
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    getInitials(fullname) {
        const allNames = fullname.trim().split(' ');
        const initials = allNames.reduce((acc, curr, index) => {
            if(index === 0 || index === allNames.length - 1){
                acc = `${acc}${curr.charAt(0).toUpperCase()}`;
            }
            return acc;
        }, '');
        return initials;
    },
    getUserTransactions(){
        this.loading = true
        axios.post(this.dynamic_route('/users/transactions/fetch'), {filter: this.filter}, {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }).then((res)=> {
                this.transactions = res.data
                res.data.forEach(trans => {
                    if(trans.user.mname) {
                        Object.assign(trans.user, { fullname: trans.user.lname + ' '  + trans.user.fname + ' ' + trans.user.mname})
                    } else {
                        Object.assign(trans.user, { fullname: trans.user.lname + ' '  + trans.user.fname })
                    }
                });
            })
            .finally(() => this.loading = false)
    },
    checkStatus(data){
            this.loading = true;
            axios.get(this.dynamic_route('/client/callback/'+data.transaction_id), {
                        headers : {
                            authorization : `Bearer ${this.auth_token}`
                        }
                    })
                    .then(()=>{
                        this.$toast.success('Transaction Updated Successfully', {
                        position: 'top-center',
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: true,
                        closeButton: 'button',
                        icon: true,
                        rtl: false,
                        });
                        this.getUserTransactions();
                        // window.location.reload();
                       this.loading = false;
                    }).catch(()=>{
                        this.loading = false;
                        this.$toast.error('Transaction Failed', {
                            position: 'top-center',
                            timeout: 5000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: 'button',
                            icon: true,
                            rtl: false,
                        });   
                        this.getUserTransactions();
                    })
    },
    searchData() {
        this.getUsers()
    },
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    setCurrent(data) {
        this.currentUser = data
    },
    getRandomBadgeClass() {
    //   const {primary, success, info, danger} = this.appConfig.colors;
      const colors = ['badge-light-info', 'badge-light-primary', 'badge-light-danger', 
                    'badge-light-success', 'badge-light-warning', 'badge-light-secondary'];
      return colors[Math.floor(Math.random() * colors.length)]
    },
    toggle_status(id, status) {
        this.loading = true
        axios
            .put(this.dynamic_route(`/users/toggle-status/${id}`), { status }, {
                headers:{
                    authorization: `Bearer ${this.auth_token}`

                }
            })
            .then(() => {
                
                this.$toast.success('Status updated successfully!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
                this.getUsers()
            })
            .catch((err) => {
                this.loading = false;
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                this.$toast.error('An error occurred please try again!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
            })
            .finally(() => {
                this.loading = false
            })
    },
    deleteUser(id) {
        this.loading = true
        axios
            .delete(this.dynamic_route(`/users/delete/${id}`), {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(() => {
                this.$toast.success('Deleted successfully!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
                this.getUsers()
            })
            .catch(err => {
                this.loading = false;
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                this.$toast.error('An error occurred please try again!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
            })
            .finally(() => {
                this.loading = false
            })
    },
    resetPassword(id) {
        this.loading = true
        axios
            .get(this.dynamic_route(`/users/reset-password/${id}`), {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(() => {
                this.$toast.success('Password Reset successfully!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
                this.getUsers()
            })
            .catch(err => {
                this.loading = false;
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                this.$toast.error('An error occurred please try again!', {
                    position: 'top-center',
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: 'button',
                    icon: true,
                    rtl: false,
                })
            })
            .finally(() => {
                this.loading = false
            })
    },
    formatDate(date) {
        return moment.unix(date).format('D MMM, YYYY, h:mm a')
    }
  },
  mounted() {
    this.getAuthData()
    this.getUserTransactions()
  }
};
</script>

<style scoped>
.tables-basic .widget {
    border: none;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    border-radius: 0.7rem !important;
    background-color: #ffffff !important;
}
.requests-table td {
    font-size: 14px;
    vertical-align: middle;
    padding-top: 1px !important;
    padding-bottom: 1px !important;
}
</style>

