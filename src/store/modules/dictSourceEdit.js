export default {
  state: {
    moduleName: 'dictSourceEdit',
    cid: null,
    bean: 'DictSourceEdit',
    routeName: 'DictSourceEdit',
    data: null,
    command: null
  },
  mutations: {
    dictSourceEditSetCid(state, cid) {
      state.cid = cid;
    },
    dictSourceEditSetData(state, data) {
      state.data = data;
    },
    dictSourceEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictSourceEditSetCid: ({commit}, payload) => {
      commit('dictSourceEditSetCid', payload);
    },
    dictSourceEditSetData: ({commit}, payload) => {
      commit('dictSourceEditSetData', payload.data);
    },
    dictSourceEditSetCommand: ({commit}, payload) => {
      commit('dictSourceEditSetCommand', payload.data);
    }
  },
  getters: {
    dictSourceEditGetCommand: state => () => {
      return state.command
    },
    dictSourceEditGetData: state => () => {
      return state.data
    }
  }
};
