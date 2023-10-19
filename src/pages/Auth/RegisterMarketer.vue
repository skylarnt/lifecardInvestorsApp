<!-- eslint-disable no-console -->
<template>
  <v-app>
    <div class="auth-page">

      <div class="login-wrapper">
        <div class="col-md-10 mx-auto">
          <div class="card">
            <div class="card-body  register-form">
              <div class="text-center mt-10 mb-7">
                <img src="/img/lifecardbg.png" alt="" width="120">
              </div>
              <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="login" enctype="multipart/form-data">
                <div class="alert alert-warning" role="alert">
                  <b>Please Read and Accept the Terms and Conditions Before Creating an Account</b>
                </div>
                <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" text="Loading.."
                  duration="0.6" />
                <div class="row">
                  <div class="col-3">
                    <div class="mt-5">
                      <label class="avatar-upload upload mt-5">
                        <input type="file" @change="uploadImage($event)" accept="image/*" style="display: none" />
                        <img :src="previewImage" class="img-fluid" />
                      </label>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="row">
                      <div class="col-6">
                        <v-text-field v-model="form.fname" :rules="fnameRules" :counter="255" label="First name"
                          required></v-text-field>
                      </div>
                      <div class="col 6">
                        <v-text-field v-model="form.lname" :counter="255" :rules="lnameRules" label="Last name"
                          required></v-text-field>
                      </div>
                      <div class="col-6">
                        <v-text-field v-model="form.email" :counter="255" :rules="emailRules" label="Email" type="email"
                          required></v-text-field>
                      </div>
                      <div class="col-6">
                        <v-text-field v-model="form.phone" :counter="255" :rules="phoneRules" label="Phone Number"
                          type="number" required></v-text-field>
                      </div>

                      <div class="col-6">
                        <v-text-field v-model="form.password" :rules="passwordRules" label="Password" type="password"
                          v-if="!showPassword" required>
                          <v-icon slot="append" style="cursor: pointer" @click="togglePassword">
                            mdi-eye-outline
                          </v-icon>
                        </v-text-field>
                        <v-text-field v-model="form.password" :rules="passwordRules" label="Password" type="text" required
                          v-if="showPassword">
                          <v-icon slot="append" style="cursor: pointer" @click="togglePassword">
                            mdi-eye-off-outline
                          </v-icon>
                        </v-text-field>
                      </div>
                      <div class="col-6">
                        <v-text-field v-model="form.password_confirmation" :rules="passwordRules" label="Confirm Password"
                          type="password" v-if="!showPassword2" required>
                          <v-icon slot="append" style="cursor: pointer" @click="togglePassword2">
                            mdi-eye-outline
                          </v-icon>
                        </v-text-field>
                        <v-text-field v-model="form.password_confirmation" :rules="cPasswordRules"
                          label="Confirm Password" type="text" required v-if="showPassword2">
                          <v-icon slot="append" style="cursor: pointer" @click="togglePassword2">
                            mdi-eye-off-outline
                          </v-icon>
                        </v-text-field>
                      </div>
                      <div class="col-12">
                        <v-autocomplete v-model="form.country" :items="countries" label="Country*"
                          :rules="countryRule"></v-autocomplete>
                      </div>
                    </div>
                  </div>
                </div>
                <label>
                  <input type="checkbox" v-model="checkboxChecked" /> Do you agree to the <a href="#"
                    @click="term()">terms and conditions</a>
                </label>
                <b-button block :disabled="!valid || !checkboxChecked || !checkboxChecked1" type="submit"
                  class="auth-btn mt-2 btn-lg custom-btn">Create
                  Account</b-button>
              </v-form>
              <p class="widget-auth-info text-center py-2">
                Already have an account? <router-link to="/login">Sign in</router-link>
              </p>
              <!-- <p class="widget-auth-info text-center py-2">
                <router-link  to="/">Visit Site</router-link>
              </p> -->
              <!-- <p class="float-right mt-2">

              </p> -->
            </div>


          </div>
        </div>

      </div>
      <!-- <footer class="auth-footer">
        2019 &copy; Sing App Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com/">Flatlogic</a>
      </footer> -->
    </div>
    <v-dialog v-model="modalConfirm" persistent max-width="1000">
      <v-card>
        <v-card-title class="text-h5">
          Terms & Conditions
        </v-card-title>

        <v-card-text>
          <h4>Realtor Recommendations</h4>
          <h5 class="py-5">The Company may recommend certain Realtors to clients for the sole purpose of assisting
            in the sale of properties acquired by the client from the Company. It is understood that any
            engagement between a client and a Realtor is at the sole discretion of the client.</h5>
          <h4>No Liability of the Company</h4>
          <h5 class="py-5">
            Lifecard is not a party to any transaction or agreement between a client and a Realtor. Lifecard
            shall have no liability or responsibility for any actions, omissions, representations, warranties,
            or any other aspect of the relationship or transaction between a client and a Realtor.
            The Realtors agree that the Lufecard shall not be held liable for any disputes, losses, damages,
            costs, expenses, or claims arising from the engagement with a client, including but not limited to
            errors, omissions, negligence, misrepresentations, or any other acts or omissions by the client.
          </h5>
          <h4>Restriction on Marketing Non-Company Properties</h4>
          <h5 class="py-5">
            The Realtors shall not market, sell, or assist in the sale of properties on behalf of a client that
            were not purchased from Lifecard. Any such engagement or transaction is not endorsed by the
            Lifecard, and Lifecard shall not be liable for any aspect of these non-Lifecard property
            transactions. The Realtors shall not engage in these transactions on behalf of clients.
          </h5>
          <h5 class="py-5">
            By accepting to be recommended to Lifecard's clients, the Realtor acknowledges and agrees to the
            above terms and disclaims Lifecard's liability in any transaction with the client.</h5>
          <label>
            <input type="checkbox" v-model="checkboxChecked1" /> I have read and understood
          </label>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color=" darken-1" :disabled="!checkboxChecked1" text @click="modalConfirm = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import newData from "@/countries.js"
export default {
  name: 'LoginPage',
  components: { Widget, VueElementLoading },
  data() {
    return {
      valid: false,
      errorMessage: null,
      checkboxChecked: false,
      checkboxChecked1: false,
      modalConfirm: false,
      form: {
        avatar: {}
      },
      image: {},
      lnameRules: [
        v => !!v || 'Last name is required',
      ],
      fnameRules: [
        v => !!v || 'First name is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password should be at least 8 characters',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => !isNaN(parseFloat(v)) && v >= 0 && v <= 9999999999999 || 'Password should be numbers',
      ],
      countries: [],
      countryRule: [
        v => !!v || 'Country  is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      cPasswordRules: {
        // v => form.password != form.password_confirmation || 'E-mail is required'
      },
      loading: false,
      showPassword: false,
      showPassword2: false,
      previewImage: 'https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4718142.jpg'
    };
  },
  methods: {
    term() {
      this.modalConfirm = true
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.image = image;
      this.form.avatar = image;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
    },
    login() {
      // return console.log(this.form);
      if (this.form.password.length < 8) {
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
      } else if (this.form.password !== this.form.password_confirmation) {
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
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      // const boundary = '----WebKitFormBoundary' + new Date().getTime();

      const config = {
        headers: {
          'Content-Type': `multipart/form-data; `
        }
      };
      this.loading = true;
      axios.post(this.dynamic_auth_route('/register/marketer'), formData, config)
        .then(res => {
          this.loading = false;
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
          if (res.data.access_token) {
            var data = [{
              auth_token: res.data.access_token,
              auth_user: res.data.data
            }];
            localStorage.setItem('auth_info', JSON.stringify(data));
            localStorage.setItem("auth_token", res.data.access_token);
            localStorage.setItem("auth_user", JSON.stringify(res.data.data));
            location.href = '/app/dashboard';

          }
        }).catch(err => {
          this.loading = false;
          if (err.response.status == 401) {
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
          else if (err.response.status == 405) {
            return this.$toast.error(err.response.data.email[0], {
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
        }).finally(() => {
          this.loading = false;
        })
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    togglePassword2() {
      this.showPassword2 = !this.showPassword2;
    },
  },
  mounted() {
    this.countries = newData
  },
  created() {
    if (window.localStorage.getItem('auth_token') != null) {
      this.$router.push({ name: 'AnalyticsPage' });
    }
  },
};
</script>
<style scoped>
.upload {
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 2px dashed #000;
  border-radius: 10px;
}

.cloudupload {
  font-size: 20rem;
  /* text-align: center; */
}

.cloudupload::before {
  display: block;
}

.fileupload::file-selector-button {
  background: transparent;
  border: 1px solid black;
  width: auto;
  height: 44px;
  cursor: pointer;
}

.card {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 40%);

}

.auth-page {
  background-image: url('/img/vuesax-login-bg.jpg');
  padding-top: 5vh !important;
}

.login-wrapper {
  width: 95%;
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

.set {
  width: 100px;
  height: 400px;
}

.set img {
  min-height: 576px;
  object-fit: cover;
  max-width: 73%;
  max-height: 529px;
  width: 100%;
}

@media screen and (max-width: 798px) {
  .login-wrapper {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
  }

  .register-form {
    padding: 10px;
  }
}
</style>
