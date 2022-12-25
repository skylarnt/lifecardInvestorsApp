<template>
   <div>
    <form action="" @submit.prevent="reply">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          
          <p>
                <span
                class="badge"
                :class="{
                        
                    'badge-info' : data.is_special == 'yes',
                    }"
                >
                    Special request
                </span>
            </p>
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <p><button type="button" @click="fetchData()" class="btn text-info">Refresh</button></p>
            <v-card-text class="_body p-0">
                <div class="convo">
                    
                    <div v-if="request_conversation.length">
                        <div class="bubbleWrapper" v-for="(m) in request_conversation" :key="m.id">
                            <div class="inlineContainer" :class="{
                                'own': m.convo_1 !=null,
                            }">
                                <div  :class="{
                                'own': m.convo_1 !=null,
                                'ownBubble': m.convo_1 !=null,
                                'other': m.convo_2 !=null,
                                'otherBubble': m.convo_2 !=null,
    
                            }">
                                    {{ m.convo_1 != null ? m.convo_1 : m.convo_2}}
                                </div>
                            </div><span :class="{
                                'own': m.convo_1 !=null,
                                'other': m.convo_2 !=null,
                            }">{{ m.created_at | moment("from", true)  }} ago</span>
                        </div>

                    </div>
                    <div class="card" v-else>
                        <div class="card-body">
                            <p class="text-dark">No conversation .</p>
                        </div>
                    </div> 
                
                
                </div>
                <v-container class="px-0">
                    <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                            <v-text-field
                            v-model="form.message"
                            placeholder="Type Reply here."
                            required
                            ></v-text-field>
                            <small class="text-danger" v-if="error_messg.name">{{ error_messg.name[0] }}</small>
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
                    :disabled="!form.message"
                >
                    Send
                </button>
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
        this.scrollDiv()

        this.fetchData()


    },
    methods:{
        closeMe() {
            this.$bvModal.hide('conversation')
        },
        scrollDiv() {
            var elem = document.querySelector('.convo');
            setTimeout(() => {
                elem.scrollTop = Number(elem.scrollHeight);
                
            }, 1000);
        },
        reply() {
            this.$api.post(this.dynamic_route('/requests/reply_message'), {
                message: this.form.message,
                request_id: this.data.id,
            }).then((res) => {
                this.loading=false;
                this.form={}
                if(res.status == 200) {
                    this.request_conversation.push(res.data.data);
                    var elem = document.querySelector('.convo');
                    setTimeout(() => {
                        elem.scrollTop = Number(elem.scrollHeight);
                        
                    }, 1000);
                    
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                }
                this.toast(res)


            });
        },
        fetchData() {
            this.$api.post(this.dynamic_route('/requests/get_user_conversations'), {
                message: this.form.message,
                request_id: this.data.id,
            }).then((res) => {
                this.loading=false;
                this.form={}
                if(res.status == 200) {
                    this.request_conversation=res.data.data;
                    this.scrollDiv()
                    
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    this.toast(res)
                }


            });
        },
    }
}
</script>

<!-- <style>
    .convo {
        background: #002b49 !important;
        color: white !important;
        height: calc(100vh / 2) !important;
        padding: 9px 11px !important;
        border-radius: 10px !important;
        overflow-y: scroll;
    }
    .my_text div.message{
        width: 50%;
        background-color: white !important;
        color: black;
        padding: 5px;
        border-radius: 8px;
        
    }
    .my_text div{
        
        float: right;
    }
    .other_text div{
        
        clear: right;
    }
    
    .other_text div.message{
        width: 50%;
        background-color: white !important;
        color: black;
        padding: 5px;
        border-radius: 8px;
    }
</style> -->
<style>
.convo {
        /* background: #002b49 !important; */
        /* color: white !important; */
        height: calc(100vh / 2) !important;
        padding: 0px 11px !important;
        border-radius: 10px !important;
        overflow-y: scroll;
    }
    * {
  font-family: 'Avenir';
}
.bubbleWrapper {
	padding: 10px 10px;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	align-self: flex-end;
  color: #fff;
}
.inlineContainer {
  display: inline-flex;
}
.inlineContainer.own {
  flex-direction: row-reverse;
}
.inlineIcon {
  width:20px;
  object-fit: contain;
}
.ownBubble {
	min-width: 60px;
	max-width: 700px;
	padding: 14px 18px;
  margin: 6px 8px;
	background-color: #5b5377;
	border-radius: 16px 16px 0 16px;
	border: 1px solid #443f56;
 
}
.otherBubble {
	min-width: 60px;
	max-width: 700px;
	padding: 14px 18px;
  margin: 6px 8px;
	background-color: #6C8EA4;
	border-radius: 16px 16px 16px 0;
	border: 1px solid #54788e;
  
}
.own {
	align-self: flex-end;
}
.other {
	align-self: flex-start;
}
span.own,
span.other{
  font-size: 14px;
  color: grey;
}
</style>