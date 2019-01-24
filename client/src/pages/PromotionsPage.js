import React from "react";
import PromotionForm from "../components/PromotionForm"
import PromotionTable from "../components/PromotionTable";

class PromotionsPage extends React.Component {
  state = {
    data:[]
  };

  componentDidMount() {

  }

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
          <div className="col s6">
            <PromotionTable data={this.state.data}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsPage