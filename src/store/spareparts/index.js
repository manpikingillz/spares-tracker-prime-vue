import axios from 'axios'

const FETCH_SPAREPARTS_CATEGORIES_URL = '/api/spareparts/categories/'

const state = {
    //Spareparts Categories
    sparepartsCategories: [],
    SPAREPARTS_CATEGORIES_LOADING: false,
    SPAREPARTS_CATEGORIES_SUCCESS: false,
    SPAREPARTS_CATEGORIES_ERROR: ''
}


const mutations= {
    // Spareparts Categories
    SET_SPAREPARTS_CATEGORIES(state, data) {
        state.sparepartsCategories = data;
    },
    SET_SPAREPARTS_CATEGORIES_LOADING(state, data) {
        state.SPAREPARTS_CATEGORIES_LOADING = data;
    },
    SET_SPAREPARTS_CATEGORIES_SUCCESS(state, data) {
        state.SPAREPARTS_CATEGORIES_SUCCESS = data
    },
    SET_SPAREPARTS_CATEGORIES_ERROR(state, data) {
        state.SPAREPARTS_CATEGORIES_ERROR = data
    }

}

const actions = {
    async fetchSparepartsCategories(context) {
        context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', true)
        return await axios.get(FETCH_SPAREPARTS_CATEGORIES_URL).then(response => {
            context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', false);
            context.commit('SET_SPAREPARTS_CATEGORIES', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', false);
            context.commit('SET_SPAREPARTS_CATEGORIES_ERROR', error);
            console.error('Error Fetching Spareparts Categories: ', error);
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};