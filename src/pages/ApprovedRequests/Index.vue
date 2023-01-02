<template>
    <div>
        <v-app v-if="auth_data &&auth_data.user_type !='admin'" class="p-4">
            <b-row>
                <b-col>
                    <Widget
                    title=""
                    customHeader
                    >
                        <h5 class="d-inline-block">Approved  <span class='fw-semi-bold'>Property Requests</span></h5>
                        
                        
                        <VueElementLoading
                            :active="loading"
                            spinner="bar-fade-scale"
                            color="var(--primary)"
                            text="Loading.."
                            duration="0.6"
                        />
                        <div class="mt-3" v-if="approvedRequests.length">
                            <div class="row">
                                <div class="col-md-6 mb-2"   v-for="(p,i) in approvedRequests"
                                    :key="i" >
                                    <div class="card">
                                        
                                        <div class="card-body">
                                            <h5 class="text-center">{{p.name}} ({{p.type}})</h5>
                                            <table style="width:100%">
                                                <tr>
                                                    <td>
                                                        Request:
                                                        <!-- <p> -->
                                                            {{ p.request && p.request.name }}
                                                            
                                                        <!-- </p> -->

                                                    </td>
                                                    <td >
                                                        Client:
                                                        <!-- <p> -->
                                                            {{ p.request && p.request.investor.fname }}
                                                        
                                                            {{ p.request && p.request.investor.lname }}
                                                        <!-- </p> -->

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    Amount
                                                    <p>
                                                        {{ Number(p.amount).toLocaleString() }}
                                                    </p>

                                                    </td>
                                                    <td >
                                                    Paid
                                                    <p>
                                                        {{ Number(p.amount_paid).toLocaleString() }}
                                                    </p>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Contract
                                                        <p>
                                                            <span
                                                                class="badge"
                                                                :class="{
                                                                'badge-warning' : p.contract_recieved == 'pending',
                                                                'badge-secondary' : p.contract_recieved == 'sent',
                                                                'badge-success' : p.contract_recieved == 'submitted',
                                                                }"
                                                            >
                                                                {{ p.contract_recieved }}
                                                            </span>
                                                        </p>

                                                    </td>
                                                    <td >
                                                        Status
                                                        <p>
                                                            <span
                                                            class="badge"
                                                            :class="{
                                                            'badge-warning' : p.status == 'processing',
                                                            'badge-success' : p.status == 'completed',
                                                            }"
                                                            >
                                                            {{ p.status }}
                                                            </span>
                                                        </p>

                                                    </td>

                                                </tr>
                                                <tr>
                                                            <td>
                                                                Allocated
                                                                <p>
                                                                    <span
                                                                        class="badge"
                                                                        :class="{
                                                                        'badge-warning' : p.allocated == 'no',
                                                                        'badge-success' : p.allocated == 'yes',
                                                                        }"
                                                                        >
                                                                        {{ p.allocated }}
                                                                    </span>
                                                                    
                                                                </p>
                                                            </td>
                                                            <td >
                                                                Allocation type
                                                                <p>
                                                                    <span
                                                                        class="badge"
                                                                        :class="{
                                                                        'badge-success' : p.allocated == 'yes',
                                                                        }"
                                                                        >
                                                                        
                                                                        {{ p.allocation_type != null ?  p.allocation_type : 'Unknown' }} 
                                                                        
                                                                    </span>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr v-if="p.type=='house'">
                                                            <td>
                                                                Key assigned
                                                                <p>
                                                                    <span
                                                                        class="badge"
                                                                        :class="{
                                                                        'badge-warning' : p.key_allocated == 'no',
                                                                        'badge-success' : p.key_allocated == 'yes',
                                                                        }"
                                                                        >
                                                                        {{ p.key_allocated  }}

                                                                    </span>
                                                                </p>
                                                            </td>
                                                            <td >
                                                                Deed of assignment 
                                                                <p>
                                                                    <span
                                                                        class="badge"
                                                                        :class="{
                                                                        'badge-warning' : p.deed_of_assignment == 'no',
                                                                        'badge-success' : p.deed_of_assignment == 'yes',
                                                                        }"
                                                                        >
                                                                        {{ p.deed_of_assignment == 'not_assigned' ? 'Yet to assign' : 'Assigned'  }}

                                                                    </span>
                                                                </p>
                                                            </td>
                                                        </tr>
                                            
                                            </table>
                                            <!-- <div style="width:100%" id="accordion">
                                                <a class="card-link" data-toggle="collapse" :href="`#collapse${i}`">
                                                    Expand
                                                </a>
                                                <div style="width:100%" :id="`collapse${i}`" class="collapse" data-parent="#accordion">
                                                
                                                    <table style="width:100%">
                                                    
                                                        <tr>
                                                            <td>
                                                                Allocated
                                                                <p>
                                                                    {{ p.allocated }}
                                                                </p>
                                                            </td>
                                                            <td >
                                                                Allocation type
                                                                <p>
                                                                    {{ p.allocation_type != null ?  p.allocation_type : 'Unknown' }} 
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr v-if="p.type=='house'">
                                                            <td>
                                                                Key assigned
                                                                <p>
                                                                    {{ p.key_allocated  }}
                                                                </p>
                                                            </td>
                                                            <td >
                                                                Deed of assignment 
                                                                <p>
                                                                    {{ p.deed_of_assignment  }}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                </div>

                                            </div> -->
                                            
                                        </div>
                                        <div class="card-footer " :class="{
                                            'd-flex': p.investor_property_id==null,
                                            'justify-content-between': p.investor_property_id==null
                                        }">
                                            <span
                                                class="s"
                                                    v-if="p.investor_property_id==null"
                                                >
                                                Special request
                                                </span>
                                            <div class="text-right">
                                                <v-menu
                                                    bottom
                                                    origin="center center"
                                                    transition="scale-transition"
                                                    :close-on-content-click="closeOnContentClick"
                                                >
                                                <template #activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    color="primary"
                                                    v-on="on"
                                                >
                                                    <i class="text-white mdi mdi-cog-outline"></i>
                                                </v-btn>
                                                </template>
                                                
    
                                                <v-list>
                                                    <v-list-item  >
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('view'); current=p"
                                                   
                                                    >
                                                     View more info
                                                    </v-list-item-title>
                                                    
                                                </v-list-item>
                                                  
                                                    
                                                    
                                                    <v-list-item>
                                                        <v-list-item-title
                                                        style="cursor:pointer"
                                                        @click="$bvModal.show('breakdown'); current=p"
                                                        >
                                                         View Payment Breakdown
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                              
                                                

                                            </div>
                                        </div>
                                    
                                        
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                        <div
                            v-else
                            class="col-md-12 mt-3 alert alert-info text-center"
                        >
                            <p>No record found</p>
                        </div>
                        <div class="col-md-12">
                            <!-- <laravelVuePagination :data="properties" @pagination-change-page="fetchData" /> -->
                        </div>
                    </Widget>
                </b-col>
            </b-row>
    
            <!-- Modals -->
            <b-modal size="lg"  :title="`Payment breakdown for ${current.request && current.request.name}  request`" id="breakdown" hide-footer>
                <break-down :my_model="$bvModal" :data="current"   @submitted="fetchData()"  />
            </b-modal>
            <b-modal  :title="`Your conversation for request ${current.name} `" id="conversation" hide-footer>
                <convo :my_model="$bvModal"    :data="current"  />
            </b-modal>
            <b-modal  :title="`View  request ${current.name} `" id="view" hide-footer>
                <viewModal :my_model="$bvModal" :auth_token="auth_token"     :data="current"  />
            </b-modal>
            
            <!-- Modals end -->
            <!-- V Dialog -->
            <v-dialog
                v-model="openConfirm"
                max-width="390"
            >
                <v-card>
                    <v-card-title class="text-h5">
                    Change property status to {{dynamic_status}}
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
            <v-dialog
                v-model="openConfirm2"
                max-width="390"
            >
                <v-card>
                    <v-card-title class="text-h5">
                    Delete property
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
                        @click="deleteProperty(del_id);openConfirm2=false"
    
    
                    >
                        Yes, continue
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- V Dialog End -->
        </v-app>
        <adminApprovedRequest v-else />

    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import BreakDown from '@/pages/ApprovedRequests/partials/breakdown';
import Convo from '@/pages/ApprovedRequests/partials/convo';
import adminApprovedRequest from '@/pages/ManageInvestors/approved/index';
import view from '@/pages/ManageInvestors/approved/partials/view';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, BreakDown, Convo, adminApprovedRequest, "viewModal":view},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            approvedRequests: [],
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,

        }
    },
    computed:{
        ...mapState('auth',['auth_data', 'auth_token'])
    },
    mounted() {
        this.getAuthData();
        if(this.auth_data.user_type =='user') {
            this.fetchData()
        }
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        
        fetchData(page=1) {
            this.loading = true
            this.$api
            .post(this.dynamic_route('/requests/approved_request'), {
                filters: this.filters,
            })
            .then(res => {
                this.loading=false;

                if(res.status == 200) {
                    this.approvedRequests = res.data.data
                } else {
                    this.toast(res)
                }
            })
            
        },
        
        deleteProperty(id) {
        this.loading = true
        axios
            .delete(this.dynamic_route(`/properties/${id}`), {
                headers:{
                    authorization: `Bearer ${this.auth_data}`

                }
            })
            .then(() => {
            this.fetchData()
            this.$toast.success('Deleted successfully!', {
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
            })
            })
            .catch(err => {
            this.loading = false;
            if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
            }
            if (err.response.status == 500) {
                return this.$toast.error('Unable to delete property  it has been used in many places!', {
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
                })
            }
            })
            .finally(() => {
            this.loading = false
            })
        },
    },
}
</script>
<style>
   .modal-body {
       background: white !important;
   }
</style>