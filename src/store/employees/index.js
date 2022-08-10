import axios from 'axios'

const FETCH_EMPLOYEES_URL = '/api/employees/';
const POST_EMPLOYEES_URL = '/api/employees/create/';
const FETCH_STATIONS_URL = '/api/employees/stations/';

const state = {
    //Employees
    employees: [],
    EMPLOYEES_LOADING: false,
    EMPLOYEES_SUCCESS: false,
    EMPLOYEES_ERROR: '',

    //Create Employee
    EMPLOYEES_POST_LOADING: false,
    EMPLOYEES_POST_SUCCESS: false,
    EMPLOYEES_POST_ERROR: '',

    //Stations
    stations: [],
    STATIONS_LOADING: false,
    STATIONS_SUCCESS: false,
    STATIONS_ERROR: '',
}


const getters = {
    getEmployees: state => {
        return state.employees.map(employee => {
                return {'name': employee.full_name, 'code': employee.id}
        })
    },

    getStations: state => {
        return state.stations.map(station => {
            const description = station.name + ' <- ' + station.division.name + ' <- ' + station.division.region.name
            return {'name': station.name, 'code': station.id, 'description': description }
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


    // Create Employee
    SET_EMPLOYEES_POST_LOADING(state, data) {
        state.EMPLOYEES_POST_LOADING = data;
    },

    SET_EMPLOYEES_POST_SUCCESS(state, data) {
        state.EMPLOYEES_POST_SUCCESS = data
    },

    SET_EMPLOYEES_POST_ERROR(state, data) {
        state.EMPLOYEES_POST_ERROR = data
    },

    // Stations
    SET_STATIONS(state, data) {
        state.stations = data;
    },
    SET_STATIONS_LOADING(state, data) {
        state.STATIONS_LOADING = data;
    },
    SET_STATIONS_SUCCESS(state, data) {
        state.STATIONS_SUCCESS = data
    },
    SET_STATIONS_ERROR(state, data) {
        state.STATIONS_ERROR = data
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

    async saveEmployee(context, data) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        context.commit('SET_EMPLOYEES_POST_LOADING', true)
        context.commit('SET_EMPLOYEES_POST_SUCCESS', false);
        context.commit('SET_EMPLOYEES_POST_ERROR', '');
        await axios.post(POST_EMPLOYEES_URL, formData).then(() => {
            context.commit('SET_EMPLOYEES_POST_SUCCESS', true);
        }).catch(error => {
            context.commit('SET_EMPLOYEES_POST_ERROR',  JSON.stringify(error));
            console.error('Error Creating Employee: ', JSON.stringify(error));
        })

        context.commit('SET_EMPLOYEES_POST_LOADING', false);
    },


    async fetchStations(context, filters) {
        context.commit('SET_STATIONS_LOADING', true)
        return await axios.get(FETCH_STATIONS_URL, {params: filters}).then(response => {
            context.commit('SET_STATIONS_LOADING', false);
            context.commit('SET_STATIONS', response.data)
        }).catch(error => {
            context.commit('SET_STATIONS_LOADING', false);
            context.commit('SET_STATIONS_ERROR', error);
            console.error('Error Fetching Stations: ', error);
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