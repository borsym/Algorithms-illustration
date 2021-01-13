import Stack from "../Algorithms-implement/Stack";
/* TODO: fix this */
function makeEverytingWall(grid, ROWS_NUMBER, COLMS_NUMBER) {
  for (let i = 0; i < ROWS_NUMBER; i++) {
    for (let j = 0; j < COLMS_NUMBER; j++) {
      if (!grid[i][j].isEnd && !grid[i][j].isStart) {
        grid[i][j].isWall = true;
      }
    }
  }
  return grid;
}
/*
  1. Choose the initial cell, mark it as visited and push it to the stack -- talan
  2. While the stack is not empty -- G(ood)
     1. Pop a cell from the stack and make it a current cell  -- G
     2. If the current cell has any neighbours which have not been visited
        1. Push the current cell to the stack
        2. Choose one of the unvisited neighbours
        3. Remove the wall between the current cell and the chosen cell
        4. Mark the chosen cell as visited and push it to the stack
  */

function backtracing(grid, ROWS_NUMBER, COLMS_NUMBER) {
  const mygrid = makeEverytingWall(grid, ROWS_NUMBER, COLMS_NUMBER);
  const visited = [];
  let stack = new Stack();
  stack.put(grid[Math.floor(ROWS_NUMBER / 2)][1]);
  visited.push(grid[Math.floor(ROWS_NUMBER / 2)][1]); // {[], [] }...

  while (!stack.isEmpty()) {
    let current = stack.pop();

    let unVisitidNeighbours = notVisitidNeighbours(
      grid,
      current,
      visited,
      ROWS_NUMBER,
      COLMS_NUMBER
    );

    if (unVisitidNeighbours.length !== 0) {
      stack.put(current);
      let choosen =
        unVisitidNeighbours[
          Math.floor(Math.random() * unVisitidNeighbours.length)
        ];
      console.log(choosen);

      mygrid[choosen.x][choosen.y].isWall = false;
      stack.put(choosen);
      visited.push(choosen);
      console.log(visited);
    }
  }
  return mygrid;
}

function notVisitidNeighbours(
  grid,
  current,
  visited,
  ROWS_NUMBER,
  COLMS_NUMBER
) {
  let neighbours = [];
  let unvisitid_neighbours = [];
  if (current.x - 1 >= 0) neighbours.push(grid[current.x - 1][current.y]);
  if (current.x + 1 < ROWS_NUMBER)
    neighbours.push(grid[current.x + 1][current.y]);
  if (current.y + 1 < COLMS_NUMBER)
    neighbours.push(grid[current.x][current.y + 1]);
  if (current.y - 1 >= 0) neighbours.push(grid[current.x][current.y - 1]);
  if (neighbours.length === 0) return [];
  for (let i = 0; i < neighbours.length; i++) {
    if (!visited.includes(neighbours[i])) {
      unvisitid_neighbours.push(neighbours[i]);
    }
  }

  // console.log("god?");
  console.log(unvisitid_neighbours);

  return unvisitid_neighbours;
}

export default backtracing;
