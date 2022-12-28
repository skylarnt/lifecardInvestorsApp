<template>
    <v-app class="p-4">
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                    <h5 class="d-inline-block">Manage Investors <span class='fw-semi-bold'>Properties</span></h5>
                    <v-btn
                    depressed
                    color="primary"
                    class="float-right"
                    @click="$bvModal.show('create')"
                >
                    <i class="mdi mdi-plus-circle"></i> Create
                </v-btn>
                    
                    <VueElementLoading
                        :active="loading"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                        text="Loading.."
                        duration="0.6"
                    />
                    <div class="mt-3" v-if="data.length">
                        <v-simple-table  >
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Index
                                    </th>
                                    <th class="text-left">
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Amount
                                    </th>
                                    <th class="text-left">
                                        Location
                                    </th>
                                    <th class="text-left">
                                        Status
                                    </th>
                                    <th class="text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(p,i) in data"
                                    :key="i" 
                                >
                                <td>{{ i + 1 }}</td>
                                    <td >
                                        {{ p.name }}
                                    </td>
                                    <td >
                                        {{ p.amount }}
                                    </td>
                                    <td >
                                        {{ p.location }}
                                    </td>
                                    <td >
                                        <span
                                            class="badge"
                                            :class="{
                                            'badge-success' : p.status == 'active',
                                            'badge-warning' : p.status == 'inactive'
                                            }"
                                        >
                                            {{ p.status }}
                                        </span>
                                    </td>
                                    
                                    <td >
                                        
                                        <v-menu
                                            bottom
                                            origin="center center"
                                            transition="scale-transition"
                                            :close-on-content-click="closeOnContentClick"
                                        >
                                            <template #activator="{ on, attrs }">
                                            <v-btn
                                                v-bind="attrs"
                                                color="primary"
                                                v-on="on"
                                            >
                                                <i class="text-white mdi mdi-cog-outline"></i>
                                            </v-btn>
                                            </template>

                                            <v-list>
                                              
                                                <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current(p);$bvModal.show('view');"
                                                >
                                                <i class="mdi mdi-eye-outline mr-1"></i> View more info
                                                </v-list-item-title>
                                            </v-list-item>
                                                <v-list-item  >
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current_img(p,p.name, 'change');$bvModal.show('change_image');"
                                                    >
                                                    <i class="mdi mdi-square-edit-outline mr-1"></i> Manage Images
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current(p); $bvModal.show('edit')"
                                                    >
                                                    <i class="mdi mdi-square-edit-outline mr-1"></i> Edit
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item  >
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current(p); $bvModal.show('link')"
                                                    >
                                                    <i class="mdi mdi-square-edit-outline mr-1"></i> Add property link
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-if="p.status == 'active'">
                                                <v-list-item-title

                                                    style="cursor:pointer"
                                                    @click="openConfirm=true;dynamic_status='inactive';status_id=p.id"
                                                    >
                                                        <button
                                                            class="text-left p-0 btn"
                                                        >
                                                            <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important"> Deactivate</span>
                                                        </button>
                                                    <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Deactivate -->
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-else>
                                                    <v-list-item-title
                                                        style="cursor:pointer"
                                                        @click="openConfirm=true;dynamic_status='active';status_id=p.id"
                                                    >
                                                        <button
                                                            class="text-left p-0 btn"
                                                        >
                                                            <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important"> Activate</span>
                                                        </button>
                                                    <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Activate -->
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm2=true;del_id=p.id"
                                                    >
                                                    <i class="mdi mdi-delete-forever-outline mr-1"></i> Delete
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                    <div
                        v-else
                        class="col-md-12 mt-3 alert alert-info text-center"
                    >
                        <p>No record found</p>
                    </div>
                    <div class="col-md-12">
                        <!-- <laravelVuePagination :data="data" @pagination-change-page="fetchData" /> -->
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        <b-modal size="lg" style="background:white" title=" Property" id="create" hide-footer>
            <create :my_model="$bvModal" :authToken="auth_token"   @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="lg" style="background:white" title="View Main Property" id="view" hide-footer>
            <viewModal :my_model="$bvModal" :data="current"    />
        </b-modal>
        <b-modal size="lg" style="background:white" title="Chnage or remove Main Property Image" id="change_image" hide-footer>
            <ChangeImage :my_model="$bvModal" :authToken="auth_token" @submitted="fetchData()" :data="current" :main_name="main_name" />
        </b-modal>
        <b-modal size="lg" style="background:white" title="Edit  Property" id="edit" hide-footer>
            <edit :my_model="$bvModal" :authToken="auth_token"  :data="current"   @updated="fetchData()"  />
        </b-modal>
        <b-modal  style="background:white" title="Add  Property link" id="link" hide-footer>
            
            <form action="" @submit.prevent="updateLink">
                <VueElementLoading
                :active="loading1"
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
                            sm="12"
                            md="12"
                        >
                            <v-text-field
                            label="Link*"
                            v-model="current.property_link"
                            ></v-text-field>
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
        </b-modal>
        
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Change Request status to {{dynamic_status}}
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="toggle_status(status_id, dynamic_status);openConfirm=false"

                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openConfirm2"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Delete property
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm2 = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="deleteMainProperty(del_id);openConfirm2=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- V Dialog End -->
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import create from "./partials/Create.vue"

import ChangeImage from './partials/ChangeImage.vue';
import edit from './partials/Edit.vue';

import viewModal from './partials/View';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState,mapActions } from 'vuex';

export default {
    components:{Widget,VueElementLoading,laravelVuePagination, create, viewModal, ChangeImage, edit},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            data: [],
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,
            main_name:'',
            amount:'',
            loading1:false

        }
    },
    computed:{
        ...mapState('auth',['auth_token', 'auth_data']),

    },
    mounted() {
        this.fetchData();
        this.getAuthData();
    },
    methods: {
        ...mapActions('page', ['getAuthData']),
        
        fetchData(page=1) {
             this.loading = true
            axios
            .post(this.dynamic_route('/properties/admin/all'), {
            filters: this.filters,
            },{
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            })
            .then(res => {
                this.loading = false
                this.data = res.data.data
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
        pass_current_img(data,name) {
            this.current = data;
            this.main_name=name;
        },  
        pass_current(data) {
            this.amount = data.amount.toLocaleString()
            this.current = data
        },
        closeMe() {
            this.$bvModal.hide("link");
        },
        updateLink() {
            this.loading1 = true
            this.$api
                .post(this.dynamic_route('/properties/admin/property_link/' + this.current.id), {property_link:this.current.property_link })
                .then(res => {
                    this.loading1=false;

                    if(res.status == 200) {
                        this.closeMe()
                        this.properties = res.data.data
                    } 
                    
                    this.toast(res)

                })
        },
        toggle_status(id, status) {
        this.loading = true
        axios
            .put(this.dynamic_route(`/properties/admin/toggle-status/${id}`), { id, status }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
            this.fetchData()
            this.$toast.success('Status updated successfully!', {
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
            this.$toast.error('An error occurred please try again!', {
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
        deleteMainProperty(id) {
        this.loading = true
        axios
            .delete(this.dynamic_route(`/properties/admin/${id}`), {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
            this.fetchData()
            this.$toast.success('Deleted successfully!', {
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
            this.loading = false;
            if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
            }
            if (err.response.status == 500) {
                return this.$toast.error('Unable to delete property  it has been used in many places!', {
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
            })
            .finally(() => {
            this.loading = false
            })
        },
        
        
    },
}
</script>
<style>
   .modal-body {
       background: white !important;
   }
</style>