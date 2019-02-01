import React from "react";
import API from "../utils/API";
import UserForm from "../components/form/UserForm";
import './page.css';
import Table from "../components/table/Table";



class UsersControlPage extends React.Component {
  state = {
    data:[],
    Username: "",
    Name: "",
    Email: "",
    Phone: 0,
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
            Phone: user.Phone,
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
          Phone: 9999999999,
          PreferenceGroup: ""
        }))
      .then(this.reloadData());
  };

  columns = [
    { Header: 'Username', accessor: 'Username'},
    { Header: 'Name', accessor: 'Name'},
    { Header: 'Email', accessor: 'Email'},
    { Header: 'PhoneNumber', accessor: 'Phone'},
    { Header: 'Preference Group', accessor: 'PreferenceGroup'}
  ];

  render() {
    return(
      <div className="mainContainer">
        <div className="row">
          <div className="wide-container">
            <div className="col s6">
              <UserForm
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                Username={this.state.Username}
                Name={this.state.Name}
                Email={this.state.Email}
                Phone={this.state.Phone}
                PreferenceGroup={this.state.PreferenceGroup}
              />
            </div>
            <div className="col s6">
              Something to go here
            </div>
          </div>
        </div>
        <div className="row">
          <div className="wide-container">
            <div className="col s12">
              <Table
                data={this.state.data}
                columns={this.columns}
                defaultPageSize={8}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UsersControlPage