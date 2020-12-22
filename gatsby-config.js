module.exports = {
  siteMetadata: {
    title: "Goals",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `key2pjMRTYJP4Msrq`,
        tables: [
          {
            baseId: `appIhwXXgds9RGvVd`,
            tableName: `Get Up`,
          },
          {
            baseId: `appIhwXXgds9RGvVd`,
            tableName: `Scripture Study`,
          },
        ],
      },
    },
  ],
};
