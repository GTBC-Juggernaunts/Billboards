import React from "react";
import API from "../utils/API";
import userForm from "../components/form/UserForm";
import './page.css';
import Table from "../components/table/Table";
import moment from "moment";


class UsersControlPage extends React.Component {
  state = {
    data:[],
    Username: "",
    Name: "",
    Email: "",
    PhoneNumber: 9999999999,
    PreferenceGroup: ""
  };

  reloadData = () => {
    API.getUsers()
      .then(res => {
        console.log(res);
        let data = [];
        res.data.forEach(user => {
          data.push({
            Username: user.Username,
            Name: user.Name,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            PreferenceGroup: user.PreferenceGroup
          })
        });

        this.setState({
          data
        })
      })
  };

  componentDidMount() {
    this.reloadData();
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
    API.saveUser(this.state)
      .then(res => {
        console.log("axiosresponse",res);
        if(res.status === 200) {
          alert("New User Successfully Added")
        }
        else {
          alert("An error has occurred. Please check the console.")
        }
      })
      .then(
        this.setState({
          Username: "",
          Name: "",
          Email: "",
          PhoneNumber: 9999999999,
          PreferenceGroup: ""
        }))
      .then(this.reloadData());
  };

  columns = [
    { Header: 'Username', accessor: 'Username'},
    { Header: 'Name', accessor: 'Name'},
    { Header: 'Email', accessor: 'Email'},
    { Header: 'PhoneNumber', accessor: 'PhoneNumber'},
    { Header: 'Preference Group', accessor: 'PreferenceGroup'}
  ];

  render() {
    return(
      <div>Users Page Goes Here</div>
    )
  }
}

export default UsersControlPage