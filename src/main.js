/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import authMixin from './mixins/auth';
import Widget from './components/Widget/Widget';
import vuetify from './plugins/vuetify'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification';
import VueSocialSharing from 'vue-social-sharing'
import Echo from 'laravel-echo';
import pusher_js from 'pusher-js';
import http from './axios-config.js'
import axios from 'axios';
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.prototype.$api = http;
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

window.Pusher = pusher_js;
let token = JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_token || null;
window.Echo = new Echo({
  
  // authEndpoint : 'http://co_invest_backend.test/broadcasting/auth',

  broadcaster: 'pusher',
  key: "02c4f2dddb6d7e201813",
  cluster: "eu",
  encrypted: true,
  authorizer: (channel, options) => {
    return {
        authorize: (socketId, callback) => {
            axios.post('http://co_invest_backend.test/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            }, {
              headers: {
                Accept: "application/json",
                authorization: `Bearer ${token}`
              }
            })
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                callback(true, error);
            });
        }
    };
},
  

});

  
Vue.use(require('vue-moment'));
Vue.use(BootstrapVue);
Vue.use(Toast)
Vue.use(VueSocialSharing);
Vue.use(VueTouch);
Vue.use(Trend); 
Vue.component('Widget', Widget);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.mixin(authMixin);
// Vue.use(Toasted, {duration: 10000});

Vue.config.productionTip = false;

//  navigation guards
var adminRoutes=[
  '/app/manage-properties/properties',
  '/app/manage-properties/property-types',
  '/app/manage-properties/main-properties',
  '/app/manage-sales/quick-sales',
  '/app/users',
  '/app/manage/groups',
  '/app/manage/broadcastmessage',
  '/app/sale-requests',
]
router.beforeEach((to, from, next) => {
  let isLoggedIn = JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0];

  console.log(to.fullPath)
  if (to.matched.some(record => record.meta.requiresAuth)) {

    //  Route requires AUth? Check if logged in. If not, redirect to login page
    if(!isLoggedIn || isLoggedIn==null) {
      next({
        name: 'Login'
      })
    } else {
      if(adminRoutes.some(el => el == to.fullPath)) {
        if(isLoggedIn.auth_user.enc != "ENC_*SHJ)AS_B876&!543SHS^$@hJ@#@j@#!@Hjhdsd") {
          localStorage.removeItem('auth_info');
          next({
            name: 'Login'
          })
        }
      } 
      next()
        
      
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    //  Route requires AUth? Check if logged in. If not, redirect to login page
    if(store.getters.loggedIn) {
      next({
        name: 'AnalyticsPage'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});
Vue.mixin({
  methods: {
    toast(response) {
      if (response.status == 200 || response.status == 201) {
        //  console.log(response)
        if (typeof response.data.message == "undefined") { return }
        if (response.data.message == "") { return }
        if (response.data.message) {
          this.toast_success(response.data.message)
        }
      } else {
        // console.log(response)
        let message = "Something went wrong"
        if (typeof response.data.message !== "undefined") {
          message = response.data.message
        }
        this.toast_error(message)
      }
    },
    toast_success(message) {
      this.$toast.success(message, {
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
      
    },

    toast_error(message) {
      this.$toast.error(message, {
        position: 'top-center',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
    });
    },
    toast_warning(message) {
      this.$toast.warning(message)
    },
    toast_info(message) {
      this.$toast.info(message)
    },
   

  },
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
});
