import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Auth/Login';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';
import Profile from '@/pages/Auth/Profile';
import Register from '@/pages/Auth/Register';
import RegisterMarketer from '@/pages/Auth/RegisterMarketer';


// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import ReceiptPage from '@/pages/Dashboard/Receipt';
import manageRequest from '@/pages/ManageRequests/Index';
import ApprovedRequests from '@/pages/ApprovedRequests/Index';
import CompletedRequest from '@/pages/CompletedRequest/Index';
import SellProperty from '@/pages/SellProperty/Index';
import MyProperty from '@/pages/MyProperty/Index';
import Properties from '@/pages/Properties/Index';
import Users from '@/pages/ManageUsers/Index';



Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/marketer/register',
      name: 'RegisterMarketer',
      component: RegisterMarketer,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/reset/:token',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
         
        },
        {
          path: 'receipt/:id',
          name: 'ReceiptPage',
          component: ReceiptPage,
         
        },
        {
          path: 'profile',
          name: 'ProfilePage',
          component: Profile,
         
        },
        {
          path: 'manage-requests',
          name: 'ManageRequests',
          component: manageRequest,
          meta: {
            adminOnly:false
          }
        },
        // {
        //   path: 'manage-all-request',
        //   name: 'ManageAllRequest',
        //   component: manageAllRequest,
        //   meta: {
        //     adminOnly:false
        //   }
        // },
        {
          path: 'approved-requests',
          name: 'ApprovedRequests',
          component: ApprovedRequests,
          meta: {
            adminOnly:false
          }
        },
        {
          path: 'completed-requests',
          name: 'CompletedRequests',
          component: CompletedRequest,
          meta: {
            adminOnly:false
          }
        },
        {
          path: 'sell-property',
          name: 'SellProperty',
          component: SellProperty,
          meta: {
            adminOnly:false
          }
        },
        {
          path: 'my-property',
          name: 'MyProperty',
          component: MyProperty,
          meta: {
            adminOnly:false
          }
        },
        {
          path: 'manage-users',
          name: 'ManageUsers',
          component: Users,
          meta: {
            adminOnly:false
          }
        },
        {
          path: 'properties',
          name: 'Properties',
          component: Properties,
          meta: {
            adminOnly:false
          }
        },
        
        // { path: "/:pathMatch(.*)*", component: AnalyticsPage }
      ],
    },
  ],
});
