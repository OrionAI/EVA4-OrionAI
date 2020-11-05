import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class HumanPoseEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null,
    };

    this.formName = 'humanposeestimation';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ data, imgURL }) => {
    this.props.submitForm(
      'https://wrad2oqme9.execute-api.ap-south-1.amazonaws.com/dev/pose',
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
                alt="pose"
              />
              <div className="card-body">
                <p className="card-text">Pose Estimated Image</p>
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
            <h1 className="heading">Human Pose Estimation</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This model uses a ResNet-50 model pre-trained on the MPII dataset
              to predict and draw pose of a human in the input image.
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
                  label: 'Upload Face Image',
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

export default connect(mapStateToProps, { submitForm })(HumanPoseEstimation);
