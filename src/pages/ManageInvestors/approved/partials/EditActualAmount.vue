<template>
  <div class="a">
    <form action="" @submit.prevent="save">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body">
                <div class="row">
                    <div class="col-md-12">
                                    <input required  v-model="data.amount" type="number" placeholder="1000" class="form-control">
                    </div>
                </div>
                
            
            </v-card-text>
            <v-card-actions  >
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="closeMe()"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="update()"
                >
                    Update
                </v-btn>
                
            </v-card-actions>


        </form>
  </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_modal', 'data'],
    components:{
        VueElementLoading,
    },
    computed:{

    },
    data() {
        return {
            nameRules: [
                v => !!v || 'This is a required',
            ],
            trans_rec: {},
            form:{},
            loading:false,
            error_messg:{},
            transactions:[],
            amount_paid:0,
        }
    },
    mounted() {
        this.fetch()
    },
    methods:{
        // ...mapActions('page', ['getAuthData']),
        closeMe() {
            this.$bvModal.hide('EditBreakdown')
        },
        update() {
            this.loading=true;
            this.$api.post(this.dynamic_route('/requests/admin/update_actual_amount'),
                this.data
            ).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                    this.closeMe();
                this.$emit('done')
                this.$toast.success('Payment Updated', {
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
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    this.toast(res)
                }

            });
        },
    }
}
</script>

