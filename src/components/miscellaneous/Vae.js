import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class Vae extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.formName = 'vae';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ data, imgURL }) => {
    this.props.submitForm(
      'https://zxpgsttdeh.execute-api.ap-south-1.amazonaws.com/dev/vae',
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
            <div className="card mx-auto" style={{ width: '20rem' }}>
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="aligned"
              />
              <div className="card-body">
                <p className="card-text">Reconstructed Image</p>
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
            <h1 className="heading">Variational AutoEncoders</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This is a small VAE which can reconstruct left facing Indian car
              images with a white background.
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
                  label:
                    'Upload Left Facing Indian Car Image with white background',
                },
              ]}
              buttonText={{
                originalText: 'Reconstruct',
                loadingText: 'Reconstructing',
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

export default connect(mapStateToProps, { submitForm })(Vae);
