import React from 'react';

const ServiceAlert = () => {
  return (
    <div className="alert alert-danger mt-5" role="alert">
      <h4 className="alert-heading">No Backend Servers!</h4>
      <p>
        In order to save server costs, all the backend services for this portal
        have been shutdown. This means that none of the models in this portal
        will give any output.
      </p>
      <hr />
      <p className="mb-0">
        To get the backend functionality back, please refer to the{' '}
        <a
          href="https://github.com/OrionAI/EVA4-Phase-2"
          className="alert-link"
        >
          EVA4-Phase-2
        </a>{' '}
        GitHub repository for instructions to setup your own backend servers on
        AWS.
      </p>
    </div>
  );
};

export default ServiceAlert;
