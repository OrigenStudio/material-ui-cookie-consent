import React from "react";
import { Link } from "gatsby";
import MUICookieConsent from "material-ui-cookie-consent"; // using link

import Layout from "../components/layout";
import SEO from "../components/seo";


const IndexPage = () => (
  <Layout>
    <MUICookieConsent message="This site uses cookies and you accept.... bla bla bla... legal text provided by the legal team and so on... " debug/>
    <SEO title="Material UI Cookie Consent Component" keywords={[`Material UI`, `react`, `cookies`]} />
    <h1>Example page for Material UI Cookie Consent</h1>
    <p>Check https://github.com/OrigenStudio/material-ui-cookie-consent for more details</p>
    <Link to="/dialog-example/">Example with Dialog</Link>
  </Layout>
);

export default IndexPage;
 