import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import $ from "jquery";
import moment from 'moment';
import * as funcUtils from "./assets/js/utils/funcUtils";
import './components/Shared/Filters.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/ru-RU';
moment.locale('ru');
import '@mapbox/assembly/dist/assembly.min.css';
import '@mapbox/assembly/dist/assembly.js';

Vue.use(iView, { locale });


let vue = new Vue({
  el: '#app',
  store,
  router,
  beforeCreate() {
    Date.prototype.toJSON = function() {
      return moment(this).format();
    };

    if (funcUtils.isNull(sessionStorage.getItem('wid'))) {
      sessionStorage.setItem('wid', funcUtils.guid());
      sessionStorage.setItem((sessionStorage.getItem('wid')), '[]');
      funcUtils.addToSessionStorage('path', [{routeName: 'Authorization', current: true}]);
    }
    funcUtils.addToLocalStorage('lastActive', new Date().getTime());
    if (funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
      this.$store.dispatch('sendSocketRequest', {
        body: {
          head: {
            sid: localStorage.getItem('sid'),
            wid: sessionStorage.getItem('wid'),
            cid: null,
            bean: null,
            method: 'addWID'
          },
          body: null
        },
        vm: this
      });
    }
  },
  mounted() {
    this.activateTimer();
    history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      history.go(1);
    };
  },
  data: {},
  methods: {
    logout() {
      this.$store.dispatch('prepareData', {
        beanName: null,
        method: 'logout',
        params: null,
        cid: null,
        withSpinner: false
      });
      funcUtils.clearAll();
      this.$router.push('/');
    },
    clearToStart() {
      this.$store.dispatch('removeAllComponents');
      sessionStorage.setItem((sessionStorage.getItem('wid')), '[]');
      funcUtils.addToSessionStorage('path', [{routeName: 'Authorization', current: true}]);
    },
    getRegisterReestr() {
      this.clearToStart();
      this.$store.dispatch('getNextPage', {
        'vm': this,
        'pageName': this.$store.state.registerReestr.routeName
      });
    },
    getPackageReestr() {
      this.clearToStart();
      this.$store.dispatch('getNextPage', {
        'vm': this,
        'pageName': this.$store.state.packageReestr.routeName
      });
    },
    getDictReestr() {
      this.clearToStart();
      this.$store.dispatch('getNextPage', {
        'vm': this,
        'pageName': this.$store.state.dictReestr.routeName
      });
    },
    activateTimer() {
      $("body").bind("mousemove keypress mousedown", (function (e) {
        localStorage.setItem('lastActive', JSON.stringify(new Date().getTime()));
      }))
    },
  },
  render: h => h(App)
});
