import React from 'react';
import API from "../../utils/API";
import TextInput from "./TextInput"

class PromotionForm extends React.Component {
    state = {
      PromotionText: "",
      BeaconTag: "",
      PreferenceGroup: "",
      ExpirationDate: ""
    };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submitting state');
    console.log(this.state)
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
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s6 offset-s3 z-depth-1">
              <TextInput
                name="PromotionText"
                label="Promotional Text"
                value={this.state.PromotionText}
                onChange={this.handleInputChange}
              />
              <TextInput
                name="BeaconTag"
                label="Beacon Tag"
                value={this.state.BeaconTag}
                onChange={this.handleInputChange}
              />
              <TextInput
                name="PreferenceGroup"
                label="Preference Group"
                value={this.state.PreferenceGroup}
                onChange={this.handleInputChange}
              />
              <TextInput
                name="ExpirationDate"
                label="Expiration Date"
                value={this.state.ExpirationDate}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        <div className="row">
          <button
            className="btn grey darken-3 waves-effect waves-light"
            type="submit"
            name="action">
            Submit
          </button>
        </div>
        </form>
      </div>
    )
  }
}

export default PromotionForm