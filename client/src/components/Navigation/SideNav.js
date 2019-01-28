import React from 'react';
import './navigation.css';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activePage: "/"
    };
  }
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
          <li><a className="waves-effect" href="/dashboard">Dashboard</a></li>
          <li>
            <div className="divider"></div>
          </li>
          <li><a className="waves-effect" href="/promotions">Promotions Control Panel</a></li>
          <li>
            <div className="divider"></div>
          </li>
          <li><a className="waves-effect" href="/users">Users Control Panel</a></li>
        </ul>
        <div className="collapsed-sidebar">
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
        <div className={"page-title"}><span>{this.state.activePage}</span></div>
      </div>
    )
  }
};

export default SideNav