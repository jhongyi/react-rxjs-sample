import React, { Component } from 'react';
import styled from 'styled-components';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/skip';

const Div = styled.div`
  canvas {
    border: 1px solid black;
    // width: 1000px;
    // height: 500px;
  }
`;

class Draw extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.ctx = null;
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');

    console.log('------------------------------------');
    console.log(this.canvas.offsetLeft);
    console.log(this.canvas.offsetTop);
    console.log('------------------------------------');
    this.ctx = this.canvas.getContext("2d");
    const cRect = this.canvas.getBoundingClientRect();
    const offsetX = cRect.left;
    const offsetY = cRect.top;

    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = 'green';
    // this.ctx.lineJoin = "round";

    const mousedown = Observable.fromEvent(this.canvas, 'mousedown');
    const mousemove = Observable.fromEvent(this.canvas, 'mousemove');
    const mouseup = Observable.fromEvent(this.canvas, 'mouseup');
    const moving = mousedown.flatMap(() => {
      const drag = mousemove.takeUntil(mouseup);
      return drag
        .scan(
          (acc, v) => ({ prev: acc.curt, curt: v })
        )
        .skip(1);
    });

    moving.subscribe((prevAndCurt) => {
      console.log('------------------------------------');
      console.log(prevAndCurt);
      console.log('------------------------------------');
      const prevX = prevAndCurt.prev ? (prevAndCurt.prev.clientX - offsetX) : prevAndCurt.curt.clientX - offsetX;
      const prevY = prevAndCurt.prev ? (prevAndCurt.prev.clientY - offsetY) : prevAndCurt.curt.clientY - offsetY;
      const curtX = (prevAndCurt.curt.clientX - offsetX);
      const curtY = (prevAndCurt.curt.clientY - offsetY);

      this.ctx.beginPath();
      this.ctx.moveTo(prevX, prevY);
      this.ctx.lineTo(curtX, curtY);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }

  render() {
    return (
      <Div>
        <canvas id="canvas" width="300" height="300" ref={(c) => { this.canvas = c; }}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </Div>
    );
  }
}

export default Draw;
