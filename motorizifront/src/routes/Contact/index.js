import React from 'react';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Keyboard, { Cursor } from 'react-mk';
import { mdiTwitter, mdiLinkedin, mdiInstagram, mdiFacebook } from '@mdi/js';
import Icon from '@mdi/react';
import { ButtonGroup } from '@material-ui/core';
import Content from 'templates/Content';
import Transition from 'components/Transition';
import Title from 'components/Title';
import A from 'components/A';
import SocialMediaButton from './SocialMediaButton';

export default function Contact() {
  return (
    <Transition in component={Grow}>
      <Content fixed>
        <Typography variant="h5">
          <Title>
            <Keyboard>Contacter nous</Keyboard>
            <Cursor />
          </Title>
        </Typography>
        <br />
        <br />
        <Typography variant="body1">
          Vous pouvez nous contactez sur les platformes ci-dessous :
        </Typography>
        <div>
          <div>
            <h3>Contactez nous par email :</h3>

            <p>

              <A href="mailto:ezzamanehamza@gmail.com">
                <strong>ezzamanehamza@gmail.com</strong>
              </A>
              .
            </p>
          </div>
          <br />
          <br />
          <br />
        </div>
        <div>
          <div>
            <h3>Ou vous pouvez nous contacter à travers les réseaux sociaux </h3>
            <ul>
              <li>

                <strong>

                  <A

                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>LinkedIn</strong>
                  </A>
                  .
                </strong>
              </li>


              <br />

            </ul>
            <ButtonGroup size="large" variant="outlined">
              <SocialMediaButton
                href="https://instagram.com/"
                target="_blank"
                color="#e4405F"
              >
                <Icon path={mdiInstagram} size={1} color="currentColor" />
              </SocialMediaButton>
              <SocialMediaButton
                href="https://linkedin.com/"
                target="_blank"
                color="#007bb5"
              >
                <Icon path={mdiLinkedin} size={1} color="currentColor" />
              </SocialMediaButton>
              <SocialMediaButton href="https://twitter.com/" target="_blank" color="#1da1f2">
                <Icon path={mdiTwitter} size={1} color="currentColor" />
              </SocialMediaButton>
              <SocialMediaButton
                href="https://facebook.com/"
                target="_blank"
                color="#3b5998"

              >
                <Icon path={mdiFacebook} size={1} color="currentColor" />
              </SocialMediaButton>
            </ButtonGroup>
          </div>
        </div>
      </Content>
    </Transition>
  );
}
