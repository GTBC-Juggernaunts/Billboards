import React from 'react';
import API from "../utils/API";

class PromotionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PromotionText: "",
      BeaconTag: "",
      PreferenceGroup: "",
      ExpirationDate: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitting state');
    console.log(this.state);
    API.savePromotion(this.state)
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s6 offset-s3 z-depth-1">
              <div className="col s12">
                <div className="input-field col s12">
                  <input
                    name="PromotionText"
                    id="promotionText"
                    type="text"
                    value={this.state.PromotionText}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="promotionText">Promotion Text</label>
                </div>
              </div>
              <div className="col s12">
                <div className="input-field col s12">
                  <input
                    name="BeaconTag"
                    id="beaconTag"
                    type="text"
                    value={this.state.BeaconTag}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="beaconTag">Beacon Tag</label>
                </div>
              </div>
              <div className="col s12">
                <div className="input-field col s12">
                  <input
                    name="PreferenceGroup"
                    id="preferenceGroup"
                    type="text"
                    value={this.state.PreferenceGroup}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="preferenceGroup">Preference Grouping</label>
                </div>
              </div>
              <div className="col s12">
                <div className="input-field col s12">
                  <input
                    name="ExpirationDate"
                    id="expirationDate"
                    type="text"
                    value={this.state.ExpirationDate}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="ExpirationDate">Expiration Date</label>
                </div>
              </div>
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