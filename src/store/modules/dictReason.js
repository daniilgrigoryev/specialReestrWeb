export default {
  state: {
    moduleName: 'dictReason',
    cid: null,
    bean: 'DictReasonView',
    routeName: 'DictReason',
    data: null,
    command: null
  },
  mutations: {
    dictReasonSetCid(state, cid) {
      state.cid = cid;
    },
    dictReasonSetData(state, data) {
      state.data = data;
    },
    dictReasonSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictReasonSetCid: ({commit}, payload) => {
      commit('dictReasonSetCid', payload);
    },
    dictReasonSetData: ({commit}, payload) => {
      commit('dictReasonSetData', payload.data);
    },
    dictReasonSetCommand: ({commit}, payload) => {
      commit('dictReasonSetCommand', payload.data);
    }
  },
  getters: {
    dictReasonGetCommand: state => () => {
      return state.command
    },
    dictReasonGetData: state => () => {
      return state.data
    }
  }
};
