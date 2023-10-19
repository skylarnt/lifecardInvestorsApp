/* eslint-disable no-console */
/* eslint-disable no-console */
<template>
    <v-app class="p-4">
        <h2 class="page-title">Profile Page</h2>
        <b-row>
            <b-col cols="12" sm="12" md="4" :class="{ 'disabled': disableEdit }">
                <Widget title="" customHeader class="text-center" style="position: relative">
                    <!-- <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Your Profile</span></h5> -->
                    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" text="Loading.."
                        duration="0.6" />
                    <div class="preview"></div>
                    <div class="body pt-3 pb-3" >
                        <div>
                            <label class="avatar-upload">
                                <input type="file" @change="handleFileChange($event)" accept="image/*" style="display: none"  />
                                <img class="avatar"
                                    :src="imgurl"
                                    style="width: 100%;cursor: pointer;" alt="" />
                            </label>
                        </div>
                        <div class="profile_content">
                            <h4 class="">
                                {{ form.lname }} {{ form.fname }} {{ form.mname }}
                            </h4>
                            <span class="my-2 badge badge-pill badge-light-warning">{{ form.user_type }}</span> <br>
                            <small class="mb-3">{{ form.email }}</small>
                        </div>
                    </div>
                </Widget>
            </b-col>
            <b-col cols="12" sm="12" md="8">
                <Widget title="" customHeader>
                    <!-- <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Your Profile</span></h5> -->
                    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" text="Loading.."
                        duration="0.6" />
                    <p class="text-muted font-weight-light">Hi, {{ form.fname }}
                        <span class="text text-danger ml-md-5" v-if="disableEdit">Please Click on the edit info button to
                            enable edit 👉</span>
                        <button class="float-right btn btn-primary" type="submit" v-if="disableEdit"
                            @click="enableEdit">Edit info</button>
                        <button class="float-right btn btn-primary" type="submit" v-else @click="enableEdit">Disable
                            Fields</button>

                    </p>
                    <V-form class="mt-4" @submit.prevent="save">
                        <v-row>
                            <v-col cols="12" sm="12" md="4" class="mb-2">
                                <v-text-field label="First name*" v-model="form.fname" :disabled="disableEdit"
                                    :rules="nameRule" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" class="mb-2">
                                <v-text-field label="Last name*" v-model="form.lname" :rules="nameRule"
                                    :disabled="disableEdit" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" class="mb-2">
                                <v-text-field label="Middle name*" v-model="form.mname" :rules="nameRule"
                                    :disabled="disableEdit" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="12" md="4" class="mb-2">
                                <v-text-field label="Email*" v-model="form.email" :rules="nameRule" :disabled="disableEdit"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" class="mb-2">
                                <v-text-field label="Phone*" v-model="form.phone" :rules="nameRule" :disabled="disableEdit"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" class="mb-2">
                                <v-select v-model="form.gender" :items="['male', 'female']" label="Gender*"
                                    :rules="nameRule" :disabled="disableEdit"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" class="mt-4">
                                <v-select v-model="form.country" :items="countries" label="Country*" item-text="name"
                                    item-value="name" :rules="nameRule" :disabled="disableEdit" dense></v-select>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <button :disabled="disableEdit" class="btn btn-primary" type="submit">
                                Save
                            </button>
                        </v-card-actions>
                    </V-form>
                </Widget>
            </b-col>
        </b-row>
        <b-modal id="change-password" title="Change Password" size="md" hide-footer>
            <div class="alert alert-danger" v-if="errors.length">
                <ul>
                    <li v-for="(err, i) in errors" :key="i">{{ err.error }}</li>
                </ul>
            </div>
            <form @submit.prevent="changePassword">
                <VueElementLoading :active="changePassLoading" spinner="bar-fade-scale" color="var(--primary)"
                    text="Loading.." duration="0.6" />

                <div class="card-body">
                    <div class="card-body">
                        <div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Old Password</span>
                                </div>
                                <input type="password" class="form-control" v-model="form.oldpassword" required />
                            </div>
                            <br />
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">New Password</span>
                                </div>
                                <input type="password" class="form-control" v-model="form.password" required />
                            </div>
                            <br>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Confirm Password</span>
                                </div>
                                <input type="password" class="form-control" v-model="form.confirm" required />
                            </div>
                        </div>
                    </div>
                    <div class="d-block text-right card-footer">
                        <button type="button" class="mr-2 btn btn-link btn-sm" @click="closeMe">Cancel</button>
                        <button type="submit" class="btn btn-primary btn-sm">Change</button>
                    </div>
                </div>
            </form>
        </b-modal>
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import countries from './Countries.json';
export default {
    components: { VueElementLoading, Widget },
    data() {
        return {
            imgurl:"",
            loading: false,
            changePassLoading: false,
            disableEdit: true,
            form: {
                avatar:{}
            },
            authInfo: JSON.parse(localStorage.getItem('auth_info'))[0] || null,
            errors: {},
            countries: countries,
            nameRule: [
                v => !!v || 'Field is required',
            ],
        }
    },
    computed: {
        ...mapState('page', ['authData', 'authToken'])
    },
    mounted() {
        delete this.authData.created_at;
        delete this.authData.email_verified_at;
        delete this.authData.updated_at;
        this.getAuthUserData();
    },
    methods: {
        ...mapActions([]),
        handleFileChange(event) {
            const image = event.target.files[0];
            this.form.avatar = image;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.imgurl = e.target.result;
            };
        },
        changePassword() {
            this.changePassLoading = true
            axios
                .post(this.dynamic_auth_route('/change-password'),
                    this.form, {
                    headers: {
                        authorization: `Bearer ${this.authToken}`
                    }
                })
                .then(() => {
                    this.changePassLoading = false
                    this.closeMe();
                    return this.$toast.success('Operation Successful!', {
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
                .catch(err => {
                    // eslint-disable-next-line no-console
                    this.errors = err.response.data
                })
                .finally(() => {
                    this.changePassLoading = false
                })
        },
        closeMe() {
            this.$bvModal.hide('change-password')
        },
        enableEdit() {
            this.disableEdit = !this.disableEdit
        },
        getAuthUserData() {
            axios
                .post(this.dynamic_auth_route('/getUserData/all'), {
                    filters: this.authInfo.auth_user.id,
                }, {
                    headers: {
                        authorization: `Bearer ${this.authInfo.auth_token}`
                    }
                })
                .then(res => {
                    this.loading = false
                    this.form = res.data
                    this.imgurl = this.form.avatar ? this.form.avatar:'https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80'
                    this.loading = false
                })
                .catch(() => {
                    // eslint-disable-next-line no-console
                })
                .finally(() => {
                    this.loading = false
                })
        },

        save() {
            this.loading = true;
            const formData = new FormData();
            for (const key in this.form) {
                formData.append(key, this.form[key]);
            }
            axios.post(this.dynamic_auth_route('/complete-profile'), formData, {
                headers: {
                    authorization: `Bearer ${this.authInfo.auth_token}`,
                    'Content-Type': `multipart/form-data;`
                }
            })
                .then(res => {
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
                    });
                    this.loading = false;
                    this.disableEdit = true
                    this.$router.push({ name: 'ProfilePage' });
                }).catch(err => {
                    if (err.response.status == 401 && err.response.statusText == "Unauthorized") {
                        return this.logoutUser();
                    }
                    this.$toast.error(err.response.data.message, {
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
                    });
                    this.loading = false;
                }).finally(() => {
                    this.loading = false;
                })
        },

    },
}
</script>
<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.6; /* Adjust the opacity to visually indicate the disabled state */
}
.modal-body {
    background: white !important;
}

.preview {
    width: 100% !important;
    height: 100px !important;
    background: var(--primary);
    margin-bottom: 10px !important;
}

.avatar {
    width: 115px !important;
    height: 115px !important;
    background: lightgray !important;
    border-radius: 50% !important;
    position: absolute;
    top: 19%;
    left: 34%;
    border: 5px solid white;
}

.profile_content {
    margin-top: 60px !important;
}
</style>