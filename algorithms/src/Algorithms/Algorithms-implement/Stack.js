class Stack {
  constructor() {
    this.itemsX = [];
    this.index = 0;
  }

  put(value) {
    this.itemsX[this.index] = value;
    this.index++;

    let arr = this.itemsX[this.index - 1];
    return arr;
  }

  pop() {
    if (this.index === 0) return null;
    let deleteItemX = this.itemsX[this.index - 1];
    this.index--;
    return deleteItemX;
  }

  top() {
    return this.itemsX[this.index - 1];
  }

  isEmpty() {
    return this.index === 0;
  }

  size() {
    return this.index;
  }
}

export default Stack;
