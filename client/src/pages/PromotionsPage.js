import React from "react";
import PromotionForm from "../components/form/PromotionForm"
import Table from "../components/table/Table"
import API from "../utils/API"

class PromotionsPage extends React.Component {
  state = {
    data:[],
    PromotionText: "",
    BeaconTag: "",
    PreferenceGroup: "",
    ExpirationDate: "",
  };

  reloadData = () => {
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
  };

  componentDidMount() {
    this.reloadData();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submitting state');
    console.log(this.state);
    API.savePromotion(this.state)
      .then(res => {
        console.log(res);
        if(res.status === 200) {
          alert("New Promotion Successfully Added")
        }
        else {
          alert("An error has occurred. Please check the console.")
        }
      })
      .then(this.reloadData());
  };

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s12">Promotions Page Goes Here</div>
        </div>
        <div className="row">
          <div className="col s6">
            <PromotionForm
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              PromotionText={this.state.PromotionText}
              BeaconTag={this.state.BeaconTag}
              PreferenceGroup={this.state.PreferenceGroup}
              ExpirationDate={this.state.ExpirationDate}
            />
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