<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
     
    </b-nav>
    <b-nav v-if="Object.keys(notifyProperty).length && (auth_data && auth_data.user_type!='admin')">
      <b-nav-item>
        <div @click="navigate()" class=" text-danger p-1 mt-2 px-3">
        <p>New property has been created click to view   <span class="spinner-grow spinner-grow-sm"></span>
</p> 
      </div>
        
      </b-nav-item>
     
    </b-nav>

   
    
    
    <!-- <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-danger" />
      &nbsp;
      sing
      &nbsp;
      <i class="fa fa-circle text-primary" />
    </a> -->
    <b-nav class="ml-auto">

      <b-nav-item-dropdown
      style="    cursor: default !important;"
        class="notificationsMenu d-sm-down-none mr-2"
        menu-class="notificationsWrapper py-0 animate__animated animate__animated-fast animate__fadeIn"
        right>
        <template slot="button-content" style="    cursor: default !important;">

          <span v-if="Object.keys(loggedInAs).length">Currently logged in as</span>
          <strong class="text-info">
            <span  v-if="auth_data" class="px-2">{{ auth_data.fname + ' ' +  auth_data.lname}}</span>

          </strong>
          <!-- <span class="ml-1 mr-2 circle text-white fw-bold avatar-badge">9</span> -->
        </template>
        <!-- <Notifications @replied="fetchNotification" :notificationsData="notificationsData" /> -->
      </b-nav-item-dropdown>
      <b-nav-item-dropdown id="v-step-2" class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class='fi flaticon-settings-10 px-2' />
        </template>
        <b-dropdown-item @click="navigate2"><i class='fi flaticon-person px-3 mr-2' />My Account</b-dropdown-item>
        <!-- <b-dropdown-item><i class='fi flaticon-person px-3 mr-2' />Password</b-dropdown-item> -->
        <!-- <b-dropdown-item><i class='fi flaticon-email px-3 mr-3' />
          Inbox &nbsp;&nbsp;<b-badge variant="inverse" pill class="animate__animated animate__bounceIn" style="padding: 6px 9px;">9</b-badge>
        </b-dropdown-item> -->
        <b-dropdown-divider />
        <!-- <b-dropdown-item @click="navigate"><i class='fi flaticon-person px-3 mr-2' />My Account</b-dropdown-item>
        <b-dropdown-divider /> -->
        <!-- <b-dropdown-item><i class='fi flaticon-person px-3 mr-2' />Password</b-dropdown-item> -->
        
        <!-- <b-dropdown-divider /> -->
        <b-dropdown-item-button v-if="loggedInAs==false" @click="logout">
          <i class="fi flaticon-power-1 px-3 mr-3" /> Log Out
        </b-dropdown-item-button>
        <b-dropdown-item-button v-if="Object.keys(loggedInAs).length" @click="returnToMyAccount">
          <i class="fi flaticon-power-1 px-3 mr-1" /> Back to admin
        </b-dropdown-item-button>
      </b-nav-item-dropdown>

    </b-nav>
  </b-navbar>
  
  
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';
import axios from "axios"

export default {
  name: 'Header',
  components: { Notifications },
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
    
    ...mapState('auth', ['auth_data', 'auth_token']),
    
  },
  data(){
    return {
       notificationsData:[],
       loggedInAs : false,
       loading : false,
       openConfirm:true,
      notifyProperty:{},

    }
  },
  
  mounted() {

    // console.log(this.userInfo)
    // setTimeout(() => {
    // }, 2000);
    this.getAuthData()
    this.fetch()
     const user = JSON.parse(localStorage.getItem('auth_info'))  || null;
     if(user.length > 1){
       this.loggedInAs = user[0].auth_user
     }
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    
    ...mapActions('auth', ['getUserInfoFromBackEnd', 'getAuthData']),
    navigate2() {
      this.$router.push({name: 'ProfilePage'});
    },
     fetchNotification(){
      axios.post(this.dynamic_route('/client/my-investments/quick-sale-notification'), {id: this.auth_data.id},{
        headers:{
          authorization: `Bearer ${this.auth_token}`
        }
      }).then(res => {
        this.notificationsData = res.data;
      }).catch(err => {
        if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
          return this.logoutUser();
        }
      })
    },
    fetch() {
        this.$api
        .post(this.dynamic_route('/properties/notify_new_property'))
        .then(res => {
            this.loading=false;

            if(res.status == 200) {
                this.notifyProperty=res.data.data
            } else {
                this.toast(res)
            }
        })
        
    },
    navigate() {
      this.$router.push('/app/properties');
    },
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('auth_user');
      window.localStorage.removeItem('auth_info');
      this.$router.push('/');
    },
    
    returnToMyAccount(){
        const auth_user = JSON.parse(localStorage.getItem('auth_info'))
        auth_user.shift();
        localStorage.setItem('auth_info',JSON.stringify(auth_user));
        this.$toast.success('Operation successful!', {
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
        });
        location.href='/app/dashboard'
    }
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
<style >
  .notify {
    background: orange;
    width: 13px;
    height: 13px;
    position: absolute;
    z-index: 20;
    top: 15%;
    left: 22%;
    border-radius: 50%;
  }
  @media (max-width: 767.98px){
    .d-sm-down-none {
      display: inline-flex !important;
    }

    .notificationsMenu{
        right: 80% !important;
    }
  }
#__BVID__36__BV_toggle_ {
  cursor: default !important;
}
 
</style>