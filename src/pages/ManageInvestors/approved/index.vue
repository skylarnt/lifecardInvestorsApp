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
                    <div class="mt-3" v-if="approvedRequests.length">
                        <v-simple-table  class="table-responsive">
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Index
                                    </th>
                                    <th class="text-left">
                                        Request
                                    </th>
                                    <th class="text-left">
                                        Client
                                    </th>
                                    <th class="text-left">
                                        Property
                                    </th>
                                    <th class="text-left">
                                        Amount
                                    </th>
                                    <th class="text-left">
                                        Paid
                                    </th>
                                    <th class="text-left">
                                        Contract
                                    </th>
                                    <th class="text-left">
                                        Status
                                    </th>
                                    <th class="text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(p,i) in approvedRequests"
                                    :key="i" 
                                >
                                <td>{{ i + 1 }}</td>
                                    <td >
                                        {{ p.request && p.request.name }}
                                    </td>
                                    <td >
                                       <p class="mb-0">
                                        {{ p.request && p.request.investor.fname }}
                                       </p>
                                       {{ p.request && p.request.investor.lname }}

                                    </td>
                                    <td >
                                        {{ p.name }}
                                    </td>
                                    <td >
                                        {{ Number(p.amount).toLocaleString() }}
                                    </td>
                                    <td >
                                        {{ Number(p.amount_paid ).toLocaleString()}}
                                    </td>
                                    <td>
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
                                    </td>
                                    <td >
                                        <span
                                            class="badge"
                                            :class="{
                                            'badge-secondary' : p.status == 'processing',
                                            'badge-info' : p.status == 'completed',
                                            }"
                                        >
                                            {{ p.status }}
                                        </span>
                                    </td>
                                    
                                    <td >
                                        
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
                                              
                                                
                                                
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('record'); current=p"
                                                    v-if="p.status!='completed'"
                                                    >
                                                     Record Payment
                                                    </v-list-item-title>
                                                </v-list-item>
                                                  
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="$bvModal.show('breakdownA'); current=p"
                                                    v-if="p.status!='completed'"
                                                    >
                                                      Payment breakdown
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
                                    </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                    <div
                        v-else
                        class="col-md-12 mt-3 alert alert-info text-center"
                    >
                        <p>No record found</p>
                    </div>
                    <div class="col-md-12">
                        <!-- <laravelVuePagination :data="data" @pagination-change-page="fetchData" /> -->
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        
        <b-modal  :title="`Record Transaction for request ${current.name} `" id="record" hide-footer>
            <record :my_model="$bvModal" :auth_token="auth_token"  @done="fetchData()"  :data="current"  />
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
        <!-- V Dialog End -->
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';

import Record from '@/pages/ManageInvestors/approved/partials/record';
import Breakdown from '@/pages/ManageInvestors/approved/partials/breakdown';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, Record, Breakdown},
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
        ...mapState('auth',['auth_token', 'auth_data']),

    },
    mounted() {
        this.fetchData();
        this.getAuthData();
    },
    methods: {
        ...mapActions('page', ['getAuthData']),
        
        fetchData(page=1) {
             this.loading = true
            axios
            .post(this.dynamic_route('/requests/admin/all_approved_request'), {
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
        
        
    },
}
</script>
<style>
   .modal-body {
       background: white !important;
   }
</style>