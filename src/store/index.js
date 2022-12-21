import Vue from 'vue';
import Vuex from 'vuex';


import layout from './layout';
import auth from './auth';
import page from './page';
import client from './client';
import analytics from './analytics';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    layout,
    auth,
    page,client,
    analytics
  },
});
