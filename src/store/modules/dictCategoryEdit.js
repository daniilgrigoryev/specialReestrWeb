export default {
  state: {
    moduleName: 'dictCategoryEdit',
    cid: null,
    bean: 'DictCategoryEdit',
    routeName: 'DictCategoryEdit',
    data: null,
    command: null
  },
  mutations: {
    dictCategoryEditSetCid(state, cid) {
      state.cid = cid;
    },
    dictCategoryEditSetData(state, data) {
      state.data = data;
    },
    dictCategoryEditSetCommand(state, command) {
      state.command = command;
    }
  },
  actions: {
    dictCategoryEditSetCid: ({commit}, payload) => {
      commit('dictCategoryEditSetCid', payload);
    },
    dictCategoryEditSetData: ({commit}, payload) => {
      commit('dictCategoryEditSetData', payload.data);
    },
    dictCategoryEditSetCommand: ({commit}, payload) => {
      commit('dictCategoryEditSetCommand', payload.data);
    }
  },
  getters: {
    dictCategoryEditGetCommand: state => () => {
      return state.command
    },
    dictCategoryEditGetData: state => () => {
      return state.data
    }
  }
};
