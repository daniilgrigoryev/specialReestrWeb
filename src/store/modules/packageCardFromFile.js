export default {
  state: {
    moduleName: 'packageCardFromFile',
    cid: null,
    bean: 'LoadReestrHeadView',
    routeName: 'PackageCardFromFile',
    data: null,
    command: null
  },
  mutations: {
    packageCardFromFileSetCid(state, cid) {
      state.cid = cid;
    },
    packageCardFromFileSetData(state, data) {
      state.data = data;
    },
    packageCardFromFileSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    packageCardFromFileSetCid: ({commit}, payload) => {
      commit('packageCardFromFileSetCid', payload);
    },
    packageCardFromFileSetData: ({commit}, payload) => {
      commit('packageCardFromFileSetData', payload.data);
    },
    packageCardFromFileSetCommand: ({commit}, payload) => {
      commit('packageCardFromFileSetCommand', payload.data);
    }
  },
  getters: {
    packageCardFromFileGetCommand: state => () => {
      return state.command
    },
    packageCardFromFileGetData: state => () => {
      return state.data
    }
  }
};
