import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class SentimentAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.formName = 'sentimentanalysis';
    this.submitButtonRef = React.createRef();

    this.state = {
      inputText: null,
    };
  }

  onSubmit = ({ formData, otherData }) => {
    this.setState({ inputText: otherData.text });
    this.props.submitForm({
      url:
        'https://zxj1gtrcp1.execute-api.ap-south-1.amazonaws.com/dev/sentiment',
      formName: this.formName,
      formData,
    });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          <div className="col-12 col-lg-6 mt-4 ml-auto text-center">
            <h4 className="text-center">Movie Review</h4>
            <div className="card mx-auto shadow p-3 bg-white rounded">
              <div className="card-body">
                <h5 className="card-text">{this.state.inputText}</h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-4 mr-auto text-center">
            <h4 className="text-center">Sentiment</h4>
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
            <h1 className="heading">Sentiment Analysis</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This is a sentiment analysis model trained on the IMDb reviews
              dataset. The model can predict whether a given movie review is
              positive or negative.
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
                  label: 'Enter Movie Review:',
                },
              ]}
              buttonText={{
                originalText: 'Predict',
                loadingText: 'Predicting',
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

export default connect(mapStateToProps, { submitForm })(SentimentAnalysis);
