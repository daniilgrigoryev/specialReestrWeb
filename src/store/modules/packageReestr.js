export default {
  state: {
    moduleName: 'packageReestr',
    cid: null,
    bean: 'LoadReestrHeadView',
    routeName: 'PackageReestr',
    data: null,
    command: null
  },
  mutations: {
    packageReestrSetCid(state, cid) {
      state.cid = cid;
    },
    packageReestrSetData(state, data) {
      state.data = data;
    },
    packageReestrSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    packageReestrSetCid: ({commit}, payload) => {
      commit('packageReestrSetCid', payload);
    },
    packageReestrSetData: ({commit}, payload) => {
      commit('packageReestrSetData', payload.data);
    },
    packageReestrSetCommand: ({commit}, payload) => {
      commit('packageReestrSetCommand', payload.data);
    }
  },
  getters: {
    packageReestrGetCommand: state => () => {
      return state.command
    },
    packageReestrGetData: state => () => {
      return state.data
    }
  }
};
