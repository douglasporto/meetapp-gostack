import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import NewMeetapp from '../pages/Meetapp/Add';
import EditMeetapp from '../pages/Meetapp/Edit';
import MeetappDetails from '../pages/Meetapp/Details';
import MyMeetapps from '../pages/MyMeetapps';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/Dashboard" component={Dashboard} isPrivate />
      <Route path="/Profile" component={Profile} isPrivate />
      <Route path="/my-meetapps" component={MyMeetapps} isPrivate />

      <Route path="/meetapp-new" component={NewMeetapp} isPrivate />
      <Route path="/meetapp-edit/:id" component={EditMeetapp} isPrivate />
      <Route path="/meetapp-details/:id" component={MeetappDetails} isPrivate />
    </Switch>
  );
}
