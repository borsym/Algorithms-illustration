import React, { Component } from "react";
import "./Algorithms.css";
import Node from "./Node";

const ROWS_NUMBER = 10;
const COLMS_NUMBER = 10;

const NODE_START_X = 0;
const NODE_START_Y = 0;
const NODE_END_X = ROWS_NUMBER - 1;
const NODE_END_Y = COLMS_NUMBER - 1;

class Algorithms extends Component {
  state = {
    grid: [],
  };

  //miutan minden lerendelodik meghivodik automatikus a metodus a react altal
  //After all the elemnts of the page is rendered, this method is called
  //componentDidMount() {
  //  const grid = [];
  //  for (let i = 0; i < ROWS_NUMBER; i++) {
  //    const currentRow = [];
  //    for (let j = 0; j < COLMS_NUMBER; j++) {
  //      currentRow.push({ i, j });
  //    }
  //    grid.push(currentRow);
  //  }
  //
  //  this.setState({ grid });
  //}
  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid = () => {
    const grid = new Array(COLMS_NUMBER);
    for (let i = 0; i < COLMS_NUMBER; i++) {
      grid[i] = new Array(ROWS_NUMBER);
      for (let j = 0; j < ROWS_NUMBER; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    this.setState({ grid });
  };

  Clicked() {
    console.log("put start");
  }

  render() {
    const { grid } = this.state;
    console.log(grid);
    //console.log(grid);
    return (
      <div>
        <button onClick={this.Clicked}>Put Start</button>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { x, y, isWall, isStart, isEnd } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      x={x}
                      y={y}
                      isWall={isWall}
                      isStart={isStart}
                      isEnd={isEnd}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Algorithms;

function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.isStart = this.x === NODE_START_X && this.y === NODE_START_Y;
  this.isEnd = this.x === NODE_END_X && this.y === NODE_END_Y;
  this.isWall = false;
}
