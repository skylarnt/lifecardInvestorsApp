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
                  <p>
                      Provide your email for password reset link.
                  </p>
                  <v-form class="mt" @submit.prevent="Reset">
                    <VueElementLoading
                      :active="loading"
                      spinner="bar-fade-scale"
                      color="var(--primary)"
                      text="Loading.."
                      duration="0.6"
                    />
                    <v-text-field
                      v-model="form.email"
                      :rules="emailRules"
                      label="Email"
                      type="email"
                      required
                    ></v-text-field>
                    <b-button type="submit" block class="auth-btn mt-3 btn-lg custom-btn">Reset</b-button>
                    
                  </v-form>
                  <p class="widget-auth-info text-center py-2">
                    <router-link  to="/login">Back to Login</router-link>
                  </p>

                </div>
                <div v-else>
                  <h5>Password reset request was successful. Please check email to continue.</h5>
                   <p class="widget-auth-info text-center py-2">
                    <router-link  to="/login">Back to Login</router-link>
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
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      loading: false,
      message:'',
      sent:false,
    };
  },
  methods: {
    Reset() {
     
      if(Object.keys(this.form).length < 1) {
        return this.$toast.error('Email field is required!', {
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
        axios.post(this.dynamic_route('/reset-password-request'), this.form)
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
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/main/analytics');
    }
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
