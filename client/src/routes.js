import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import BillsIndex from './pages/BillsIndex';
import BillsNew from './pages/BillsNew';
import BillsShow from './pages/BillsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BillsIndex} />
    <Route path="bills/new" component={BillsNew} />
    <Route path="bills/:id" component={BillsShow} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/profile" component={Profile} />

  </Route>
);
