import axios from 'axios'

const FETCH_SUPPLIERS_URL = '/api/suppliers/'
const POST_SUPPLIERS_URL = '/api/suppliers/create/'

const state = {
    //Suppliers
    suppliers: [],
    SUPPLIERS_LOADING: false,
    SUPPLIERS_SUCCESS: false,
    SUPPLIERS_ERROR: '',

    //Create supplier
    SUPPLIERS_POST_LOADING: false,
    SUPPLIERS_POST_SUCCESS: false,
    SUPPLIERS_POST_ERROR: ''
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

    // Create Supplier
    SET_SUPPLIERS_POST_LOADING(state, data) {
        state.SUPPLIERS_POST_LOADING = data;
    },

    SET_SUPPLIERS_POST_SUCCESS(state, data) {
        state.SUPPLIERS_POST_SUCCESS = data
    },

    SET_SUPPLIERS_POST_ERROR(state, data) {
        state.SUPPLIERS_POST_ERROR = data
    }
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

    async saveSupplier(context, data) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        context.commit('SET_SUPPLIERS_POST_LOADING', true)
        context.commit('SET_SUPPLIERS_POST_SUCCESS', false);
        context.commit('SET_SUPPLIERS_POST_ERROR', '');
        await axios.post(POST_SUPPLIERS_URL, formData).then(() => {
            context.commit('SET_SUPPLIERS_POST_SUCCESS', true);
        }).catch(error => {
            context.commit('SET_SUPPLIERS_POST_ERROR',  JSON.stringify(error));
            console.error('Error Creating supplier: ', JSON.stringify(error));
        })

        context.commit('SET_SUPPLIERS_POST_LOADING', false);
    }


}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};