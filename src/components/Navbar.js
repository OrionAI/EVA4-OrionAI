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
              <li className="nav-item">
                <Link
                  to="/resnet34"
                  className={`nav-link ${
                    activeNavItem === 'resnet34' ? 'active' : ''
                  }`}
                >
                  ResNet34
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/mobilenetv2"
                  className={`nav-link ${
                    activeNavItem === 'mobilenetv2' ? 'active' : ''
                  }`}
                >
                  MobileNetV2
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/align"
                  className={`nav-link ${
                    activeNavItem === 'facealignment' ? 'active' : ''
                  }`}
                >
                  Face Alignment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/swap"
                  className={`nav-link ${
                    activeNavItem === 'faceswap' ? 'active' : ''
                  }`}
                >
                  Face Swap
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/recognize"
                  className={`nav-link ${
                    activeNavItem === 'facerecognition' ? 'active' : ''
                  }`}
                >
                  Face Recognition
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
