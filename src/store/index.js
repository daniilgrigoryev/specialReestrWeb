import Vue from 'vue';
import Vuex from 'vuex';
import {Spinner} from "spin.js";
import * as funcUtils from "./../assets/js/utils/funcUtils";
import * as ConstantUtils from "~/assets/js/utils/constantUtils";
import registerReestr from './modules/registerReestr';
import packageReestr from './modules/packageReestr';
import packageCardFromFile from './modules/packageCardFromFile';
import registerCardAccounting from './modules/registerCardAccounting';
import packageCard from './modules/packageCard';
import packageCardSpecial from './modules/packageCardSpecial';
import packageCardNew from './modules/packageCardNew';
import dictArea from './modules/dictArea';
import dictCategory from './modules/dictCategory';
import dictReason from './modules/dictReason';
import dictSource from './modules/dictSource';
import dictReestr from './modules/dictReestr';
import dictCategoryEdit from './modules/dictCategoryEdit';
import dictSourceEdit from './modules/dictSourceEdit';
import dictReasonEdit from './modules/dictReasonEdit';
import reportReestr from './modules/reportReestr';
import reportCategory from './modules/reportCategory';
import reportSpecial from './modules/reportSpecial';
import reportZone from './modules/reportZone';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    modulesNames: ['registerReestr', 'registerCardAccounting', 'packageReestr', 'packageCardFromFile', 'packageCard', 'packageCardNew', 'dictArea', 'packageCardSpecial',
      'dictCategory', 'dictReason', 'dictSource', 'dictReestr', 'dictCategoryEdit', 'dictReasonEdit', 'dictSourceEdit', 'reportReestr', 'reportCategory', 'reportSpecial', 'reportZone'],
    socketInstance: null
  },
  mutations: {
    setSocket(state, socketInstance) {
      state.socketInstance = socketInstance;
    }
  },
  actions: {
    sendSocketRequest({commit, dispatch}, payload) {
      let body = payload.body;
      let vm = payload.vm;
      if (funcUtils.isEmpty(this.state.socketInstance)) {
        commit('setSocket', new WebSocket(ConstantUtils.WS_URL));
        // When a connection is made
        this.state.socketInstance.onopen = () => {
          console.log('Opened connection');
        };

        // When data is received
        this.state.socketInstance.onmessage = (event) => {
          console.log('Message in websocket');
          dispatch('fillModule', {'vm': vm, 'event': event});
        };

        // A connection could not be made
        this.state.socketInstance.onerror = (event) => {
          console.log('Error in websocket');
          console.log(event);
        };

        // A connection was closed
        this.state.socketInstance.onclose = (code, reason) => {
          console.log(code, reason);
          console.log('Websocket closed');
          commit('setSocket', null);
          if (funcUtils.getfromLocalStorage('auth')) {
            commit('setSocket', new WebSocket(ConstantUtils.WS_URL));
          }
        };
        // Close the connection when the window is closed
        window.addEventListener('beforeunload', () => {
          this.state.socketInstance.close();
          commit('setSocket', null);
        });
      }
      let wsSend = (data) => {
        if (!this.state.socketInstance.readyState) {
          setTimeout(() => {
            wsSend(data);
          }, 100);
        } else {
          this.state.socketInstance.send(data);
        }
      };
      wsSend(JSON.stringify(body));
    },
    async prepareData({commit, dispatch}, payload) {
      let withSpinner = true;
      if (funcUtils.isNotEmpty(payload.withSpinner)) {
        withSpinner = payload.withSpinner;
      }
      let wid = sessionStorage.getItem('wid');
      let methodName = payload.method;
      if (funcUtils.isUndefined(methodName)) {
        methodName = 'restore';
      }
      let paramsData = payload.params;
      if (funcUtils.isEmpty(paramsData)) {
        paramsData = null;
      }
      let cid = payload.cid;
      if (funcUtils.isUndefined(cid)) {
        let componentsRoute = funcUtils.getFromSessionStorage(wid);
        let currentComponent = await dispatch('getCurrentComponent', {
          componentArr: componentsRoute
        });
        cid = currentComponent.cid;
      }
      let beanName = payload.beanName;
      if (funcUtils.isUndefined(beanName)) {
        beanName = '';
      }

      return dispatch('sendHttpRequest', {
        body: {
          head: {
            sid: localStorage.getItem('sid'),
            wid: wid,
            cid: cid,
            bean: beanName,
            method: methodName
          },
          body: paramsData
        },
        withSpinner: withSpinner
      });
    },
    sendHttpRequest({commit, dispatch}, payload) {
      let body = payload.body;
      let withSpinner = payload.withSpinner;
      let spinner;
      if (withSpinner) {
        let opts = {
          lines: 13, // The number of lines to draw
          length: 38, // The length of each line
          width: 17, // The line thickness
          radius: 45, // The radius of the inner circle
          scale: 0.85, // Scales overall size of the spinner
          corners: 1, // Corner roundness (0..1)
          color: '#ffffff', // CSS color or array of colors
          fadeColor: 'transparent', // CSS color or array of colors
          speed: 0.7, // Rounds per second
          rotate: 0, // The rotation offset
          animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
          direction: 1, // 1: clockwise, -1: counterclockwise
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          className: 'spinner', // The CSS class to assign to the spinner
          top: '50%', // Top position relative to parent
          left: '50%', // Left position relative to parent
          shadow: '0 0 1px transparent', // Box-shadow for the lines
          position: 'absolute' // Element positioning
        };
        let target = document.getElementById('indicator');
        if (funcUtils.isNotEmpty(target)) {
          for (let i = 0; i < target.childNodes.length; i++) {
            target.childNodes[i].remove();
          }
          target.style.display = 'block';
          spinner = new Spinner(opts).spin(target);
        }
      }
      let xhr = new XMLHttpRequest();
      xhr.timeout = 180000;
      xhr.open('POST', ConstantUtils.HTTP_URL, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body));

      function hideSpinner() {
        let target = document.getElementById('indicator');
        if (withSpinner && funcUtils.isNotEmpty(target)) {
          for (let i = 0; i < target.childNodes.length; i++) {
            target.childNodes[i].remove();
          }
          target.style.display = 'none';
          if (withSpinner && funcUtils.isNotEmpty(spinner)) {
            spinner.stop();
          }
        }
      }

      return new Promise((resolve, reject) => {
        xhr.onload = () => {
          // перевод Promise в состояние fulfilled.
          hideSpinner();
          resolve({
            status: 200,
            response: xhr.responseText
          });
        };

        xhr.onerror = (e) => {
          // перевод Promise в состояние rejected
          reject(new Error("Network Error"));
          hideSpinner();
        };

        xhr.ontimeout = (e) => {
          // перевод Promise в состояние rejected
          reject(new Error("TimeOut Error"));
          hideSpinner();
        };
      });
    },
    fillModule({commit, dispatch}, payload) {
      let event = payload.event;
      let data = event.data || event.response;
      if (data.length > 0) {
        let dataJson = JSON.parse(data);
        if (dataJson.method === 'logout' && funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
          let vm = payload.vm.$root;
          vm.logout();
          return;
        } else if (dataJson.method === 'ping') {
          let vm = payload.vm.$root;
          let secondsInactive = (new Date().getTime() - funcUtils.getfromLocalStorage('lastActive')) / 1000 / 60;
          if (secondsInactive > 15) {
            vm.logout();
          }
          return;
        }
        let respData = dataJson.data;
        let respError = dataJson.error;
        if (!funcUtils.isNull(respData)) {
          let props = this.state;
          for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
              let propObj = props[prop];
              if (propObj && !funcUtils.isNull(propObj) && (propObj.hasOwnProperty('cid') || propObj.hasOwnProperty('bean'))) {
                let moduleObj = props[prop];
                if ((!funcUtils.isNull(dataJson.cid) && (moduleObj.cid === dataJson.cid)) || (!funcUtils.isNull(dataJson.bean) && (moduleObj.bean === dataJson.bean))) { //
                  let actionName = moduleObj['moduleName'];
                  let command = respData.command;
                  let res;
                  if (funcUtils.isNotEmpty(command)) {
                    res = dataJson;
                    actionName += 'SetCommand';
                  } else {
                    res = respData;
                    actionName += 'SetData';
                  }
                  dispatch(actionName, {'data': res});
                }
              }
            }
          }
        } else if (!funcUtils.isNull(respError)) {
          alert(respError.errorMsg);
        }
      }
    },
    getCurrentComponent({commit, dispatch}, payload) {
      let currentComponent = null;
      let componentArr = payload.componentArr;
      if (funcUtils.isNull(componentArr) || componentArr.length === 0) {
        return currentComponent;
      }
      for (let i = 0; i < componentArr.length; i++) {
        let component = componentArr[i];
        if (component.current) {
          currentComponent = component;
          return currentComponent;
        }
      }
    },
    async getNextComponent({commit, dispatch}, payload) {
      let beanName = payload.beanName;
      let wid = sessionStorage.getItem('wid');
      let componentsRoute = funcUtils.getFromSessionStorage(wid);
      let currentComponent = await dispatch('getCurrentComponent', {
        componentArr: componentsRoute
      });
      if (componentsRoute.length > 0) {
        currentComponent.current = false;
        funcUtils.addToSessionStorage(wid, componentsRoute);
        currentComponent = null;
      }
      if (funcUtils.isEmpty(currentComponent)) {
        let eventResponse = await dispatch('prepareData', {
          beanName: beanName,
          method: null,
          params: null,
          cid: null
        });
        if (eventResponse.status === 200) {
          let data = eventResponse.response;
          if (data.length > 0) {
            let dataJson = JSON.parse(data);
            let respData = dataJson.data;
            let respError = dataJson.error;
            if (!funcUtils.isNull(respData)) {
              if (dataJson.method === 'addCID') {
                currentComponent = {
                  'count': componentsRoute.length,
                  'cid': respData.cid,
                  'current': true
                };
                componentsRoute.push(currentComponent);
                funcUtils.addToSessionStorage(wid, componentsRoute);
              }
            } else {
              if (!funcUtils.isNull(respError)) {
                alert(respError.errorMsg);
              }
            }
          }
        }
      }
    },
    async getPrevComponent({commit, dispatch}, payload) {
      let currentComponent;
      let wid = sessionStorage.getItem('wid');
      let componentsRoute = funcUtils.getFromSessionStorage(wid);
      if (componentsRoute.length > 0) {
        currentComponent = await dispatch('getCurrentComponent', {
          componentArr: componentsRoute
        });
        let eventResponse = await dispatch('prepareData', {
          beanName: null,
          method: 'removeCID',
          params: null,
          cid: currentComponent.cid
        });
        if (eventResponse.status === 200) {
          let data = eventResponse.response;
          if (data.length > 0) {
            let dataJson = JSON.parse(data);
            let respError = dataJson.error;
            if (dataJson.method === 'removeCID') {
              componentsRoute.splice(currentComponent.count, 1);
              if (componentsRoute.length > 0) {
                currentComponent = componentsRoute[currentComponent.count - 1];
                currentComponent.current = true;
              }
              funcUtils.addToSessionStorage(wid, componentsRoute);
            }
            if (!funcUtils.isNull(respError)) {
              alert(respError.errorMsg);
            }
          }
        }

      }
    },
    removeComponent({commit, dispatch}, payload) {
      dispatch('prepareData', {
        beanName: null,
        method: 'removeCID',
        params: null,
        cid: payload.cid
      });
    },
    removeAllComponents({commit, dispatch}, payload) {
      let wid = sessionStorage.getItem('wid');
      let componentsRoute = funcUtils.getFromSessionStorage(wid);
      if (!componentsRoute) return;
      for (let i = 0; i < componentsRoute.length; i++) {
        dispatch('removeComponent', componentsRoute[i].cid);
      }
    },
    getCurrentPage({commit, dispatch}, payload) {
      let currentPage = null;
      let path = payload;
      if (funcUtils.isNull(path) || path.length === 0) {
        return currentPage;
      }
      for (let i = 0; i < path.length; i++) {
        let page = path[i];
        if (page.current) {
          currentPage = page;
          return currentPage;
        }
      }
    },
    async getNextPage({commit, dispatch}, payload) {
      let pageName = payload.pageName;
      let vm = payload.vm;
      let params = payload.params;
      let path = funcUtils.getFromSessionStorage('path');
      let currPage = await dispatch('getCurrentPage', path);
      currPage.current = false;
      path.push({
        'routeName': pageName,
        'current': true,
        'params': params
      });
      funcUtils.addToSessionStorage('path', path);
      vm.$router.push({name: pageName, params});
    },
    async getPrevPage({commit, dispatch}, payload) {
      let pageName = payload.pageName;
      let vm = payload.vm;
      let params = payload.params;
      let path = funcUtils.getFromSessionStorage('path');
      path.splice(path.length - 1, 1);
      path[path.length - 1].current = true;
      funcUtils.addToSessionStorage('path', path);
      vm.$router.push({name: pageName, params});
    }
  },
  getters: {},
  modules: {
    registerReestr,
    registerCardAccounting,
    packageReestr,
    packageCardFromFile,
    packageCard,
    packageCardSpecial,
    packageCardNew,
    dictArea,
    dictCategory,
    dictReason,
    dictSource,
    dictReestr,
    dictCategoryEdit,
    dictReasonEdit,
    dictSourceEdit,
    reportReestr,
    reportCategory,
    reportSpecial,
    reportZone
  }
});

export default store;
