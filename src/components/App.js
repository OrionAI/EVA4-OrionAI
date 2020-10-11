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
    this.componentItems = {
      classification: {
        title: 'Classification',
        items: [
          {
            title: 'ResNet34',
            link: 'resnet34',
          },
          {
            title: 'MobileNet V2',
            link: 'mobilenetv2',
          },
        ],
      },
      faceRecognition: {
        title: 'Face Recognition',
        items: [
          {
            title: 'Face Alignment',
            link: 'facealignment',
          },
          {
            title: 'Face Swap',
            link: 'faceswap',
          },
          {
            title: 'Face Recognition',
            link: 'facerecognition',
          },
        ],
      },
      miscellaneous: {
        title: 'Miscellaneous',
        items: [
          {
            title: 'Pose Estimation Models',
            link: 'humanposeestimation',
            buttonText: 'HumanPoseEstimation',
          },
          {
            title: 'Generative Models',
            link: 'dcgan',
            buttonText: 'DCGAN',
          },
          {
            title: 'AutoEncoders',
            link: 'vae',
            buttonText: 'VAE',
          },
          {
            title: 'Style Transfer',
            link: 'styletransfer',
            buttonText: 'Neural Style Transfer',
          },
          {
            title: 'Super Resolution GAN',
            link: 'srgan',
            buttonText: 'SRGAN',
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router history={history}>
            <Navbar componentItems={this.componentItems} />
            <div className="container">
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => (
                    <Home componentItems={this.componentItems} />
                  )}
                />
                <Route path="/resnet34" exact component={ResNet34} />
                <Route path="/mobilenetv2" exact component={MobileNetV2} />
                <Route path="/facealignment" exact component={FaceAlignment} />
                <Route path="/faceswap" exact component={FaceSwap} />
                <Route
                  path="/facerecognition"
                  exact
                  component={FaceRecognition}
                />
                <Route
                  path="/humanposeestimation"
                  exact
                  component={HumanPoseEstimation}
                />
                <Route path="/dcgan" exact component={DcGan} />
                <Route path="/vae" exact component={Vae} />
                <Route path="/styletransfer" exact component={StyleTransfer} />
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
