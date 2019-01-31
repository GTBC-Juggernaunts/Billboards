import React, { Component } from 'react';
import SideNav from './components/Navigation/SideNav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PromotionsControlPage from "./pages/PromotionsControlPage";
import DashboardPage from "./pages/DashboardPage"
import UsersControlPage from "./pages/UsersControlPage"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SideNav

          />
          <div className="sidebar-area left">
            <div className="sidebar-text">
              <span className="sidebar-text">Digital Billboards</span>
            </div>
          </div>
          <div className="page-wrapper">
            <Switch>
              <Route exact path ="/" component={DashboardPage} />
              <Route exact path ="/dashboard" component={DashboardPage} />
              <Route exact path ="/promotions" component={PromotionsControlPage} />
              <Route exact path ="/users" component={UsersControlPage} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
