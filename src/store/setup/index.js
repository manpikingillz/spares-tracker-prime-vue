import axios from 'axios'

const FETCH_COUNTRIES_URL = '/api/setup/countries/'

const state = {
    countries: [],
    LOADING: false,
    ERROR: ''
}

const getters = {
    getCountries: state => {
        return state.countries.map(country => {
                return {'name': country.country_name, 'code': country.id}
        })
    }
}

const mutations= {
    SET_COUNTRIES(state, data) {
        state.countries = data;
    },

    SET_LOADING(state, data) {
        state.LOADING = data;
    },

    SET_ERROR(state, data) {
        state.ERROR = data;
    }
}

const actions = {

    async fetchCountries(context) {
        context.commit('SET_LOADING', true)
        return await axios.get(FETCH_COUNTRIES_URL).then(response => {
            context.commit('SET_LOADING', false);
            context.commit('SET_COUNTRIES', response.data)
        }).catch(error => {
            context.commit('SET_LOADING', false);
            context.commit('SET_ERROR', error);
            console.error('Error Fetching Countries: ', error);
        })
    }
}


export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
};