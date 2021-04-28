import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Grid from '../Grid';
import Typography from '../Typography';
import Button from '../Button';
import Gradient from '../../utils/gradient';

const HomeBanner = ({ title, text, buttons }) => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('.home-gradient');
  }, []);

  return (
    <section className="home-banner">
      <canvas className="home-gradient" />
      <Grid container>
        <Grid row direction="column" align="center" className="mb-40">
          <Grid column xs={12} lg={9} xl={7}>
            <Typography align="center" color="white" variant="h1" className="mb-16">
              {title}
            </Typography>
          </Grid>
          <Grid column xs={12} md={8} lg={6}>
            <Typography align="center" color="white">
              {text}
            </Typography>
          </Grid>
        </Grid>
        {buttons.length > 0 && (
          <Grid row justify="center" spacing={16}>
            {buttons?.map(button => (
              <Grid column xs="auto">
                <Button href={button?.href} color={button?.variant} outline={button?.outline}>
                  {button?.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </section>
  );
};

HomeBanner.propTypes = {
  buttons: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string,
};

HomeBanner.defaultProps = {
  buttons: [],
  text: null,
  title: null,
};

export default HomeBanner;
