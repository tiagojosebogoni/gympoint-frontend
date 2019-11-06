import React from 'react';

import { Container } from './styles';

import logo from '~/assets/logo.png';

export default function Dashboard() {
  return (
    <Container>
      <img src={logo} alt="Gympoint" />
      <h1> Dashboard</h1>
    </Container>
  );
}
