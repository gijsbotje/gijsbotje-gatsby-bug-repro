module.exports = {
  siteMetadata: {
    title: 'gatsby gijsbotje site',
    description: 'gatsby gijsbotje site',
    siteUrl: 'https://gijsbotje.com/',
    company: {
      name: 'gijsbotje',
    },
  },
  flags: {
    DEV_SSR: false,
    FAST_DEV: false,
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img/`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/jobs/`,
        name: `jobs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=2]': 'h4 mb-24 mt-56',
                paragraph: 'mb-24',
              },
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'images',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        // googleAnalytics: {
        //   trackingId: 'code',
        // },
        // googleTagManager: {
        //   trackingId: 'code',
        // },
        // facebookPixel: {
        //   pixelId: 'code',
        // },
        environments: ['production'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gijsbotje',
        short_name: 'gijsbotje',
        description: 'gijsbotje',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#005eff',
        display: 'standalone',
        cache_busting_mode: 'none',
        icons: [
          {
            src: '/img/favicon/icon_64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/img/favicon/icon_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-stylelint',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    '@bumped-inc/gatsby-plugin-optional-chaining',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify',
  ],
};
