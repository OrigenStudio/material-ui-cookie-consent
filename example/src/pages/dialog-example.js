import React from "react";
import { Link } from "gatsby";
import MUICookieConsent from "material-ui-cookie-consent"; // using link

import Layout from "../components/layout";
import SEO from "../components/seo";


const IndexPage = () => (
  <Layout>
    <MUICookieConsent debug componentType="Dialog" message="This site uses cookies and you accept.... bla bla bla... legal text provided by the legal team and so on... "/>
    <SEO title="Material UI Cookie Consent Component" keywords={[`Material UI`, `react`, `cookies`]} />
    <h1>Example page for Material UI Cookie Consent</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/">Back to snackbar</Link>
  </Layout>
);

export default IndexPage;
