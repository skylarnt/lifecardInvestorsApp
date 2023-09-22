<template>
    <v-app class="p-4">
        <b-row>
            <b-col>
                <Widget title="" customHeader>
                    <h5 class="d-inline-block">My <span class='fw-semi-bold'>Property</span></h5>


                    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" text="Loading.."
                        duration="0.6" />
                    <div class="row">
                        <div class="p-3 col-md-6 mb-3">
                            <select name="" id="" class="form-control form-control-lg" v-model="filter.status"
                                @change="searchData">
                                <option value="">Filter By Status</option>
                                <option value="pending">pending</option>
                                <option value="sold">sold</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-3" v-if="property.data">
                        <v-simple-table>
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
                                            Type
                                        </th>
                                        <th class="text-left">
                                            Amount
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
                                    <tr v-for="(p, i) in property.data" :key="i">
                                        <td>{{ i + 1 }}</td>
                                        <td>
                                            {{ p.name }}
                                        </td>
                                        <td>
                                            {{ p.type }}
                                        </td>
                                        <td>
                                            {{ Number(p.amount_to_be_sold).toLocaleString() }}
                                        </td>
                                        <td>
                                            <span class="badge badge-pill" :class="p.property_status == 'pending'
                                                ? 'badge-light-warning'
                                                : 'badge-light-info'
                                                ">
                                                {{ p.property_status }}
                                            </span>
                                        </td>
                                        <td>
                                            <v-menu bottom origin="center center" transition="scale-transition"
                                                :close-on-content-click="closeOnContentClick" left>
                                                <template #activator="{ on, attrs }">
                                                    <v-btn color="black" icon v-bind="attrs" v-on="on">
                                                        <i class="fa fa-list-ul"></i>
                                                    </v-btn>
                                                </template>

                                                <v-list>
                                                    <v-list-item v-if="p.property_status == 'pending'">
                                                        <v-list-item-title style="cursor: pointer" @click="
                                                            openConfirm = true;
                                                        dynamic_status = 'sold';
                                                        setCurrent(p);
                                                        ">
                                                            <i class="mdi mdi-square-edit-outline mr-1"></i>
                                                            Sold
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item v-if="p.property_status == 'sold'">
                                                        <v-list-item-title style="cursor: pointer" @click="
                                                            openConfirm = true;
                                                        dynamic_status = 'pending';
                                                        setCurrent(p);
                                                        ">
                                                            <i class="mdi mdi-square-edit-outline mr-1"></i>
                                                            Pending
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
                    <div v-else class="col-md-12 mt-3 alert alert-info text-center">
                        <p>No record found</p>
                    </div>
                    <div class="col-md-12">
                        <Pagination :data="property" @pagination-change-page="fetchData" />
                    </div>
                </Widget>
            </b-col>
        </b-row>
        <!-- V Dialog -->
        <v-dialog v-model="openConfirm" max-width="390">
            <v-card>
                <v-card-title class="text-h5">
                    Change property status to {{ dynamic_status }}
                </v-card-title>

                <v-card-text>
                    Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color=" darken-1" text @click="openConfirm = false">
                        No, exit
                    </v-btn>

                    <v-btn color="primary darken-1" text @click="toggle_status(dynamic_status); openConfirm = false">
                        Yes, continue
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="openConfirm2" max-width="390">
            <v-card>
                <v-card-title class="text-h5">
                    Delete property
                </v-card-title>

                <v-card-text>
                    Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color=" darken-1" text @click="openConfirm2 = false">
                        No, exit
                    </v-btn>

                    <v-btn color="primary darken-1" text @click="deleteProperty(del_id); openConfirm2 = false">
                        Yes, continue
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <!-- V Dialog End -->
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import Convo from '@/pages/ManageRequests/partials/convo';

import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'
import { mapState, mapActions } from 'vuex';

export default {
    components: { Widget, VueElementLoading, laravelVuePagination, Pagination: laravelVuePagination },
    data() {
        return {
            status_id: 0,
            del_id: 0,
            dynamic_status: '',
            openConfirm: false,
            openConfirm2: false,
            dialog: false,
            current: {},
            property: {},
            filter: {
                status: "",
            },
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,
            current: {}
        }
    },
    computed: {
        ...mapState('page', ['authToken'])
    },
    mounted() {
        this.fetchData();
        this.getAuthData();
    },
    methods: {
        ...mapActions('page', ['getAuthData']),

        fetchData(page = 1) {
            this.loading = true
            this.$api
                .post(this.dynamic_route(`/properties/get-marketers-property?page=${page}`),{filter:this.filter})
                .then(res => {
                    if (res.status == 200) {
                        this.property = res.data.data
                    } else {
                        this.toast(res)
                    }
                })
                .finally(() => {
                    this.loading = false
                })
        },
        searchData() {
            this.fetchData();
        },
        setCurrent(property) {
            this.current = property
        },
        toggle_status(status) {
            this.loading = true
            this.$api.post(this.dynamic_route(`/properties/toggle-status/${this.current.property_id}/${this.current.marketer_id}`), { status: status })
                .then((res) => {
                    this.$toast.success(res.data.message, {
                        position: 'top-right',
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
                    this.fetchData()
                })
                .catch((err) => {
                    this.$toast.err(err.response.data.message, {
                        position: 'top-right',
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
                    this.loadng = false
                })
        }
    },
}
</script>
<style>
.modal-body {
    background: white !important;
}
</style>