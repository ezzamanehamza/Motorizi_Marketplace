import { Typography } from '@material-ui/core';
import React from 'react';
import Transition from 'components/Transition';
import Content from 'templates/Content';
import Grow from '@material-ui/core/Grow';
import Title from 'components/Title';
import Keyboard, { Cursor } from 'react-mk';



export default function Blog() {


  return (
    <Transition in component={Grow}>
      <Content fixed>
        <Typography variant="h5">
          <Title>
            <Keyboard>Remerciement</Keyboard>
          </Title>
        </Typography>
        <br/>
        <br/>
        <br/>
        <Typography variant="h5" >
          Avant d’entamer le sujet de notre rapport, nous tenons à présenter nos sincères remerciements à la société H26 de nous avoir accueilli, et aussi pour sa sensibilisation vis-à-vis des stagiaires, en leurs accordant des stages.<br/>
          Nous saisissons l’occasion pour présenter nos profonds respects et dévouements à M.MELLALI Mohammad, qui n’a pas hésité à nous diriger, à nous donner les explications nécessaires et à répondre à nos questions.<br/>
          Nous adressons une mention spéciale à M.AZILI El Mostafa et Mme AMAZAL Houda pour leurs accompagnements et suivi tout au long de notre formation en techniques de développement informatique et les précieux conseils qu’ils nous ont prodigués.
          A tous, nous adressons un grand Merci de reconnaissance.

        </Typography>
      </Content>
    </Transition>
  );
}


