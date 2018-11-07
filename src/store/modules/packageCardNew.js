export default {
  state: {
    moduleName: 'packageCardNew',
    cid: null,
    bean: 'ReestrMaker',
    routeName: 'PackageCardNew',
    data: null,
    command: null
  },
  mutations: {
    packageCardNewSetCid(state, cid) {
      state.cid = cid;
    },
    packageCardNewSetData(state, data) {
      state.data = data;
    },
    packageCardNewSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    packageCardNewSetCid: ({commit}, payload) => {
      commit('packageCardNewSetCid', payload);
    },
    packageCardNewSetData: ({commit}, payload) => {
      commit('packageCardNewSetData', payload.data);
    },
    packageCardNewSetCommand: ({commit}, payload) => {
      commit('packageCardNewSetCommand', payload.data);
    }
  },
  getters: {
    packageCardNewGetCommand: state => () => {
      return state.command
    },
    packageCardNewGetData: state => () => {
      return state.data
    }
  }
};
