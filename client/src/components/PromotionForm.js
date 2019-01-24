import React from 'react';

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
    alert('Submit triggered - not');
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="col s12">
            <div className="input-field col s6">
              <input
                name="PromotionText"
                id="promotionText"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <label htmlFor="promotionText">Promotion Text</label>
            </div>
          </div>
          <div className="col s12">
            <div className="input-field col s6">
              <input
                name="BeaconTag"
                id="beaconTag"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <label htmlFor="beaconTag">Beacon Tag</label>
            </div>
          </div>
          <div className="col s12">
            <div className="input-field col s6">
              <input
                name="PreferenceGroup"
                id="preferenceGroup"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <label htmlFor="preferenceGroup">Preference Grouping</label>
            </div>
          </div>
          <div className="col s12">
            <div className="input-field col s6">
              <input
                name="ExpirationDate"
                id="expirationDate"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <label htmlFor="ExpirationDate">Expiration Date</label>
            </div>
          </div>
          <button
            className="btn grey darken-3 waves-effect waves-light"
            type="submit"
            name="action">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default PromotionForm