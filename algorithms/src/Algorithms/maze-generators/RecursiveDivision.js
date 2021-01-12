function addInnerWalls(h, minX, maxX, minY, maxY, gate, grid) {
  if (h) {
    if (maxX - minX <= 2) {
      return;
    }

    var y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(minX, maxX, y, grid);

    addInnerWalls(!h, minX, maxX, minY, y - 1, gate, grid);
    addInnerWalls(!h, minX, maxX, y + 1, maxY, gate, grid);
  } else {
    if (maxY - minY <= 2) {
      return;
    }

    var x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(minY, maxY, x, grid);

    addInnerWalls(!h, minX, x - 1, minY, maxY, gate, grid);
    addInnerWalls(!h, x + 1, maxX, minY, maxY, gate, grid);
  }

  addOuterWalls(grid, maxY, maxX);
  return grid;
}

function addOuterWalls(grid, width, height) {
  for (var i = 0; i < width + 2; i++) {
    if (i === 0 || i === width + 2 - 1) {
      for (var j = 0; j < height + 2; j++) {
        grid[i][j].isWall = true;
      }
    } else {
      grid[i][0].isWall = true;
      grid[i][height + 2 - 1].isWall = true;
    }
  }
}

function addHWall(minX, maxX, y, grid) {
  let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  console.log("Y");
  for (let i = minX; i <= maxX; i++) {
    if (i === hole) {
      grid[y][i].isWall = false;
    } else {
      setTimeout(() => {
        grid[y][i].isWall = true;
        const node = grid[y][i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-wall";
      }, 40 * i);
    }
    //console.log(grid[y][i]);
  }
}

function addVWall(minY, maxY, x, grid) {
  let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  console.log("X" + " " + minY + " " + maxY + " " + x);
  for (let i = minY; i <= maxY; i++) {
    if (i === hole) {
      grid[i][x].isWall = false;
    } else {
      setTimeout(() => {
        grid[i][x].isWall = true;
        const node = grid[i][x];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-wall";
      }, 40 * i);
    }
    //console.log(grid[i][x]);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default addInnerWalls;
