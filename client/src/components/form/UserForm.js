import React from 'react';
import TextInput from "./TextInput";
import './form.css';

const UserForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="row top-panel">
        <div className="col s12 z-depth-1 form-card">
          <h5>New User</h5>
          <TextInput
            name="Username"
            label="Username"
            value={props.Username}
            onChange={props.handleInputChange}
          />
          <TextInput
            name="Name"
            label="Name"
            value={props.Name}
            onChange={props.handleInputChange}
          />
          <TextInput
            name="Email"
            label="Email"
            value={props.Email}
            onChange={props.handleInputChange}
          />
          <TextInput
            name="Phone"
            label="Phone Number"
            value={props.Phone}
            onChange={props.handleInputChange}
          />
          <TextInput
            name="PreferenceGroup"
            label="Preference Group"
            value={props.PreferenceGroup}
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

export default UserForm
