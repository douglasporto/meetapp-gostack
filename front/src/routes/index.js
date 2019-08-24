import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import NewMeetapp from '../pages/NewMeetapp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/Dashboard" component={Dashboard} isPrivate />
      <Route path="/Profile" component={Profile} isPrivate />
      <Route path="/new-meetapp" component={NewMeetapp} isPrivate />
    </Switch>
  );
}
