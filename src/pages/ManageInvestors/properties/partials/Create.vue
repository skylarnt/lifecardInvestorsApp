<template>
    <div class="_body">
        <form action="" @submit.prevent="save">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
           <div
            v-show="image_data.length"
            class="card text-center shadow-sm mb-0"
            >
                <div class="card-body">
                    <div
                    ref="show_images"
                    class="row"
                    >
                    </div>
                </div>
           </div>
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
                        <v-file-input
                            ref="input_file"
                            v-model="main_data"
                            multiple
                            label="Click to upload images"
                            @change="onFileChange"
                        ></v-file-input>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Name*"
                        :rules="nameRules"
                        v-model="form.name"
                        required
                        ></v-text-field>
                    </v-col>
                    <!-- <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                            v-model="form.amount"
                            type="number"
                            label="Price *"
                            :rules="priceRules"
                            required
                        ></v-text-field>
                    </v-col> -->
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
                            label="Property type*"
                            :rules="typeRules"
                            required
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
                        v-if="form.type=='land'"
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
                            <div class="row mt-0" v-for="(sq, i) in squareMeters" :key="i">
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
                        v-if="form.type=='house'"
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
                                    <label id="sqm">Unit</label>


                                </div>
                                <div class="col-6 mb-0 pb-0">
                                    <label id="sqm">Price </label>


                                </div>
                            </div>
                            <div class="row mt-0" v-for="(sq, i) in land" :key="i">
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
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
    props:['my_model', 'authToken'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            loading:false,
            dialog_modal:this.dialog,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            priceRules: [
                v => !!v || 'Price is required',
            ],
            groupRules: [
                v => !!v || 'Group is required',
            ],
            typeRules:[
                v => !!v || 'Property Type is required',

            ],
           
            statusRules:[
                v => !!v || 'Status is required',
            ],
            appreciate:[
                v => !!v || 'Appreciation field is required',
            ],
            appreciate_percent:[
                v => !!v || 'Percent field is required',
                v => ( v && v >= 0 ) || "Percent should be above 0",
                v => ( v && v <= 100 ) || "Percent should not be above 100",
            ],
            location:[
                v => !!v || 'Location is required',
            ],
            propertyTypeRules:[
                v => !!v || 'Property type is required',
            ],
            installmentRules:[
                v => !!v || 'First Installment field is required',
            ],
            editorOption: {
                debug: 'info',
                placeholder: 'Contents..',
                readOnly: true,
                theme: 'snow'
            },
            delta: undefined,
            form:{
                property_link:'',
                video_link:'',
                type:'land',
            },
            image_data: [],
            main_data: [],
            squareMeters: [{
                sqm:'',
                price:'',
            }],
            land:[{
                unit:'',
                price:'',
            }]
        }
    },
    watch: {
        "form.description"() {
            this.delta = this.$refs.myQuillEditor.quill.getContents()
        }
    },
    mounted() {
        
    },
    methods:{
        handleSquareMeterChange() {
            this.squareMeters.push({
                sqm:'',
                price:'',
            })
        },
        handleLandChange() {
            this.land.push({
                unit:'',
                price:'',
            })
        },
        checkValue(prev_val) {
            // if(this.form.appreciate_percent_from_to !== "") return;
            if(Number(prev_val) >= Number(this.form.appreciate_percent_to)) {
                this.$toast.error('First percent range cannot be greater than second percent range!', {
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
        },
        closeMe() {
            this.$bvModal.hide("create");
        },
        onFileChange() {
            const file = this.main_data
            for (let i = 0; i < file.length; i++) {
                this.image_data.push({
                name: file[i].name,
                url: URL.createObjectURL(file[i]),
                file: file[i],
                })
            }
            this.show_image(this.image_data)
        },
        show_image(data) {
            this.$refs.show_images.innerHTML = ''

            for (let i = 0; i < data.length; i++) {
                this.$refs.show_images.innerHTML += `
                            <div class="col-3" style="position:relative">
                                <span 
                                    title="Click to remove image" 
                                    class="font-weight-bold cancel_img" 
                                    style="cursor:pointer;
                                        color:;
                                        position: absolute;
                                        right: 1%;
                                        top: -6%;
                                        font-size: 28px;"
                                        
                                    >
                                    <i class="mdi mdi-close-thick"></i>
                                </span>
                                <embed src="${data[i].url}" class="img-thumbnail" style="width:100%;max-height:300px; max-width:300px" />
                            </div>
                    `
            }

            this.remove()
        },
        remove() {
            const button = document.querySelectorAll('.cancel_img')
            button.forEach((but, i) => {
                but.addEventListener('click', () => {
                this.image_data.splice(i, 1)
                this.main_data.splice(i, 1)
                this.show_image(this.image_data)
                })
            })
        },
        save() {
            this.loading = true;
            let error =[]
            if(this.squareMeters.length) {
                this.squareMeters.forEach((item, i) => {
                    if((item.sqm != '' && item.price == '') || (item.price != '' && item.sqm == '')) error.push("Square meter and Price has to be filled")
                })

            }
            if(this.land.length) {
                this.land.forEach((item, i) => {
                    if((item.unit != '' && item.price == '') || (item.price != '' && item.unit == '')) error.push("Land unit and Price has to be filled")
                })

            }
            if(error.length) {
                this.$toast.error(error.join(""), {
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
            const productImgArray = this.image_data.map(item => item.file)
            const payload = new FormData();
            payload.append('name', this.form.name)
            payload.append('description', this.form.description)
            // payload.append('amount', this.form.amount)
            payload.append('location', this.form.location)
            payload.append('status', this.form.status)
            payload.append('property_link', this.form.property_link)
            payload.append('type', this.form.type)
            payload.append('video_link', this.form.video_link)
            payload.append('squareMeters',this.form.type =='land' ?  JSON.stringify(this.squareMeters) : JSON.stringify(this.land)) 

           
            
            for (let i = 0; i < productImgArray.length; i++) {
                payload.append('image[]', productImgArray[i])
            }
            
            axios
            .post(this.dynamic_route('/properties/admin/add'), payload, {
                headers:{
                  authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
                this.loading = false
                delete this.form.name
                delete this.form.status
                delete this.form.description
                this.closeMe()
                this.$emit('submitted')
                this.$toast.success('Added  successfully!', {
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
    .v-messages__message {
        color: red !important;
    }
</style>