export default {
  state: {
    moduleName: 'reportCategory',
    cid: null,
    bean: 'ReportCategory',
    routeName: 'ReportCategory',
    data: null,
    command: null
  },
  mutations: {
    reportCategorySetCid(state, cid) {
      state.cid = cid;
    },
    reportCategorySetData(state, data) {
      state.data = data;
    },
    reportCategorySetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    reportCategorySetCid: ({commit}, payload) => {
      commit('reportCategorySetCid', payload);
    },
    reportCategorySetData: ({commit}, payload) => {
      commit('reportCategorySetData', payload.data);
    },
    reportCategorySetCommand: ({commit}, payload) => {
      commit('reportCategorySetCommand', payload.data);
    }
  },
  getters: {
    reportCategoryGetCommand: state => () => {
      return state.command
    },
    reportCategoryGetData: state => () => {
      return state.data
    }
  }
};
