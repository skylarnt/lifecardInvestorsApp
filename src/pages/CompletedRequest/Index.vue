<template>
    <v-app class="p-4">
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                    <h5 class="d-inline-block">Completed  <span class='fw-semi-bold'>Requests</span></h5>
                   
                    
                    <VueElementLoading
                        :active="loading"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                        text="Loading.."
                        duration="0.6"
                    />
                    <div class="mt-3" v-if="completedRequests.length">
                        <v-simple-table  >
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
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Amount
                                    </th>
                                    <th class="text-left">
                                        Paid
                                    </th>
                                    <th class="text-left">
                                        Status
                                    </th>
                                    <th class="text-left">
                                        Completed On
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(p,i) in completedRequests"
                                    :key="i" 
                                >
                                <td>{{ i + 1 }}</td>
                                    <td >
                                        {{ p.request && p.request.name }}
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
                                        
                                        {{ p.created_at | moment("DD-MM-YYYY h:mm:ss") }}
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
                        <!-- <laravelVuePagination :data="properties" @pagination-change-page="fetchData" /> -->
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        <b-modal  title="Make a request" id="create" hide-footer>
            <make-request :my_model="$bvModal"   @submitted="fetchData()"  />
        </b-modal>
        <b-modal  :title="`Your conversation for request ${current.name} `" id="conversation" hide-footer>
            <convo :my_model="$bvModal"    :data="current"  />
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
</template>
<script>
import Widget from '@/components/Widget/Widget';
import MakeRequest from '@/pages/ManageRequests/partials/make';
import Convo from '@/pages/ManageRequests/partials/convo';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, MakeRequest, Convo},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            completedRequests: [],
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,

        }
    },
    computed:{
        ...mapState('page',['authToken'])
    },
    mounted() {
        this.fetchData();
        this.getAuthData();
    },
    methods: {
        ...mapActions('page', ['getAuthData']),
        
        fetchData(page=1) {
        this.loading = true
        this.$api
            .post(this.dynamic_route('/requests/completed_request'))
            .then(res => {
                this.loading=false;

                if(res.status == 200) {
                    this.completedRequests = res.data.data
                } else {
                    this.toast(res)
                }
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