import React from "react";
import PromotionForm from "../components/form/PromotionForm"
import Table from "../components/table/Table"
import API from "../utils/API"

class PromotionsPage extends React.Component {
  state = {
    data:[]
  };

  componentDidMount() {
    API.getPromotions()
      .then(res => {
        let data = [];
        res.data.forEach(promo => {
          data.push({
            PromotionText: promo.PromotionText,
            BeaconTag: promo.BeaconTag,
            PreferenceGroup: promo.PreferenceGroup,
            ExpirationDate: promo.ExpirationDate
          })
        });

        this.setState({
          data
        })
      })
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
            <Table data={this.state.data}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsPage