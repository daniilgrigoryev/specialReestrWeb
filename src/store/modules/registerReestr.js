export default {
  state: {
    moduleName: 'registerReestr',
    cid: null,
    bean: 'ExcludeReestrView',
    routeName: 'RegisterReestr',
    data: null,
    command: null
  },
  mutations: {
    registerReestrSetCid(state, cid) {
      state.cid = cid;
    },
    registerReestrSetData(state, data) {
      state.data = data;
    },
    registerReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    registerReestrSetCid: ({commit}, payload) => {
      commit('registerReestrSetCid', payload);
    },
    registerReestrSetData: ({commit}, payload) => {
      commit('registerReestrSetData', payload.data);
    },
    registerReestrSetCommand: ({commit}, payload) => {
      commit('registerReestrSetCommand', payload.data);
    }
  },
  getters: {
    registerReestrGetCommand: state => () => {
      return state.command
    },
    registerReestrGetData: state => () => {
      return state.data
    }
  }
};
