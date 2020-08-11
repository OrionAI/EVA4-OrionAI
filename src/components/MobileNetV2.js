import React from 'react';
import axios from 'axios';

class MobileNetV2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageURL: null,
      prediction: null,
    };

    this.submitButtonRef = React.createRef();
  }

  onSubmit = async event => {
    event.preventDefault();
    this.submitButtonRef.current.setAttribute('disabled', true);
    const data = new FormData();
    data.append('image', this.state.image);

    const api = axios.create({
      headers: {
        post: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });
    const response = await api.post(
      'https://dkla5xrjb0.execute-api.ap-south-1.amazonaws.com/dev/classify',
      data
    );
    this.setState({ prediction: response.data['predicted name'] });
    this.submitButtonRef.current.removeAttribute('disabled');
  };

  renderOutput() {
    if (this.state.prediction) {
      return (
        <div className="row mt-5">
          <div className="col-6 mx-auto">
            <div className="card" style={{ width: '20rem' }}>
              <img
                src={this.state.imageURL}
                className="card-img-top"
                alt="dum"
              />
              <div className="card-body">
                <h5 className="card-title">Prediction</h5>
                <p className="card-text">{this.state.prediction}</p>
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
            <h1 className="heading">MobileNetV2</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-6 mx-auto">
            <form onSubmit={this.onSubmit}>
              <label>Upload Image</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control-file"
                  onChange={e => {
                    this.setState({
                      image: e.target.files[0],
                      imageURL: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </div>
              <div className="row mt-3">
                <div className="col mx-auto">
                  <button
                    className="btn btn-primary"
                    ref={this.submitButtonRef}
                  >
                    Predict
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {this.renderOutput()}
      </React.Fragment>
    );
  }
}

export default MobileNetV2;
