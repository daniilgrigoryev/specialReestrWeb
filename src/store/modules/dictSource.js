export default {
  state: {
    moduleName: 'dictSource',
    cid: null,
    bean: 'DictSourceView',
    routeName: 'DictSource',
    data: null,
    command: null
  },
  mutations: {
    dictSourceSetCid(state, cid) {
      state.cid = cid;
    },
    dictSourceSetData(state, data) {
      state.data = data;
    },
    dictSourceSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictSourceSetCid: ({commit}, payload) => {
      commit('dictSourceSetCid', payload);
    },
    dictSourceSetData: ({commit}, payload) => {
      commit('dictSourceSetData', payload.data);
    },
    dictSourceSetCommand: ({commit}, payload) => {
      commit('dictSourceSetCommand', payload.data);
    }
  },
  getters: {
    dictSourceGetCommand: state => () => {
      return state.command
    },
    dictSourceGetData: state => () => {
      return state.data
    }
  }
};
