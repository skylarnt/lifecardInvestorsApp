<template>
    <div>
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
            <v-container class="px-0">
                <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                    <small class="text-danger" v-if="error_messg.request_id">{{ error_messg.request_id[0] }}</small>

                        <v-text-field
                        label="Name*"
                        :rules="nameRules"
                        v-model="form.name"
                        required
                        ></v-text-field>
                        <small class="text-danger" v-if="error_messg.name">{{ error_messg.name[0] }}</small>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-text-field
                        label="Amount*"
                        :rules="nameRules"
                        type="number"
                        v-model="form.amount"
                        required
                        ></v-text-field>
                        <small class="text-danger" v-if="error_messg.amount">{{ error_messg.amount[0] }}</small>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-select
                            v-model="form.type"
                            :items="['house', 'land']"
                            label="Property type*"
                            :rules="typeRules"
                        ></v-select>
                        <small class="text-danger" v-if="error_messg.type">{{ error_messg.type[0] }}</small>
                    </v-col>
                    
                </v-row>
            </v-container>
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
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!form.name"
                >
                    Save
                </button>
            </v-card-actions>

        </form>
    </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
    props:['my_modal', 'data', 'auth_token'],
    components:{
        VueElementLoading,
    },
    data() {
        return {
            nameRules: [
                v => !!v || 'This is a required',
            ],
            form:{},
            loading:false,
            error_messg:{},
            request_conversation:[],
        }
    },
    mounted() {
        this.fetchData()

    },
    methods:{
        closeMe() {
            this.$bvModal.hide('approve')
        },
       
        
        save() {
            this.form.request_id = this.data.id
            axios.post(this.dynamic_route('/requests/admin/approve_request'), this.form,{
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then((res) => {
                this.loading=false;
                this.form={}
                this.closeMe();
                this.$emit('done')
                this.$toast.success('Request approved !', {
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
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                if(err.response.status==422 && err.response.data.message =="The given data was invalid.") this.error_messg=err.response.data.errors
                this.$toast.error(err.response.data.message, {
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
            // eslint-disable-next-line no-console
            })
            .finally(() => {
                this.loading = false
            });
        },
        fetchData(page=1) {
            this.loading = true
            axios
            .post(this.dynamic_route('/requests/admin/get_conversations'), {
                request_id: this.data.id,
            },{
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(res => {
                this.loading = false
                this.request_conversation = res.data.data
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
    }
}
</script>

<style>

</style>