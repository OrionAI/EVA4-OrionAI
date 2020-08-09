import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };

    this.componentPath = {
      '/': 'home',
      '/resnet34': 'resnet34',
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const activeNavItem = this.componentPath[
      this.props.history.location.pathname
    ];
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
