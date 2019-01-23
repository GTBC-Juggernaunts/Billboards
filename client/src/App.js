import React, { Component } from 'react';
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PromotionsPage from "./pages/PromotionsPage";
import UsersPage from "./pages/UsersPage"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path ="/" component={PromotionsPage} />
            <Route exact path ="/promotion" component={PromotionsPage} />
            <Route exact path ="/user" component={UsersPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
