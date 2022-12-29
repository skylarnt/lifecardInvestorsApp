<template>
    <div data-app>
        <b-row>
            <b-col md="6" xl="4" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>&#8358; {{stats.total_transactions ? Number(stats.total_transactions).toLocaleString() : 0}}</h3>
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
            <b-col md="6" xl="4" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats.total_properties ? stats.total_properties : 0}}</h3>
                            <p>Properties</p>
                        </div>
                        <span class="b-avatar badge-light-primary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom"><svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></span><!---->
                        </span>
                        </div>
                        <b-link to="/app/properties" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="4" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats.total_users ? stats.total_users : 0}}</h3>
                            <p>Users</p>
                        </div>
                        <span class="b-avatar badge-light-info rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/manage-users" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>
            <b-col md="6" xl="6" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats.approved_request ? stats.approved_request : 0}}</h3>
                            <p>Approved request</p>
                        </div>
                        <span class="b-avatar badge-light-primary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom"><svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></span><!---->
                        </span>
                        </div>
                        <b-link to="/app/approved-requests" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="6" xl="6" sm="6" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{stats.completed_requests ? stats.completed_requests : 0}}</h3>
                            <p>Completed requests</p>
                        </div>
                        <span class="b-avatar badge-light-info rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <span class="b-avatar-custom"><svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></span><!---->
                                
                            </span><!---->
                        </span>
                        </div>
                        <b-link to="/app/approved-requests" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></b-link>
                    </div>
                    </div>
                </div>
                </div>
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
    //   this.getAuthData()
      this.getDashboardStats()
    //   this.getDashboardChartData()
    //   this.getDashboardTableData()
    //   this.getDashboardTransactions()
  },
  computed:{
    ...mapState('auth', ['auth_data','auth_token']),
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    getDashboardStats(){
        this.$api.get(this.dynamic_route('/dashboard_stats')).then((res) => {
            this.loading=false;
            this.form={}
            if(res.status == 200) {
                this.stats=res.data.data;
                
            } else {
                this.toast(res)
            }


        });
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
