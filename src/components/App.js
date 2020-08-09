import React from 'react';

import Footer from './Footer';

import '../styles/App.css';

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="heading">Hello</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
