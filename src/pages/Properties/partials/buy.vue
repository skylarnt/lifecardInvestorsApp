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
                            <tr>
                                <th>Type</th>
                                <td>{{ data.type }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 p-0" v-if="squareMeter.length">
                    More info 
                    <v-simple-table v-if="data.type =='land'">
                        <thead>
                            <tr>
                            <th>Square Meter</th>
                            <th>Amount</th>
                            <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tr, i) in  squareMeter" :key="i">

                                <td>
                                    {{ tr.sqm }}
                                </td>
                                <td>
                                    {{ Number(tr.price).toLocaleString() }}
                                </td>
                                <td>
                                    <input required v-model="form.selected_square_meter" :value="tr" type="radio" name="sqM" >
                                </td>

                            </tr>

                        </tbody>
                    </v-simple-table>
                    <v-simple-table v-if="data.type =='house'">
                        <thead>
                            <tr>
                            <th>Unit </th>
                            <th>Amount</th>
                            <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tr, i) in  squareMeter" :key="i">

                                <td>
                                    {{ tr.unit }}
                                </td>
                                <td>
                                    {{ Number(tr.price).toLocaleString() }}
                                </td>
                                <td>
                                    <input required v-model="form.selected_square_meter" :value="tr" type="radio" name="sqM" >
                                </td>

                            </tr>

                        </tbody>
                    </v-simple-table>

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
            form:{selected_square_meter:null},
            loading:false,
            error_messg:{},
            squareMeter: this.data.square_meters_info == null ? [] : this.data.square_meters_info
        }
    },
    mounted() {
        try {
            this.squareMeter=JSON.parse(this.squareMeter)

            
        }finally {
            // eslint-disable-next-line no-unsafe-finally
            return false;
            
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
            if(this.form.selected_square_meter) {
                if(this.form.selected_square_meter.hasOwnProperty('sqm')) {
                    payload.name = payload.name + ' ( ' + this.form.selected_square_meter.sqm + ' Square Meters)'

                }
                else if (this.form.selected_square_meter.hasOwnProperty('unit')) {
                    payload.name = payload.name + ' ( ' + this.form.selected_square_meter.unit + ' Unit )'


                }
                payload.sqm_price= this.form.selected_square_meter.price
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