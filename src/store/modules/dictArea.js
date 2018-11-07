export default {
  state: {
    moduleName: 'dictArea',
    cid: null,
    bean: 'DictAreaView',
    routeName: 'DictArea',
    data: null,
    command: null
  },
  mutations: {
    dictAreaSetCid(state, cid) {
      state.cid = cid;
    },
    dictAreaSetData(state, data) {
      state.data = data;
    },
    dictAreaSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictAreaSetCid: ({commit}, payload) => {
      commit('dictAreaSetCid', payload);
    },
    dictAreaSetData: ({commit}, payload) => {
      commit('dictAreaSetData', payload.data);
    },
    dictAreaSetCommand: ({commit}, payload) => {
      commit('dictAreaSetCommand', payload.data);
    }
  },
  getters: {
    dictAreaGetCommand: state => () => {
      return state.command
    },
    dictAreaGetData: state => () => {
      return state.data
    }
  }
};
