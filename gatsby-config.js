module.exports = {
  siteMetadata: {
    title: `WMHD Online Radio`,
    description: `Listen live to WMHD Online Radio, Rose-Hulman's student radio station.`,
    author: `@wmhdonlineradio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WMHD Online Radio`,
        short_name: `WMHD Radio`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#800000`,
        display: `minimal-ui`,
        icon: `src/img/wmhdlogo.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
