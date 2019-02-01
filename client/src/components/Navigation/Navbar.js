import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-3">
          <a href="#!" className="brand-logo center">Digital Billboards - Control Panel</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/promotions/">Promotions</a></li>
            <li><a href="/users/">Users</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar