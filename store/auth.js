export const state = () => ({
  token: localStorage.getItem("access_token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  userEmail: null,
  userId: null
});

export const getters = {
  loggedIn(state) {
    return state.token !== null;
  },

  user(state) {
    return state.user;
  },

  audienceId(state) {
    return state.audienceId;
  },

  clientId(state) {
    return state.clientId;
  },

  userEmail(state) {
    return state.userEmail;
  },

  userId(state) {
    return state.userId;
  }
};

export const mutations = {
  retrieveToken(state, token) {
    state.token = token;
  },

  destroyToken(state) {
    state.token = null;
    state.user = null;
    state.audience = null;
  },

  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  destroyToken({ commit }) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    commit("destroyToken");
  },
  retrieveToken({ state, commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      fireAuth
        .signInWithEmailAndPassword(
          credentials.username,
          credentials.password
        )
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("access_token", response.user.uid);
          commit('retrieveToken', response.user.uid);
          resolve(response);
        })
        .catch(error => {
          this.loading = false;
          window.getApp.snackbar.config = {
            show: true,
            text: error.message || this.$pluginsData.messages.default_error
          };
          reject(error);
        });
    });
  },

  getUserDetails({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`accounts/user/${userId}`)
        .then(response => {
          commit("setUser", response.data.result);
          if (response.data.result)
            localStorage.setItem("user", JSON.stringify(response.data.result));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

