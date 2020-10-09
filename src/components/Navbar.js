import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const activeNavItem = this.props.componentPath[
      this.props.history.location.pathname
    ];
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src={`${process.env.PUBLIC_URL}/orionai.png`}
              style={{ height: '2rem' }}
              className="mr-2"
              alt="logo"
            />{' '}
            Orion AI
          </Link>
          <button
            className={`navbar-toggler navbar-toggler-right ${
              this.state.collapsed ? 'collapsed' : ''
            }`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              this.state.collapsed ? '' : 'show'
            }`}
            id="navbarSupportedContent"
            onClick={this.toggleNavbar}
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    activeNavItem === 'home' ? 'active' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle ${
                    ['resnet34', 'mobilenetv2'].includes(activeNavItem)
                      ? 'active'
                      : ''
                  }`}
                  to="#"
                  id="classification-dropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Classification
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="classification-dropdown"
                >
                  <Link
                    to="/resnet34"
                    className={`dropdown-item ${
                      activeNavItem === 'resnet34' ? 'active' : ''
                    }`}
                  >
                    ResNet34
                  </Link>
                  <Link
                    to="/mobilenetv2"
                    className={`dropdown-item ${
                      activeNavItem === 'mobilenetv2' ? 'active' : ''
                    }`}
                  >
                    MobileNetV2
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle ${
                    ['facealignment', 'faceswap', 'facerecognition'].includes(
                      activeNavItem
                    )
                      ? 'active'
                      : ''
                  }`}
                  to="#"
                  id="face-recognition-dropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Face Recognition
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="face-recognition-dropdown"
                >
                  <Link
                    to="/align"
                    className={`dropdown-item ${
                      activeNavItem === 'facealignment' ? 'active' : ''
                    }`}
                  >
                    Face Alignment
                  </Link>
                  <Link
                    to="/swap"
                    className={`dropdown-item ${
                      activeNavItem === 'faceswap' ? 'active' : ''
                    }`}
                  >
                    Face Swap
                  </Link>
                  <Link
                    to="/recognize"
                    className={`dropdown-item ${
                      activeNavItem === 'facerecognition' ? 'active' : ''
                    }`}
                  >
                    Face Recognition
                  </Link>
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle ${
                    [
                      'humanposeestimation',
                      'dcgan',
                      'vae',
                      'styletransfer',
                    ].includes(activeNavItem)
                      ? 'active'
                      : ''
                  }`}
                  to="#"
                  id="miscellaneous-dropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Miscellaneous
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="miscellaneous-dropdown"
                >
                  <Link
                    to="/pose"
                    className={`dropdown-item ${
                      activeNavItem === 'humanposeestimation' ? 'active' : ''
                    }`}
                  >
                    Pose Estimation
                  </Link>
                  <Link
                    to="/dcgan"
                    className={`dropdown-item ${
                      activeNavItem === 'dcgan' ? 'active' : ''
                    }`}
                  >
                    GAN
                  </Link>
                  <Link
                    to="/vae"
                    className={`dropdown-item ${
                      activeNavItem === 'vae' ? 'active' : ''
                    }`}
                  >
                    VAE
                  </Link>
                  <Link
                    to="/style"
                    className={`dropdown-item ${
                      activeNavItem === 'styletransfer' ? 'active' : ''
                    }`}
                  >
                    Neural Style Transfer
                  </Link>
                  <Link
                    to="/srgan"
                    className={`dropdown-item ${
                      activeNavItem === 'srgan' ? 'active' : ''
                    }`}
                  >
                    SRGAN
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
