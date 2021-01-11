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
    const extraClassName = this.props.wall
      ? "node-wall"
      : this.props.start
      ? "node-start"
      : this.props.end
      ? "node-end"
      : "";

    return (
      <div
        className={`node ${extraClassName}`}
        onClick={() => this.PutWall()}
        // onMouseDown={() => this.props.onMouseDown(this.props.x, this.props.y)}
      ></div>
    );
  }
}

export default Node;
