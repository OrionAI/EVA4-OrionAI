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
import ImageCaptioning from './miscellaneous/ImageCaptioning';
import SentimentAnalysis from './sequence/SentimentAnalysis';
import MachineTranslation from './sequence/MachineTranslation';
import SpeechToText from './sequence/SpeechToText';
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
          {
            title: 'CNNs + LSTMs',
            link: 'imagecaptioning',
            buttonText: 'Image Captioning',
          },
        ],
      },
      nlp: {
        title: 'NLP & Audio',
        items: [
          {
            title: 'Sentiment Analysis',
            link: 'sentimentanalysis',
          },
          {
            title: 'Machine Translation',
            link: 'machinetranslation',
          },
          {
            title: 'Speech to Text',
            link: 'speechtotext',
          },
        ],
      },
    };
  }

  renderBackendShutdownAlert() {
    return (
      <div class="alert alert-success mt-5" role="alert">
        <h4 class="alert-heading">Backend Shutdown!</h4>
        <p>
          In order to save server costs, all the backend services for this
          portal have been shutdown. This means that none of the models in this
          portal will give any output.
        </p>
        <hr />
        <p class="mb-0">
          To get the backend functionality back, please refer to the{' '}
          <a
            href="https://github.com/OrionAI/EVA4-Phase-2"
            className="alert-link"
          >
            EVA4-Phase-2
          </a>{' '}
          GitHub repository for instructions to setup your own backend servers
          on AWS.
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router history={history}>
            <Navbar componentItems={this.componentItems} />
            <div className="container">
              {this.renderBackendShutdownAlert()}
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
                <Route
                  path="/imagecaptioning"
                  exact
                  component={ImageCaptioning}
                />
                <Route
                  path="/sentimentanalysis"
                  exact
                  component={SentimentAnalysis}
                />
                <Route
                  path="/machinetranslation"
                  exact
                  component={MachineTranslation}
                />
                <Route path="/speechtotext" exact component={SpeechToText} />
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
