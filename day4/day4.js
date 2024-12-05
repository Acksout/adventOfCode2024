const fs = require("fs");
const data = fs.readFileSync("day4data.txt", "utf8");
const strToFind1 = "XMAS";
const strToFind2 = "SAMX";
let xmasCount = 0;

function findStr(data) {
  const lines = data.split("\n");
  const numRows = lines.length;
  const numCols = lines[0].length;

  function countOccurrences(text, str) {
    let count = 0;
    let index = 0;
    while ((index = text.indexOf(str, index)) !== -1) {
      count++;
      index += str.length;
    }
    return count;
  }

  function findHorizontal() {
    for (const line of lines) {
      xmasCount += countOccurrences(line, strToFind1);
      xmasCount += countOccurrences(line, strToFind2);
    }
  }

  function findVertical() {
    for (let col = 0; col < numCols; col++) {
      let verticalStr = "";
      for (let row = 0; row < numRows; row++) {
        verticalStr += lines[row][col];
      }
      xmasCount += countOccurrences(verticalStr, strToFind1);
      xmasCount += countOccurrences(verticalStr, strToFind2);
    }
  }

  function findDiagonal() {
    function findTopLeftToBottomRightDiagonals() {
      for (let startRow = 0; startRow < numRows; startRow++) {
        let diagonalStr = "";
        for (
          let row = startRow, col = 0;
          row < numRows && col < numCols;
          row++, col++
        ) {
          diagonalStr += lines[row][col];
        }
        xmasCount += countOccurrences(diagonalStr, strToFind1);
        xmasCount += countOccurrences(diagonalStr, strToFind2);
      }

      for (let startCol = 1; startCol < numCols; startCol++) {
        let diagonalStr = "";
        for (
          let row = 0, col = startCol;
          row < numRows && col < numCols;
          row++, col++
        ) {
          diagonalStr += lines[row][col];
        }
        xmasCount += countOccurrences(diagonalStr, strToFind1);
        xmasCount += countOccurrences(diagonalStr, strToFind2);
      }
    }

    function findTopRightToBottomLeftDiagonals() {
      for (let startRow = 0; startRow < numRows; startRow++) {
        let diagonalStr = "";
        for (
          let row = startRow, col = numCols - 1;
          row < numRows && col >= 0;
          row++, col--
        ) {
          diagonalStr += lines[row][col];
        }
        xmasCount += countOccurrences(diagonalStr, strToFind1);
        xmasCount += countOccurrences(diagonalStr, strToFind2);
      }

      for (let startCol = numCols - 2; startCol >= 0; startCol--) {
        let diagonalStr = "";
        for (
          let row = 0, col = startCol;
          row < numRows && col >= 0;
          row++, col--
        ) {
          diagonalStr += lines[row][col];
        }
        xmasCount += countOccurrences(diagonalStr, strToFind1);
        xmasCount += countOccurrences(diagonalStr, strToFind2);
      }
    }

    findTopLeftToBottomRightDiagonals();
    findTopRightToBottomLeftDiagonals();
  }

  findHorizontal();
  findVertical();
  findDiagonal();

  console.log(xmasCount);
}

findStr(data);
