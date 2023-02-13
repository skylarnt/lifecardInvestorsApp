<template>
    <div class="_body">
        <form action="" @submit.prevent="update">
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
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Name*"
                        :rules="nameRules"
                        v-model="form.name"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                            v-model="form.amount"
                            type="number"
                            label="Price *"
                            :rules="priceRules"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Property link*"
                        :rules="nameRules"
                        v-model="form.property_link"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                            v-model="form.video_link"
                            label="Video link *"
                            :rules="priceRules"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-select
                            v-model="form.status"
                            :items="['active', 'inactive']"
                            label="Status*"
                            :rules="statusRules"
                            required
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-select
                            v-model="form.type"
                            :items="['house', 'land']"
                            disabled
                            required
                            label="Property type*"
                            :rules="typeRules"
                        ></v-select>
                    </v-col>
                    
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-textarea
                            
                            v-model="form.location"
                            rows="3"
                            row-height="30"
                            label="Property Location    "
                            auto-grow
                            :rules="location"
                            required
                            name="input-7-4"
                        ></v-textarea>
                    </v-col>
                    
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        class="mb-5"
                    >
                        <quillEditor
                            v-model="form.description"
                            ref="myQuillEditor"
                            :options="editorOption"
                            style="height:140px"
                            required
                                    
                            />
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        class="mt-4"
                        v-if="form.type == 'land'"
                    >
                        <!-- <p class="text-info pl-0">
                            Add square meters
                        </p> -->
                        <div class="col-6 pl-0">
                            <button type="button" @click="handleSquareMeterChange()" class="mb-3 btn btn-sm btn-info">
                                Add more
                            </button>
                            <div class="clearfix"></div>
                            <div class="row mb-0">
                                <div class="col-6 mb-0 mb-0">
                                    <label id="sqm">Square Meter</label>


                                </div>
                                <div class="col-6 mb-0 pb-0">
                                    <label id="sqm">Price </label>


                                </div>
                            </div>
                            <div class="row mt-0" v-for="(sq, i) in form.square_meters_info" :key="i">
                                <div class="col-6 mb-0 ">
                                    <input required  v-model="sq.sqm" type="number" placeholder="1000" class="form-control">

                                </div>
                                <div class="col-6 mb-0">
                                    <input required  v-model="sq.price" type="number" placeholder="2000000" class="form-control">
                                    <!-- <i class="float-right mdi mdi-delete-forever-outline mr-1"></i> -->
                                </div>
                            </div>


                        </div>
                    </v-col>
                     <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        class="mt-4"
                        v-if="form.type == 'house'"
                    >
                        <!-- <p class="text-info pl-0">
                            Add square meters
                        </p> -->
                        <div class="col-6 pl-0">
                            <button type="button" @click="handleLandChange()" class="mb-3 btn btn-sm btn-info">
                                Add more
                            </button>
                            <div class="clearfix"></div>
                            <div class="row mb-0">
                                <div class="col-6 mb-0 mb-0">
                                    <label id="sqm">Unit </label>


                                </div>
                                <div class="col-6 mb-0 pb-0">
                                    <label id="sqm">Price </label>


                                </div>
                            </div>
                            <div class="row mt-0" v-for="(sq, i) in form.square_meters_info" :key="i">
                                <div class="col-6 mb-0 ">
                                    <input required  v-model="sq.unit" type="number" placeholder="1000" class="form-control">

                                </div>
                                <div class="col-6 mb-0">
                                    <input required  v-model="sq.price" type="number" placeholder="2000000" class="form-control">
                                    <!-- <i class="float-right mdi mdi-delete-forever-outline mr-1"></i> -->
                                </div>
                            </div>


                        </div>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions style="margin-top:100px">
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
                    Save
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_model', 'data',  'authToken'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            
            form:this.data,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            statusRules:[
                v => !!v || 'Status is required',
            ],
            location:[
                v => !!v || 'Location is required',
            ],
            typeRules:[
                v => !!v || 'Property Type is required',

            ],
            priceRules: [
                v => !!v || 'Price is required',
            ],
            groupRules: [
                v => !!v || 'Group is required',
            ],
            editorOption: {
                debug: 'info',
                placeholder: 'Contents..',
                readOnly: true,
                theme: 'snow'
            },
            delta: undefined,
            loading:false
        }
    },
    mounted() {

      if(  this.form.square_meters_info == null ) {
        this.form.square_meters_info=[]
      } else {
        

        try {
            this.form.square_meters_info=JSON.parse(this.form.square_meters_info)

            
        }
        finally {
            // eslint-disable-next-line no-unsafe-finally
            return false;

        }
      }

    },
    watch: {
        "form.description"() {
            this.delta = this.$refs.myQuillEditor.quill.getContents()
        }
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("edit");
        },
        handleSquareMeterChange() {
            this.form.square_meters_info.push({
                sqm:'',
                price:'',
            })
        },
        update() {
            this.loading = true
            axios

            .post(this.dynamic_route(`/properties/admin/update/${this.form.id}`), this.form, {
                headers:{
                  authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
                this.loading = false
                this.closeMe()
                this.$emit('updated')
                this.$toast.success('Updated successfully!', {
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
            .catch((err) => {
                this.loading = false;
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                if(err.response.status ==400 && err.response.data.message =='Invalid data passed') {
                    this.$toast.error(err.response.data.data, {
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
                    return;
                }
                this.$toast.error('An error occurred, try again later!', {
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
            .finally(() => {
                this.loading = false
            })
        },
    }
    
}
</script>
<style scoped>
    .modal-body {
       background: white !important;
    }

    ._body {
        height:auto !important;
    }
</style>