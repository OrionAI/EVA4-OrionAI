import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class ResNet34 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objectURL: null,
    };

    this.formName = 'resnet34';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ formData, objectURL }) => {
    this.props.submitForm({
      url:
        'https://ji5h693qhd.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
      formName: this.formName,
      formData,
    });

    this.setState({ objectURL: objectURL.image });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col">
            <div className="card mx-auto" style={{ width: '20rem' }}>
              <img
                src={this.state.objectURL}
                className="card-img-top"
                alt="dum"
              />
              <div className="card-body">
                <h5 className="card-title">Prediction</h5>
                <p className="card-text">
                  {this.props.modelForm.data['predicted name']}
                </p>
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
            <h1 className="heading">ResNet34</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This is a ResNet34 model trained on the ImageNet dataset.
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

export default connect(mapStateToProps, { submitForm })(ResNet34);
