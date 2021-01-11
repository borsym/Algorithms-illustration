import React, { Component } from "react";
import "./Algorithms.css";
import Node from "./Node";
import Astar from "./Algorithms-implement/Astar";

const ROWS_NUMBER = 15;
const COLMS_NUMBER = 50;

const NODE_START_X = 0;
const NODE_START_Y = 0;
const NODE_END_X = ROWS_NUMBER - 1;
const NODE_END_Y = COLMS_NUMBER - 1;

class Algorithms extends Component {
  state = {
    grid: [],
    path: [],
    visitedNodes: [],
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
    const grid = new Array(ROWS_NUMBER);
    for (let i = 0; i < ROWS_NUMBER; i++) {
      grid[i] = new Array(COLMS_NUMBER);
      for (let j = 0; j < COLMS_NUMBER; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    addNeighbours(grid);
    this.setState({ grid });

    const startNode = grid[NODE_START_X][NODE_START_Y];
    const endNode = grid[NODE_END_X][NODE_END_Y];
    let path = Astar(startNode, endNode);
    this.setState({ path: path.path, visitedNodes: path.visitedNodes });
  };

  VisualizePath = () => {
    for (let i = 0; i <= this.state.visitedNodes.length; i++) {
      if (i === this.state.visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(this.state.path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = this.state.visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };

  render() {
    //console.log(this.state.path);
    const { grid } = this.state;
    //console.log(grid);
    //console.log(grid);
    return (
      <div>
        <button onClick={this.VisualizePath}>Start</button>
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

const visualizeShortestPath = (shortestPathNodes) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i];
      document.getElementById(`node-${node.x}-${node.y}`).className =
        "node node-shortest-path";
    }, 10 * i);
  }
};

const addNeighbours = (grid) => {
  for (let i = 0; i < ROWS_NUMBER; i++) {
    for (let j = 0; j < COLMS_NUMBER; j++) {
      grid[i][j].addneighbours(grid);
    }
  }
};

function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.isStart = this.x === NODE_START_X && this.y === NODE_START_Y;
  this.isEnd = this.x === NODE_END_X && this.y === NODE_END_Y;
  this.isWall = false;
  if (Math.random(1) < 0.2 && !this.isStart && !this.isEnd) {
    this.isWall = true;
  }
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.previus = undefined;
  this.addneighbours = (grid) => {
    if (this.x > 0) this.neighbours.push(grid[this.x - 1][this.y]);
    if (this.x < ROWS_NUMBER - 1)
      this.neighbours.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbours.push(grid[this.x][this.y - 1]);
    if (this.y < COLMS_NUMBER - 1)
      this.neighbours.push(grid[this.x][this.y + 1]);
  };
}
