import axios from 'axios'
import router from '../../router'


const LOGIN_URL = '/api/auth/jwt/login/'
const LOGOUT_URL = '/api/auth/jwt/logout'
const CURRENT_USER_URL = '/api/auth/me/'

const state = {
    token: localStorage.getItem('auth_token') || '',
    user: ''
}

const getters = {
    getUser: state => state.user,
    isAuthenticated: state => !!state.token,
    hasPermission: state => permission =>  {
        return state.user.permissions.includes(permission)
    }
}

const mutations = {

    setToken: (state, token) => {
        if(token) {
            localStorage.setItem('auth_token', token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            state.token = token;
        }
    },

    clearToken: (state) => {
        state.token = null;
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('auth_token');
    },

    setUser(state, user) {
        state.user = user;
    },

    clearUser(state) {
        state.user = null;
    }
}

const actions = {
    performLogin(context, data) {
        let formData = new FormData()
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        })

        return new Promise((resolve, reject) => {
            axios.post(LOGIN_URL, formData).then(response => {
                if(response.data && response.data.token) {
                    context.commit('setToken', response.data.token)
                    context.dispatch('getCurrentUser');
                }
                resolve(response);
            }).catch(error => {
                console.error('Error ocurred on Login: ', error);
                // if the login fails, remove any possible token and user
                context.commit('clearToken')
                context.commit('clearUser')
                reject(error);
            })
        })
    },

    async performLogout(context) {
        try {
            await axios.post(LOGOUT_URL)
        } catch (error) {
            console.error('Error Loging out: ', error);
        }

        context.commit('clearToken')
        context.commit('clearUser')

        router.replace({name: 'Login'})
    },

    async getCurrentUser(context) {
        return await axios.get(CURRENT_USER_URL).then(response => {
            context.commit('setUser', response.data)
        }).catch(error => {
            console.error('Error getting user: ', error);
            context.dispatch('performLogout')
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