<template>
    <div class="">
       <form action="" @submit.prevent="removeImage">
            <!-- <h4>{{main_name}} - main property</h4> -->
            <VueElementLoading
                :active="loading"
                spinner="bar-fade-scale"
                color="var(--primary)"
                text="Loading.."
                duration="0.6"
            />
            <div class="row">
                <div 
                    class="col-md-12"
                    
                >
                    <div class="card">
                        <div class="card-body" style="position:relative">
                            <!-- <span 
                                title="Click to remove image" 
                                class="font-weight-bold cancel_img" 
                                style="cursor:pointer;
                                    color:;
                                    position: absolute;
                                    right: 1%;
                                    top: -6%;
                                    font-size: 20px;"
                                    
                                >
                                <i class="mdi mdi-close-thick"></i>
                            </span> -->

                            <img :src="img.image" alt="" style="width:100%">
                        </div>
                    </div>
                </div>
            </div>
            <v-card-actions class="text-right" style="margin-top:100px">
                <v-spacer></v-spacer>
                <button
                    class="btn btn-primary"
                    @click="closeMe()"

                >
                    Close
                </button>
                
                 <button
                    class="ml-2 btn btn-danger"
                    type="submit"
                >
                    Remove
                </button>
            </v-card-actions>
       </form>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_model', 'data','img'],
    components:{
        VueElementLoading,
    },
    data() {
        return {
            form:this.data,
            loading:false
        }
    },
    computed:{
        ...mapState('page',['authToken']),
    },
    methods:{
        ...mapActions('auth', ['getAuthData']),
        
        closeMe() {
            this.$bvModal.hide("remove_image");
        },
        removeImage() {
            
            let payload={
                ...this.data,
                img:this.img
            }
            this.loading=true;
            axios.post(this.dynamic_route('/properties/admin/remove_single_image'), payload, {
                headers:{
                 authorization: `Bearer ${this.authToken}`
                }

            }).then(res => {
                this.loading=false;
                this.$toast.success('Operation successful!', {
                    position: 'top-center',
                    timeout: 3000,
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
                });
                this.$emit("removed");
                this.closeMe()

            }).catch(err => {
                if(err.response.status==404) {
                    this.$toast.error('Could not find reference for the given Mainproperty', {
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
                } else if(err.response.status==408) {
                    this.$toast.error(err.response.data, {
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
                    this.$toast.error("Something went wrong, please try again", {
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
                this.loading=false;

            })
        }
    },
     mounted(){
        this.getAuthData()
    }
}
</script>