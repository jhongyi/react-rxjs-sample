import React, { Component } from 'react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

import github from 'static/images/github.png';
import facebook from 'static/images/facebook.png';
import rxlogo from 'static/images/rx-logo.png';

const LinkItem = styled(ReactRouterLink)`
  color: #fff;
  text-align: center;
  padding: 0.75rem 0.25rem 0.25rem 0.25rem;
  margin: 1rem 1.5rem;
  text-decoration: none;
  font-size: 1.125rem;
  // min-width: 10rem;
  &:hover {
    color: #fff;
    text-decoration: none;
    border-bottom: 2px solid #00838f;
  }
`;

const activeStyle = {
  borderBottom: `2px solid #28f7f3`
};

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={rxlogo} alt="Rx React sample" />
        </div>
        <div className="item-link">
          <LinkItem to="/ColorSquare" activeStyle={activeStyle}>變色方塊</LinkItem>
          <LinkItem to="/MouseBall" activeStyle={activeStyle}>鎖定寶貝球</LinkItem>
          <LinkItem to="/Draw" activeStyle={activeStyle}>畫圖</LinkItem>
        </div>
        <div className="personal-link">
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
