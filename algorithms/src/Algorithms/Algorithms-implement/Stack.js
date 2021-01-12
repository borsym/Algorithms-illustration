class Stack {
  constructor() {
    this.itemsX = [];
    this.itemsY = [];
    this.index = 0;
  }

  put(x, y) {
    this.itemsX[this.index] = x;
    this.itemsY[this.index] = y;
    this.index++;

    let arr = [this.itemsX[this.index - 1], this.itemsY[this.index - 1]];
    return arr;
  }

  pop() {
    if (this.index === 0) return null;
    let deleteItemX = this.itemsX[this.index - 1];
    let deleteItemY = this.itemsY[this.index - 1];
    this.index--;
    return [deleteItemX, deleteItemY];
  }

  top() {
    return [this.itemsX[this.index - 1], this.itemsY[this.index - 1]];
  }

  isEmpty() {
    return this.index === 0;
  }

  size() {
    return this.index;
  }
}

export default Stack;
