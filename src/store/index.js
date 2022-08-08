import { createStore } from 'vuex';
import auth from './auth'
import setup from './setup'
import vehicles from './vehicles'
import spareparts from './spareparts'
import employees from './employees'
import suppliers from './suppliers'

const store = createStore({
    modules: {
        auth,
        setup,
        vehicles,
        spareparts,
        employees,
        suppliers
    }
})

export default store;