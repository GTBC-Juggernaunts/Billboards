import axios from 'axios'

const server = 'https://billboard-platform.herokuapp.com/'

export default {
    getPromotions: function() {
        return axios.get(server + 'api/promo');
    },
    redeemPromotion: function(promotion) {
        return axios.post(`${server}api/promo/redeem`, promotion);
    },
    createUser: (user) => {
        return axios.post(`${server}api/user`, user);
    }
};