import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useKey, useWindowScroll } from 'react-use';
import clsx from 'clsx';
import { Link } from 'gatsby';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import ReactModal from 'react-modal';
import SouthKoreaFlag from '../../images/flags/south-korea.svg';
import ChinaFlag from '../../images/flags/china.svg';
import GlobalFlag from '../../images/flags/global.svg';
import FrenchFlag from '../../images/flags/french.svg';
import Button from '../Button';
import Icon from '../Icon';
import Typography from '../Typography';
import Logo from '../../images/logo.svg';
import LabsLogo from '../../images/labs-logo.svg';
import './style.scss';
import navigation from '../../data/navigation.json';

const SCROLL_DISTANCE = 100;

const getLang = lang => {
  switch (lang) {
    case 'cn':
      return { flag: ChinaFlag, label: '汉语' };
    case 'kr':
      return { flag: SouthKoreaFlag, label: '한국어' };
    case 'fr':
      return { flag: FrenchFlag, label: 'Français' };
    default:
      return { flag: GlobalFlag, label: 'English' };
  }
};

const Header = ({ location, variant, color, bgColor, title, logo }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const { y } = useWindowScroll();

  useKey('Escape', () => setMenuIsOpen(false));

  const urlLanguagePart = (location?.pathname?.split('/') ?? [])[1];
  const language = Object.keys(navigation).includes(urlLanguagePart) ? urlLanguagePart : 'en';
  const headerTranslations = navigation[language];
  const { items: menu, button } = headerTranslations || {};

  const { flag: Flag, label: langLabel } = getLang(language);

  return (
    <>
      <Helmet htmlAttributes={{ lang: language ?? 'en' }} />
      <nav
        className={clsx(
          `navbar ${variant} navbar-${y < SCROLL_DISTANCE ? color : 'light'} flex-column flex-md-row bg-${
            y < SCROLL_DISTANCE ? bgColor : 'white'
          }`,
          { scrolled: y >= SCROLL_DISTANCE },
        )}
      >
        <div className="container py-20 py-lg-24">
          <Link
            className="text-center"
            to={`${language !== 'en' ? `/${language}/` : '/'}${logo === 'labs' ? 'labs/' : ''}`}
            title={title}
          >
            {logo === 'labs' ? (
              <LabsLogo style={{ height: 32 }} className={`logo-${y < SCROLL_DISTANCE ? color : 'light'}`} />
            ) : (
              <Logo style={{ height: 32 }} className={`logo-${y < SCROLL_DISTANCE ? color : 'light'}`} />
            )}
          </Link>
          <div className={clsx('navbar-drawer ml-lg-40 ml-xl-64', { in: menuIsOpen })}>
            <div className="navbar-drawer-header">
              <Button
                color="link"
                className="text-gray-1000 navbar-drawer-close"
                onClick={() => setMenuIsOpen(false)}
                disableOverlay
              >
                <span className="sr-only">Close menu</span>
                <Icon icon={faTimes} fixedWidth size="lg" />
              </Button>
            </div>
            <ul className="navbar-nav flex-column flex-lg-row flex-fill align-items-lg-center justify-content-lg-end">
              {menu.map(item => (
                <li
                  className={clsx('nav-item', {
                    active: location?.pathname === item?.url,
                  })}
                  key={item?.label}
                >
                  {item?.external ? (
                    <Typography
                      component="a"
                      href={item?.url}
                      className={clsx('nav-link', { disabled: item?.disabled })}
                      title={item?.label}
                      onClick={() => setMenuIsOpen(false)}
                    >
                      {item?.label}
                    </Typography>
                  ) : (
                    <Typography
                      component={Link}
                      to={item?.url}
                      className={clsx('nav-link', { disabled: item?.disabled })}
                      title={item?.label}
                      onClick={() => setMenuIsOpen(false)}
                    >
                      {item?.label}
                    </Typography>
                  )}
                </li>
              ))}

              {Object.keys(navigation).length > 1 && (
                <li className="pb-16 pb-md-0">
                  <button
                    type="button"
                    className="btn mr-lg-n12 p-lg-0 ml-lg-16 w-100 d-flex d-lg-inline-flex align-items-center"
                    onClick={() => setOpenLang(true)}
                    title={langLabel}
                  >
                    <Flag width={32} /> <span className="d-block d-lg-none ml-16">{langLabel}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-drawer-backdrop" onClick={() => setMenuIsOpen(false)} aria-hidden />
          <Button
            color="link"
            className={clsx(
              'p-12 d-lg-none',
              `text-${y < SCROLL_DISTANCE ? color.replace('dark', 'white').replace('light', 'black') : 'black'}`,
            )}
            type="button"
            onClick={() => setMenuIsOpen(true)}
            disableOverlay
          >
            <span className="sr-only">Open menu</span>
            <Icon icon={faBars} size="lg" />
          </Button>
        </div>
      </nav>
      {Object.keys(navigation).length > 1 && (
        <ReactModal
          isOpen={openLang}
          shouldCloseOnOverlayClick
          onRequestClose={() => setOpenLang(false)}
          closeTimeoutMS={200}
          preventScroll
        >
          <Typography variant="h1" component="div" className="mb-32 mt-24">
            Choose a language
          </Typography>
          <div className="row w-100 justify-content-center mb-32">
            {Object.keys(navigation).map(lang => {
              const currentLang = getLang(lang);
              const { flag: CountryFlag, label } = currentLang;
              return (
                <div className="col-12 col-md-4" key={lang}>
                  <Link
                    to={`/${lang !== 'en' ? lang : ''}`}
                    onClick={() => setOpenLang(false)}
                    className="btn d-flex align-items-center"
                  >
                    <CountryFlag width={40} className="flex-shrink-0" /> <span className="d-flex ml-16">{label}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </ReactModal>
      )}
    </>
  );
};

Header.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
  bgColor: PropTypes.oneOf([
    'white',
    'black',
    'muted',
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'danger',
    'transparent',
  ]),
  location: PropTypes.object,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'sticky-top', 'fixed-top', 'fixed-bottom']),
  logo: PropTypes.oneOf(['default', 'labs']),
};

Header.defaultProps = {
  color: 'light',
  bgColor: 'white',
  location: undefined,
  title: undefined,
  variant: 'sticky-top',
  logo: 'default',
};

export default Header;
