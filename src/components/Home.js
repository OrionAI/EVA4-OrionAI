import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.cardItems = [
      {
        title: 'Pose Estimation Models',
        link: 'pose',
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
        link: 'style',
        buttonText: 'Neural Style Transfer',
      },
      {
        title: 'Super Resolution GAN',
        link: 'srgan',
        buttonText: 'SRGAN',
      },
    ];
  }
  renderFaceRecognitionLinks() {
    return (
      <React.Fragment>
        {/* For small screens */}
        <Link to="/align">
          <button type="button" className="btn border border-secondary">
            Face Alignment
          </button>
        </Link>
        <Link to="/swap">
          <button type="button" className="btn border border-secondary mx-2">
            Face Swap
          </button>
        </Link>
        <Link to="/recognize">
          <button type="button" className="btn border border-secondary">
            Face Recognition
          </button>
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <h1 className="heading">
              <img
                src={`${process.env.PUBLIC_URL}/orionai.png`}
                style={{ height: '5rem' }}
                alt="logo"
              />{' '}
              Welcome to Orion AI
            </h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 text-center">
            Please select a model below to continue
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col mb-5">
            <div className="card shadow p-3 bg-white rounded">
              <div className="card-body text-center">
                <h3 className="card-title">Classification Models</h3>
                <div className="card-text">
                  <Link to="/resnet34">
                    <button
                      type="button"
                      className="btn border border-secondary mr-3"
                    >
                      ResNet34
                    </button>
                  </Link>
                  <Link to="/mobilenetv2">
                    <button
                      type="button"
                      className="btn border border-secondary"
                    >
                      MobileNet V2
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card shadow p-3 bg-white rounded">
              <div className="card-body text-center">
                <h3 className="card-title">Face Recognition Models</h3>
                <div className="card-text">
                  {this.renderFaceRecognitionLinks()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {_.map(this.cardItems, cardItem => {
            return (
              <div className="col mb-5">
                <div className="card shadow p-3 bg-white rounded">
                  {/* <div className="card-header">
                    <h4>{cardItem.title}</h4>
                  </div> */}
                  <div className="card-body text-center">
                    <h3 className="card-title">{cardItem.title}</h3>
                    <div className="card-text">
                      <Link to={`/${cardItem.link}`}>
                        <button
                          type="button"
                          className="btn border border-secondary"
                        >
                          {cardItem.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
