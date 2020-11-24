import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class MachineTranslation extends React.Component {
  constructor(props) {
    super(props);

    this.formName = 'machinetranslation';
    this.submitButtonRef = React.createRef();

    this.state = {
      inputText: null,
    };
  }

  onSubmit = ({ data, otherData }) => {
    this.setState({ inputText: otherData.text });
    this.props.submitForm(
      'https://zr7hdctbgd.execute-api.ap-south-1.amazonaws.com/dev/translate',
      this.formName,
      data
    );
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-lg-6 mt-4 ml-auto text-center">
            <h4 className="text-center">German</h4>
            <div className="card mx-auto shadow p-3 bg-white rounded">
              <div className="card-body">
                <h5 className="card-text">{this.state.inputText}</h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-4 mr-auto text-center">
            <h4 className="text-center">English</h4>
            <div className="card mx-auto shadow p-3 bg-white rounded">
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
            <h1 className="heading">German to English Translation</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This is a machine translation model which can translate a sentence
              in German to English. Since the model was trained on a very small
              dataset it might not give completely accurate results.
            </p>
            <p>
              <i>
                Note: The model will give best results when the input sentence
                does not have any punctuations.
              </i>
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
                  name: 'text',
                  contentType: 'text',
                  label: 'Enter a German Sentence:',
                },
              ]}
              buttonText={{
                originalText: 'Übersetzen',
                loadingText: 'Übersetzen',
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

export default connect(mapStateToProps, { submitForm })(MachineTranslation);
