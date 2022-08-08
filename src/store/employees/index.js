import axios from 'axios'

const FETCH_EMPLOYEES_URL = '/api/employees/'

const state = {
    //Employees
    employees: [],
    EMPLOYEES_LOADING: false,
    EMPLOYEES_SUCCESS: false,
    EMPLOYEES_ERROR: '',
}


const getters = {
    getEmployees: state => {
        return state.employees.map(employee => {
                return {'name': employee.full_name, 'code': employee.id}
        })
    }
}


const mutations= {
    // Employees
    SET_EMPLOYEES(state, data) {
        state.employees = data;
    },
    SET_EMPLOYEES_LOADING(state, data) {
        state.EMPLOYEES_LOADING = data;
    },
    SET_EMPLOYEES_SUCCESS(state, data) {
        state.EMPLOYEES_SUCCESS = data
    },
    SET_EMPLOYEES_ERROR(state, data) {
        state.EMPLOYEES_ERROR = data
    },
}

const actions = {
    async fetchEmployees(context, filters) {
        context.commit('SET_EMPLOYEES_LOADING', true)
        return await axios.get(FETCH_EMPLOYEES_URL, {params: filters}).then(response => {
            context.commit('SET_EMPLOYEES_LOADING', false);
            context.commit('SET_EMPLOYEES', response.data)
        }).catch(error => {
            context.commit('SET_EMPLOYEES_LOADING', false);
            context.commit('SET_EMPLOYEES_ERROR', error);
            console.error('Error Fetching Employees: ', error);
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