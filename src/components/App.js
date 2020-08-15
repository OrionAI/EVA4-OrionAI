import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Navbar from './Navbar';
import Home from './Home';
import ResNet34 from './ResNet34';
import MobileNetV2 from './MobileNetV2';
import FaceAlignment from './FaceAlignment';
import FaceSwap from './FaceSwap';
import Footer from './Footer';

import '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentPath = {
      '/': 'home',
      '/mobilenetv2': 'mobilenetv2',
      '/resnet34': 'resnet34',
      '/align': 'facealignment',
      '/swap': 'faceswap',
    };
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router history={history}>
            <Navbar componentPath={this.componentPath} />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/resnet34" exact component={ResNet34} />
                <Route path="/mobilenetv2" exact component={MobileNetV2} />
                <Route path="/align" exact component={FaceAlignment} />
                <Route path="/swap" exact component={FaceSwap} />
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
