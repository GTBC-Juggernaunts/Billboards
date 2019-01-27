import React from "react";
import PromotionForm from "../components/form/PromotionForm";
import './page.css';
import API from "../utils/API"
import Table from "../components/table/Table";

class PromotionsControl extends React.Component {
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
    const { Header, value } = event.target;
    this.setState({
      [Header]: value
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
      <div className="mainContainer">
        <div className="sidebar-area left"/>
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
            <div className="container">
              Table goes here maybe
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsControl