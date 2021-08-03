import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Transition from 'components/Transition';
import Section from 'templates/Section';
import Stars from 'templates/Page/Stars';

export default function Page({ children, open }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Transition in component={Fade} timeout={3300}>
        <Stars />
      </Transition>
   
        <Section>{children}</Section>

    </>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

Page.defaultProps = {
  open: false,
};
