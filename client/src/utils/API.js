import axios from "axios";

export default {
  getPromotions: function() {
    return axios.get("/api/promo")
  },
  savePromotion: function(promotion) {
    return axios.post("/api/promo", promotion);
  },
  saveuser: function(user) {
    return axios.post("/api/user", user);
  }
}