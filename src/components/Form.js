import _ from 'lodash';
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
    let imgURL = {};
    for (let i in formValues) {
      data.append(i, formValues[i][0]);
      imgURL[i] = URL.createObjectURL(formValues[i][0]);
    }
    this.props.onSubmit(data, imgURL);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {_.map(this.props.fields, item => {
          return (
            <Field
              name={item.name}
              key={item.name}
              component={renderFormField}
              contentType={item.contentType}
              label={item.label}
              required
            />
          );
        })}
        <div className="row mt-3">
          <div className="col mx-auto">
            {renderSubmitButton({
              loading: this.props.loadingForm.includes(this.props.form),
              originalText: 'Predict',
              loadingText: 'Predicting...',
              ref: this.submitButtonRef,
            })}
          </div>
          <div className="col-12">
            <small>
              *The model might not give predictions for the first 1-2 times. In
              such cases, please try again.
            </small>
          </div>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.image) {
    errors.image = 'Please upload an image';
  }

  return errors;
};

const mapStateToProps = ({ loadingForm }) => {
  return { loadingForm };
};

export default connect(mapStateToProps)(reduxForm({ validate })(Form));
