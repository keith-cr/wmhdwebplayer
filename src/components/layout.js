/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { Location } from '@reach/router';

import "../css/style.css"
import '../css/vendor/bootstrap.min.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-gatsby fixed-top'>
          <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <Link to='/' className='navbar-brand'>Gatsby</Link>

          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav sidebar-nav ml-auto'>
            <Location>
              {({ navigate, location }) =>     
                <>        
                  <NavItem location={location.pathname} link='/' name='Home' />
                  <NavItem location={location.pathname} link='/about/' name='About' />
                </>  
              }
            </Location>
            </ul>
          </div>
        </nav>
        {children}
      </div>
    )}
  />
)

class NavItem extends React.Component {
  isActive () {
    return this.props.location === this.props.link;
  }

  getTitle () {
    if (this.isActive()) {
      return (
        <div>
          {this.props.name} <span className='sr-only'>(current)</span>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.name}
        </div>
      );
    }
  }

  render () {
    return (
      <li className={!this.isActive() ? 'nav-item' : 'nav-item active'}>
        <Link className='nav-link' to={this.props.link}>{this.getTitle()}</Link>
      </li>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
