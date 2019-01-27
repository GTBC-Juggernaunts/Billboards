import React from 'react';
import './navigation.css';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class SideNav extends React.Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    return (
      <div className="sidenav-container">
        <ul id="slide-out" className="sidenav">
          <li className="sidebar-title">Digital Billboards</li>
          <li><a className="subheader">Promotion Management</a></li>
          <li><a className="waves-effect" href="/promotions/dashboard">Promotions Dashboard</a></li>
          <li><a className="waves-effect" href="/promotions/control">Create Promotions</a></li>
          <li>
            <div className="divider"></div>
          </li>
          <li><a className="subheader">User Management</a></li>
          <li><a className="waves-effect" href="/users/dashboard">User Dashboard</a></li>
          <li><a className="waves-effect" href="/users/control">Create User</a></li>
        </ul>
        <div className="collapsed-sidebar">
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
      </div>
    )
  }
};

export default SideNav