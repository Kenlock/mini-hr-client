import React from 'react';
import { Helmet } from 'react-helmet';
import { AppRoute } from './routes/routes';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MINI-HR</title>
      </Helmet>
      <AppRoute />
    </React.Fragment>
  );
}

export default App;
