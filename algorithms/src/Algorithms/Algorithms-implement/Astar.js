function Astar(startN, endN) {
  let openSet = [];
  let closedSet = [];
  let path = [];
  let visitedNodes = [];

  openSet.push(startN);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    visitedNodes.push(current);

    if (current === endN) {
      let tmp = current;
      path.push(tmp);
      while (tmp.previous) {
        path.push(tmp.previous);
        tmp = tmp.previous;
      }

      //console.log("Path found!");
      //console.log(path);
      return { path, visitedNodes };
    }

    openSet = openSet.filter((elem) => elem !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tmp = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tmp < neighbour.g) {
            neighbour.g = tmp;
            newPath = true;
          }
        } else {
          neighbour.g = tmp;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.f = heruistic(neighbour, endN);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  }

  return { path, visitedNodes, error: "No path Found" };
}

function heruistic(neighbour, endNode) {
  let d = Math.abs(neighbour.x - neighbour.y) + Math.abs(endNode.x - endNode.y);
  return d;
}

export default Astar;
