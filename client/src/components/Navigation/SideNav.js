import React from 'react';
import './navigation.css';

class SideNav extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <li className="sidebar-title"></li>
          <li><a className="waves-effect" href={props.promoDashbaordLink}><i className="material-icons">Promotion
            Dashboard</i>Dashboard</a></li>
          <li><a className="waves-effect" href={props.newPromotionLink}>Create Promotions</a></li>
          <li>
            <div className="divider"></div>
          </li>
          <li><a className="subheader">User Management</a></li>
          <li><a className="waves-effect" href={props.userDashboardLink}><i className="material-icons">Promotion
            Dashboard</i>User Dashboard</a></li>
          <li><a className="waves-effect" href={props.newUserLink}>Create User</a></li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    )
  }
};

export default SideNav