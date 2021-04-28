import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/Layout"
import HomeBanner from "../../components/HomeBanner"
import Typography from "../../components/Typography"
import Grid from "../../components/Grid"
import Card from "../../components/Card"

const HomeTemplate = ({ seo, banner, location, vision }) => (
  <Layout location={location} headerOptions={{ variant: 'fixed-top', bgColor: 'transparent', color: 'dark' }}>
    <Helmet
      title={seo?.title}
      meta={[
        {
          name: 'description',
          content: seo?.description,
        },
      ]}
    />
    <HomeBanner title={banner?.title} text={banner?.text} buttons={banner?.buttons} />
    <div className="home-section pb-72">
      <Grid container>
        <Card elevation={2} className="home-section-card">
          <Typography variant="h2" className="mb-40" align="center">
            {vision?.title}
          </Typography>
          <Grid row spacing={32}>
            {vision?.columns?.map(column => (
              <Grid column xs={12} md={4} className="text-center">
                <GatsbyImage
                  alt={column?.title}
                  image={column?.icon?.childImageSharp?.gatsbyImageData}
                  className="mb-16 vision-column-icon"
                  width={80}
                />
                <Typography variant="h3" className="mb-24">
                  {column?.title}
                </Typography>
                <Typography className="text-center text-md-left">{column?.text}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </div>
  </Layout>
);

HomeTemplate.propTypes = {
  seo: PropTypes.object,
  banner: PropTypes.object,
  location: PropTypes.object,
  vision: PropTypes.object,
  media: PropTypes.object,
  projects: PropTypes.object,
  testimonials: PropTypes.bool,
};

HomeTemplate.defaultProps = {
  seo: {},
  banner: undefined,
  location: undefined,
  vision: {},
  media: {},
  projects: {},
  testimonials: {},
};

export default HomeTemplate;
