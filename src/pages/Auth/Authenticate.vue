<template>
    <div>
      <div v-if="useLogin" class="widget-auth mx-auto"  customHeader>
        <p class="widget-auth-info">
            <!-- Use your email to sign in. -->
        </p>
        <v-form class="mt" @submit.prevent="login">
          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <v-text-field
            v-model="data.email"
            :rules="nameRules"
            label="Email"
            type="email"
            required
          ></v-text-field>
           <v-text-field
            v-model="data.password"
            :rules="nameRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Login</b-button>
          <router-link class="d-block text-left" to="/forgot-password">Forgot Password ?</router-link>
          
        </v-form>
        <p class=" widget-auth-info mt-5" @click="useLogin = false">
          Don't have an account? Sign up now!
        </p>
        <button class="btn text-info text-center btn-block" to="" @click="useLogin=false">Create an Account</button>
        <p class="float-right mt-2">

        </p>
      </div>
      <b-container v-else>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Register App
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <div class="widget-auth mx-auto" customHeader>
        <p class="widget-auth-info">
            <!-- Use your email to sign in. -->
        </p>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="register"

        >
        <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
        />
          <v-text-field
            v-model="form.fname"
            :rules="nameRules"
            :counter="255"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.lname"
            :counter="255"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :counter="255"
            :rules="nameRules"
            label="Email"
            type="email"
            required
          ></v-text-field>
           <v-text-field
            v-model="form.phone"
            :rules="phoneNumber"
            label="Phone"
            type="number"
            required
          ></v-text-field>
           <v-text-field
            v-model="form.password"
            :rules="nameRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
           <v-text-field
            v-model="form.password_confirmation"
            :rules="nameRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Create account</b-button>
        </v-form>
       
        <p class="widget-auth-info">
         Have an account ? Login  now!
        </p>
        <button class="btn-block text-info text-center" to="" @click="useLogin=true">Login</button>
      </div>
    </b-container>
    </div>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import axios from "axios";
export default {
    components:{
        Widget,VueElementLoading
    },
    data() {
        return {
            form:{},
            errorMessage:null,
            loading:false,
            useLogin:true,
            nameRules: [
                v => !!v || 'This field  is required',
            ],
            phoneNumber: [
                v => !!v || 'This field  is required',
            ],
            data:{},
        }
    },
    methods:{
        login() {
            if(Object.keys(this.data).length < 2) {
                return this.$toast.error('All fields are required!', {
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
                });
            } else {
                this.loading=true;
                axios.post(this.dynamic_auth_route('/login'), this.data)
                .then(res => {
                this.loading=false;
                this.$toast.success('Login successful!', {
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
                    });
                    if(res.data.access_token) {
                      var data = [{
                        auth_token : res.data.access_token,
                        auth_user : res.data.data
                      }];
                      localStorage.setItem('auth_info',JSON.stringify(data));
                      
                      localStorage.setItem("auth_token", res.data.access_token);
                      localStorage.setItem("auth_user", JSON.stringify(res.data.data));
                        this.$emit('authenticated');
                        this.closeMe()
                    }
                }).catch(err => {
                this.loading=false;
                if(err.response.status == 401)  {
                    return this.$toast.error('Invalid Credentials!', {
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
                this.$toast.error('An error occurred, please try again!', {
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
                }).finally(() =>{
                this.loading=false;
                })
            }
        },
        register() {
            if(Object.keys(this.form).length !=6) {
                return this.$toast.error('All fields are required!', {
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
                });
            }
            else if(this.form.password.length < 8) {
                return this.$toast.error('Password must be at least 8 characters!', {
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
                });
            } else if(this.form.password !== this.form.password_confirmation) {
                return this.$toast.error('Password do not match!', {
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
                });
            }
            this.loading=true;
            axios.post(this.dynamic_auth_route('/register'), this.form)
            .then(res => {
                this.loading=false;
                this.$toast.success('Registration successful!', {
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
                });
                if(res.data.access_token) {
                    localStorage.setItem("auth_token", res.data.access_token);
                    localStorage.setItem("auth_user", JSON.stringify(res.data.data));
                    this.$emit('authenticated');
                    this.closeMe()
                }
            }).catch(err => {
                this.loading=false;
                if(err.response.status == 401)  {
                this.$toast.error('Unauthorized!', {
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
                this.$toast.error('An error occurred, please try again!', {
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
            }).finally(() =>{
                this.loading=false;
            })
        },
        closeMe(){
            this.my_modal.hide('contiueProcess')
        }
    }
}
</script>