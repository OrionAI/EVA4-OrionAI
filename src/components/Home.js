import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <h1 className="heading">Welcome to Orion AI</h1>
        </div>
      </div>
      <div className="btn-toolbar" role="toolbar">
        <div className="col-12 text-center">
          Please select a model below to continue
        </div>
        <div className="btn-group col-2 mx-auto mt-3" role="group">
          <Link to="/mobilenetv2">
            <button type="button" className="btn border border-secondary">
              MobileNet V2
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
