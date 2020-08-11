import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Navbar from './Navbar';
import Home from './Home';
import MobileNetV2 from './MobileNetV2';
import Footer from './Footer';

import '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentPath = {
      '/': 'home',
      '/mobilenetv2': 'mobilenetv2',
    };
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router history={history}>
            <Navbar history={history} componentPath={this.componentPath} />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/mobilenetv2" exact component={MobileNetV2} />
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
