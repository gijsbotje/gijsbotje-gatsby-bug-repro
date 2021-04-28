import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CookieContext } from '../Layout';
import Button from '../Button';
import Grid from '../Grid';
import './style.scss';
import Typography from '../Typography';

const MotionDiv = motion.div;

const CookieConsent = () => {
  const {
    cookieConsentAnalytics,
    cookieConsentTagmanager,
    cookieConsentFacebookPixel,
    handleCookieConsent,
  } = useContext(CookieContext);
  return (
    <AnimatePresence>
      {cookieConsentAnalytics === null && cookieConsentTagmanager === null && cookieConsentFacebookPixel === null && (
        <MotionDiv
          className="cookie-consent"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          key="cookie-consent"
          initial={{ opacity: 0, y: '32px', zIndex: 1040 }}
          animate={{ opacity: 1, y: 0, zIndex: 1040 }}
          exit={{ opacity: 0, y: '32px', zIndex: 1040 }}
          transition={{ duration: 0.2, delay: 0.2, ease: 'easeOut', type: 'tween' }}
        >
          <Typography variant="paragraph-1" weight="bold" color="gray-1000" className="mb-8">
            Cookies
          </Typography>
          <Typography variant="paragraph-2" color="gray-800" className="mb-24">
            We use cookies to improve our site
          </Typography>
          <Grid row spacing={16} justify="end">
            <Grid column className="flex-grow-0">
              <Button size="sm" onClick={handleCookieConsent(true)}>
                Allow
              </Button>
            </Grid>
            <Grid column className="flex-grow-0">
              <Button size="sm" onClick={handleCookieConsent(false)} outline color="light">
                Deny
              </Button>
            </Grid>
          </Grid>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
