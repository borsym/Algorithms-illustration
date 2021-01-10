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
        this.props.wall +
        "\n START: " +
        this.props.start +
        " \n END: " +
        this.props.end
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
      ></div>
    );
  }
}

export default Node;
