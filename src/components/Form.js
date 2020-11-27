import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Recorder from './Recorder';
import { renderFormField, renderSubmitButton } from '../utils';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.submitButtonRef = React.createRef();
  }

  onSubmit = formValues => {
    const formData = new FormData();
    let objectURL = {};
    let otherData = {};
    for (let i in formValues) {
      if (typeof formValues[i] === 'object') {
        let objectItem = formValues[i];
        if (objectItem.length) {
          objectItem = objectItem[0];
        }
        formData.append(i, objectItem);
        objectURL[i] = URL.createObjectURL(objectItem);
      } else {
        formData.append(i, formValues[i]);
        otherData[i] = formValues[i];
      }
    }
    this.props.onSubmit({ formData, objectURL, otherData });
  };

  render() {
    let buttonText = {
      originalText: 'Predict',
      loadingText: 'Predicting...',
    };
    if (this.props.buttonText) {
      buttonText = this.props.buttonText;
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {_.map(this.props.fields, item => {
          if (item.contentType === 'audio') {
            return (
              <Field
                name={item.name}
                key={item.name}
                component={Recorder}
                label={item.label}
                required
              />
            );
          } else {
            return (
              <Field
                name={item.name}
                key={item.name}
                component={renderFormField}
                contentType={item.contentType}
                label={item.label}
                options={item.options}
                required
              />
            );
          }
        })}
        <div className="row mt-3">
          <div className="col mx-auto">
            {renderSubmitButton({
              loading: this.props.loadingForm.includes(this.props.form),
              ref: this.submitButtonRef,
              ...buttonText,
            })}
          </div>
          <div className="col-12">
            <small>
              *The model might take more than 1 min to give predictions for the
              first time.
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
