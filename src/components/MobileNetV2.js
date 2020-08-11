import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../actions';
import Form from './Form';

class MobileNetV2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.formName = 'mobileNetV2';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = (data, imageURL) => {
    this.props.submitForm(
      'https://dkla5xrjb0.execute-api.ap-south-1.amazonaws.com/dev/classify',
      this.formName,
      data
    );

    this.setState({ imageURL });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-6 mx-auto">
            <div className="card" style={{ width: '20rem' }}>
              <img
                src={this.state.imageURL}
                className="card-img-top"
                alt="dum"
              />
              <div className="card-body">
                <h5 className="card-title">Prediction</h5>
                <p className="card-text">
                  {this.props.modelForm.data['predicted name']}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return '';
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1 className="heading">MobileNetV2</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-6 mx-auto">
            <Form form={this.formName} onSubmit={this.onSubmit} />
          </div>
        </div>

        {this.renderOutput()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ modelForm }) => {
  return { modelForm };
};

export default connect(mapStateToProps, { submitForm })(MobileNetV2);
