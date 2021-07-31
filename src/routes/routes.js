import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';
import Auth from '../screens/Auth/Auth';
import OnBoard from '../screens/OnBoard/OnBoard';
import Dashboard from '../screens/Dashboard/Dashboard';
import Job from '../screens/Jobs/Job';
import Opening from '../screens/Opening/Opening';
import Company from '../screens/Company/Company.js';
import ApplyForm from '../screens/Apply/Apply.js';

export const AppRoute = () => {
  return (
    <Layout>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/on-board" component={OnBoard} />
            <Route exact path="/company/:id" component={Company} />
            <Route exact path="/apply/:id" component={ApplyForm} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/openings" component={Job} />
            <PrivateRoute exact path="/opening/create" component={Opening} />
          </Switch>
        </BrowserRouter>
      </div>
    </Layout>
  );
};
