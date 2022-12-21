<template>
  <div class="dashboard-page">
 
    <h1 class="page-title">Receipt</h1>
     <VueElementLoading
        :active="false"
        spinner="bar-fade-scale"
        color="var(--primary)"
        text="Loading.."
        duration="0.6"
    />

    <div id="printMe">
      <div>
        <div class="text-right m-3">
          <button class="btn btn-primary" @click="printArea">
            <span class="fa fa-print"></span>
              Print
            </button>
        </div>
        <div class="row">
            <div class="col-md-3">
                <img src="/img/lifecardbg.png" alt="lifecard invesment...." style="height:100px;">
            </div>
            <div class="col-md-5">
                <h5 class="text-center font-weight-bold">
               NO 2, FEMI OKUNNU ESTATE PHASE 2, </br>
              FEMI OKUNNU ROAD, BY JAKANDE, OSAPA LONDON</br>
              (SHOPRITE JAKANDE ROUNDABOUT)</br>
              LEKKI, LAGOS, NIGERIA
                </h5>
            </div>
            <div  class="col-md-4 invoice">
                <h1>Invoice</h1>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>INVOICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{Date(user_data.created_at)}}</td>
                            <td>{{user_data.transaction_id}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col-6">
             <table class="table table-bordered billing">
              <thead class="head">
                  <tr>
                      <th>Billed to</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                      <h5 class="p-4">{{user_data.user.lname}}  {{user_data.user.fname }} {{  user_data.user.mname}}</h5></td>
                </tr>
              </tbody>
          </table>
          </div>
        </div>

      </div>
      <div>
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered ">
              <thead class="head">
                  <tr>
                      <th style="width: 48.5%;">Description</th>
                      <th>INFO</th>
                      <th>Rate</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="p-5" style="width: 48.5%;">
                        <div style="width: 100%;" v-html="user_data.main_property_group.main_property.description">
                        </div>
                        </td>
                      <td class="p-5">{{user_data.main_property_group.main_property.name}}</td>
                      <td class="p-5">{{Number(user_data.main_property_group.group_price/user_data.main_property_group.no_of_people).toLocaleString()}}</td>
                      <td class="p-5">{{Number(user_data.amount).toLocaleString()}}</td>
                  </tr>
              </tbody>
            </table>
            <table class="table table-bordered" style="border-left:white;">
                <tr>
                    <th width="63%" style="border-left:white;">
                        <h5 class="text-center py-5 font-weight-bold"><i>PAYMENT METHOD : ONLINE</i> </h5>
                    </th>
                    <th width="50%">
                        <div class="row">
                            <div class="col-md-6"><h3>Grand Total</h3></div>
                            <div class="col-md-6">NGN {{Number(user_data.main_property_group.group_price/user_data.main_property_group.no_of_people).toLocaleString()}}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6"><h3>Payment</h3></div>
                            <div class="col-md-6">NGN {{Number(user_data.amount).toLocaleString()}}</div>
                        </div>
                        <div class="row" v-if="(user_data.main_property_group.group_price/user_data.main_property_group.no_of_people) - user_data.amount >=0">
                            <div class="col-md-6"><h3>Balance</h3></div>
                            <div class="col-md-6">NGN {{ ((user_data.main_property_group.group_price/user_data.main_property_group.no_of_people) - user_data.amount).toLocaleString() }}</div>
                        </div>
                        <div class="row" v-else>
                            <div class="col-md-6"><h3>Balance</h3></div>
                            <div class="col-md-6">NGN 0</div>
                        </div>
                    </th>
                </tr>
            </table>
           
          </div>
          <div class="col-12">
             
          </div>
        </div>
          
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import mock from './mock';
import Bar from './Bar'
import VueElementLoading from 'vue-element-loading'
import { Chart } from 'highcharts-vue';
import axios from "axios";
import {mapActions,mapState } from "vuex";
import Print from 'vue-print-nb'
export default {
  name: 'Receipt',
  components: {
    Bar, Widget, BigStat, highcharts: Chart,
    VueElementLoading, Print
  },
  props : {
    id : String
  },
  computed: {
    ...mapState('page', ['authToken']),
 
  },
  mounted() {
    this.getAuthData();
    this.getReceiptData(this.$route.params.id)
  },
  data() {
    return {
      mock,
      dialog:false,
      authType:'',
      analytics:{},
      loading:true,
      CompKey : 0,
      user_data:{},
      printObj: {
              id: "printMe",
              preview: true,
              previewTitle: 'print Title', // The title of the preview window. The default is 打印预览
              popTitle: 'good print',
              extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
              previewBeforeOpenCallback (vue) {
                console.log('正在加载预览窗口')
              },
              previewOpenCallback (vue) {
                console.log('已经加载完预览窗口')
              },
              beforeOpenCallback (vue) {
                vue.printLoading = true
                console.log('打开之前')
              },
              openCallback (vue) {
                vue.printLoading = false
                console.log('执行了打印')
              },
              closeCallback (vue) {
                console.log('关闭了打印工具')
              }
            }
        };
       
  },
  methods: {
    ...mapActions('page', ['getAuthData']),
    getReceiptData(id) {
      const auth_user = JSON.parse(localStorage.getItem('auth_info'))[0]  || null;
        
      
          axios
            .get(this.dynamic_route('/receipt/'+id),
            {
              headers:{
                authorization: `Bearer ${auth_user.auth_token}`
              }
            })
            .then(res => {
              this.loading=false;
              this.user_data = res.data;
            })
            .catch(err => {
              if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
              }
              this.loading=false;
            })
            .finally(() => {
              this.loading = false
            });
          
        
    },
    printArea(){
       this.$htmlToPaper('printMe');
    },

    
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
<style scoped>
td{
  background: none !important;
}
.table-bordered th {
  background: none !important;
  color: black !important;
  border: 2px solid black;
}
td{
  border: 2px solid black !important;
   color: black !important;
}
 thead{
   background: lightgrey !important;
   border: 2px solid black;
 }
 
 table{
   margin-bottom: 0rem !important;
   border: 2px solid black;
 }
</style>
