
export default {
    namespaced: true,
    state:{
        authData: {},
        authToken: localStorage.getItem("auth_token"),
    },
    getters:{
        auth_user: (state) => state.authData,
        auth_token: (state) => state.authToken,
    },
    mutations:{
        fetchData(state, authData) {
            state.authData = authData;
        },
        fetchToken(state, data) {
            state.authToken = data;
        }
    },
    actions:{
        getAuthData({ commit }) {
            const text = localStorage.getItem("auth_user");
            const token = localStorage.getItem("auth_token");
            const clientDetails = JSON.parse(text);
            commit("fetchData", clientDetails);
            commit("fetchToken", token);
        },
        
    }
}