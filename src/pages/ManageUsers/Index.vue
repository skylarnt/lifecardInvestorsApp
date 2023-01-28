<template>
  <div class="tables-basic" data-app>
    <h2 class="page-title">Manage <span class="fw-semi-bold">Users</span></h2>
    <b-row>
      <b-col>
          <Widget
                title="<h5>All <span class='fw-semi-bold'>Users</span></h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                />
                <div class="p-3 col-md-5   mb-3">
                    <input type="text" v-model="filter.search" @keyup="searchData"
                        class="form-control form-control-lg" placeholder="Search users by email, name, username or phone">
                </div>
                <div class="table-responsive mt-4" v-if="users.length">
                    <table class="table table-hover table-sm mb-0 requests-table">
                        <thead>
                            <tr>
                                <th class="hidden-sm-down">#</th>
                                <th class="hidden-sm-down">Users Info</th>
                                <th class="hidden-sm-down">Phone </th>
                                <th class="hidden-sm-down">Gender</th>
                                <th class="hidden-sm-down">Country</th>
                                <th class="hidden-sm-down">User Type</th>
                                <th class="hidden-sm-down text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id">
                                <td>{{index+1}}</td>
                                <td>
                                    <span class="d-flex pt-2">
                                        <span>
                                            <span class="b-avatar rounded-circle" :class="getRandomBadgeClass()" 
                                                style="width: 38px; height: 38px; font-weight: 600">
                                                {{getInitials(user.fullname)}}
                                            </span>
                                        </span>
                                        <span class="ml-3">
                                            <!-- <p class="mb-0"> -->
                                                    <span class="fw-semi-bold">&nbsp; {{user.fullname}}</span>
                                            <!-- </p> -->
                                            <p>
                                                <small>
                                                    <span class="text-semi-muted">&nbsp; {{user.email}}</span>
                                                </small>    
                                            </p>
                                        </span>
                                    </span>
                                </td>
                                
                                <td class="text-dark">
                                    {{user.phone ? user.phone : '-'}}
                                </td>
                                <td class="text-dark text-capitalize">
                                    {{user.gender}}
                                </td>
                                <td class="text-dark">
                                    {{user.country ? user.country : '-'}}
                                </td>
                                <td class="font-weight-bolder">
                                    <span class="badge badge-pill"
                                        :class="user.user_type == 'user' ? 'badge-light-info' : 'badge-light-warning'"> 
                                        {{user.user_type}} 
                                    </span>
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
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="setCurrent(user); $bvModal.show('edit')"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Edit Details
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="openConfirm4=true;reset_id=user.id;currentUser=user"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> login as
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="setCurrent(user); $bvModal.show('investments')"
                                                >
                                                <i class="mdi mdi-briefcase-account-outline mr-1"></i> View Investments
                                                </v-list-item-title>
                                            </v-list-item> -->
                                          
                                            
                                          
                                            
                                            
                                            <!-- <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="openConfirm2=true;del_id=user.id"
                                                >
                                                <i class="mdi mdi-delete-forever-outline mr-1"></i> Delete Account
                                                </v-list-item-title>
                                            </v-list-item> -->
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="setCurrent(user);openConfirm3=true;reset_id=user.id"
                                                >
                                                <i class="mdi mdi-account-outline mr-1"></i> Reset Password
                                                </v-list-item-title>
                                            </v-list-item>
                                            
                                        </v-list>
                                    </v-menu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    v-else
                    class="col-md-12  mt-3 "
                >
                    
                    <div class="  alert alert-info text-center">
                        <p>No record found</p>

                    </div>
                </div>
            </Widget>
      </b-col>
    </b-row>

    <!--  Edit user modal -->
    <b-modal size="md" style="background:white" title="Edit user details" id="edit" hide-footer>
        <edit :authToken="auth_token" :user="currentUser" @updated="getUsers" />
    </b-modal>

    <!--  User Investments modal -->
    <b-modal size="xl" style="background:white" :title="`View ${currentUser.fullname} Investments`" id="investments" hide-footer>
        <userInvestments :user="currentUser" />
    </b-modal>

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

     <!-- Login AS dialog -->
    <v-dialog
        v-model="openConfirm4"
        max-width="450"
    >
        <v-card>
            <v-card-title class="text-h5">
                <p class="text-success">You are about to <b> Login As {{currentUser.fullname}}</b></p>
                <p><small><b>Note: </b> This will make you act as  <b>{{currentUser.fullname}}</b></small></p>
            </v-card-title>

            <v-card-text>
                Are you sure you want to perform this operation ?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=" darken-1"
                text
                @click="openConfirm4 = false"
            >
                No, exit
            </v-btn>

            <v-btn
                color="primary darken-1"
                text
                @click="loginAs(reset_id);openConfirm4=false"
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
import edit from '@/pages/ManageUsers/Partials/EditUser'
import userInvestments from '@/pages/ManageUsers/Partials/UserInvestments'

export default {
  name: 'ManageUsers',
  components: { Widget, VueElementLoading, edit,userInvestments },
  data() {
    return {
        loading: false,
        users: {},
        status_id:0,
        del_id:0,
        reset_id: 0,
        dynamic_status:'',
        openConfirm:false,
        openConfirm2:false,
        openConfirm3:false,
        openConfirm4:false,
        dialog:false,
        isDialogVisible: false,
        closeOnContentClick: true,
        currentUser: {},
        filter: {
            search: ''
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
    getUsers(){
        this.loading = true

        this.$api
        .post(this.dynamic_route('/users/fetch'),{filter: this.filter})
        .then(res => {
            this.loading=false;
            if(res.status == 200) {
                res.data.data.forEach(user => {
                    if(user.mname) {
                        Object.assign(user, { fullname: user.lname + ' '  + user.fname + ' ' + user.mname})
                    } else {
                        Object.assign(user, { fullname: user.lname + ' '  + user.fname })
                    }
                });
                this.users = res.data.data

            } else {
                this.toast(res)

            }

        });
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
    loginAs(id) {
        this.loading = true
        axios
            .get(this.dynamic_auth_route(`/login-as/${id}`), {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then((res) => {
                if(res.data.access_token) {

                    var newUser = {
                        auth_token : res.data.access_token,
                        auth_user : res.data.data
                    };

                    var data = JSON.parse(localStorage.getItem('auth_info'));

                    data.unshift(newUser)
                    localStorage.setItem('auth_info', JSON.stringify(data));
                    location.href="/app/dashboard"
                }
                this.$toast.success('Operation successfully!', {
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
  },
  mounted() {
    this.getAuthData()
    this.getUsers()
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

