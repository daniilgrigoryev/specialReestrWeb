export default {
  state: {
    moduleName: 'registerCardAccounting',
    cid: null,
    bean: 'ExcludeReestrItemView',
    routeName: 'RegisterCardAccounting',
    data: null,
    command: null
  },
  mutations: {
    registerCardAccountingSetCid(state, cid) {
      state.cid = cid;
    },
    registerCardAccountingSetData(state, data) {
      state.data = data;
    },
    registerCardAccountingSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    registerCardAccountingSetCid: ({commit}, payload) => {
      commit('registerCardAccountingSetCid', payload);
    },
    registerCardAccountingSetData: ({commit}, payload) => {
      commit('registerCardAccountingSetData', payload.data);
    },
    registerCardAccountingSetCommand: ({commit}, payload) => {
      commit('registerCardAccountingSetCommand', payload.data);
    }
  },
  getters: {
    registerCardAccountingGetCommand: state => () => {
      return state.command
    },
    registerCardAccountingGetData: state => () => {
      return state.data
    }
  }
};
