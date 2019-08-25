import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';
import Logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={Logo} alt="Logo MeetApp" />
          </Link>
          <Link to="/my-meetapp">My MeetApp</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
