import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header.js';
import './App.less';

export default class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};
