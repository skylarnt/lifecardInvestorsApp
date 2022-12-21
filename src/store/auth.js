import axios from "axios"
export default {
    namespaced: true,
    state:{
        isLoggedIn: JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_token || null,
        auth_token: null,
        auth_data: null,
        userInfo:null,
    },
    mutations:{
        setAuthData: (state, data) => {
            state.auth_token=data.token
            state.auth_data=data.data
        },
        setUserInfo: (state, data) => {
            state.userInfo=data
        }
    },
    actions:{
        getAuthData({commit}) {

            // const token  = localStorage.getItem('auth_token') || null;
            // const data  = JSON.parse(localStorage.getItem('auth_user') || null);
            const token = JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_token || null;
            const data = JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_user || null;
            commit('setAuthData', {token,data})
        },
        getUserInfoFromBackEnd({commit}) {
            let url=process.env.VUE_APP_BASE_URL + '/auth/me'
            let token= JSON.parse(localStorage.getItem('auth_info')) && JSON.parse(localStorage.getItem('auth_info'))[0].auth_token;
            // console.log(token)
            axios.get(url, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                commit('setUserInfo', res.data)
            })
            
        }
       
    }
}