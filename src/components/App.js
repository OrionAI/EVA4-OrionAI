import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Navbar from './Navbar';
import Home from './Home';
import ResNet34 from './ResNet34';
import Footer from './Footer';

import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router history={history}>
            <Navbar history={history} />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/resnet34" exact component={ResNet34} />
              </Switch>
            </div>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
