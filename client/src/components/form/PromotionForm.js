import React from 'react';
import API from "../../utils/API";
import TextInput from "./TextInput"

const PromotionForm = props => {
    return (
      <div className="row">
        <form onSubmit={props.handleSubmit}>
          <div className="row">
            <div className="col s6 offset-s3 z-depth-1">
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
};

export default PromotionForm