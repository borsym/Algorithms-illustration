import Stack from "../Algorithms-implement/Stack";

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
  stack.put(Math.floor(ROWS_NUMBER / 2), 1);
  visited.push([Math.floor(ROWS_NUMBER / 2), 1]); // {[], [] }...

  while (!stack.isEmpty()) {
    let current = stack.pop();
    let unVisitidNeighbours = notVisitidNeighbours(
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

      mygrid[choosen[0]][choosen[1]].isWall = false;
      stack.put(choosen[0], choosen[1]);
      visited.push(choosen);
      console.log(visited);
    }
  }

  return mygrid;
}

function checkVisited(neighbour, visited) {
  for (let i = 0; i < visited.length; i++) {
    let isMatch = true;
    for (let j = 0; j < 2; j++) {
      if (visited[i][j] !== neighbour[j]) {
        isMatch = false;
      }
    }
    if (isMatch) return true;
  }

  return false;
}

function notVisitidNeighbours(current, visited, ROWS_NUMBER, COLMS_NUMBER) {
  let neighbours = [];
  let unvisitid_neighbours = [];
  if (current[0] - 1 >= 0) neighbours.push([current[0] - 1, current[1]]);
  if (current[0] + 1 < ROWS_NUMBER)
    neighbours.push([current[0] + 1, current[1]]);
  if (current[1] + 1 < COLMS_NUMBER)
    neighbours.push([current[0], current[1] + 1]);
  if (current[1] - 1 >= 0) neighbours.push([current[0], current[1] - 1]);
  //console.log(neighbours);

  // this is how I check if the visitid contains an element

  for (let i = 0; i < neighbours.length; i++) {
    let isVisitid = checkVisited(neighbours[i], visited);
    if (!isVisitid) unvisitid_neighbours.push(neighbours[i]);
  }

  // console.log("god?");
  //console.log(unvisitid_neighbours.length);

  return unvisitid_neighbours;
}

export default backtracing;
