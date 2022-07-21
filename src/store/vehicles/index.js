import axios from 'axios'

const FETCH_VEHICLE_MODELS_URL = '/api/vehicles/vehicle_models/'
const FETCH_VEHICLE_MAKES_URL = '/api/vehicles/vehicle_makes/'
const POST_VEHICLE_URL = '/api/vehicles/create/'

const state = {
    // Vehicle models
    vehicleModels: [],
    VEHICLE_MODELS_LOADING: false,
    VEHICLE_MODELS_ERROR: '',

    // Vehicle makes
    vehicleMakes: [],
    VEHICLE_MAKES_LOADING: false,
    VEHICLE_MAKES_ERROR: '',

    //vehicle post
    VEHICLE_POST_LOADING: false,
    VEHICLE_POST_ERROR: ''

}

const getters = {
    getVehicleModels: state => {
        return state.vehicleModels.map(vehicleModel => {
                return {'name': vehicleModel.vehicle_model_name, 'code': vehicleModel.id}
        })
    },

    getVehicleMakes: state => {
        return state.vehicleMakes.map(vehicleMake => {
                return {'name': vehicleMake.vehicle_make_name, 'code': vehicleMake.id}
        })
    }
}

const mutations= {
    // Vehicle models
    SET_VEHICLE_MODELS(state, data) {
        state.vehicleModels = data;
    },
    SET_VEHICLE_MODELS_LOADING(state, data) {
        state.VEHICLE_MODELS_LOADING = data;
    },
    SET_VEHICLE_MODELS_ERROR(state, data) {
        state.VEHICLE_MODELS_ERROR = data;
    },

    // Vehicle Makes
    SET_VEHICLE_MAKES(state, data) {
        state.vehicleMakes = data
    },
    SET_VEHICLE_MAKES_LOADING(state, data) {
        state.VEHICLE_MAKES_LOADING = data;
    },
    SET_VEHICLE_MAKES_ERROR(state, data) {
        state.VEHICLE_MAKES_ERROR = data;
    },

    // Vehicle post
    SET_VEHICLE_POST_LOADING(state, data) {
        state.VEHICLE_POST_LOADING = data;
    },
    SET_VEHICLE_POST_ERROR(state, data) {
        state.VEHICLE_POST_ERROR = data;
    },

}

const actions = {

    async fetchVehicleModels(context, vehicle_make) {
        context.commit('SET_VEHICLE_MODELS_LOADING', true)
        return await axios.get(FETCH_VEHICLE_MODELS_URL+'?vehicle_make='+vehicle_make).then(response => {
            context.commit('SET_VEHICLE_MODELS_LOADING', false);
            context.commit('SET_VEHICLE_MODELS', response.data)
        }).catch(error => {
            context.commit('SET_VEHICLE_MODELS_LOADING', false);
            context.commit('SET_VEHICLE_MODELS_ERROR', error);
            console.error('Error Fetching Vehicle Models: ', error);
        })
    },

    async fetchVehicleMakes(context) {
        context.commit('SET_VEHICLE_MAKES_LOADING', true)
        return await axios.get(FETCH_VEHICLE_MAKES_URL).then(response => {
            context.commit('SET_VEHICLE_MAKES_LOADING', false);
            context.commit('SET_VEHICLE_MAKES', response.data)
        }).catch(error => {
            context.commit('SET_VEHICLE_MAKES_LOADING', false);
            context.commit('SET_VEHICLE_MAKES_ERROR', error);
            console.error('Error Fetching Vehicle Makes: ', error);
        })
    },

    async saveVehicle(context, data) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })
        context.commit('SET_VEHICLE_POST_LOADING', true)
        return await axios.post(POST_VEHICLE_URL, formData).then(() => {
            context.commit('SET_VEHICLE_POST_LOADING', false);
            // TODO: refetch vehicles
        }).catch(error => {
            context.commit('SET_VEHICLE_POST_LOADING', false);
            context.commit('SET_VEHICLE_POST_ERROR', error);
            console.error('Error Creating Vehicle: ', error);
        })
    }
}


export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
};