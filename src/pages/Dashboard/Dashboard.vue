<template>
  <div class="dashboard-page">
 
    <h1 class="page-title">Dashboard</h1>
     <VueElementLoading
        :active="loading"
        spinner="bar-fade-scale"
        color="var(--primary)"
        text="Loading.."
        duration="0.6"
    />
    <div>
      <AdminDashboard v-if="auth_data.user_type== 'admin'" />
      <ClientDashboard v-else :analytics="analytics"    @statusChecked="reQueryTrasaction" :key="CompKey"/>
    </div>
    
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import mock from './mock';
import Bar from './Bar'
import VueElementLoading from 'vue-element-loading'





import { Chart } from 'highcharts-vue';
import axios from "axios";
import {mapActions,mapState } from "vuex";

export default {
  name: 'Dashboard',
  components: {
    Bar, Widget, BigStat, highcharts: Chart,AdminDashboard,ClientDashboard,
    VueElementLoading, 
  },
  
  computed: {
    ...mapState('auth', ['auth_data']),
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
  mounted() {
    this.getAuthData();
  },
  data() {
    return {
      mock,
      dialog:false,
      authType:'',
      analytics:{},
      loading:false,
      CompKey : 0
       
    };
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
    reQueryTrasaction(){
      this.getAnalytics()
      this.CompKey ++;
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
    
    getAnalytics(){
        const auth_user = JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_user || null;
        if(auth_user) {
          axios
            .get(this.dynamic_route(`/hello/${auth_user.id}`), 
            {
              headers:{
                authorization: `Bearer ${this.authToken}`
              }
            })
            .then(res => {
              this.loading=false;
              this.analytics = res.data;
            })
            .catch(() => {
              this.loading=false;
            })
            .finally(() => {
              this.loading=false;
              this.loading = false
            });
          
        }
    },

    
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
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
  .requests-table th {
    font-weight: 600 !important;
  }
  .requests-table td {
    font-weight: 400 !important;
    font-size: 13px;
  }
</style>
