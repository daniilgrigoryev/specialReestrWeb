export default {
  state: {
    moduleName: 'dictReasonEdit',
    cid: null,
    bean: 'DictReasonEdit',
    routeName: 'DictReasonEdit',
    data: null,
    command: null
  },
  mutations: {
    dictReasonEditSetCid(state, cid) {
      state.cid = cid;
    },
    dictReasonEditSetData(state, data) {
      state.data = data;
    },
    dictReasonEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictReasonEditSetCid: ({commit}, payload) => {
      commit('dictReasonEditSetCid', payload);
    },
    dictReasonEditSetData: ({commit}, payload) => {
      commit('dictReasonEditSetData', payload.data);
    },
    dictReasonEditSetCommand: ({commit}, payload) => {
      commit('dictReasonEditSetCommand', payload.data);
    }
  },
  getters: {
    dictReasonEditGetCommand: state => () => {
      return state.command
    },
    dictReasonEditGetData: state => () => {
      return state.data
    }
  }
};
