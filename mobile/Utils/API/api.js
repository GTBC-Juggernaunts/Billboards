import axios from 'axios';

const server = 'https://billboard-platform.herokuapp.com/';

export default {
  getPromotions: () => {
    return axios.get(`${server}api/promo`);
  },
  redeemPromotion: promotion => {
    return axios.post(`${server}api/promo/redeem`, promotion);
  },
  createUser: user => {
    return axios.post(`${server}api/user`, user);
  },
  getPromotionsByUser: promotion => {
    return axios.post(`${server}api/promo/retrieve`, promotion);
  }
};
