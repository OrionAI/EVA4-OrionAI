import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Navbar from './Navbar';
import Home from './Home';
import ResNet34 from './classification/ResNet34';
import MobileNetV2 from './classification/MobileNetV2';
import FaceAlignment from './faceRecognition/FaceAlignment';
import FaceSwap from './faceRecognition/FaceSwap';
import FaceRecognition from './faceRecognition/FaceRecognition';
import HumanPoseEstimation from './miscellaneous/HumanPoseEstimation';
import DcGan from './miscellaneous/DcGan';
import Vae from './miscellaneous/Vae';
import StyleTransfer from './miscellaneous/StyleTransfer';
import SrGan from './miscellaneous/SrGan';
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
      '/recognize': 'facerecognition',
      '/pose': 'humanposeestimation',
      '/dcgan': 'dcgan',
      '/vae': 'vae',
      '/style': 'styletransfer',
      '/srgan': 'srgan',
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
                <Route path="/recognize" exact component={FaceRecognition} />
                <Route path="/pose" exact component={HumanPoseEstimation} />
                <Route path="/dcgan" exact component={DcGan} />
                <Route path="/vae" exact component={Vae} />
                <Route path="/style" exact component={StyleTransfer} />
                <Route path="/srgan" exact component={SrGan} />
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
