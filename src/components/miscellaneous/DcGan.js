import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { submitGetForm } from '../../actions';
import { renderSubmitButton } from '../../utils';

class DcGan extends React.Component {
  constructor(props) {
    super(props);
    this.submitButtonRef = React.createRef();
  }

  onSubmit = () => {
    this.props.submitGetForm(
      'https://etm0x19qn5.execute-api.ap-south-1.amazonaws.com/dev/gan',
      this.props.form
    );
  };

  renderOutput() {
    if (this.props.modelForm.name === this.props.form) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-md-6 mt-4 mx-auto text-center">
            <div className="card mx-auto" style={{ width: '20rem' }}>
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="pose"
              />
              <div className="card-body">
                <p className="card-text">Generated Car Image</p>
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
            <h1 className="heading">DC Generative Advesarial Network</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This model is a Deep Convolutional Generative Adversarial Network.
              It can be used to generate images of Indian cars. Please click the
              generate button below to generate a car image.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="row mt-3">
                <div className="col mx-auto">
                  {renderSubmitButton({
                    loading: this.props.loadingForm.includes(this.props.form),
                    originalText: 'Generate',
                    loadingText: 'Generating...',
                    ref: this.submitButtonRef,
                  })}
                </div>
                <div className="col-12">
                  <small>
                    *The model might not give predictions for the first 1-2
                    times. In such cases, please try again.
                  </small>
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

const mapStateToProps = ({ modelForm, loadingForm }) => {
  return { modelForm, loadingForm };
};

export default connect(mapStateToProps, { submitGetForm })(
  reduxForm({ form: 'dcgan' })(DcGan)
);
