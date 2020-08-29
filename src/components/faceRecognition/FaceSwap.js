import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class FaceSwap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceImageURL: null,
      targetImageURL: null,
    };

    this.formName = 'faceswap';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = (data, imgURL) => {
    this.props.submitForm(
      'https://taqm4e1fg3.execute-api.ap-south-1.amazonaws.com/dev/swap',
      this.formName,
      data
    );

    this.setState({
      sourceImageURL: imgURL.source,
      targetImageURL: imgURL.target,
    });
  };

  renderOutputSmallDisplay() {
    return (
      <React.Fragment>
        <div className="col-12 d-block d-md-none mx-auto">
          <div className="row">
            <div className="col-12 mb-2">
              <h3 className="text-center">Inputs</h3>
            </div>
            <div className="col-12">
              <div className="card">
                <img
                  src={this.state.sourceImageURL}
                  className="card-img-top"
                  alt="source"
                />
                <div className="card-body">
                  <p className="card-text">Source Image</p>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="card">
                <img
                  src={this.state.targetImageURL}
                  className="card-img-top"
                  alt="target"
                />
                <div className="card-body">
                  <p className="card-text">Target Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-block d-md-none mx-auto">
          <div className="row">
            <div className="col-12 mt-5 mb-2">
              <h3 className="text-center">Outputs</h3>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="swap"
              />
              <div className="card-body">
                <p className="card-text">Swapped Image</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderOutputLargeDisplay() {
    return (
      <React.Fragment>
        <div className="col-7 d-none d-md-block ml-auto">
          <div className="row">
            <div className="col-12 mb-4">
              <h3 className="text-center">Inputs</h3>
            </div>
            <div className="col-6">
              <div className="card">
                <img
                  src={this.state.sourceImageURL}
                  className="card-img-top"
                  alt="source"
                />
                <div className="card-body">
                  <p className="card-text">Source Image</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <img
                  src={this.state.targetImageURL}
                  className="card-img-top"
                  alt="target"
                />
                <div className="card-body">
                  <p className="card-text">Target Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 d-none d-md-block" />
        <div className="col-4 d-none d-md-block mr-auto">
          <div className="row">
            <div className="col-12 mb-4">
              <h3 className="text-center">Outputs</h3>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="swap"
              />
              <div className="card-body">
                <p className="card-text">Swapped Image</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      if (this.props.modelForm.data.result === 'success') {
        return (
          <div className="row mt-5">
            {this.renderOutputSmallDisplay()}
            {this.renderOutputLargeDisplay()}
          </div>
        );
      } else {
        return (
          <div className="row mt-5">
            <div className="col-12">
              <div className="alert alert-danger">
                {this.props.modelForm.data.data}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    return '';
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1 className="heading">Face Swap</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-8 mx-auto">
            <p align="justify">
              This model uses dlib to perform face swapping tasks. The face of
              the source image will be swapped to the target image face. Upload
              the images below to run the model.
            </p>
            <p align="justify">
              <i>
                Note: The faces in both the images should have the same
                alignment.
              </i>
            </p>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                {
                  name: 'source',
                  contentType: 'image',
                  label: 'Upload Source Image',
                },
                {
                  name: 'target',
                  contentType: 'image',
                  label: 'Upload Target Image',
                },
              ]}
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

export default connect(mapStateToProps, { submitForm })(FaceSwap);
