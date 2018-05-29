import React from 'react';
// import package
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';

// import relative path
import App from './App';
import NotFound from './NotFound';
import ColorSquare from './ColorSquare';
import MouseBall from './MouseBall';

const Main = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={ColorSquare} />
        <Route path="/ColorSquare" component={ColorSquare} />
        <Route path="/MouseBall" component={MouseBall} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
);

export default Main;
