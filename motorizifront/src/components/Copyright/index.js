import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Transition from 'components/Transition';

export default function Copyright() {
  return (
    <Transition component={Slide} in direction="up" delay={550}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        
          Motorizi
        
        <small> {new Date().getFullYear()}</small>
      </Typography>
    </Transition>
  );
}
