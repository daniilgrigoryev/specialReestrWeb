export default {
  state: {
    moduleName: 'packageCardSpecial',
    cid: null,
    bean: 'SpecialReestrItemsView',
    routeName: 'PackageCardSpecial',
    data: null,
    command: null
  },
  mutations: {
    packageCardSpecialSetCid(state, cid) {
      state.cid = cid;
    },
    packageCardSpecialSetData(state, data) {
      state.data = data;
    },
    packageCardSpecialSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    packageCardSpecialSetCid: ({commit}, payload) => {
      commit('packageCardSpecialSetCid', payload);
    },
    packageCardSpecialSetData: ({commit}, payload) => {
      commit('packageCardSpecialSetData', payload.data);
    },
    packageCardSpecialSetCommand: ({commit}, payload) => {
      commit('packageCardSpecialSetCommand', payload.data);
    }
  },
  getters: {
    packageCardSpecialGetCommand: state => () => {
      return state.command
    },
    packageCardSpecialGetData: state => () => {
      return state.data
    }
  }
};
