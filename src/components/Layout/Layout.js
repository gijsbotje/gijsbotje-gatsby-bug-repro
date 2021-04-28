import React from 'react';
import PropTypes from 'prop-types';
import { useCookie } from 'react-use';
import Header from '../Header';
import Footer from '../Footer';
import { siteMetadata } from '../../../gatsby-config';
import CookieConsent from '../CookieConsent';
import '../../scss/main.scss';

export const CookieContext = React.createContext({});

const Layout = ({ children, headerOptions, footerOptions, location, ...rest }) => {
  const [cookieConsentAnalytics, setCookieConsentAnalytics, deleteCookieConsentAnalytics] = useCookie(
    'gatsby-gdpr-google-analytics',
  );
  const [cookieConsentTagmanager, setCookieConsentTagmanager, deleteCookieConsentTagmanager] = useCookie(
    'gatsby-gdpr-google-tagmanager',
  );
  const [cookieConsentFacebookPixel, setCookieConsentFacebookPixel, deleteCookieConsentFacebookPixel] = useCookie(
    'gatsby-gdpr-facebook-pixel',
  );

  const handleCookieConsent = answer => () => {
    setCookieConsentAnalytics(answer, { expires: 365 });
    setCookieConsentTagmanager(answer, { expires: 365 });
    setCookieConsentFacebookPixel(answer, { expires: 365 });
    if (answer === true) {
      window.location.reload();
    }
  };

  const handleResetCookieConsent = () => {
    deleteCookieConsentAnalytics();
    deleteCookieConsentTagmanager();
    deleteCookieConsentFacebookPixel();
  };

  return (
    <CookieContext.Provider
      value={{
        cookieConsentAnalytics,
        cookieConsentTagmanager,
        cookieConsentFacebookPixel,
        handleCookieConsent,
        handleResetCookieConsent,
      }}
    >
      <div className="overflow-hidden">
        <Header title={siteMetadata.title} {...headerOptions} location={location} {...rest} />
        {children}
        <Footer title={siteMetadata.title} author={siteMetadata.author} location={location} {...footerOptions} />
      </div>
      <CookieConsent />
    </CookieContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  headerOptions: PropTypes.object,
  footerOptions: PropTypes.object,
  location: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  children: undefined,
  headerOptions: {},
  footerOptions: {},
};

export default Layout;
