import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderFormField, renderSubmitButton } from '../utils';
import { submitForm } from '../actions';

class MobileNetV2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.submitButtonRef = React.createRef();
  }

  onSubmit = formValues => {
    const data = new FormData();
    data.append('image', formValues.image[0]);

    this.props.submitForm(
      'https://dkla5xrjb0.execute-api.ap-south-1.amazonaws.com/dev/classify',
      this.props.form,
      data
    );

    this.setState({ imageURL: URL.createObjectURL(formValues.image[0]) });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.props.form) {
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
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                name="image"
                component={renderFormField}
                contentType="image"
                label="Upload Image"
                required
              />
              <div className="row mt-3">
                <div className="col mx-auto">
                  {renderSubmitButton({
                    loading: this.props.loadingForm.includes(this.props.form),
                    originalText: 'Predict',
                    loadingText: 'Predicting...',
                    ref: this.submitButtonRef,
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>

        {this.renderOutput()}
      </React.Fragment>
    );
  }
}

const validate = formValues => {
  const errors = {};

  // console.log(formValues);
  if (!formValues.image) {
    errors.image = 'Please upload an image';
  }

  return errors;
};

const mapStateToProps = ({ loadingForm, modelForm }) => {
  return {
    loadingForm,
    modelForm,
  };
};

export default connect(mapStateToProps, { submitForm })(
  reduxForm({
    form: 'mobileNetV2',
    validate,
  })(MobileNetV2)
);
