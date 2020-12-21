module.exports = {
  siteMetadata: {
    title: "Goals",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `key2pjMRTYJP4Msrq`,
        tables: [
          {
            baseId: `appIhwXXgds9RGvVd`,
            tableName: `Wake`,
          },
        ],
      },
    },
  ],
};
