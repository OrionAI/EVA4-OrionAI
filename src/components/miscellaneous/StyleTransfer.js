import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class StyleTransfer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentImageURL: null,
      styleImageURL: null,
    };

    this.formName = 'styletransfer';
    this.submitButtonRef = React.createRef();
    this.styleMap = {
      1: ['Candy', `${process.env.PUBLIC_URL}/assets/styles/candy.jpg`],
      2: [
        'Composition VII',
        `${process.env.PUBLIC_URL}/assets/styles/composition_vii.jpg`,
      ],
      3: ['Feathers', `${process.env.PUBLIC_URL}/assets/styles/feathers.jpg`],
      4: ['La Muse', `${process.env.PUBLIC_URL}/assets/styles/la_muse.jpg`],
      5: ['Mosaic', `${process.env.PUBLIC_URL}/assets/styles/mosaic.jpg`],
      6: [
        'Starry Night',
        `${process.env.PUBLIC_URL}/assets/styles/starry_night.jpg`,
      ],
      7: [
        'The Scream',
        `${process.env.PUBLIC_URL}/assets/styles/the_scream.jpg`,
      ],
      8: ['Udnie', `${process.env.PUBLIC_URL}/assets/styles/udnie.jpg`],
      9: ['Wave', `${process.env.PUBLIC_URL}/assets/styles/wave.jpg`],
    };
  }

  onSubmit = ({ data, imgURL, otherData }) => {
    this.props.submitForm(
      'https://0g0e7jb2ni.execute-api.ap-south-1.amazonaws.com/dev/style',
      this.formName,
      data
    );

    this.setState({
      contentImageURL: imgURL.content,
      styleImageURL: this.styleMap[otherData.style][1],
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
                  src={this.state.contentImageURL}
                  className="card-img-top"
                  alt="content"
                />
                <div className="card-body">
                  <p className="card-text">Content Image</p>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="card">
                <img
                  src={this.state.styleImageURL}
                  className="card-img-top"
                  alt="style"
                />
                <div className="card-body">
                  <p className="card-text">Style Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-block d-md-none mx-auto">
          <div className="row">
            <div className="col-12 mt-5 mb-2">
              <h3 className="text-center">Output</h3>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="styled"
              />
              <div className="card-body">
                <p className="card-text">Styled Content Image</p>
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
                  src={this.state.contentImageURL}
                  className="card-img-top"
                  alt="content"
                />
                <div className="card-body">
                  <p className="card-text">Content Image</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <img
                  src={this.state.styleImageURL}
                  className="card-img-top"
                  alt="style"
                />
                <div className="card-body">
                  <p className="card-text">Style Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 d-none d-md-block" />
        <div className="col-4 d-none d-md-block mr-auto">
          <div className="row">
            <div className="col-12 mb-4">
              <h3 className="text-center">Output</h3>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                className="card-img-top"
                alt="styled"
              />
              <div className="card-body">
                <p className="card-text">Styled Content Image</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      return (
        <div className="row mt-5">
          {this.renderOutputSmallDisplay()}
          {this.renderOutputLargeDisplay()}
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
            <h1 className="heading">Neural Style Transfer</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-8 mx-auto">
            <p align="justify">
              This model uses MSG-Net to perform Neural Style Transfer. Upload
              your content image and select a style from one of the styles
              available below. The selected style will be applied to you content
              image.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3 className="heading">Available Styles</h3>
          </div>
          <div className="col">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5">
              {_.map(this.styleMap, (value, key) => {
                return (
                  <div className="col mb-4" key={key}>
                    <div className="card">
                      <img
                        src={value[1]}
                        className="card-img-top"
                        alt={value[0]}
                      />
                      <div className="card-body">
                        <p className="card-text">{value[0]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-11 col-lg-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                {
                  name: 'content',
                  contentType: 'file',
                  label: 'Upload Content Image',
                },
                {
                  name: 'style',
                  contentType: 'dropdown',
                  label: 'Select Style Image',
                  options: this.styleMap,
                },
              ]}
              buttonText={{
                originalText: 'Style',
                loadingText: 'Styling',
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

export default connect(mapStateToProps, { submitForm })(StyleTransfer);
