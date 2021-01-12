function addInnerWalls(h, minX, maxX, minY, maxY, grid) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }

    let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(minX, maxX, y, grid);

    addInnerWalls(!h, minX, maxX, minY, y - 1, grid);
    addInnerWalls(!h, minX, maxX, y + 1, maxY, grid);
  } else {
    if (maxY - minY < 2) {
      return;
    }

    let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(minY, maxY, x, grid);

    addInnerWalls(!h, minX, x - 1, minY, maxY, grid);
    addInnerWalls(!h, x + 1, maxX, minY, maxY, grid);
  }

  //
  return grid;
}

function addHWall(minX, maxX, y, grid) {
  let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

  for (let i = minX; i <= maxX; i++) {
    if (i === hole / 2 && !grid[y][i].isWall) {
      grid[y][i].isWall = false;
    } else {
      //
      if (grid[y][i].isEnd || grid[y][i].isStart) {
        continue;
      } else {
        setTimeout(() => {
          grid[y][i].isWall = true;
          const node = grid[y][i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-wall";
        }, 40 * i);
      }
      //
    }
    //console.log(grid[y][i]);
  }
}

function addVWall(minY, maxY, x, grid) {
  let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  //console.log("X" + " " + minY + " " + maxY + " " + x);
  for (let i = minY; i <= maxY; i++) {
    if (i === hole && !grid[i][x].isWall) {
      grid[i][x].isWall = false;
    } else {
      setTimeout(() => {
        if (!grid[i][x].isEnd && !grid[i][x].isStart) {
          grid[i][x].isWall = true;
          const node = grid[i][x];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-wall";
        }
      }, 40 * i);
    }
    //console.log(grid[i][x]);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default addInnerWalls;
