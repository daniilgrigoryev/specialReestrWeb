export default {
  state: {
    moduleName: 'packageCard',
    cid: null,
    bean: 'LoadReestrItemsView',
    routeName: 'PackageCard',
    data: null,
    command: null
  },
  mutations: {
    packageCardSetCid(state, cid) {
      state.cid = cid;
    },
    packageCardSetData(state, data) {
      state.data = data;
    },
    packageCardSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    packageCardSetCid: ({commit}, payload) => {
      commit('packageCardSetCid', payload);
    },
    packageCardSetData: ({commit}, payload) => {
      commit('packageCardSetData', payload.data);
    },
    packageCardSetCommand: ({commit}, payload) => {
      commit('packageCardSetCommand', payload.data);
    }
  },
  getters: {
    packageCardGetCommand: state => () => {
      return state.command
    },
    packageCardGetData: state => () => {
      return state.data
    }
  }
};
