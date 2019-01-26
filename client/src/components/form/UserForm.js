import React from 'react';
import API from "../../utils/API";
import TextInput from "./TextInput"

class UserForm extends React.Component {
  state = {
    Username: "",
    Name: "",
    Email: "",
    Phone: "",
    HashedPassword: "",
    Salt: "",
    PreferenceTag: "",
    CouponsRedeemed: []
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
    console.log(this.state);
    API.
  }
}
