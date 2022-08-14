import axios from 'axios'

const FETCH_VEHICLES_URL = '/api/vehicles/'
const FETCH_VEHICLE_MODELS_URL = '/api/vehicles/vehicle_models/'
const FETCH_VEHICLE_MAKES_URL = '/api/vehicles/vehicle_makes/'
const POST_VEHICLE_URL = '/api/vehicles/create/'
const POST_FILE_URL = '/api/files/upload/standard/'
const FETCH_ONE_VEHICLE_URL = '/api/vehicles/'

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
    VEHICLE_POST_SUCCESS: false,
    VEHICLE_POST_ERROR: '',

    //Vehicles
    vehicles: [],
    VEHICLES_LOADING: false,
    VEHICLES_SUCCESS: false,
    VEHICLES_ERROR: '',

    //One Vehicle
    vehicle: [],
    VEHICLE_LOADING: false,
    VEHICLE_SUCCESS: false,
    VEHICLE_ERROR: ''

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
    },

    getVehicles: state => {
        return state.vehicles.map(vehicle => {
                return {'name': vehicle.number_plate, 'code': vehicle.id}
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
    SET_VEHICLE_POST_SUCCESS(state, data) {
        state.VEHICLE_POST_SUCCESS = data
    },

    // Vehicles
    SET_VEHICLES(state, data) {
        state.vehicles = data;
    },
    SET_VEHICLES_LOADING(state, data) {
        state.VEHICLES_LOADING = data;
    },
    SET_VEHICLES_SUCCESS(state, data) {
        state.VEHICLES_SUCCESS = data
    },
    SET_VEHICLES_ERROR(state, data) {
        state.VEHICLES_ERROR = data
    },

    // One Vehicle
    SET_VEHICLE(state, data) {
        state.vehicle = data;
    },
    SET_VEHICLE_LOADING(state, data) {
        state.VEHICLE_LOADING = data;
    },
    SET_VEHICLE_SUCCESS(state, data) {
        state.VEHICLE_SUCCESS = data
    },
    SET_VEHICLE_ERROR(state, data) {
        state.VEHICLE_ERROR = data
    }

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
        const file = data['vehicleImage'];
        delete data['vehicleImage']

        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        context.commit('SET_VEHICLE_POST_LOADING', true)
        context.commit('SET_VEHICLE_POST_SUCCESS', false);
        context.commit('SET_VEHICLE_POST_ERROR', '');
        const response = await axios.post(POST_VEHICLE_URL, formData).then(response => {
            context.commit('SET_VEHICLE_POST_SUCCESS', true);

            // upload file
            if (response.data.id && file) {
                const vehilceIdAndImageToUpload = {
                    vehicleId: response.data.id,
                    vehicleImage: file
                }

                context.dispatch('uploadVehicleImage', vehilceIdAndImageToUpload)
            }

            // TODO: refetch vehicles
        }).catch(error => {
            context.commit('SET_VEHICLE_POST_ERROR',  JSON.stringify(error));
            console.error('Error Creating Vehicle: ', JSON.stringify(error));
        })

        context.commit('SET_VEHICLE_POST_LOADING', false);

        return response;
    },

    async updateVehicle(context, data) {
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key])
        })

        const vehicleId = data['id'];
        delete data['id'];

        await axios.post(`/api/vehicles/${vehicleId}/update/`, formData).then(() => {
            //TODO: update success state
        }).catch(error => {
            console.error('Vehicle update error: ' + error)
        })
    },

    async uploadVehicleImage(context, vehilceIdAndImageToUpload) {
        let formData = new FormData();
        formData.append('file', vehilceIdAndImageToUpload.vehicleImage);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return await axios.post(POST_FILE_URL, formData,  { headers: headers }).then(response => {
            const vehicleIdAndUploadedImageId = {
                vehicle_image: response.data.id,
                id: vehilceIdAndImageToUpload.vehicleId
            }
            // update vehicle to add image id
            context.dispatch('updateVehicle', vehicleIdAndUploadedImageId);

        }).catch(error => {
            console.error('Error uploading file: ', error)
        });
    },

    async fetchVehicles(context, filters) {
        context.commit('SET_VEHICLES_LOADING', true)

        const response = await axios.get(FETCH_VEHICLES_URL, {params: filters}).then(response => {
            context.commit('SET_VEHICLES_SUCCESS', false);
            context.commit('SET_VEHICLES', response.data)
        }).catch(error => {
            context.commit('SET_VEHICLES_ERROR', error);
            console.error('Error Fetching Vehicles: ', error);
        })

        return response;
    },

    async fetchOneVehicle(context, vehicleId) {
        context.commit('SET_VEHICLE_LOADING', true)

        const response = await axios.get(`${FETCH_ONE_VEHICLE_URL}${vehicleId}`).then(response => {
            context.commit('SET_VEHICLE_SUCCESS', false);
            context.commit('SET_VEHICLE', response.data)
        }).catch(error => {
            context.commit('SET_VEHICLE_ERROR', error);
            console.error('Error Fetching Vehicle: ', error);
        })

        return response;
    },

    async fetchAllVehicles() {
        return await axios.get(FETCH_VEHICLES_URL);
    }

}


export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
};