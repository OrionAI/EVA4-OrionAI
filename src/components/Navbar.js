import _ from 'lodash';
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
    const activeNavItem = this.props.history.location.pathname.substring(1);
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
              {_.map(
                this.props.componentItems,
                (componentItem, componentItemName) => {
                  return (
                    <li className="nav-item dropdown" key={componentItemName}>
                      <Link
                        className={`nav-link dropdown-toggle ${
                          _.map(
                            componentItem.items,
                            item => item.link
                          ).includes(activeNavItem)
                            ? 'active'
                            : ''
                        }`}
                        to="#"
                        id={`${componentItemName}-dropdown`}
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {componentItem.title}
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby={`${componentItemName}-dropdown`}
                      >
                        {_.map(componentItem.items, item => {
                          return (
                            <Link
                              to={`/${item.link}`}
                              className={`dropdown-item ${
                                activeNavItem === `${item.link}` ? 'active' : ''
                              }`}
                              key={item.link}
                            >
                              {item.title}
                            </Link>
                          );
                        })}
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  href="https://github.com/OrionAI/"
                  className="nav-link"
                  target="blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
