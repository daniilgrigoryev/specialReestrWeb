export default {
  state: {
    moduleName: 'dictCategory',
    cid: null,
    bean: 'DictCategoryView',
    routeName: 'DictCategory',
    data: null,
    command: null
  },
  mutations: {
    dictCategorySetCid(state, cid) {
      state.cid = cid;
    },
    dictCategorySetData(state, data) {
      state.data = data;
    },
    dictCategorySetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictCategorySetCid: ({commit}, payload) => {
      commit('dictCategorySetCid', payload);
    },
    dictCategorySetData: ({commit}, payload) => {
      commit('dictCategorySetData', payload.data);
    },
    dictCategorySetCommand: ({commit}, payload) => {
      commit('dictCategorySetCommand', payload.data);
    }
  },
  getters: {
    dictCategoryGetCommand: state => () => {
      return state.command
    },
    dictCategoryGetData: state => () => {
      return state.data
    }
  }
};
