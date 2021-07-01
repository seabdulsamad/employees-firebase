export const state = () => ({
  icon: "mdi-home",

  pageHeaderItems: {
    title: "",
    actions: []
  }
});

export const mutations = {
  setIcon(state, icon) {
    state.icon = icon;
  },
  setActionItems(state, pageHeaderItems) {
    state.pageHeaderItems = pageHeaderItems;
  },
  setActionStatus(state, action) {
    let actn = state.pageHeaderItems.find(a => a.name == action.name);
    actn.active = action.active;
  }
};

export const getters = {
  getIcon(state) {
    return state.icon;
  },
  getActionItems(state) {
    return state.pageHeaderItems;
  },
  actionStatus: state => action => {

    if (
      state.pageHeaderItems &&
      state.pageHeaderItems.length > 0
    ) {
      let actn = state.pageHeaderItems.find(ac => ac.name == action);
      if (actn) return actn.active;
    }
  }
};

export const actions = {
  setIcon({ commit }, icon) {
    commit("setIcon", icon);
  },
  setActionItems({ commit }, pageHeaderItems) {
    commit("setActionItems", pageHeaderItems);
  },
  setActionStatus({ commit }, action) {
    commit("setActionStatus", action);
  }
};
