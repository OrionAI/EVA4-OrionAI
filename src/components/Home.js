import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  renderFaceRecognitionLinks() {
    return _.map(this.props.componentItems.faceRecognition.items, item => {
      return (
        <Link to={`/${item.link}`} key={item.link}>
          <button
            type="button"
            className="btn border border-secondary mr-2 mt-2"
          >
            {item.title}
          </button>
        </Link>
      );
    });
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
                  {_.map(
                    this.props.componentItems.classification.items,
                    item => {
                      return (
                        <Link to={`/${item.link}`} key={item.link}>
                          <button
                            type="button"
                            className="btn border border-secondary mx-2 mt-2"
                          >
                            {item.title}
                          </button>
                        </Link>
                      );
                    }
                  )}
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
          <div className="col mb-5 mx-auto">
            <div className="card shadow p-3 bg-white rounded">
              <div className="card-body text-center">
                <h3 className="card-title">NLP Models</h3>
                <div className="card-text">
                  {_.map(this.props.componentItems.nlp.items, item => {
                    return (
                      <Link to={`/${item.link}`} key={item.link}>
                        <button
                          type="button"
                          className="btn border border-secondary mx-2 mt-2"
                        >
                          {item.title}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {_.map(
            _.omit(
              _.omit(
                _.omit(this.props.componentItems, 'classification'),
                'faceRecognition'
              ),
              'nlp'
            ),
            componentItem => {
              return _.map(componentItem.items, item => {
                return (
                  <div className="col mb-5" key={item.link}>
                    <div className="card shadow p-3 bg-white rounded">
                      <div className="card-body text-center">
                        <h3 className="card-title">{item.title}</h3>
                        <div className="card-text">
                          <Link to={`/${item.link}`}>
                            <button
                              type="button"
                              className="btn border border-secondary mt-2"
                            >
                              {item.buttonText}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            }
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
