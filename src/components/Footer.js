import React from 'react';

import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-5 py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-left">
            <img
              src={`${process.env.PUBLIC_URL}/orionai.png`}
              style={{ height: '2rem' }}
              alt="logo"
            />
            <span className="text-muted ml-3">Orion AI - EVA4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
