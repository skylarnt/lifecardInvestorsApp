export default {
    data: () => {
        return {
        }
    },
  methods: {
    dynamic_route(endUrl) { 
      if(window.location.origin.startsWith('https')) {
        return process.env.VUE_APP_BASE_URL+endUrl

      } else {

        return process.env.VUE_APP_BASE_URL2+endUrl
      }
      },
      dynamic_auth_route(endUrl) {
        if(window.location.origin.startsWith('https')) {
          return process.env.VUE_APP_BASE_AUTH_URL+endUrl
  
        } else {
  
          return process.env.VUE_APP_BASE_AUTH_URL2+endUrl
        }
      },
      logoutUser() {
        this.$toast.error('Login expired, please login again!', {
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
        localStorage.removeItem('auth_info');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        return this.$router.push({name: 'Login'});
      }
  }
};
