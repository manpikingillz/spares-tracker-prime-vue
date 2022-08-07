import { createStore } from 'vuex';
import auth from './auth'
import setup from './setup'
import vehicles from './vehicles'
import spareparts from './spareparts'

const store = createStore({
    modules: {
        auth,
        setup,
        vehicles,
        spareparts
    }
})

export default store;