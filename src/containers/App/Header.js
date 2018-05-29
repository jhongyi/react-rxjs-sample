import React, { Component } from 'react';
import github from 'static/images/github.png';
import facebook from 'static/images/facebook.png';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="link">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/jhongyi">
            <img alt="github" src={github} />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/JhongYiChen">
            <img alt="facebook" src={facebook} />
          </a>
        </div>
      </div>
    );
  }
}
