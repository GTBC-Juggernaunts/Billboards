import React from 'react';
import TextInput from "./TextInput"
import './form.css'

const PromotionForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
          <div >
            <div className="col s12 z-depth-1 form-card">
              <h5>New Promotion</h5>
              <TextInput
                name="PromotionText"
                label="Promotional Text"
                value={props.PromotionText}
                onChange={props.handleInputChange}
              />
              <TextInput
                name="BeaconTag"
                label="Beacon Tag"
                value={props.BeaconTag}
                onChange={props.handleInputChange}
              />
              <TextInput
                name="PreferenceGroup"
                label="Preference Group"
                value={props.PreferenceGroup}
                onChange={props.handleInputChange}
              />
              <TextInput
                name="ExpirationDate"
                label="Expiration Date"
                value={props.ExpirationDate}
                onChange={props.handleInputChange}
              />
              <div className="col s12 submit-btn-container">
                <button
                  className="btn grey darken-3 waves-effect waves-light"
                  type="submit"
                  name="action">
                  Submit
                </button>
              </div>
            </div>

          </div>
        </form>
    )
};

export default PromotionForm