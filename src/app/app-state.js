
import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';

import news from './news/news-state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    news
  }
});