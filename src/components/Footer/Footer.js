import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import clsx from 'clsx';
import ReactModal from 'react-modal';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import axios from 'axios';
import Typography from '../Typography';
import footerNavigation from '../../data/footer.json';
import Grid from '../Grid';
import { CookieContext } from '../Layout';
import navigation from '../../data/navigation.json';
import Logo from '../../images/logo.svg';
import './style.scss';
import Button from '../Button';
import Input from '../Input';
import encode from '../../utils/encodeFormData';
import LoadingWrapper from '../LoadingWrapper';
import OverlayMessage from '../OverlayMessage';

const schema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  emailAddress: string().email().required(),
  phoneNumber: string().required(),
  message: string().required(),
});

const Footer = ({ topBg, location }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { handleResetCookieConsent } = useContext(CookieContext);
  const urlLanguagePart = (location?.pathname?.split('/') ?? [])[1];
  const language = Object.keys(navigation).includes(urlLanguagePart) ? urlLanguagePart : 'en';
  const footerTranslations = language && footerNavigation[language] ? footerNavigation[language] : footerNavigation.en;
  const { items: menus } = footerTranslations || {};
  const data = useStaticQuery(graphql`
    query footerQuery {
      site {
        siteMetadata {
          company {
            name
          }
        }
      }
    }
  `);
  const { site: { siteMetadata } = {} } = data || {};

  const handleSubmitForm = async formData => {
    setIsSubmitting(true);
    try {
      await axios.post('/', encode({ 'form-name': 'contact', ...formData }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setFormIsSubmitted(true);
    } catch (error) {
      // do something
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={clsx('pt-72', { [`bg-${topBg}`]: topBg })}>
        <Grid container>
          <div className="newsletter-card">
            <Grid row justify="between" align="center">
              <Grid column xs={12} md={5} className="mb-24 mb-md-0">
                <Typography variant="h3" component="div" color="white" className="text-center text-md-left">
                  Subscribe to Our Newsletter
                </Typography>
                <Typography color="white" className="text-center text-md-left">
                  A monthly digest of the latest gijsbotje news, articles and resources.
                </Typography>
              </Grid>
              <Grid column xs={12} md={7}>
                <form
                  method="POST"
                  action="/"
                  className="d-flex flex-column flex-sm-row align-items-sm-center mt-16 mt-sm-0"
                >
                  <Input id="EMAIL" name="EMAIL" placeholder="Your email address" />
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="b_5a44ea7caee18d685b936bde0_553d5401d6" tabIndex="-1" value="" />
                  </div>
                  <Button type="submit" outline color="white" className="flex-shrink-0 mt-12 mt-sm-0 ml-sm-12">
                    Subscribe Now
                  </Button>
                </form>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
      <footer className="main-footer">
        <section className="pt-80 pt-sm-48 pb-24">
          <Grid container className="pb-80">
            <div className="d-flex flex-column flex-md-row justify-content-center">
              <div className="px-12 mb-32 mb-md-0 text-center">
                <Typography variant="h3" component="div" color="white">
                  Ready to Work with Us?
                </Typography>
              </div>
              <div className="px-12 align-self-center align-self-sm-auto">
                <Button color="white" className="text-primary" onClick={() => setShowContactForm(true)}>
                  Contact Our Team
                </Button>
              </div>
            </div>
          </Grid>
          <Grid container>
            <Link to="/">
              <Logo height={33} className="text-primary mb-64" />
            </Link>
          </Grid>
          <Grid container>
            <Grid row>
              {menus.map(menu => (
                <Grid key={menu?.label} column xs={12} sm={6} lg={3} className="mb-32 mb-lg-0">
                  <Typography variant="subtitle" className="font-weight-bold mb-8">
                    {menu.label}
                  </Typography>
                  <ul className="list-unstyled">
                    {menu.items.map(item => {
                      if (item?.url === 'change-cookie-settings') {
                        return (
                          <li className="mb-8" key={item?.label}>
                            <Typography
                              component="button"
                              href=""
                              onClick={e => {
                                e.preventDefault();
                                handleResetCookieConsent();
                              }}
                              className="btn btn-link p-0"
                              title={item?.label}
                            >
                              {item?.label}
                            </Typography>
                          </li>
                        );
                      }

                      return (
                        <li className="mb-8" key={item?.label}>
                          <Typography
                            {...(item?.external ? { href: item?.url } : { to: item?.url })}
                            component={item?.external ? 'a' : Link}
                            target={item?.newWindow ? '_blank' : null}
                            rel={item?.newWindow ? 'noreferrer' : null}
                            title={item?.label}
                          >
                            {item?.label}
                          </Typography>
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <div className="container">
            <Typography className="mt-40" component="div">
              © {new Date().getFullYear()} {siteMetadata?.company?.name}, Hong Kong
            </Typography>
          </div>
        </section>
      </footer>
      <ReactModal
        isOpen={showContactForm}
        shouldCloseOnOverlayClick
        onRequestClose={() => setShowContactForm(false)}
        closeTimeoutMS={200}
        preventScroll
        onAfterClose={() => setFormIsSubmitted(false)}
      >
        <Button
          color="link"
          rounded
          disableOverlay
          onClick={() => setShowContactForm(false)}
          className="position-absolute p-8 top-12 right-16"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" width={14} height={14}>
            <path
              fill="#99999A"
              fillRule="evenodd"
              d="M13 1c.2.2.2.4 0 .6v.1L7.7 7l5.3 5.3a.5.5 0 01-.6.8h-.1L7 7.6 1.7 13a.5.5 0 01-.8-.6v-.1L6.4 7 1 1.7a.5.5 0 01.6-.8h.1L7 6.4 12.3 1c.2-.2.5-.2.7 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Typography variant="h3" component="div" align="center" className="mt-16 mb-32">
          Contact us
        </Typography>
        <LoadingWrapper isLoading={isSubmitting}>
          <OverlayMessage show={formIsSubmitted} message="Thanks for your submission">
            <Grid row justify="center" className="pb-16">
              <Grid column xs={12} md={10} lg={8}>
                <form onSubmit={handleSubmit(handleSubmitForm)} name="contact" data-netlify="true">
                  <div className="form-group">
                    <Input id="first-name" name="firstName" label="First name" errors={errors} ref={register()} />
                  </div>
                  <div className="form-group">
                    <Input id="last-name" name="lastName" label="Last name" errors={errors} ref={register()} />
                  </div>
                  <div className="form-group">
                    <Input
                      id="email-address"
                      name="emailAddress"
                      label="Email address"
                      errors={errors}
                      ref={register()}
                    />
                  </div>
                  <div className="form-group">
                    <Input id="phone-number" name="phoneNumber" label="Phone number" errors={errors} ref={register()} />
                  </div>
                  <div className="form-group">
                    <Input
                      id="message"
                      name="message"
                      label="Your message"
                      type="textarea"
                      errors={errors}
                      ref={register()}
                    />
                  </div>
                  <div className="form-group">
                    <Button type="submit" block>
                      Send
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </OverlayMessage>
        </LoadingWrapper>
      </ReactModal>
      <form name="contact" data-netlify="true" className="d-none">
        <div className="form-group">
          <Input id="first-name" name="firstName" label="First name" errors={errors} ref={register()} />
        </div>
        <div className="form-group">
          <Input id="last-name" name="lastName" label="Last name" errors={errors} ref={register()} />
        </div>
        <div className="form-group">
          <Input id="email-address" name="emailAddress" label="Email address" errors={errors} ref={register()} />
        </div>
        <div className="form-group">
          <Input id="phone-number" name="phoneNumber" label="Phone number" errors={errors} ref={register()} />
        </div>
        <div className="form-group">
          <Input id="message" name="message" label="Your message" type="textarea" errors={errors} ref={register()} />
        </div>
      </form>
    </>
  );
};

Footer.propTypes = {
  location: PropTypes.object,
  topBg: PropTypes.string,
};

Footer.defaultProps = {
  location: undefined,
  topBg: null,
};

export default Footer;
