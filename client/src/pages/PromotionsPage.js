import React from "react";
// import API from "../utils/API";
import PromotionForm from "../components/PromotionForm"

class PromotionsPage extends React.Component {
  state = {
  };

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s12">Promotions Page Goes Here</div>
        </div>
        <div className="row">
          <div className="col s6">
            <PromotionForm/>
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsPage