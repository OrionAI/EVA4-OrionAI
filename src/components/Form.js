import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderFormField, renderSubmitButton } from '../utils';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.submitButtonRef = React.createRef();
  }

  onSubmit = formValues => {
    const data = new FormData();
    data.append('image', formValues.image[0]);

    this.props.onSubmit(data, URL.createObjectURL(formValues.image[0]));
  };

  render() {
    return (
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

const mapStateToProps = ({ loadingForm }) => {
  return { loadingForm };
};

export default connect(mapStateToProps)(reduxForm({ validate })(Form));
