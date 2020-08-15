import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../actions';
import Form from './Form';

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

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-7 ml-auto">
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
          <div className="col-1" />
          <div className="col-4 mr-auto">
            <div className="row">
              <div className="col-12 mb-4">
                <h3 className="text-center">Outputs</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <img
                  src={`data:image/jpeg;base64,${this.props.modelForm.data}`}
                  className="card-img-top"
                  alt="swap"
                />
                <div className="card-body">
                  <p className="card-text">Swapped Image</p>
                </div>
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
            <h1 className="heading">Face Swap</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-6 mx-auto">
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
