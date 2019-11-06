import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// import Notifications from '~/components/Notifications';
import logo from '~/assets/logo-header.png';

import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispacth = useDispatch();

  function handleSignOut() {
    dispacth(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Gympoint" />
          </Link>

          <ul>
            <li>
              <Link to="alunos">ALUNOS</Link>
            </li>
            <li>
              <Link to="planos">PLANOS</Link>
            </li>
            <li>
              <Link to="matriculas">MATRÍCULAS</Link>
            </li>
            <li>
              <Link to="help">PEDIDOS DE AUXÍLIO</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <span onClick={handleSignOut}>sair do sistema</span>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
