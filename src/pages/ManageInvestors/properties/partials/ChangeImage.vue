<template>
    <div class="">
       <form action=""  @submit.prevent="save">
            <VueElementLoading
                :active="loading"
                spinner="bar-fade-scale"
                color="var(--primary)"
                text="Loading.."
                duration="0.6"
            />
            <h4>{{main_name}} - main property</h4>
            <div class="row border-bottom mx-1 mb-3">
                <div 
                    class="col-md-3"
                    v-for="(img, i) in data.image"
                    :key="i"
                >
                    <div class="card">
                        <div class="card-body" style="position:relative">
                            <span 
                                title="Click to remove image" 
                                class="font-weight-bold cancel_img" 
                                @click="removeSingleImage(img, i)"
                                style="cursor:pointer;
                                    color:;
                                    position: absolute;
                                    right: 1%;
                                    top: -6%;
                                    font-size: 20px;"
                                    
                                >
                                <i class="mdi mdi-close-thick"></i>
                            </span>
        
                            <embed :src="img.image" alt="" style="width:100%">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid px-1">
                <h4>Add more images.</h4>
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
                    
                </v-row>
            </div>
            <v-card-actions class="text-right" style="margin-top:100px">
                <v-spacer></v-spacer>
                <button
                    class="btn btn-primary"
                    type="button"
                    @click="closeMe()"

                >
                    Close
                </button>
                <button
                    class="btn btn-primary ml-2"
                    type="submit"
                    :disabled="!image_data.length"
                >
                    Save
                </button>
            </v-card-actions>
       </form>
    <b-modal  style="background:white" :title="`Remove single image for ${main_name}` " id="remove_image" hide-footer>
        <RemoveSingleImage :my_model="$bvModal" :img="img"   :data="current"  @removed="removedImg()"  />
    </b-modal>
    </div>
</template>
<script>
import RemoveSingleImage from './RemoveSingleImage.vue';
import axios from "axios";
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_model', 'data','main_name', 'authToken'],
    components:{
        RemoveSingleImage,VueElementLoading,
    },
    data() {
        return {
            form:this.data,
            loading:false,
            current:{},
            img:{},
            image_data: [],
            main_data:[],
            indd:0,
        }
    },
    
    methods:{
        
        closeMe() {
            this.$bvModal.hide("change_image");
        },
        removeSingleImage(d,indd) {
            this.current=this.data;
            this.img=d;
            this.indd=indd;
            this.$bvModal.show("remove_image")
        },
        removedImg(){
            this.data.image.splice(this.indd,1)
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
            const productImgArray = this.image_data.map(item => item.file)
            const payload = new FormData();
            payload.append('id', this.data.id)
            for (let i = 0; i < productImgArray.length; i++) {
                payload.append('image[]', productImgArray[i])
            }
            
            axios
            .post(this.dynamic_route('/properties/admin/change_image'), payload, {
                headers:{
                  authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
                this.loading = false
                this.closeMe()
                this.$emit('submitted')
                this.$toast.success('Images Added  successfully!', {
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
            })
            .finally(() => {
                this.loading = false
            })
        },
    },
   
}
</script>