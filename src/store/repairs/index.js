import axios from 'axios'

const FETCH_REPAIR_PROBLEMS_URL = '/api/repairs/problems/';
const FETCH_REPAIRS_URL = '/api/repairs/';
const REPAIR_POST_URL = '/api/repairs/create/';
const FETCH_PROBLEM_RECOMMENDATIONS_URL = '/api/repairs/problems_recommendations/';
const FETCH_SPAREPART_RECOMMENDATIONS_URL = '/api/repairs/spareparts_recommendations/';


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

    //View Repair
    repair: [],
    REPAIR_LOADING: false,
    REPAIR_SUCCESS: false,
    REPAIR_ERROR: '',

    //problem recommendations
    problemRecommendations: [],
    PROBLEM_RECOMMENDATIONS_LOADING: false,
    PROBLEM_RECOMMENDATIONS_SUCCESS: false,
    PROBLEM_RECOMMENDATIONS_ERROR: '',

    //Sparepart recommendations
    sparepartRecommendations: [],
    SPAREPART_RECOMMENDATIONS_LOADING: false,
    SPAREPART_RECOMMENDATIONS_SUCCESS: false,
    SPAREPART_RECOMMENDATIONS_ERROR: '',
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

    // Repair Create
    SET_REPAIR_POST_LOADING(state, data) {
        state.REPAIR_POST_LOADING = data;
    },
    SET_REPAIR_POST_SUCCESS(state, data) {
        state.REPAIR_POST_SUCCESS = data
    },
    SET_REPAIR_POST_ERROR(state, data) {
        state.REPAIR_POST_ERROR = data
    },

    // Repair detail
    SET_REPAIR(state, data) {
        state.repair = data;
    },
    SET_REPAIR_LOADING(state, data) {
        state.REPAIR_LOADING = data;
    },
    SET_REPAIR_SUCCESS(state, data) {
        state.REPAIR_SUCCESS = data
    },
    SET_REPAIR_ERROR(state, data) {
        state.REPAIR_ERROR = data
    },

    // Problem Recommendations
    SET_PROBLEM_RECOMMENDATIONS(state, data) {
        state.problemRecommendations = data;
    },
    SET_PROBLEM_RECOMMENDATIONS_LOADING(state, data) {
        state.PROBLEM_RECOMMENDATIONS_LOADING = data;
    },
    SET_PROBLEM_RECOMMENDATIONS_SUCCESS(state, data) {
        state.PROBLEM_RECOMMENDATIONS_SUCCESS = data
    },
    SET_PROBLEM_RECOMMENDATIONS_ERROR(state, data) {
        state.PROBLEM_RECOMMENDATIONS_ERROR = data
    },

    // Sparepart Recommendations
    SET_SPAREPART_RECOMMENDATIONS(state, data) {
        state.sparepartRecommendations = data;
    },
    SET_SPAREPART_RECOMMENDATIONS_LOADING(state, data) {
        state.SPAREPART_RECOMMENDATIONS_LOADING = data;
    },
    SET_SPAREPART_RECOMMENDATIONS_SUCCESS(state, data) {
        state.SPAREPART_RECOMMENDATIONS_SUCCESS = data
    },
    SET_SPAREPART_RECOMMENDATIONS_ERROR(state, data) {
        state.SPAREPART_RECOMMENDATIONS_ERROR = data
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

    async fetchRepairDetails(context, pk) {
        context.commit('SET_REPAIR_LOADING', true)
        const url = FETCH_REPAIRS_URL + pk +'/'
        return await axios.get(url).then(response => {
            context.commit('SET_REPAIR_LOADING', false);
            context.commit('SET_REPAIR', response.data)
        }).catch(error => {
            context.commit('SET_REPAIR_LOADING', false);
            context.commit('SET_REPAIR_ERROR', error);
            console.error('Error Fetching Repair: ', error);
        })
    },

    async fetchProblemRecommendations(context, filters) {
        context.commit('SET_PROBLEM_RECOMMENDATIONS_LOADING', true)
        return await axios.get(FETCH_PROBLEM_RECOMMENDATIONS_URL, {params: filters}).then(response => {
            context.commit('SET_PROBLEM_RECOMMENDATIONS_LOADING', false);
            context.commit('SET_PROBLEM_RECOMMENDATIONS', response.data)
        }).catch(error => {
            context.commit('SET_PROBLEM_RECOMMENDATIONS_LOADING', false);
            context.commit('SET_PROBLEM_RECOMMENDATIONS_ERROR', error);
            console.error('Error Fetching Problem Recommendations: ', error);
        })
    },

    async fetchSparePartRecommendations(context, filters) {
        context.commit('SET_SPAREPART_RECOMMENDATIONS_LOADING', true)
        return await axios.get(FETCH_SPAREPART_RECOMMENDATIONS_URL, {params: filters}).then(response => {
            context.commit('SET_SPAREPART_RECOMMENDATIONS_LOADING', false);
            context.commit('SET_SPAREPART_RECOMMENDATIONS', response.data)
        }).catch(error => {
            context.commit('SET_SPAREPART_RECOMMENDATIONS_LOADING', false);
            context.commit('SET_SPAREPART_RECOMMENDATIONS_ERROR', error);
            console.error('Error Fetching SparePart Recommendations: ', error);
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

    async updateRepair(context, data) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        const repairId = data['repair_id'];

        context.commit('SET_REPAIR_POST_LOADING', true);
        context.commit('SET_REPAIR_POST_SUCCESS', false);
        context.commit('SET_REPAIR_POST_ERROR', '');
        await axios.post(`/api/repairs/${repairId}/update/`, formData).then(() => {
            context.commit('SET_REPAIR_POST_SUCCESS', true);
            //TODO: update success state
        }).catch(error => {
            context.commit('SET_REPAIR_POST_ERROR', error);
            console.error('Vehicle update error: ' + error);
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