const { createFilePath } = require(`gatsby-source-filesystem`);
const each = require('lodash/each');
const path = require('path');
const locales = require('./src/constants/locales');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// eslint-disable-next-line no-unused-vars
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
              edges {
                node {
                  id
                  name: sourceInstanceName
                  path: absolutePath
                  remark: childMarkdownRemark {
                    id
                    fields {
                      slug
                    }
                    frontmatter {
                      templateKey
                      locale
                      path
                    }
                  }
                  filename: name
                  relativeDirectory
                }
              }
            }
          }
        `,
        // eslint-disable-next-line no-unused-vars
      ).then(({ errors, data }) => {
        if (errors) {
          // eslint-disable-next-line no-console
          console.log(errors);
          reject(errors);
        }

        // Create blog posts & pages.
        const items = data.allFile.edges;

        const pages = items.filter(({ node }) => /pages/.test(node.name));
        each(pages, ({ node }) => {
          if (!node.remark) return;
          const PageTemplate = path.resolve(`./src/templates/${node.remark.frontmatter.templateKey}/index.js`);
          const { locale = 'en' } = node.frontmatter || {};

          const pathParts = node.remark.fields.slug.split('/');
          const filteredPathParts = pathParts.filter(part => part !== 'en');
          const localizedPath = filteredPathParts.join('/');

          createPage({
            path: localizedPath,
            component: PageTemplate,
            context: {
              slug: node.remark.fields.slug,
              locale,
            },
          });
          createRedirect({
            fromPath: localizedPath.slice(0, -1),
            toPath: localizedPath,
            isPermanent: true,
            force: true,
          });
        });

        const jobs = items.filter(({ node }) => /jobs/.test(node.name));
        each(jobs, ({ node }) => {
          const PageTemplate = path.resolve(`./src/templates/${node.remark.frontmatter.templateKey}/index.js`);
          if (!node.remark) return;
          const { path: nodePath } = node.remark.frontmatter;
          createPage({
            path: `/careers/${nodePath}/`,
            component: PageTemplate,
            context: {
              frontmatterPath: nodePath,
            },
          });
        });
      }),
    );
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const pathParts = page.path.split('/');
      const filteredPathParts = pathParts.filter(part => part !== 'en');
      const localizedPath = filteredPathParts.join('/');

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
          ...page.context,
        },
      });
    });
    resolve();
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  });
};
