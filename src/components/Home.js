import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  renderFaceRecognitionLinks() {
    return (
      <React.Fragment>
        {/* For small screens */}
        <div className="col-12 d-block d-md-none mx-auto text-center">
          <Link to="/align">
            <button type="button" className="btn border border-secondary">
              Face Alignment
            </button>
          </Link>
        </div>
        <div className="col-12 d-block d-md-none mx-auto my-3 text-center">
          <Link to="/swap">
            <button type="button" className="btn border border-secondary">
              Face Swap
            </button>
          </Link>
        </div>
        <div className="col-12 d-block d-md-none mx-auto text-center">
          <Link to="/recognize">
            <button type="button" className="btn border border-secondary">
              Face Recognition
            </button>
          </Link>
        </div>
        {/* For Large Screens */}
        <div className="col-3 d-none d-md-block ml-auto text-right">
          <Link to="/align">
            <button type="button" className="btn border border-secondary">
              Face Alignment
            </button>
          </Link>
        </div>
        <div className="col-2 d-none d-md-block text-center">
          <Link to="/swap">
            <button type="button" className="btn border border-secondary">
              Face Swap
            </button>
          </Link>
        </div>
        <div className="col-3 d-none d-md-block mr-auto text-left">
          <Link to="/recognize">
            <button type="button" className="btn border border-secondary">
              Face Recognition
            </button>
          </Link>
        </div>
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
        <div className="row">
          <div className="col-12 text-center">
            Please select a model below to continue
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Classification Models</h3>
          </div>
          <div className="col-6 text-right">
            <Link to="/resnet34">
              <button type="button" className="btn border border-secondary">
                ResNet34
              </button>
            </Link>
          </div>
          <div className="col-6 text-left">
            <Link to="/mobilenetv2">
              <button type="button" className="btn border border-secondary">
                MobileNet V2
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Face Recognition Models</h3>
          </div>
          {this.renderFaceRecognitionLinks()}
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Pose Estimation Models</h3>
          </div>
          <div className="col-6 text-center mx-auto">
            <Link to="/pose">
              <button type="button" className="btn border border-secondary">
                HumanPoseEstimation
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Generative Models</h3>
          </div>
          <div className="col-6 text-center mx-auto">
            <Link to="/dcgan">
              <button type="button" className="btn border border-secondary">
                DCGAN
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>AutoEncoders</h3>
          </div>
          <div className="col-6 text-center mx-auto">
            <Link to="/vae">
              <button type="button" className="btn border border-secondary">
                VAE
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Neural Style Transfer</h3>
          </div>
          <div className="col-6 text-center mx-auto">
            <Link to="/style">
              <button type="button" className="btn border border-secondary">
                Neural Style Transfer
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center mt-5 mb-3">
            <h3>Super Resolution GAN</h3>
          </div>
          <div className="col-6 text-center mx-auto">
            <Link to="/srgan">
              <button type="button" className="btn border border-secondary">
                SRGAN
              </button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
