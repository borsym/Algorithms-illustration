import React, { Component } from "react";
import "./Algorithms.css";
import Node from "./Node";

class Algorithms extends Component {
  state = {
    grid: [],
  };

  //miutan minden lerendelodik meghivodik automatikus a metodus a react altal
  //After all the elemnts of the page is rendered, this method is called
  componentDidMount() {
    // making the grid
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const currentRow = [];
      for (let j = 0; j < 10; j++) {
        currentRow.push({ i, j });
      }
      grid.push(currentRow);
    }

    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    console.log(grid);
    return (
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (
            // sajat key-el kell rendelkeznie a sornak és a soron belüli elemnek az azonosításhoz
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node key={nodeIndex}></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Algorithms;
