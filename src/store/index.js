import { createStore } from 'vuex';
import auth from './auth'
import setup from './setup'
import vehicles from './vehicles'

const store = createStore({
    modules: {
        auth,
        setup,
        vehicles
    }
})

export default store;