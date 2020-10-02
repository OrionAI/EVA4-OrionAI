import _ from 'lodash';
import React from 'react';

export const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }
};

export const renderImageField = ({
  input,
  label,
  required,
  formGroupClassName,
  meta,
}) => {
  const errorClassName = `${
    required && meta.touched && meta.error ? 'is-invalid' : ''
  }`;
  return (
    <div className={`form-group ${formGroupClassName}`}>
      <label>{label}</label>
      <div className={`input-group ${errorClassName}`}>
        <input
          {..._.omit(input, 'value')}
          type="file"
          className="form-control-file"
        />
      </div>
      {renderError(meta)}
    </div>
  );
};

export const renderDropdownField = ({
  input,
  label,
  required,
  formGroupClassName,
  options,
  meta,
}) => {
  const errorClassName = `${
    required && meta.touched && meta.error ? 'is-invalid' : ''
  }`;
  return (
    <div className={`form-group ${formGroupClassName}`}>
      <label>{label}</label>
      <div className={`input-group ${errorClassName}`}>
        <select {...input} className="form-control custom-select">
          <option value="">Choose...</option>
          {_.map(options, (value, key) => {
            if (key !== '') {
              return (
                <option key={key} value={key}>
                  {value[0]}
                </option>
              );
            }
            return '';
          })}
        </select>
      </div>
      {renderError(meta)}
    </div>
  );
};

export const renderFormField = ({
  input,
  contentType,
  label,
  required,
  formGroupClassName,
  options,
  meta,
}) => {
  if (contentType === 'image') {
    return renderImageField({
      input,
      label,
      required,
      formGroupClassName,
      meta,
    });
  } else if (contentType === 'dropdown') {
    return renderDropdownField({
      input,
      label,
      required,
      formGroupClassName,
      options,
      meta,
    });
  }
  return '';
};

export const renderSubmitButton = ({
  loading,
  originalText,
  loadingText,
  onClick,
  btnColor,
  ref,
}) => {
  if (!btnColor) {
    btnColor = 'primary';
  }
  if (loading) {
    return (
      <button className={`btn btn-${btnColor}`} ref={ref} disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        &nbsp;&nbsp;{loadingText}
      </button>
    );
  } else {
    return (
      <button className={`btn btn-${btnColor}`} ref={ref} onClick={onClick}>
        {originalText}
      </button>
    );
  }
};
