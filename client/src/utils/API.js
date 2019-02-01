import axios from "axios";

export default {
  getPromotions: function() {
    return axios.get("/api/promo")
  },
  getUsers: function() {
    return axios.get("/api/user")
  },
  savePromotion: function(promotion) {
    return axios.post("/api/promo", promotion);
  },
  saveUser: function(user) {
    return axios.post("/api/user", user);
  }
}