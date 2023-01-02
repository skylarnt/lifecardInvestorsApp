<template>
    <div>
        <form action="" @submit.prevent="updateUserDetails">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
            <v-card-text class="_body">
                <v-container class="px-0">
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.lname">{{error_messg.lname[0]}}</small>

                            <v-text-field
                            label="Lastname*"
                            v-model="form.lname"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.fname">{{error_messg.fname[0]}}</small>

                            <v-text-field
                            label="Firstname*"
                            v-model="form.fname"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.mname">{{error_messg.mname[0]}}</small>
                            

                            <v-text-field
                            label="Middlename"
                            v-model="form.mname"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.email">{{error_messg.email[0]}}</small>

                            <v-text-field
                            label="Email*"
                            v-model="form.email"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.country">{{error_messg.country[0]}}</small>
                            <v-autocomplete
                                v-model="form.country"
                                :items="countries"
                                label="Country*"
                                ></v-autocomplete>

                            <v-text-field
                            label="Country*"
                            v-model="form.country"
                            ></v-text-field>
                        </v-col>
                      
                        
                        <v-col
                            cols="12"
                        >
                            <small class="text-danger" v-if="error_messg.phone">{{error_messg.phone[0]}}</small>

                            <v-text-field
                            label="Phone"
                            v-model="form.phone"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                        <small class="text-danger" v-if="error_messg.gender">{{error_messg.gender[0]}}</small>

                            <v-select
                                v-model="form.gender"
                                :items="['male', 'female']"
                                label="Gender"
                            ></v-select>
                        </v-col>
                        <!-- <v-col
                            cols="12"
                        >
                            <v-select
                                v-model="form.status"
                                :items="['active', 'inactive']"
                                label="Status*"
                                :rules="statusRules"
                            ></v-select>
                        </v-col> -->
                        <!-- <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                            <v-select
                                v-model="form.property_type_id"
                                :hint="`${select.name}, ${select.status}`"
                                :items="property_types"
                                item-text="name"
                                item-value="id"
                                label="Property Name*"
                                :rules="propertyRules"
                                persistent-hint
                                dense
                            ></v-select>
                        </v-col> -->
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
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
                    Update
                </button>
            </v-card-actions>
        </form>
    </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'
import axios from "axios"
import newData from "@/countries.js"

export default {
    props: ['user', 'authToken'],
    components: {
        VueElementLoading
    },
    data() {
        return {
            loading: false,
            form: this.user,
            error_messg:{},
            countries:[]
        }
    },
    methods: {
        updateUserDetails(){
            this.loading = true
            axios.post(this.dynamic_route('/users/edit'), this.form, {
                    headers:{
                        authorization: `Bearer ${this.authToken}`
                    }
                }).then(()=> {
                    this.$emit('updated')
                    this.$toast.success('User details updated successfully!', {
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
                    })
                    this.closeMe()
                })
                .catch((err) => {
                    if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                        return this.logoutUser();
                    }
                    if(err.response.status==422 && err.response.data.message =="The given data was invalid.") this.error_messg=err.response.data.errors

                    this.$toast.error('An error occurred. Please try again!', {
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
                    })
                })
                .finally(() => this.loading = false)
        },
        closeMe() {
            this.$bvModal.hide('edit')
        }
    },
    mounted(){
        this.countries=newData

    },
}
</script>