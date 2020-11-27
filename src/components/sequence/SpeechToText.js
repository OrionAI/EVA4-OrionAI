import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class SpeechToText extends React.Component {
  constructor(props) {
    super(props);

    this.formName = 'speechtotext';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ formData }) => {
    this.props.submitForm({
      url: [
        'https://prmttt5z7a.execute-api.ap-south-1.amazonaws.com/dev/convert',
        'https://8krxpgofzh.execute-api.ap-south-1.amazonaws.com/dev/stt',
      ],
      formName: this.formName,
      formData,
      type: 'audio/wav',
    });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-lg-6 mt-4 mx-auto text-center">
            <h4 className="text-center">Predicted Text</h4>
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
            <h1 className="heading">Speech to Text</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-8 mx-auto">
            <p align="justify">
              This is a simple Speech-to-Text (STT) model which can generate
              transcriptions of <i>one-word audio recordings</i>. For now, only
              the following words are supported.
            </p>
            <div className="row">
              <div className="col">
                <ul>
                  <li>bed</li>
                  <li>bird</li>
                  <li>cat</li>
                  <li>dog</li>
                  <li>down</li>
                  <li>eight</li>
                  <li>five</li>
                  <li>four</li>
                  <li>go</li>
                  <li>happy</li>
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>house</li>
                  <li>left</li>
                  <li>marvin</li>
                  <li>nine</li>
                  <li>no</li>
                  <li>off</li>
                  <li>on</li>
                  <li>one</li>
                  <li>right</li>
                  <li>seven</li>
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>sheila</li>
                  <li>six</li>
                  <li>stop</li>
                  <li>three</li>
                  <li>tree</li>
                  <li>two</li>
                  <li>up</li>
                  <li>wow</li>
                  <li>yes</li>
                  <li>zero</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                {
                  name: 'audio',
                  contentType: 'audio',
                  label: 'Record audio',
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

export default connect(mapStateToProps, { submitForm })(SpeechToText);
