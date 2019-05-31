import React from "react";
import { Link } from "gatsby";
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';
import MUICookieConsent from "material-ui-cookie-consent"; // using link

import Layout from "../components/layout";
import SEO from "../components/seo";

const repoUrl = 'https://github.com/OrigenStudio/material-ui-cookie-consent';

const IndexPage = () => (
  <Layout>
    <MUICookieConsent
      message="This site uses cookies and you accept.... bla bla bla... legal text provided by the legal team and so on... "
      debug
    />
    <SEO
      title="Material UI Cookie Consent Component"
      keywords={[`Material UI`, `react`, `cookies`]}
    />
    <Typography variant="h5" component="h1" gutterBottom>
      Example page for Material UI Cookie Consent
    </Typography>
    <Typography gutterBottom>
      <Link to="/dialog-example/">Example with Dialog</Link>
    </Typography>
    <Typography gutterBottom>
      Check <MUILink href={repoUrl}>{repoUrl}</MUILink> for more details.
    </Typography>
  </Layout>
);

export default IndexPage;
 