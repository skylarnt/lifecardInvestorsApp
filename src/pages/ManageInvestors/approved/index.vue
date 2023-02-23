<template>
    <v-app class="p-4">
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                    <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Approved Property Requests</span></h5>
                   
                    
                    <VueElementLoading
                        :active="loading"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                        text="Loading.."
                        duration="0.6"
                    />
                    <div class="mt-3" v-if="approvedRequests.data.length">
                        <div class="row">
                            <div class="col-md-6 mb-2"   v-for="(p,i) in approvedRequests.data"
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
                                                                    
                                                                    {{ p.allocation_type != null ?  (p.allocation_type =='online' ?  'Paper' : 'Physical') : 'Unknown' }} 
                                                                    
                                                                 </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr  >
                                                        <td v-if="p.type=='house'">
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
                                                     <tr v-if="p.type=='land'">
                                                        <td>
                                                            Deed of assignment type
                                                            <p>
                                                                <span
                                                                
                                                                    >
                                                                    {{ p.deed_of_assignment_type ?p.deed_of_assignment_type: 'Not sent'   }}

                                                                 </span>
                                                            </p>
                                                        </td>
                                                        <td >
                                                            Survey plan
                                                            <p>
                                                                <span
                                                                
                                                                    >
                                                                    {{ p.survey_plan ? p.survey_plan : 'Not sent'   }}

                                                                </span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                          
                                        </table>
                                        
                                        
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
                                              
                                                
                                                
                                                <v-list-item  v-if="p.status!='completed'">
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('record'); current=p"
                                                   
                                                    >
                                                     Record Payment
                                                    </v-list-item-title>
                                                 
                                                </v-list-item>
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
                                                    @click="$bvModal.show('breakdownA'); current=p"
                                                    
                                                    >
                                                      Payment breakdown
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item >
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('allocate'); current=p"
                                                    
                                                    >
                                                    Property  Allocation
                                                    </v-list-item-title>
                                                </v-list-item>

                                                <v-list-item v-if="p.contract_recieved =='pending'">
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm=true;dynamic_status='sent';status_id=p.id; current=p"
                                                    >
                                                      Contract  sent
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-if="p.status =='completed' && p.type=='house' && p.key_allocated=='no'">
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm3=true;status_id=p.id; current=p"
                                                    >
                                                      Assign  house key
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item  > 
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('survey'); current=p"
                                                    >
                                                      Survey plan
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item   > 
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm4=true;status_id=p.id; current=p"
                                                    >
                                                      Assign  deed of assignment
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-if="p.contract_recieved =='sent'">
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm=true;dynamic_status='submitted';status_id=p.id; current=p"

                                                    >
                                                      Contract  submitted
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
                        <laravelVuePagination :data="approvedRequests" @pagination-change-page="fetchData" />
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        
        <b-modal  :title="`Record Transaction for request ${current.name} `" id="record" hide-footer>
            <record :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
        </b-modal>
        <b-modal  :title="`View  request ${current.name} `" id="view" hide-footer>
            <viewModal :my_model="$bvModal" :auth_token="auth_token"     :data="current"  />
        </b-modal>
        <b-modal  :title="`Allocate property  ${current.name} to user ${current.request && current.request.investor.fname} ${current.request && current.request.investor.lname}`" id="allocate" hide-footer>
            <allocate :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
        </b-modal>
        <b-modal  :title="`Deed of assignment  type for request  ${current.name} to user ${current.request && current.request.investor.fname} ${current.request && current.request.investor.lname}`" id="assignment_type" hide-footer>
            <assignment-type :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
        </b-modal>
        <b-modal  :title="`Survey plan for  ${current.name} to user ${current.request && current.request.investor.fname} ${current.request && current.request.investor.lname}`" id="survey" hide-footer>
            <survey :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
        </b-modal>
        <b-modal size="lg"  :title="`View Transaction breakdown for ${current.request &&current.request.investor.fname} `" id="breakdownA" hide-footer>
            <breakdown :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
        </b-modal>
        
        
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Change Request contract status to {{dynamic_status}}
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
                Delete Request
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>
                <v-card-text>
                    <strong>Note</strong>
                    You cannot delete a request if it has been approved or has a conversation.
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
                    @click="deleteRequest(del_id);openConfirm2=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openConfirm3"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Assign house key to user 
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
                    @click="assignHouseKey(status_id);openConfirm3=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openConfirm4"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Assign deed of assignment   
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
                    @click="deedOfAssignment(status_id);openConfirm4=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- V Dialog End -->
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';

import Record from '@/pages/ManageInvestors/approved/partials/record';
import Allocate from '@/pages/ManageInvestors/approved/partials/allocateToUser';
import Survey from '@/pages/ManageInvestors/approved/partials/survey';
import AssignmentType from '@/pages/ManageInvestors/approved/partials/assignmentType';
import Breakdown from '@/pages/ManageInvestors/approved/partials/breakdown';
import view from '@/pages/ManageInvestors/approved/partials/view';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, Record,AssignmentType, Breakdown, Allocate, "viewModal":view, Survey},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            openConfirm3:false,
            openConfirm4:false,
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
        ...mapState('auth',['auth_token', 'auth_data']),

    },
    mounted() {
        this.getAuthData();
        if(this.auth_data &&this.auth_data.user_type =='admin') {
            this.fetchData();

        }
    },
    methods: {
        ...mapActions('page', ['getAuthData']),
        
        fetchData(page=1) {
             this.loading = true
            axios
            .post(this.dynamic_route(`/requests/admin/all_approved_request?page=${page}`), {
            filters: this.filters,
            },{
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(res => {
                this.loading = false
                this.approvedRequests = res.data.data
                this.loading = false
            })
            .catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
            // eslint-disable-next-line no-console
            })
            .finally(() => {
                this.loading = false
            })
        },
        toggle_status(id, status) {
            this.loading=true;
            this.$api.post(this.dynamic_route('/requests/admin/change_contract_status'), {
                id, status
            }).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                  this.fetchData()
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                }
                this.toast(res)


            });
        },
        assignHouseKey(id) {
            this.loading=true;
            this.$api.post(this.dynamic_route('/properties/admin/assign_key'), {
                 id
            }).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                  this.fetchData()
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                }
                this.toast(res)


            });
        },
        deedOfAssignment(id) {
            if(this.current.type == 'land') {
                this.$bvModal.show("assignment_type")

            } else {
                this.loading=true;
                this.$api.post(this.dynamic_route('/properties/admin/assign_deed_of_assignment'), {
                     id
                }).then((res) => {
                    this.loading=false;
    
                    if(res.status == 200) {
                      this.fetchData()
                    } else {
                        if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    }
                    this.toast(res)
    
    
                });

            }
        },
        
        
    },
}
</script>
<style>
   .modal-body {
       background: white !important;
   }
</style>