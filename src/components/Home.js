import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
        <div className="col-6 text-right">
          <Link to="/align">
            <button type="button" className="btn border border-secondary">
              Face Alignment
            </button>
          </Link>
        </div>
        <div className="col-6 text-left">
          <Link to="/swap">
            <button type="button" className="btn border border-secondary">
              Face Swap
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
