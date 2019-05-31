import React from "react";
import { Link } from "gatsby";
import Typography from '@material-ui/core/Typography';
import MUICookieConsent from "material-ui-cookie-consent"; // using link

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <MUICookieConsent
      debug
      componentType="Dialog"
      message="This site uses cookies and you accept.... bla bla bla... legal text provided by the legal team and so on... "
    />
    <SEO
      title="Material UI Cookie Consent Component"
      keywords={[`Material UI`, `react`, `cookies`]}
    />
    <Typography variant="h5" component="h1" gutterBottom>Example page for Material UI Cookie Consent</Typography>
    <Typography gutterBottom>
      <Link to="/">Back to snackbar</Link>
    </Typography>
  </Layout>
);

export default IndexPage;
