import Queue from "./Queue";

//startnode == grid[x][y]
function BFS(grid, startNode, endNode, row, colm) {
  let que = new Queue();
  let visited = [];
  let path = [];

  que.enqueue(startNode);
  visited.push(startNode);

  while (!que.isEmpty()) {
    let current = que.dequeue();
    if (current === endNode) {
      let tmp = current;
      path.push(tmp);
      while (tmp.parent) {
        path.push(tmp.parent);
        tmp = tmp.parent;
      }
      return { path, visited };
    }

    let neighbours = neighboursS(current, grid, row, colm);
    for (let i = 0; i < neighbours.length; i++) {
      if (!visited.includes(neighbours[i]) && !neighbours[i].isWall) {
        visited.push(neighbours[i]);
        neighbours[i].parent = current;
        que.enqueue(neighbours[i]);
      }
    }
  }
}

function neighboursS(current, grid, row, colm) {
  let neighbours = [];
  if (current.x - 1 >= 0) neighbours.push(grid[current.x - 1][current.y]);
  if (current.x + 1 < row) neighbours.push(grid[current.x + 1][current.y]);
  if (current.y + 1 < colm) neighbours.push(grid[current.x][current.y + 1]);
  if (current.y - 1 >= 0) neighbours.push(grid[current.x][current.y - 1]);

  return neighbours;
}

export default BFS;
