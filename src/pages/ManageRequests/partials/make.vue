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
                <p>What are you looking for ?</p>
                <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-text-field
                        label="Name*"
                        :rules="nameRules"
                        v-model="form.name"
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

export default {
    props:['my_modal'],
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
            this.$bvModal.hide('create')
        },
        save() {
            this.loading=true;
            this.error_messg={};
            this.$api.post(this.dynamic_route('/requests/make'), {
                name: this.form.name
            }).then((res) => {
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