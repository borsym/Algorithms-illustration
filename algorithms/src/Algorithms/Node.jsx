import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  PutWall() {
    console.log(
      " X: " +
        this.props.x +
        "\n Y: " +
        this.props.y +
        "\n WALL: " +
        this.props.isWall +
        "\n START: " +
        this.props.isStart +
        " \n END: " +
        this.props.isEnd
    );
  }

  render() {
    const extraClassName = this.props.isWall
      ? "node-wall"
      : this.props.isStart
      ? "node-start"
      : this.props.isEnd
      ? "node-end"
      : "";

    return (
      <div
        className={`node ${extraClassName}`}
        //onClick={() => this.PutWall()}
        id={`node-${this.props.x}-${this.props.y}`}
        onMouseDown={() => this.props.onMouseDown(this.props.x, this.props.y)}
        onMouseEnter={() => this.props.onMouseEnter(this.props.x, this.props.y)}
        onMouseUp={() => this.props.onMouseUp()}
      ></div>
    );
  }
}

export default Node;
