<template>
    <v-app class="p-4">
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                    <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Requests</span></h5>
                   
                    
                    <VueElementLoading
                        :active="loading"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                        text="Loading.."
                        duration="0.6"
                    />
                    <div class="mt-3" v-if="data.length">
                        <v-simple-table  >
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Index
                                    </th>
                                    <th class="text-left">
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Status
                                    </th>
                                    <th class="text-left">
                                        Conversations
                                    </th>
                                    <th class="text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(p,i) in data"
                                    :key="i" 
                                >
                                <td>{{ i + 1 }}</td>
                                    <td >
                                        {{ p.name }}
                                        <p>
                                            <span
                                            class="badge"
                                             v-if="p.is_special=='yes'"
                                            :class="{
                                                
                                            'badge-info' : p.is_special == 'yes',
                                            }"
                                        >
                                          Special request
                                        </span>
                                        </p>
                                    </td>
                                    <td >
                                        <span
                                            class="badge"
                                            :class="{
                                            'badge-success' : p.status == 'approved',
                                            'badge-warning' : p.status == 'pending',
                                            'badge-secondary' : p.status == 'processing',
                                            'badge-info' : p.status == 'completed',
                                            }"
                                        >
                                            {{ p.status }}
                                        </span>
                                    </td>
                                    <td>
                                        <p class="mb-0 text-info" @click="$bvModal.show('conversation'); current=p">
                                            <span style="cursor:pointer">
                                                {{ p.request_conversation }}
                                            </span>
                                        </p>
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
                                                    @click="$bvModal.show('approve'); current=p"
                                                    v-if="p.status !='approved' && p.status !='completed'"
                                                    >
                                                     Approve Request
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
        
        <b-modal  :title="`Your conversation for request ${current.name} `" id="conversation" hide-footer>
            <convo :my_model="$bvModal" :auth_token="auth_token"   :data="current"  />
        </b-modal>
        <b-modal  :title="`Approve  ${current.name} request`" id="approve" hide-footer>
            <approve :my_model="$bvModal" :auth_token="auth_token" @done="fetchData()"   :data="current"  />
        </b-modal>
        
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Change Request status to {{dynamic_status}}
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

import Convo from '@/pages/ManageInvestors/requests/partials/convo';
import Approve from '@/pages/ManageInvestors/requests/partials/approve';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination,  Convo, Approve},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            data: [],
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
            .post(this.dynamic_route('/requests/admin/all'), {
            filters: this.filters,
            },{
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(res => {
                this.loading = false
                this.data = res.data.data
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
        
        
    },
}
</script>
<style>
   .modal-body {
       background: white !important;
   }
</style>