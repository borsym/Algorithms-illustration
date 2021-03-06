import React, { Component } from "react";
import "./Algorithms.css";
import Node from "./Node";
import Astar from "./Algorithms-implement/Astar";
import BFS from "./Algorithms-implement/BFS";
import RecursiveDivision from "./maze-generators/RecursiveDivision";
import Backtracing from "./maze-generators/Backtracing";
import "bootstrap/dist/css/bootstrap.css";

const ROWS_NUMBER = 10;
const COLMS_NUMBER = 15;

const NODE_START_X = Math.floor(ROWS_NUMBER / 2);
const NODE_START_Y = 1;
const NODE_END_X = Math.floor(ROWS_NUMBER / 2);
const NODE_END_Y = COLMS_NUMBER - 2;

class Algorithms extends Component {
  state = {
    grid: [],
    path: [],
    visitedNodes: [],
    mouseIsPressed: false,
  };

  // lefut miután minden készenáll
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

    this.setState({ grid });

    addNeighbours(grid);
    const startNode = grid[NODE_START_X][NODE_START_Y];
    const endNode = grid[NODE_END_X][NODE_END_Y];

    let path = Astar(startNode, endNode);
    this.setState({ path: path.path, visitedNodes: path.visitedNodes });
  };

  handleMouseDown(x, y) {
    //console.log("lenyomott");
    const grid = this.state.grid;
    if (grid[x][y].isEnd || grid[x][y].isStart) return;
    grid[x][y].isWall = true;
    this.setState({ grid: grid, mouseIsPressed: true });
  }

  handleMouseEnter(x, y) {
    if (!this.state.mouseIsPressed) return;
    const grid = this.state.grid;
    if (grid[x][y].isEnd || grid[x][y].isStart) return;
    grid[x][y].isWall = true;
    this.setState({ grid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  GenerateWalls = () => {
    this.ResetTable();
    //console.log("there is a bug, sometime the walls doesn't dissapear");
    const grid = this.state.grid;

    for (let i = 0; i < ROWS_NUMBER; i++) {
      for (let j = 0; j < COLMS_NUMBER; j++) {
        if (Math.random(1) < 0.2 && !grid[i][j].isStart && !grid[i][j].isEnd)
          grid[i][j].isWall = true;
      }
    }
    this.setState({ grid });
  };

  ResetTable = () => {
    const grid = this.state.grid;
    for (let i = 0; i < ROWS_NUMBER; i++) {
      for (let j = 0; j < COLMS_NUMBER; j++) {
        if (!grid[i][j].isStart && !grid[i][j].isEnd) {
          grid[i][j].isWall = false;

          document.getElementById(
            `node-${grid[i][j].x}-${grid[i][j].y}`
          ).className = "node";
        } else if (grid[i][j].isStart) {
          document.getElementById(
            `node-${grid[i][j].x}-${grid[i][j].y}`
          ).className = "node node-start";
        } else if (grid[i][j].isEnd) {
          document.getElementById(
            `node-${grid[i][j].x}-${grid[i][j].y}`
          ).className = "node node-end";
        }
      }
    }
    this.setState({ grid });
  };

  makePath = () => {
    const grid = this.state.grid;
    addNeighbours(grid);
    const startNode = grid[NODE_START_X][NODE_START_Y];
    const endNode = grid[NODE_END_X][NODE_END_Y];
    let path = Astar(startNode, endNode);

    this.setState({ path: path.path, visitedNodes: path.visitedNodes });

    this.VisualizePath(path.visitedNodes, path.path);
  };

  VisualizePath = (visitedNodes, path) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };
  // this doesn't work properly
  HandleMaze = () => {
    const grid2 = addOuterWalls(this.state.grid, ROWS_NUMBER, COLMS_NUMBER);
    this.setState({ grid: grid2 });

    const grid = RecursiveDivision(
      true,
      1,
      ROWS_NUMBER - 2,
      1,
      COLMS_NUMBER - 2,
      this.state.grid
    );
    this.setState({ grid });
  };
  HandleBFS = () => {
    let path = BFS(
      this.state.grid,
      this.state.grid[NODE_START_X][NODE_START_Y],
      this.state.grid[NODE_END_X][NODE_END_Y],
      ROWS_NUMBER,
      COLMS_NUMBER
    );

    this.setState({ path: path.path, visitedNodes: path.visited });

    this.VisualizePath(path.visited, path.path);
  };
  HandleBackTracing = () => {
    // console.log("szia");
    const grid = Backtracing(this.state.grid, ROWS_NUMBER, COLMS_NUMBER);
    this.setState({ grid });
  };

  render() {
    const { grid } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center ">
            <button className="btn btn-success btn-md" onClick={this.HandleBFS}>
              BFS
            </button>

            <button
              className="btn btn-success btn-md"
              onClick={this.ResetTable}
            >
              Reset
            </button>
            <button
              onClick={this.makePath}
              className="btn btn-primary btn-lg button-move"
            >
              Start
            </button>
            <button
              onClick={this.GenerateWalls}
              className="btn btn-success btn-md "
            >
              Generate Walls
            </button>
            <button
              onClick={this.HandleMaze}
              className="btn btn-danger btn-md "
            >
              Recursive Division (not working)
            </button>
            <button
              onClick={this.HandleBackTracing}
              className="btn btn-danger btn-md "
            >
              Backtracing (not working)
            </button>

            <div className="grid">
              {grid.map((row, rowIndex) => {
                return (
                  <div key={rowIndex}>
                    {row.map((node, nodeIndex) => {
                      const { x, y, isWall, isStart, isEnd } = node; // minden node rendelkezik ezekkel és még sok mással ami a pointba van
                      return (
                        <Node //ezek prop ok a nodeban
                          key={nodeIndex}
                          x={x}
                          y={y}
                          isWall={isWall}
                          isStart={isStart}
                          isEnd={isEnd}
                          mouseIsPressed={this.state.mouseIsPressed}
                          onMouseDown={(x, y) => this.handleMouseDown(x, y)}
                          onMouseEnter={(x, y) => this.handleMouseEnter(x, y)}
                          onMouseUp={() => this.handleMouseUp()}
                        ></Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Algorithms;

//===================================== valamiért nem fut le csak 1x a while
function addOuterWalls(grid, width, height) {
  for (let i = 0; i < width; i++) {
    if (i === 0 || i === width - 1) {
      for (let j = 0; j < height; j++) {
        grid[i][j].isWall = true;
      }
    } else {
      grid[i][0].isWall = true;
      grid[i][height - 1].isWall = true;
    }
  }

  return grid;
}

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

  //if (Math.random(1) < 0.2 && !this.isStart && !this.isEnd) this.isWall = true;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.parent = undefined;
  this.addneighbours = (grid) => {
    if (this.x > 0) this.neighbours.push(grid[this.x - 1][this.y]);
    if (this.x < ROWS_NUMBER - 1)
      this.neighbours.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbours.push(grid[this.x][this.y - 1]);
    if (this.y < COLMS_NUMBER - 1)
      this.neighbours.push(grid[this.x][this.y + 1]);
  };
}
