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
                <p>Request for . </p>
                <div>
                    <table class="table table-response-sm table-sm table-hover">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{{ data.name }}</td>

                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{{ Number(data.amount).toLocaleString() }}</td>

                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{{ data.location }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
           
                
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
                >
                    Make request
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
        }
    },
    methods:{
        closeMe() {
            this.$bvModal.hide('buy')
        },
        save() {
            this.loading=true;
            this.error_messg={};
            let payload = {
                name: this.data.name,
                pi: this.data.id
            }
            this.$api.post(this.dynamic_route('/requests/make'), payload).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                    this.closeMe();
                    this.form={}
                    this.$emit("submitted");
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                }
                this.toast(res)


            });
        },
    }
}
</script>

<style>

</style>