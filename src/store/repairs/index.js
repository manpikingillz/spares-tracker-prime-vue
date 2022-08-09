import axios from 'axios'

const FETCH_REPAIR_PROBLEMS_URL = '/api/repairs/problems/'

const state = {
    //Repair Problems
    repairProblems: [],
    REPAIR_PROBLEMS_LOADING: false,
    REPAIR_PROBLEMS_SUCCESS: false,
    REPAIR_PROBLEMS_ERROR: '',
}

const getters = {
    getRepairProblems: state => {
        return state.repairProblems.map(repairProblem => {
                return {'name': repairProblem.name, 'code': repairProblem.id }
        })
    }
}

const mutations = {
    // Repair Problems
    SET_REPAIR_PROBLEMS(state, data) {
        state.repairProblems = data;
    },
    SET_REPAIR_PROBLEMS_LOADING(state, data) {
        state.REPAIR_PROBLEMS_LOADING = data;
    },
    SET_REPAIR_PROBLEMS_SUCCESS(state, data) {
        state.REPAIR_PROBLEMS_SUCCESS = data
    },
    SET_REPAIR_PROBLEMS_ERROR(state, data) {
        state.REPAIR_PROBLEMS_ERROR = data
    },
}

const actions = {
    async fetchRepairProblems(context, filters) {
        context.commit('SET_REPAIR_PROBLEMS_LOADING', true)
        return await axios.get(FETCH_REPAIR_PROBLEMS_URL, {params: filters}).then(response => {
            context.commit('SET_REPAIR_PROBLEMS_LOADING', false);
            context.commit('SET_REPAIR_PROBLEMS', response.data)
        }).catch(error => {
            context.commit('SET_REPAIR_PROBLEMS_LOADING', false);
            context.commit('SET_REPAIR_PROBLEMS_ERROR', error);
            console.error('Error Fetching Repair Problems: ', error);
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