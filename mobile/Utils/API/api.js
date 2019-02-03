import axios from 'axios'

const server = 'https://billboard-platform.herokuapp.com/'

export default {
    getPromotions: function() {
        return axios.get(server + 'api/promo');
    }
};