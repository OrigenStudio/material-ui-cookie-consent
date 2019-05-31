import React from "react";
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="h5" component="h1" gutterBottom>NOT FOUND</Typography>
    <Typography gutterBottom>
      You just hit a route that doesn&#39;t exist... take me <Link to="/">home</Link>.
    </Typography>
  </Layout>
);

export default NotFoundPage;
