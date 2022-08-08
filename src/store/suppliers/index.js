import axios from 'axios'

const FETCH_SUPPLIERS_URL = '/api/suppliers/'

const state = {
    //Suppliers
    suppliers: [],
    SUPPLIERS_LOADING: false,
    SUPPLIERS_SUCCESS: false,
    SUPPLIERS_ERROR: '',
}

const getters = {
    getSuppliers: state => {
        return state.suppliers.map(supplier => {
                return {'name': supplier.name, 'code': supplier.id}
        })
    }
}

const mutations = {
    // Suppliers
    SET_SUPPLIERS(state, data) {
        state.suppliers = data;
    },
    SET_SUPPLIERS_LOADING(state, data) {
        state.SUPPLIERS_LOADING = data;
    },
    SET_SUPPLIERS_SUCCESS(state, data) {
        state.SUPPLIERS_SUCCESS = data
    },
    SET_SUPPLIERS_ERROR(state, data) {
        state.SUPPLIERS_ERROR = data
    },
}

const actions = {
    async fetchSuppliers(context, filters) {
        context.commit('SET_SUPPLIERS_LOADING', true)
        return await axios.get(FETCH_SUPPLIERS_URL, {params: filters}).then(response => {
            context.commit('SET_SUPPLIERS_LOADING', false);
            context.commit('SET_SUPPLIERS', response.data)
        }).catch(error => {
            context.commit('SET_SUPPLIERS_LOADING', false);
            context.commit('SET_SUPPLIERS_ERROR', error);
            console.error('Error Fetching Suppliers: ', error);
        })
    },


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};