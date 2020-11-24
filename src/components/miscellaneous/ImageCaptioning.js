import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class ImageCaptioning extends React.Component {
  constructor(props) {
    super(props);

    this.formName = 'imagecaptioning';
    this.submitButtonRef = React.createRef();

    this.state = {
      objectURL: null,
    };
  }

  onSubmit = ({ data, objectURL }) => {
    this.props.submitForm(
      'https://h6wqsfa9dh.execute-api.ap-south-1.amazonaws.com/dev/caption',
      this.formName,
      data
    );

    this.setState({ objectURL: objectURL.image });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-lg-6 mt-4 ml-auto text-center">
            <h4 className="text-center">Input Image</h4>
            <div
              className="card mx-auto mt-3 shadow bg-white rounded"
              style={{ width: '20rem' }}
            >
              <img
                src={this.state.objectURL}
                className="card-img-top"
                alt="source"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-4 mr-auto text-center">
            <h4 className="text-center">Generated Caption</h4>
            <div className="card mx-auto mt-3 shadow bg-white rounded">
              <div className="card-body">
                <h5 className="card-title">{this.props.modelForm.data.data}</h5>
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
            <h1 className="heading">Image Captioning</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-8 mx-auto">
            <p align="justify">
              This is an image caption generation model based on the
              <i>"Show, Attend, and Tell"</i> paper. The model is trained on
              Flickr8k dataset.
            </p>
            Parameters:
            <ul>
              <li>
                Image Feature Extractor: Pre-trained ResNet-18 on ImageNet
                dataset
              </li>
              <li>Embedding Dimensions: 128</li>
              <li>Attention Dimensions: 128</li>
              <li>Decoder Dimensions: 128</li>
              <li>Batch Size: 32</li>
              <li>Decoder Learning Rate: 4e-4</li>
            </ul>
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
                  contentType: 'file',
                  label: 'Upload an image',
                },
              ]}
              buttonText={{
                originalText: 'Generate Caption',
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

export default connect(mapStateToProps, { submitForm })(ImageCaptioning);
