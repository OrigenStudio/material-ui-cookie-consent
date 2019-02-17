module.exports = {
  siteMetadata: {
    title: `Material UI Cookie Consent`,
    description: `Accept cookies with Material Style`,
    author: `hello@origen.studio`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Material-UI-Cookie-Consent`,
        short_name: `MUICookies`,
        start_url: `/`,
        background_color: `#e86693`,
        theme_color: `#e86693`,
        display: `minimal-ui`,
        icon: `src/images/origen-logo.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
