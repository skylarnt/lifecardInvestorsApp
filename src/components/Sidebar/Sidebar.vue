<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <!-- <img src="/img/lifecardbg.png" alt="lifecard coinvest logo" width="100"> -->

        <!-- <router-link to="/app/dashboard"><span class="primary-word"><img src="/img/cardLogo.png" style="height:25px;" alt=""></span> <span class="secondary-word"> COInvest</span></router-link> -->
      </header>

      <!-- <a class="generator-link navTitle" target="_blank" href="https://flatlogic.com/generator">Main modules</a> -->

      <!-- <h5 class="navTitle first">
        APP
      </h5> -->
      <ul class="nav">
      
        <NavLink
            :activeItem="activeItem"
            header="Dashboard"
            link="/app/dashboard"
            iconName="flaticon-homew"
            index="dashboard"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Properties"
            link="/app/properties"
            iconName="flaticon-property1"
            index="properties"
            isHeader
        />
         <!-- <NavLink
            :activeItem="activeItem"
            header="Manage Request"
            link="/app/manage-all-request"
            iconName="flaticon-account-box"
            index="ManageAllRequest"
            isHeader
        /> -->
        
         <NavLink
            :activeItem="activeItem"
            header="Requests  "
            link="/app/manage-requests"
            iconName="flaticon-property1"
            index="manage-requests"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Approved Requests  "
            link="/app/approved-requests"
            iconName="flaticon-property1"
            index="approved-requests"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Manage users  "
            link="/app/manage-users"
            iconName="sflaticon-users"
            v-if="auth_data &&auth_data.user_type =='admin'"

            index="manage-users"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Completed Request  "
            link="/app/completed-requests"
            iconName="flaticon-property1"
            v-if="auth_data &&auth_data.user_type !='admin'"
            index="completed-requests"
            isHeader
        />
        
         <!-- <NavLink
          v-if="authType.name == 'user'"
          :activeItem="activeItem"
          header="My Profile"
          link="/app/profile"
          iconName="flaticon-user"
          index="marketHistories"
          isHeader
        /> -->
        <!-- <NavLink
          v-if="authType.name == 'user'"
          :activeItem="activeItem"
          header="My Investment"
          link="/app/my-investments"
          iconName="flaticon-network"
          index="my"
          :childrenLinks="[
            { header: 'Investment', link: '/app/my-investments/index' },
            { header: 'Market Place', link: '/app/market-place/index' },
          ]"
        /> -->
      </ul>
      <!-- <h5 class="navTitle">
      </h5>
      <ul class="sidebarLabels">
        <li>
          <a href="#">
            <i class="fa fa-circle text-danger"/>
            <span class="labelName">Core</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-primary"/>
            <span class="labelName">UI Elements</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-success"/>
            <span class="labelName">Forms</span>
          </a>
        </li>
      </ul>
      <h5 class="navTitle">
        PROJECTS
      </h5>
      <div class="sidebarAlerts">
        <b-alert
            v-for="alert in alerts"
            :key="alert.id"
            class="sidebarAlert" variant="transparent"
            show dismissible
        >
          <span>{{alert.title}}</span><br/>
          <b-progress class="sidebarProgress progress-xs mt-1"
                      :variant="alert.color" :value="alert.value" :max="100"/>
          <small>{{alert.footer}}</small>
        </b-alert>
      </div> -->
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';
import axios from "axios";
export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      authType:'',
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
     
    
  },
  created() {
    this.setActiveByRoute();
  },
  mounted() {
    this.getAuthData();
  },
  computed: {
    ...mapState('auth', ['auth_data']),
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
<style scoped>
.sidebarStatic .logo{
  width: fit-content;
}.logo{
  text-align: left !important;
}
</style>
