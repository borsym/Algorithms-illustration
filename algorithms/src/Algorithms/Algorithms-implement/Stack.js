class Stack {
  constructor() {
    this.items = [];
    this.index = 0;
  }

  put(value) {
    this.items[this.index] = value;
    this.index++;
    return this.index - 1;
  }

  pop() {
    if (this.index === 0) return null;
    let deleteItem = this.items[this.index - 1];
    this.index--;
    return deleteItem;
  }

  top() {
    return this.items[this.index - 1];
  }

  isEmpty() {
    return this.index === 0;
  }

  size() {
    return this.index;
  }
}

export default Stack;
