export default {
  state: {
    moduleName: 'dictReestr',
    cid: null,
    bean: '',
    routeName: 'DictReestr',
    data: null,
    command: null
  },
  mutations: {
    dictReestrSetCid(state, cid) {
      state.cid = cid;
    },
    dictReestrSetData(state, data) {
      state.data = data;
    },
    dictReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictReestrSetCid: ({commit}, payload) => {
      commit('dictReestrSetCid', payload);
    },
    dictReestrSetData: ({commit}, payload) => {
      commit('dictReestrSetData', payload.data);
    },
    dictReestrSetCommand: ({commit}, payload) => {
      commit('dictReestrSetCommand', payload.data);
    }
  },
  getters: {
    dictReestrGetCommand: state => () => {
      return state.command
    },
    dictReestrGetData: state => () => {
      return state.data
    }
  }
};
