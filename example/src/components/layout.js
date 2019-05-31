import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

import Header from "./header";
import "./layout.css";

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
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0
          }}
        >
          <main>{children}</main>
          <footer>
            <Typography variant="overline">
              Built by <MUILink href="https://www.origen.studio">Origen Studio</MUILink>
            </Typography>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
