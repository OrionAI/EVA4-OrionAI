import React from 'react';

import { ReactMediaRecorder } from 'react-media-recorder';

class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      recordingButtonText: <i className="fas fa-microphone"></i>,
    };
  }

  onStopRecording(audioBlob, onChange) {
    onChange(new File([audioBlob], 'recording.wav', { type: 'audio/wav' }));
  }

  toggleRecording = (startRecording, stopRecording) => {
    if (this.state.isRecording) {
      this.setState({
        recordingButtonText: <i className="fas fa-microphone"></i>,
        isRecording: false,
      });
      stopRecording();
    } else {
      this.setState({
        recordingButtonText: <i className="fas fa-stop-circle"></i>,
        isRecording: true,
      });
      startRecording();
    }
  };

  render() {
    const {
      input: { onChange },
      label,
    } = this.props;
    return (
      <ReactMediaRecorder
        audio={true}
        video={false}
        blobPropertyBag={{ type: 'audio/mpeg' }}
        onStop={(audioBlobUrl, audioBlob) =>
          this.onStopRecording(audioBlob, onChange)
        }
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <React.Fragment>
            <div className="row mb-3">
              <div className="col">{label}</div>
            </div>
            <div className="row">
              <div className="col mt-2">
                <button
                  className="btn bg-transparent"
                  onClick={event => {
                    event.preventDefault();
                    this.toggleRecording(startRecording, stopRecording);
                  }}
                >
                  {this.state.recordingButtonText}
                </button>
              </div>
              <div className="col">
                <audio src={mediaBlobUrl} controls />
              </div>
              <div className="col-10" />
            </div>
          </React.Fragment>
        )}
      />
    );
  }
}

export default Recorder;
