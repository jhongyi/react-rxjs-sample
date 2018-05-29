import React, { Component } from 'react';
import { Observable } from "rxjs/Observable";
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounce';

import pokemonBall from 'static/images/pokemon-ball.png';

class MouseBall extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    const mouseContent = document.getElementById('mouse-content');
    Observable.fromEvent(mouseContent, 'mousemove')
      .flatMap(
        event => Observable.fromEvent(mouseContent, 'mousemove')
        .takeUntil(Observable.fromEvent(mouseContent, 'mouseout'))
      )
      // Only move on with latest keypress with 500 ms interval
      .debounce(val => timer(200))
      .subscribe((e) => {
        if (e.clientY <= 1000) {
          this.setState({ x: e.clientX, y: e.clientY });
        }
      });
  }

  // onMouseMove = (e) => {

  // }

  render() {
    const { x, y } = this.state;
    // onMouseMove={this.onMouseMove}
    return (
      <div id="mouse-content" style={{ backgroundColor: 'black', width: '100%', height: '1000px' }}>
        <h1>Mouse coordinates: {x}, {y}</h1>
        {
          (x > 0 || y > 0) &&
          <img
            src={pokemonBall}
            alt="pokemonBall"
            style={{ width: 50, height: 50, position: 'absolute', top: y, left: x }}
          />
        }
      </div>
    );
  }
}

export default MouseBall;
