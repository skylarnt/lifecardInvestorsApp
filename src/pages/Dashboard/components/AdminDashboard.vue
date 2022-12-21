<template>
    <div data-app>
        <b-row>
            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.total_properties : 0}}</h3>
                            <p>Properties</p>
                        </div>
                        <span class="b-avatar badge-light-primary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom"><svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage-properties/properties" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.total_users : 0}}</h3>
                            <p>Users</p>
                        </div>
                        <span class="b-avatar badge-light-info rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/users" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.total_groups : 0}}</h3>
                            <p>Groups</p>
                        </div>
                        <span class="b-avatar badge-light-danger rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage/groups" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.active_properties : 0}}</h3>
                            <p>Active Properties</p>
                        </div>
                        <span class="b-avatar badge-light-success rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage-properties/main-properties" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.open_groups : 0}}</h3>
                            <p>Open Groups</p>
                        </div>
                        <span class="b-avatar badge-light-warning rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage/groups" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.closed_groups : 0}}</h3>
                            <p>Closed Groups</p>
                        </div>
                        <span class="b-avatar badge-light-secondary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle data-v-9a6e255c="" cx="12" cy="12" r="10"></circle><line data-v-9a6e255c="" x1="12" y1="16" x2="12" y2="12"></line><line data-v-9a6e255c="" x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage/groups" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats ? stats.property_types : 0}}</h3>
                            <p>Property Types</p>
                        </div>
                        <span class="b-avatar badge-light-primary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path data-v-9a6e255c="" d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path data-v-9a6e255c="" d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>  
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage-properties/property-types" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="3" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>&#8358; {{stats ? Number(stats.total_transactions).toLocaleString() : 0}}</h3>
                            <p>Total Income</p>
                        </div>
                        <span class="b-avatar badge-light-warning rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg data-v-254b7dbb="" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-watch"><circle data-v-254b7dbb="" cx="12" cy="12" r="7"></circle><polyline data-v-254b7dbb="" points="12 9 12 12 13.5 13.5"></polyline><path data-v-254b7dbb="" d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>
                            </span><!---->
                        </span>
                        </div>
                        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

        </b-row>
        <b-row>
            <b-col md="6">
            <Widget
                title="<h5>Properties against Investors</h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <div class="px-3">
                    <VueElementLoading
                        :active="loading3"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                    />
                    <bar :chartData="chartData" height="395" style="height: 395px;"></bar>
                </div>
            </Widget>
            </b-col>
            <b-col md="6">
            <Widget
                title="<h5>Main Property <span class='fw-semi-bold'>Overview</span></h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <div class="table-responsive mt-3">
                    <VueElementLoading
                        :active="loading2"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                    />
                  <table class="table table-striped table-lg mb-0 requests-table">
                      <thead>
                      <tr class="text-muted">
                          <th>MAIN PROPERTY</th>
                          <th>GROUPS</th>
                          <th>INVESTORS</th>
                          <th>PRICE</th>
                          <!-- <th>DATE</th>
                          <th>CITY</th> -->
                          <th>STATUS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr
                          v-for="(property, ind) in tableData"
                          :key="ind"
                      >
                          <td>
                            {{property.name}}
                          </td>
                          <td>{{property.groups}}</td>
                          <td>{{property.investor_count > 0 ? property.investor_count : '-'}}</td>
                          <td>₦ {{Number(property.price).toLocaleString()}}</td>
                          <!-- <td>{{row.date}}</td>
                          <td>{{row.city}}</td> -->
                          <td>
                          <b-badge
                              :variant="property.status === 'Active'
                              ? 'success'
                              : property.status === 'Inactive' ? 'danger' : 'info'"
                              pill
                          >
                              {{property.status}}
                          </b-badge>
                          </td>
                      </tr>
                      </tbody>
                  </table>
                </div>
            </Widget>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
            <Widget
                title="<h5>Transactions <span class='fw-semi-bold'>Overview</span></h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                />
                <div class="scroll-area-lg" v-if="transactions.length">
                    <div class="table-responsive mt-4">
                        <table class="table table-hover table-sm mb-0 requests-table-two">
                            <thead>
                                <tr>
                                    <th class="hidden-sm-down">#</th>
                                    <th class="hidden-sm-down">Transaction ID</th>
                                    <th class="hidden-sm-down" width="40%">User Info </th>
                                    <th class="hidden-sm-down">Property</th>
                                    <th class="hidden-sm-down">Installment Type (%)</th>
                                    <th class="hidden-sm-down">Amount</th>
                                    <th class="hidden-sm-down">Date</th>
                                    <th class="hidden-sm-down">Status</th>
                                    <th class="hidden-sm-down text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                                    <td>{{index+1}}</td>
                                    <td class="text-dark">
                                        {{transaction.transaction_id}}
                                    </td>
                                    <td>
                                        <span class="d-flex pt-2">
                                            <span>
                                                <span class="b-avatar rounded-circle" :class="getRandomBadgeClass()" 
                                                    style="width: 38px; height: 38px; font-weight: 600">
                                                    {{getInitials(transaction.user.fullname)}}
                                                </span>
                                            </span>
                                            <span class="ml-3">
                                                <!-- <p class="mb-0"> -->
                                                        <span class="fw-semi-bold">&nbsp; {{transaction.user.fullname}}</span>
                                                <!-- </p> -->
                                                <p>
                                                    <small>
                                                        <span class="text-semi-muted">&nbsp; {{transaction.user.email}}</span>
                                                    </small>    
                                                </p>
                                            </span>
                                        </span>
                                    </td>
                                    <td class="text-dark">
                                        {{transaction.main_property_group ? transaction.main_property_group.main_property.name : '-'}}
                                    </td>
                                    <td class="text-dark">
                                        {{transaction.installment && transaction.installment.name}}
                                    </td>
                                    <td class="text-dark text-capitalize">
                                        &#8358; {{Number(transaction.amount).toLocaleString()}}
                                    </td>
                                    <td class="text-dark">
                                        {{transaction.created_at | moment("D MMM, YYYY, h:mm a")}}
                                    </td>
                                    <td class="font-weight-bolder">
                                        <span class="badge badge-pill text-capitalize"
                                            :class="{'badge-light-warning': transaction.status == 'pending', 
                                            'badge-light-success': transaction.status == 'approved', 
                                            'badge-light-danger': transaction.status == 'failed'}"> 
                                            {{transaction.status}} 
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
                                                    @click="checkStatus(transaction)"
                                                    >
                                                    <i class="mdi mdi-check-circle-outline mr-1"></i> Check Status
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="alert alert-info text-center m-4" v-else>
                    <b style="font-weight: 600 !important">NO TRANSACTION RECORD</b>
                </div>
            </Widget>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import BigStat from './BigStat/BigStat';
import mock from '../mock';
import Bar from '../Bar'
import { Chart } from 'highcharts-vue';
import { mapState, mapActions } from 'vuex';
import axios from "axios"
// import laravelVuePagination from 'laravel-vue-pagination'
export default {
  name: 'Dashboard',
  components: {
    Bar, Widget, BigStat, highcharts: Chart, VueElementLoading,
  },
  data() {
    return {
      mock,
      dialog:false,
      chartData: {},
      tableData: {},
      stats: {},
      closeOnContentClick: true,
      transactions: {},
      loading: false,
      loading2: false,
      loading3: false
    };
  },
  mounted(){
      this.getAuthData()
      this.getDashboardStats()
      this.getDashboardChartData()
      this.getDashboardTableData()
      this.getDashboardTransactions()
  },
  computed:{
    ...mapState('auth', ['auth_data','auth_token']),
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    getDashboardStats(){
      axios.get(this.dynamic_route('/dashboard/stats'), {
            headers:{
                authorization: `Bearer ${this.auth_token}`
            }
        }).then((res)=> {
          this.stats = res.data
        })
    },
    getDashboardChartData(){
        this.loading3 = true
      axios.get(this.dynamic_route('/dashboard/chart_data'), {
            headers:{
                authorization: `Bearer ${this.auth_token}`
            }
        }).then((res)=> {
          this.chartData = res.data
          this.loading3 = false
        })
    },
    getDashboardTableData(){
        this.loading2 = true
      axios.get(this.dynamic_route('/dashboard/table_data'), {
            headers:{
                authorization: `Bearer ${this.auth_token}`
            }
        }).then((res)=> {
          this.tableData = res.data
          this.loading2 = false
        })
    },
      checkStatus(data){
            this.loading = true;
            axios.get(this.dynamic_route('/client/callback/'+data.transaction_id), {
                        headers : {
                            authorization : `Bearer ${this.auth_token}`
                        }
                    })
                    .then(res=>{
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
                        this.$emit('statusChecked');
                        this.getDashboardTransactions()
                        // window.location.reload();
                       this.loading = false;
                    }).catch(err=>{
                          this.loading = false;
                          this.$router.push('/app/dashboard');
                          this.getDashboardTransactions()
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
                      this.$emit('statusChecked');
                    })
    },
    getDashboardTransactions(){
      this.loading = true
      axios.get(this.dynamic_route('/dashboard/transactions'), {
            headers:{
                authorization: `Bearer ${this.auth_token}`
            }
        }).then((res)=> {
          this.transactions = res.data
          res.data.forEach(transaction => {
                if(transaction.user.mname) {
                    Object.assign(transaction.user, { fullname: transaction.user.lname + ' '  + transaction.user.fname + ' ' + transaction.user.mname})
                } else {
                    Object.assign(transaction.user, { fullname: transaction.user.lname + ' '  + transaction.user.fname })
                }
            });
            this.loading = false
        })
    },
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
    getRandomBadgeClass() {
    //   const {primary, success, info, danger} = this.appConfig.colors;
      const colors = ['badge-light-info', 'badge-light-primary', 'badge-light-danger', 
                    'badge-light-success', 'badge-light-warning', 'badge-light-secondary'];
      return colors[Math.floor(Math.random() * colors.length)]
    },
  },
};
</script>

<style src="../Dashboard.scss" lang="scss" />
<style scoped>
  .card {
      border: none;
      margin-bottom: 1.5rem;
      padding: 0  !important;
      box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  }
  .small-box {
    display: block;
    position: relative;
  }
  .small-box:hover {
    text-decoration: none;
  }
  .small-box>.inner {
    padding: 20px;
  }
  .small-box h3, .small-box p {
    z-index: 5;
  }
  .small-box h3 {
      font-weight: 600;
      padding: 0;
      white-space: nowrap;
      color: #5e5873;
      font-size: 25px;
      margin-bottom: 5px !important;
  }
  .small-box p {
    font-size: 0.93rem;
    font-weight: 500;
    color: #999999;
  }
  .small-box .icon {
    color: rgba(0,0,0,.15);
    z-index: 0;
  }
  .small-box .icon>i.fa, 
  .small-box .icon>i.fab, 
  .small-box .icon>i.fad, 
  .small-box .icon>i.fal, 
  .small-box .icon>i.far, 
  .small-box .icon>i.fas, 
  .small-box .icon>i.ion {
    font-size: 70px;
    top: 20px;
  }
  .small-box .icon>i {
    position: absolute;
    right: 15px;
    top: 15px;  
    transition: transform .3s linear,-webkit-transform .3s linear;
  }
  .small-box>.small-box-footer {
    border-top: 1px solid #f7f7f7;
    display: block;
    padding: 3px 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    z-index: 10;
  }
  th, tr {
      white-space: nowrap;
  }
  .requests-table th, .requests-table-two th {
    font-weight: 550 !important;
  }
  .requests-table td, .requests-table-two td {
    font-weight: 400 !important;
    font-size: 13px;
  }
  .tables-basic .widget {
    border: none;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    border-radius: 0.7rem !important;
    background-color: #ffffff !important;
}
.requests-table-two td {
    font-size: 14px;
    vertical-align: middle;
    padding-top: 1px !important;
    padding-bottom: 1px !important;
}
</style>
