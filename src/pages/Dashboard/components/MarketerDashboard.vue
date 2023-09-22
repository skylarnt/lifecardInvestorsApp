<template>
    <div>
        <b-row>
            <b-col md="4" xl="4" sm="12" xs="12">
              <div class="h-100">
                  <div class="card">
                      <div class="card-body p-0">
                      <div class="small-box">
                          <div class="d-flex inner">
                          <div>
                              <h3>{{analytics.all_property ? Number(analytics.all_property).toLocaleString() : 0}}</h3>
                              <p>Property Assigned to me</p>
                          </div>
                          <span class="b-avatar badge-light-primary rounded-circle ml-auto" style="width: 58px; height: 58px;">
                              <span class="b-avatar-custom"><svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></span><!---->
                          </span>
                          </div>
                          <!-- <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a> -->
                      </div>
                      </div>
                  </div>
                  </div>
            </b-col>

            <b-col md="4" xl="4" sm="12" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{analytics.property_sold ? analytics.property_sold : 0}}</h3>
                            <p>Property Sold</p>
                        </div>
                        <span class="b-avatar badge-light-info rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span><!---->
                        </span>
                        </div>
                        <!-- <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a> -->
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

            <b-col md="4" xl="4" sm="12" xs="12">
                <div class="h-100">
                <div class="card">
                    <div class="card-body p-0">
                    <div class="small-box">
                        <div class="d-flex inner">
                        <div>
                            <h3>{{analytics.pending ? analytics.pending : 0}}</h3>
                            <p>Pending Properties</p>
                        </div>
                        <span class="b-avatar badge-light-danger rounded-circle ml-auto" style="width: 58px; height: 58px;">
                            <span class="b-avatar-custom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </span><!---->
                        </span>
                        </div>
                        <!-- <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a> -->
                    </div>
                    </div>
                </div>
                </div>
            </b-col>

          

       </b-row>
       <!-- <p class="text-right">
          Want to make a special request ? 
            <button class="btn text-info" @click="run()" >
              Yes
            </button>

        </p> -->
       <b-row>
           <b-col md="12">
               <Widget
                   title="<h5>Property  <span class='fw-semi-bold'>Interactions</span></h5>"
                   bodyClass="widget-table-overflow"
                   customHeader
               >
                   <div class="table-responsive mt-3">
                    <VueElementLoading
                       :active="loading"
                       spinner="bar-fade-scale"
                       color="var(--primary)"
                       text="Loading.."
                       duration="0.6"
                   />
                   <table v-if="analytics.requests.length" class="table table-striped table-lg mb-0 requests-table">
                       <thead>
                       <tr class="text-muted">
                           <th>PROPERTY</th>
                           <!-- <th>AVAILABLE</th> -->
                           <th>AMOUNT</th>
                           <th>AMOUNT PAID</th>
                           <th>STATUS</th>
                           <th>Action</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr
                           v-for="(row, ind) in analytics.requests"
                           :key="ind"
                       >
                           <td>{{row.name}}</td>
                           <!-- <td>
                            YET TO RESPOND  
                          </td> -->
                          <td>
                            {{ Number(row.amount).toLocaleString() }}
                          </td>
                          <td>
                            {{ Number(row.amount_paid).toLocaleString() }}
                          </td>
                           <td> 
                            <span
                                class="badge"
                                :class="{
                                'badge-secondary' : row.status == 'processing',
                                'badge-info' : row.status == 'completed',
                                }"
                            >
                                {{ row.status }}
                            </span>
                            
                          </td>
                          
                           <td> 
                             <!-- <button class="btn btn-outline-primary" v-if="row.status !='approved'" @click="checkStatus(row)">Check Status</button> -->
                             <!-- <b-link :to="'/app/receipt/' + row.transaction_id" v-if="row.status =='approved'">
                                <button class="btn btn-outline-secondary"  >Print Receipt</button>
                             </b-link> -->
                              <b-link :to="'/app/approved-requests' " v-if="row.status !='completed'">
                                <button class="btn btn-outline-secondary"  >View</button>
                             </b-link>
                             <b-link :to="'/app/completed-requests' " v-if="row.status =='completed'">
                                <button class="btn btn-outline-secondary"  >View</button>
                             </b-link>
                           </td>
                       </tr>
                       </tbody>
                   </table>
                   <div v-else class="px-4">
                    No record found
                   </div>
                   </div>
               </Widget>
           </b-col>
       </b-row>
   </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './BigStat/BigStat';
import mock from '../mock';
import Bar from '../Bar'
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { Chart } from 'highcharts-vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    Bar, Widget, BigStat, highcharts: Chart,VueElementLoading
  },
  computed: {
    donut() {
      let revenueData = this.getRevenueData();
      let {danger, info, primary} = this.appConfig.colors;
      let series = [
        {
          name: 'Revenue',
          data: revenueData.map(s => {
            return {
              name: s.label,
              y: s.data
            }
          })
        }
      ];
      return {
        chart: {
          type: 'pie',
          height: 120
        },
        credits: {
          enabled: false
        },
        title: false,
        showStatus: false,
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            borderColor: null,
            showInLegend: true,
            innerSize: 60,
            size: 100,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        },
        colors: [danger, info, primary],
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: 'Montserrat'
          },
          itemMarginBottom: 5,
          symbolRadius: 0
        },
        exporting: {
          enabled: false
        },
        series
      };
    }
  },
  data() {
    return {
      mock,
      dialog:false,
      loading:false,
      closeOnContentClick:true, 
      analytics:{
        requests:[]
      }
    };
  },
   computed:{
    ...mapState('auth', ['auth_data','auth_token']),
  },
  mounted(){
     this.getAuthData()
     this.fetchData()
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    goto(id){

    },
    getRevenueData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    },
    run() {
      this.$router.push('/app/manage-requests')
    },

    fetchData(page=1) {
      this.loading = true
      this.$api
      .post(this.dynamic_route('/requests/marketer_dashboard_analytics'))
      .then(res => {
          this.loading=false;

          if(res.status == 200) {
              this.analytics = res.data.data
          } else {
              this.toast(res)
          }
      })
            
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
  .b-avatar.badge-light-primary {
    background-color: rgba(115,103,240,.12);
  }
  .b-avatar.badge-light-primary {
    color: #7367f0;
  }
  .b-avatar.badge-light-info {
    background-color: rgba(0,207,232,.12);
  }
  .b-avatar.badge-light-info {
    color: #00cfe8;
  }
  .b-avatar.badge-light-danger {
    background-color: rgba(234,84,85,.12);
  }
  .b-avatar.badge-light-danger {
    color: #ea5455;
  }
  .b-avatar.badge-light-success {
    background-color: rgba(40,199,111,.12);
  }
  .b-avatar.badge-light-success {
    color: #28c76f;
  }
  .b-avatar.badge-light-warning {
    background-color: rgba(255,159,67,.12);
  }
  .b-avatar.badge-light-warning {
      color: #ff9f43;
  }
  .b-avatar.badge-light-secondary {
    background-color: rgba(130,134,139,.12);
  }
  .b-avatar.badge-light-secondary {
      color: #82868b;
  }
  th, tr {
      white-space: nowrap;
  }
  .requests-table td {
    font-weight: 100 !important;
    font-size: 13px;
  }
</style>
