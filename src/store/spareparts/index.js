import axios from 'axios'

const FETCH_SPAREPARTS_URL = '/api/spareparts/'
const FETCH_SPAREPARTS_CATEGORIES_URL = '/api/spareparts/categories/'
const FETCH_SPAREPARTS_PURCHASES_URL = '/api/spareparts/sparepart_purchases/'
const POST_SPAREPART_PURCHASES_URL = '/api/spareparts/sparepart_purchases/create/'

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
    SPAREPART_PURCHASE_POST_LOADING: false,
    SPAREPART_PURCHASE_POST_SUCCESS: false,
    SPAREPART_PURCHASE_POST_ERROR: '',
}


const getters = {
    getSpareparts: state => {
        return state.spareparts.map(sparepart => {
                return {'name': sparepart.name, 'code': sparepart.id}
        })
    }
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
    },

    // Spare part purchase post
    SET_SPAREPART_PURCHASE_POST_LOADING(state, data) {
        state.SPAREPART_PURCHASE_POST_LOADING = data;
    },
    SET_SPAREPART_PURCHASE_POST_ERROR(state, data) {
        state.SPAREPART_PURCHASE_POST_ERROR = data;
    },
    SET_SPAREPART_PURCHASE_POST_SUCCESS(state, data) {
        state.SPAREPART_PURCHASE_POST_SUCCESS = data
    },
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

    async saveSparePartPurchase(context, data){
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        context.commit('SET_SPAREPART_PURCHASE_POST_LOADING', true)
        context.commit('SET_SPAREPART_PURCHASE_POST_SUCCESS', false);
        context.commit('SET_SPAREPART_PURCHASE_POST_ERROR', '');

        const response = await axios.post(POST_SPAREPART_PURCHASES_URL, formData).then(() => {
            context.commit('SET_SPAREPART_PURCHASE_POST_LOADING', false)
            context.commit('SET_SPAREPART_PURCHASE_POST_SUCCESS', true);
        }).catch(error => {
            context.commit('SET_SPAREPART_PURCHASE_POST_ERROR',  JSON.stringify(error));
            console.error('Error Creating Spare Part Purchase: ', JSON.stringify(error));
        })

        return response;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};