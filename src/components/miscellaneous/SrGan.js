import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class SrGan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.formName = 'srgan';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ data, imgURL }) => {
    this.props.submitForm(
      'https://kft1ntmfe2.execute-api.ap-south-1.amazonaws.com/dev/srgan',
      this.formName,
      data
    );

    this.setState({ imageURL: imgURL.image });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-md-6 mt-4 ml-auto text-center">
            <div className="card mx-auto" style={{ width: '20rem' }}>
              <img
                src={this.state.imageURL}
                className="card-img-top"
                alt="source"
              />
              <div className="card-body">
                <p className="card-text">Input Image</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4 mr-auto text-center">
            <div className="card mx-auto" style={{ width: '40rem' }}>
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="aligned"
              />
              <div className="card-body">
                <p className="card-text">High Resolution Image</p>
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
            <h1 className="heading">Super Resolution GAN</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This is a Super Resolution Generative Adversarial Network (SRGAN).
              It can convert low resolution flying drone images to high quality
              resolution images.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                {
                  name: 'image',
                  contentType: 'image',
                  label: 'Upload flying drone image',
                },
              ]}
              buttonText={{
                originalText: 'Generate',
                loadingText: 'Generating',
              }}
            />
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

export default connect(mapStateToProps, { submitForm })(SrGan);
