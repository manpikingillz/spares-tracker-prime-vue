import axios from 'axios'

const FETCH_REPAIR_PROBLEMS_URL = '/api/repairs/problems/'
const FETCH_REPAIRS_URL = '/api/repairs/'
const REPAIR_POST_URL = '/api/repairs/create/'

const state = {
    //Repair Problems
    repairProblems: [],
    REPAIR_PROBLEMS_LOADING: false,
    REPAIR_PROBLEMS_SUCCESS: false,
    REPAIR_PROBLEMS_ERROR: '',

    //Repairs
    repairs: [],
    REPAIRS_LOADING: false,
    REPAIRS_SUCCESS: false,
    REPAIRS_ERROR: '',

    //Create Repair
    REPAIR_POST_LOADING: false,
    REPAIR_POST_SUCCESS: false,
    REPAIR_POST_ERROR: '',
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

    // Repairs
    SET_REPAIRS(state, data) {
        state.repairs = data;
    },
    SET_REPAIRS_LOADING(state, data) {
        state.REPAIRS_LOADING = data;
    },
    SET_REPAIRS_SUCCESS(state, data) {
        state.REPAIRS_SUCCESS = data
    },
    SET_REPAIRS_ERROR(state, data) {
        state.REPAIRS_ERROR = data
    },

    // Create Repair
    SET_REPAIR_POST_LOADING(state, data) {
        state.REPAIR_POST_LOADING = data;
    },
    SET_REPAIR_POST_SUCCESS(state, data) {
        state.REPAIR_POST_SUCCESS = data
    },
    SET_REPAIR_POST_ERROR(state, data) {
        state.REPAIR_POST_ERROR = data
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

    async fetchRepairs(context, filters) {
        context.commit('SET_REPAIRS_LOADING', true)
        return await axios.get(FETCH_REPAIRS_URL, {params: filters}).then(response => {
            context.commit('SET_REPAIRS_LOADING', false);
            context.commit('SET_REPAIRS', response.data)
        }).catch(error => {
            context.commit('SET_REPAIRS_LOADING', false);
            context.commit('SET_REPAIRS_ERROR', error);
            console.error('Error Fetching Repairs: ', error);
        })
    },

    async saveRepair(context, data) {
        let formData = new FormData()
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        context.commit('SET_REPAIR_POST_LOADING', true)
        context.commit('SET_REPAIR_POST_SUCCESS', false);
        context.commit('SET_REPAIR_POST_ERROR', '');
        await axios.post(REPAIR_POST_URL, formData).then(() => {
            context.commit('SET_REPAIR_POST_SUCCESS', true);
        }).catch(error => {
            context.commit('SET_REPAIR_POST_ERROR',  JSON.stringify(error));
            console.error('Error Creating Repair: ', JSON.stringify(error));
        })

        context.commit('SET_REPAIR_POST_LOADING', false);
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};