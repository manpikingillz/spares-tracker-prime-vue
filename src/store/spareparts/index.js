import axios from 'axios'

const FETCH_SPAREPARTS_URL = '/api/spareparts/'
const FETCH_SPAREPARTS_CATEGORIES_URL = '/api/spareparts/categories/'
const FETCH_SPAREPARTS_PURCHASES_URL = '/api/spareparts/sparepart_purchases/'

const state = {
    //Spareparts Categories
    sparepartsCategories: [],
    SPAREPARTS_CATEGORIES_LOADING: false,
    SPAREPARTS_CATEGORIES_SUCCESS: false,
    SPAREPARTS_CATEGORIES_ERROR: '',

    //Spareparts
    spareparts: [],
    SPAREPARTS_LOADING: false,
    SPAREPARTS_SUCCESS: false,
    SPAREPARTS_ERROR: '',

    //Spareparts Purchases
    sparepartsPurchases: [],
    SPAREPARTS_PURCHASES_LOADING: false,
    SPAREPARTS_PURCHASES_SUCCESS: false,
    SPAREPARTS_PURCHASES_ERROR: ''
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
        state.SPAREPARTS_CATEGORIES_SUCCESS = data;
    },
    SET_SPAREPARTS_CATEGORIES_ERROR(state, data) {
        state.SPAREPARTS_CATEGORIES_ERROR = data;
    },


     // Spareparts
     SET_SPAREPARTS(state, data) {
        state.spareparts = data;
    },
    SET_SPAREPARTS_LOADING(state, data) {
        state.SPAREPARTS_LOADING = data;
    },
    SET_SPAREPARTS_SUCCESS(state, data) {
        state.SPAREPARTS_SUCCESS = data
    },
    SET_SPAREPARTS_ERROR(state, data) {
        state.SPAREPARTS_ERROR = data
    },

    // Spareparts Purchases
    SET_SPAREPARTS_PURCHASES(state, data) {
        state.sparepartsPurchases = data;
    },
    SET_SPAREPARTS_PURCHASES_LOADING(state, data) {
        state.SPAREPARTS_PURCHASES_LOADING = data;
    },
    SET_SPAREPARTS_PURCHASES_SUCCESS(state, data) {
        state.SPAREPARTS_PURCHASES_SUCCESS = data
    },
    SET_SPAREPARTS_PURCHASES_ERROR(state, data) {
        state.SPAREPARTS_PURCHASES_ERROR = data
    }
}

const actions = {
    async fetchSparepartsCategories(context, filters) {
        context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', true)
        return await axios.get(FETCH_SPAREPARTS_CATEGORIES_URL, { params: filters}).then(response => {
            context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', false);
            context.commit('SET_SPAREPARTS_CATEGORIES', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPARTS_CATEGORIES_LOADING', false);
            context.commit('SET_SPAREPARTS_CATEGORIES_ERROR', error);
            console.error('Error Fetching Spareparts Categories: ', error);
        })
    },

    async fetchSpareparts(context, filters) {
        context.commit('SET_SPAREPARTS_LOADING', true)
        return await axios.get(FETCH_SPAREPARTS_URL, {params: filters}).then(response => {
            context.commit('SET_SPAREPARTS_LOADING', false);
            context.commit('SET_SPAREPARTS', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPARTS_LOADING', false);
            context.commit('SET_SPAREPARTS_ERROR', error);
            console.error('Error Fetching Spareparts: ', error);
        })
    },

    async fetchSparepartsPurchases(context, filters) {
        context.commit('SET_SPAREPARTS_PURCHASES_LOADING', true)
        return await axios.get(FETCH_SPAREPARTS_PURCHASES_URL, {params: filters}).then(response => {
            context.commit('SET_SPAREPARTS_PURCHASES_LOADING', false);
            context.commit('SET_SPAREPARTS_PURCHASES', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPARTS_PURCHASES_LOADING', false);
            context.commit('SET_SPAREPARTS_PURCHASES_ERROR', error);
            console.error('Error Fetching Spareparts Purchases: ', error);
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};