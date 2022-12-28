<template>
    <v-app class="p-4">
        <h2 class="page-title">Investors</h2>
        <b-row>
            <b-col cols="12">
                <Widget
                title=""
                customHeader
                >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                <div class="py-2">
                   <template>
                        <v-tabs
                        v-model="tabs"
                        centered
                        >
                        <v-tab
                            v-for="n in ['Properties','Requests', 'Approved Requests']"
                            :key="n"
                        >
                            {{ n }}
                        </v-tab>
                        </v-tabs>
                    </template>
                      <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <v-card flat class="py-3">
                               
                                <Properties  />
                               
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat class="py-3">
                               
                                <Request  />
                               
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <Approved  />
                                
                                
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                </div>
                
                </Widget>
            </b-col>
            <v-dialog
            v-model="openConfirm1"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h4">
                    Confirm  Action
                </v-card-title>

                <v-card-text>
                 Are you sure you want to sell this property to {{currentMarketPlaceTransaction.fullName}}  ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm1 = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="openConfirm1=false;soldTo()"


                >
                    Yes
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </b-row>

    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
import Request from '@/pages/ManageInvestors/requests/index';
import Approved from '@/pages/ManageInvestors/approved/index';
import Properties from '@/pages/ManageInvestors/properties/index';

export default {
    components:{
        Widget,
        VueElementLoading, Request, Approved, Properties
    },
    data(){
        return {
            filters: {},
            loading: false,
            allMarketPlace:[],
            marketPlaceTransaction:[],
            tabs:null,
            tab2:null,
            openConfirm1:false,
            currentMarketPlaceTransaction:{}

        }
    },
    computed:{
        ...mapState('auth',['auth_token', 'auth_data']),
        filter_price(val) {
            return val.toLocaleString()
        }
    },
    mounted() {
        this.getAuthData();
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
   .v-tab--active {
        color: inherit;
        background: #1876d1;
        color: white !important;
    }
</style>