import React from 'react';
import { connect } from 'react-redux';

import { recognizeFace } from '../../actions';
import Form from '../Form';

class FaceRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.formName = 'facerecognition';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ data, imgURL }) => {
    this.props.recognizeFace({
      alignURL:
        'https://tq1mihfdxd.execute-api.ap-south-1.amazonaws.com/dev/align',
      recognizeURL:
        'https://3ggdkd4lo4.execute-api.ap-south-1.amazonaws.com/dev/recognize',
      formName: this.formName,
      formValues: data,
    });

    this.setState({ imageURL: imgURL.image });
  };

  renderOutputSmallDisplay() {
    return (
      <React.Fragment>
        <div className="col-12 d-block d-md-none mx-auto text-center">
          <h3 className="text-center mb-2">Input Image</h3>
          <img
            src={this.state.imageURL}
            className="card-img-top"
            alt="input"
            style={{ width: '20rem' }}
          />
        </div>
        <div className="col-12 d-block d-md-none mx-auto text-center">
          <h3 className="text-center mt-5 mb-2">Prediction</h3>
          <h4 style={{ marginTop: '1rem' }}>
            {this.props.modelForm.data.data['predicted_name']}
          </h4>
        </div>
      </React.Fragment>
    );
  }

  renderOutputLargeDisplay() {
    return (
      <React.Fragment>
        <div className="col-7 d-none d-md-block ml-auto text-center">
          <h3 className="text-center mb-5">Input Image</h3>
          <img
            src={this.state.imageURL}
            className="card-img-top"
            alt="input"
            style={{ width: '30rem' }}
          />
        </div>
        <div className="col-1" />
        <div className="col-4 d-none d-md-block mr-auto text-center">
          <h3 className="text-center mb-5">Prediction</h3>
          <h2 style={{ marginTop: '10rem' }}>
            {this.props.modelForm.data.data['predicted_name']}
          </h2>
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
            <h1 className="heading">Face Recognition</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This model can perform face recognition for the following persons
              below
            </p>
            <ul>
              <li>Donald Trump</li>
              <li>Elon Musk</li>
              <li>Emma Stone</li>
              <li>Emma Watson</li>
              <li>Geoffrey Hinton</li>
              <li>Hrithik Roshan</li>
              <li>Narendra Modi</li>
              <li>Priyanka Chopra</li>
              <li>Tom Cruise</li>
              <li>Will Smith</li>
            </ul>
            <p>
              If the image does not belong to any of the people mentioned above
              it will not return a correct result.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                { name: 'image', contentType: 'file', label: 'Upload Image' },
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

export default connect(mapStateToProps, { recognizeFace })(FaceRecognition);
