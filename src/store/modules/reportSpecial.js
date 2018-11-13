export default {
  state: {
    moduleName: 'reportSpecial',
    cid: null,
    bean: 'ReportSpecial',
    routeName: 'ReportSpecial',
    data: null,
    command: null
  },
  mutations: {
    reportSpecialSetCid(state, cid) {
      state.cid = cid;
    },
    reportSpecialSetData(state, data) {
      state.data = data;
    },
    reportSpecialSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    reportSpecialSetCid: ({commit}, payload) => {
      commit('reportSpecialSetCid', payload);
    },
    reportSpecialSetData: ({commit}, payload) => {
      commit('reportSpecialSetData', payload.data);
    },
    reportSpecialSetCommand: ({commit}, payload) => {
      commit('reportSpecialSetCommand', payload.data);
    }
  },
  getters: {
    reportSpecialGetCommand: state => () => {
      return state.command
    },
    reportSpecialGetData: state => () => {
      return state.data
    }
  }
};
