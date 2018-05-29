import React from 'react';
// import package
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';

// import relative path
import App from './App';
import Home from './Home';
import NotFound from './NotFound';
import ColorSquare from './ColorSquare';
import MouseBall from './MouseBall';

const Main = () => (
  <App>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/ColorSquare" component={ColorSquare} />
        <Route path="/MouseBall" component={MouseBall} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </App>
);

export default Main;
