import React, { Component } from 'react';
import { Observable } from "rxjs/Observable";
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounce';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import _ from 'lodash';

const Div = styled.div`
  text-align: center;
  #square {
    background-color: ${props => props.backgroundColor};
    width: 300px;
    height: 300px;
    line-height: 300px;
    text-align: center;
    margin: 0 auto;
  }
`;

const hexadecimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

class ColorSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 5,
      countdown: 5,
      background: '#ff0000'
    };
    this.observer = null;
    this.countdown = null;
  }

  componentDidMount() {
    const inputSecond = document.getElementById('input-second');
    Observable.fromEvent(inputSecond, 'keydown')
      .flatMap(
        e => Observable.fromEvent(inputSecond, 'keypress')
        .takeUntil(Observable.fromEvent(inputSecond, 'keyup'))
      )
      // Only move on with latest keypress with 500 ms interval
      .debounce(val => timer(500))
      .subscribe((e) => {
        this.bindIntervalEvent(e.target.value);
        this.changeSquare(e.target.value);
      });
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
    clearInterval(this.countdown);
  }

  bindIntervalEvent = (val) => {
    const second = val * 1000;
    if (this.observer) {
      this.observer.unsubscribe();
    }
    this.setCountdownInterval();
    const rxInterval = Observable.interval(second);
    this.observer = rxInterval.subscribe(this.changeSquare);
  }

  // change square rgb background color
  changeSquare = (val) => {
    this.setState({
      background: `#${_.sampleSize(hexadecimal, 6).join('')}`
    });
  }

  setCountdownInterval = () => {
    if (this.countdown) {
      clearInterval(this.countdown);
    }
    this.countdown = setInterval(() => {
      let countdown;
      if (this.state.countdown === 1) {
        countdown = this.state.second;
      } else {
        countdown = this.state.countdown - 1;
      }
      this.setState({
        countdown
      });
    }, 1000);
  }

  render() {
    return (
      <Div backgroundColor={this.state.background}>
        <p>圖形自動隨機變色</p>
        <div id="square">圖形</div>
        <br />
        設定秒數: <Input id="input-second" placeholder="輸入秒數" value={this.state.second} onChange={(e) => { this.setState({ ...this.state, second: e.target.value, countdown: e.target.value }); }} />
        <br />
        圖形顏色將於: {this.state.countdown} 秒後變色
      </Div>
    );
  }
}

export default ColorSquare;
