// The specified store is used to keep the data on temporary bases that is used for the render only
// The data will be in key value pairs, see the example for implementation use the same keys like key & data

// this.$store.dispatch({
//     type: "collection/setData",
//     key: "users",
//     data: response.data.result
// });

export const state = () => ({ users: null })
export const mutations = {
    setData(state, data) {
        state[data.key] = data.data
    }
}
export const getters = {
    getDataByKey: (state) => (key) => {
        return state[key] || null;
    },
    getAllData: (state) => {
        return state;
    }
};
export const actions = {
    setData({ commit }, data) {
        commit("setData", data);
    }
};