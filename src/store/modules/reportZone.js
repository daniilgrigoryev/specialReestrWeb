export default {
  state: {
    moduleName: 'reportZone',
    cid: null,
    bean: 'ReportZone',
    routeName: 'ReportZone',
    data: null,
    command: null
  },
  mutations: {
    reportZoneSetCid(state, cid) {
      state.cid = cid;
    },
    reportZoneSetData(state, data) {
      state.data = data;
    },
    reportZoneSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    reportZoneSetCid: ({commit}, payload) => {
      commit('reportZoneSetCid', payload);
    },
    reportZoneSetData: ({commit}, payload) => {
      commit('reportZoneSetData', payload.data);
    },
    reportZoneSetCommand: ({commit}, payload) => {
      commit('reportZoneSetCommand', payload.data);
    }
  },
  getters: {
    reportZoneGetCommand: state => () => {
      return state.command
    },
    reportZoneGetData: state => () => {
      return state.data
    }
  }
};
