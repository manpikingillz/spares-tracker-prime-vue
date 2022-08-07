import axios from 'axios'

const FETCH_SPAREPARTS_URL = '/api/spareparts/'

const state = {
    //Spareparts
    spareparts: [],
    SPAREPARTS_LOADING: false,
    SPAREPARTS_SUCCESS: false,
    SPAREPARTS_ERROR: ''
}


const mutations= {
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
    }

}

const actions = {
    async fetchSpareparts(context) {
        context.commit('SET_SPAREPARTS_LOADING', true)
        return await axios.get(FETCH_SPAREPARTS_URL).then(response => {
            context.commit('SET_SPAREPARTS_LOADING', false);
            context.commit('SET_SPAREPARTS', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPARTS_LOADING', false);
            context.commit('SET_SPAREPARTS_ERROR', error);
            console.error('Error Fetching Spareparts: ', error);
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};