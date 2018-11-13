export default {
  state: {
    moduleName: 'reportReestr',
    cid: null,
    bean: '',
    routeName: 'ReportReestr',
    data: null,
    command: null
  },
  mutations: {
    reportReestrSetCid(state, cid) {
      state.cid = cid;
    },
    reportReestrSetData(state, data) {
      state.data = data;
    },
    reportReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    reportReestrSetCid: ({commit}, payload) => {
      commit('reportReestrSetCid', payload);
    },
    reportReestrSetData: ({commit}, payload) => {
      commit('reportReestrSetData', payload.data);
    },
    reportReestrSetCommand: ({commit}, payload) => {
      commit('reportReestrSetCommand', payload.data);
    }
  },
  getters: {
    reportReestrGetCommand: state => () => {
      return state.command
    },
    reportReestrGetData: state => () => {
      return state.data
    }
  }
};
