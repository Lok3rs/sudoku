module.exports = function solveSudoku(matrix) {
  const findEmptyCells = () => {
    const unknown = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          unknown.push([i, j]);
        }
      }
    }
    return unknown;
  };

  const checkRow = (row, num) => {
    for (let i = 0; i < 9; i++) {
      if (matrix[row][i] === num) {
        return false;
      }
    }
    return true;
  };

  const checkColumn = (column, num) => {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][column] === num) {
        return false;
      }
    }
    return true;
  };

  const checkBox = (row, column, num) => {
    let boxRowCoordinate = Math.floor(row / 3) * 3;
    let boxColumnCoordinate = Math.floor(column / 3) * 3;
    for (let i = boxRowCoordinate; i <= boxRowCoordinate + 2; i++) {
      for (let j = boxColumnCoordinate; j <= boxColumnCoordinate + 2; j++) {
        if (matrix[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const checkCell = (row, column, num) => {
    if (
      checkRow(row, num) &&
      checkColumn(column, num) &&
      checkBox(row, column, num)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const emptyCells = findEmptyCells();
  let row, column, cellValue;
  let i = 0;
  let flag;

  while (i < emptyCells.length) {
    row = emptyCells[i][0];
    column = emptyCells[i][1];
    cellValue = matrix[row][column] + 1;
    flag = false;
    while (cellValue <= 9 && !flag) {
      if (checkCell(row, column, cellValue)) {
        matrix[row][column] = cellValue;
        i = i + 1;
        flag = true;
      } else {
        cellValue = cellValue + 1;
      }
    }
    if (!flag) {
      matrix[row][column] = 0;
      i = i - 1;
    }
  }

  return matrix;
};
