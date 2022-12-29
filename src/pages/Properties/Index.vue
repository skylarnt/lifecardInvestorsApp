<template>
    <div>
        <v-app v-if="auth_data &&auth_data.user_type !='admin'" class="p-4">
            <b-row>
                <b-col>
                    <Widget
                    title=""
                    customHeader
                    >
                        <h5 class="d-inline-block">Available  <span class='fw-semi-bold'>Properties</span></h5>
                       
                        
                        <VueElementLoading
                            :active="loading"
                            spinner="bar-fade-scale"
                            color="var(--primary)"
                            text="Loading.."
                            duration="0.6"
                        />
                        <div class="mt-3"  >
                            <div class="row" v-if="properties.length">
                                <div class="col-md-4 mb-2" v-for="(p,i) in properties" :key="i">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="image my-2">
                                                <img v-if="p.image != null" :src="p.image[0].image"
                                                style="width:100%" />
                                            </div>
                                            <div class="desc">
                                                <h5>{{p.name}}</h5>
                                                <p class="text-right text-muted">
                                                   <!-- <div v-html="p.description">
    
                                                   </div> -->
                                                   ₦ {{ Number(p.amount).toLocaleString() }}
                                                </p>
    
                                            </div>
                                            <div class="options d-flex justify-content-between">
                                                <button type="button" @click="$bvModal.show('view');current=p" class="btn btn-sm btn-info">View</button>
                                                <button type="button" @click="current=p;$bvModal.show('buy');" class="btn btn-sm btn-info">Buy</button>
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
                        </div>
                        <!-- <div
                            v-else
                            class="col-md-12 mt-3 alert alert-info text-center"
                        >
                            <p>No record found</p>
                        </div> -->
                        <div class="col-md-12">
                            <!-- <laravelVuePagination :data="properties" @pagination-change-page="fetchData" /> -->
                        </div>
                    </Widget>
                </b-col>
            </b-row>
    
            <!-- Modals -->
            <b-modal size="lg"  :title="`Viewing  ${current.name} property`" id="view" hide-footer>
                <view-p :my_model="$bvModal" :data="current"     />
            </b-modal>
            <b-modal  :title="`Make a request for  ${current.name} property`" id="buy" hide-footer>
                <buy :my_model="$bvModal"  :data="current"     />
            </b-modal>
            
        </v-app>
        <adminProperties v-else />
    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import View from '@/pages/Properties/partials/view';
import buy from '@/pages/Properties/partials/buy';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';
import adminProperties from '@/pages/ManageInvestors/properties/index';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, "view-p":View, buy, adminProperties},
    data(){
        return {
            current:{},
            properties:[],
            loading:false

        }
    },
    computed:{
        ...mapState('auth',['auth_data'])
    },
    created() {
        this.fetchData();
        this.getAuthData();
       

    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        
        fetchData(page=1) {
        this.loading = true
        this.$api
            .post(this.dynamic_route('/properties/all'))
            .then(res => {
                this.loading=false;

                if(res.status == 200) {
                    this.properties = res.data.data
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