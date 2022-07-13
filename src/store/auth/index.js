import axios from 'axios'


const LOGIN_URL = 'http://localhost:8000/api/auth/jwt/login/'

const state = {

}

const getters = {

}

const mutations = {


}

const actions = {
    performLogin(context, data) {
        console.log('called method')
        let formData = new FormData()
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        })

        return new Promise((resolve, reject) => {
            axios.post(LOGIN_URL, formData).then(response => {
                if(response.token) {
                    localStorage.setItem('token', response.token);
                } else {
                    console.log('login response: ', response);
                }
                resolve(response);
            }).catch(error => {
                console.error('Error ocurred on Logig: ', error);
                reject(error);
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};