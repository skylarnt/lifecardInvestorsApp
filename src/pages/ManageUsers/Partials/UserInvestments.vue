<template>
    <div class="card-body">
        <b-row>
            <b-col>
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
                <div>
                    <h5 class="mb-3">Total Investment - <span class="text-success font-weight-bolder">{{data.length}}</span></h5>
                    <div class="row" v-if="data.length">
                        <div 
                            class="col-md-4 mb-3"
                            v-for="(asset, i) in data"
                            :key="i" 
                        >
                            <div class="card shadow-sm">
                                <div class="card-body position-relative">
                                    <img :src="asset.image[0].image" style="width:100%" alt="">
                                    <span v-if="asset.details.mpg_status == 'inactive'" class="badge badge-danger position-absolute sale-status">
                                        {{asset.details.mpg_status == 'inactive' ? 'SOLD' : ''}}
                                    </span>
                                    <div class="">
                                        <h5 class="mt-2">{{asset.name}}</h5>
                                        <p style="font-weight: 600">₦ {{asset.price.toLocaleString()}}</p>
                                        <div class="d-flex justify-content-between"><span class="badge badge-info pt-2">{{asset.details.group_name}}</span> <span class="font-weight-bold">Slot: {{asset.details.total_slot}}</span></div>
                                        <!-- <button @click="view_single_investment(asset.id)" class="btn btn-lg btn-primary btn-block mt-2 ">View</button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="alert alert-secondary shadow-sm">
                        No investment yet
                    </div>
                </div>
                </Widget>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
export default {
    props: ['user'],
    components:{
        Widget,
        VueElementLoading
    },
    data(){
        return {
            loading: false,
            data:[],
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
        this.fetchData();
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        fetchData() {
            this.loading = true
            axios
            .post(this.dynamic_route('/users/investments'),
            {
                user_id: this.user.id
            },
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
                this.data=res.data;
            })
            .catch(err => {
            })
            .finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
   .widget {
       padding: 0 !important;
   }
   .sale-status {
       top: 0;
       right: 0;
       margin-top: 10px;
       margin-right: 10px;
       font-size: 10px;
       border-radius: 5px !important;
   }
</style>