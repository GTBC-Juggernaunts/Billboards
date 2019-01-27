import React, { Component } from 'react';
import SideNav from './components/Navigation/SideNav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PromotionsControl from "./pages/PromotionsControl";
import PromotionsDashboard from "./pages/PromotionsDashboard"
import UsersPage from "./pages/UsersPage"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SideNav

          />
          <div className="page-wrapper">
            <Switch>
              <Route exact path ="/" component={PromotionsDashboard} />
              <Route exact path ="/promotions/dashboard" component={PromotionsDashboard} />
              <Route exact path ="/promotions/control" component={PromotionsControl} />
              <Route exact path ="/users" component={UsersPage} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
