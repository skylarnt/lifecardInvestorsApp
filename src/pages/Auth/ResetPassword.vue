<template>
  <v-app>
    <div class="auth-page">
      <div class="login-wrapper">
        <div class="card password-forget mx-auto">
          <div class="row">
            <div class="col-md-12">
              <div class="mx-auto py-5 px-md-8 login-form">
                <div class="text-center mt-10 mb-7">
                  <img src="/img/lifecardbg.png" alt="" width="120"> 
                </div>
                <div v-if="sent==false">
                  <div v-if="errorStatus" class="alert alert-danger shadow-sm">
                  <p>
                      Invalid token passed, Your email could not be determined. Click the reset button from your gmail and try again
                  </p>
                  </div>
                  <h5 style="font-weight:300">
                    Create a new  password.
                  </h5>
                  <v-form class="mt" @submit.prevent="Reset">
                    <VueElementLoading
                      :active="loading"
                      spinner="bar-fade-scale"
                      color="var(--primary)"
                      text="Loading.."
                      duration="0.6"
                    />
                    <div>
                      <v-text-field
                      v-model="form.password"
                      :rules="password"
                      label="New Password"
                      type="password"
                      required
                    ></v-text-field>
                    </div>
                      <div>
                      <v-text-field
                      v-model="form.password_confirmation"
                      :rules="password"
                      label="Confirm Password"
                      type="password"
                      required
                    ></v-text-field>
                    </div>
                    <b-button :disabled="errorStatus==true" type="submit" block class="auth-btn mt-3 btn-lg custom-btn">Reset</b-button>
                    
                  </v-form>
                  <p class="widget-auth-info text-center py-2">
                    <router-link  to="/login">Back to Login</router-link>
                  </p>

                </div>
                <div v-else>
                  <h5>Password was successfully reset. You can now login with your new password</h5>
                   <p class="widget-auth-info text-center py-2">
                    <a href="/login">Back to Login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <footer class="auth-footer">
        2019 &copy; Sing App Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com/">Flatlogic</a>
      </footer> -->
    </div>
  </v-app>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
  name: 'ResetPage',
  components: { Widget,VueElementLoading },
  data() {
    return {
      valid: false,
      errorMessage: null,
      form:{},
      errorStatus:false,
      password: [
        v => !!v || 'Password field is required'
      ],
      loading: false,
      message:'',
      sent:false,
    };
  },
  methods: {
    Reset() {
      if(Object.keys(this.form).length < 3) {
        this.$toast.error('All fields are required!', {
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
        return;
      }
      else if(this.form.password.length < 8){
        return this.$toast.error('Password should be at least 8 characters!', {
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
      if(this.form.password !== this.form.password_confirmation) {
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
      } else {
        this.loading=true;
        this.form.token=this.$route.params.token
        axios.post(this.dynamic_route('/reset-password'), this.form)
        .then(res => {
          this.sent=true;
          this.message=res.data.message;
          this.loading=false;
          this.$toast.success(res.data.message, {
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
            // this.$router.push('/login');
        }).catch(err => {
          this.loading=false;
          if(err.response.status == 404)  {
            return this.$toast.error(err.response.data.message, {
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
          } else if(err.response.status == 422) {
             this.$toast.error(err.response.data.error, {
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
        }).finally(() =>{
          this.loading=false;
        })
      }
    },
  },
  created() {
   axios.post(this.dynamic_route('/email-using-token'), {token: this.$route.params.token})
   .then(res => {
     if(res.data != 0)
     this.form.email = res.data;
     else {this.$toast.error("Invalid token passed, Your email could not be determined. Click the reset button from your gmail and try again", {
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
      this.errorStatus=true;
     }
   }).catch(err => {
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
  },
};
</script>
<style scoped>
.card {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 40%);

}
.password-forget {
  width: 40%;
}
.auth-page {
  background-image: url('/img/vuesax-login-bg.jpg');
  padding-top: 10vh !important;
}
.login-wrapper {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 100px;
  padding-right: 100px;
}
.custom-btn {
  color: #ffffff;
  background-image: linear-gradient(135deg, #243a9c 0%, #1F2667 100%) !important;
}
.widget-auth-info {
  color: #000000 !important;
  /* font-weight: 500; */
  margin-top: 20px;
  border-top: 1px solid rgb(213, 216, 222);
}
@media screen and (max-width: 798px) {
  .login-wrapper {
    width: 100%;
    padding-left: 12px;
    padding-top: 50px;
    padding-right: 12px;
  }
  .login-form {
    padding: 10px;
  }
  .password-forget {
    width: 100%;
  }
}
</style>
