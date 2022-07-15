import axios from 'axios'


const LOGIN_URL = '/api/auth/jwt/login/'
const CURRENT_USER_URL = '/api/auth/me/'

const state = {
    toke: '',
    isAuthenticated: true,
    user: ''
}

const getters = {

}

const mutations = {

    setToken: (state, token) => {
        if(token) {
            state.token = token
            // state.refreshToken = token
            // axios.defaults.headers.common['Authorization'] = token;
            // axios.defaults.headers.common['X-Refresh-Token'] = token;
            // localStorage.setItem('refresh_token', token);
            localStorage.setItem('auth_token', token);
        }
    },

    setUser(state, user) {
        state.state = user
    }

    // clearToken: (state) => {
    //     state.token = null
    //     delete axios.defaults.headers.common['Authorization'];
    //     delete axios.defaults.headers.common['X-Refresh-Token'];
    //     localstorage.removeItem('auth_token');
    //     localStorage.removeItem('refresh_token');
    // }
}

const actions = {
    performLogin(context, data) {
        console.log('called method')
        let formData = new FormData()
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        })

        return new Promise((resolve, reject) => {
            axios.post(LOGIN_URL, formData).then(response => {
                if(response.data && response.data.token) {
                    context.commit('setToken', response.data.token)

                    axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;

                    context.dispatch('getCurrentUser');
                } else {
                    console.log('login response: ', response);
                }
                resolve(response);
            }).catch(error => {
                console.error('Error ocurred on Logig: ', error);
                reject(error);
            })
        })
    },

    async getCurrentUser(context) {
        return await axios.get(CURRENT_USER_URL).then(response => {
            console.log('current user: ', response);
        }).catch(error => {
            console.log('token: ', context.state.token)
            console.log('get user error: ', error);
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};