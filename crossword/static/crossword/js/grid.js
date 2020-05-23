import { setBlack } from './black_squares.js'

// Build a single cell in the table.
function buildCell(cell, dim_size) {
  let number, input, hidden_number;
  // Add span for cell number.
  number = document.createElement("span");
  number.style.fontSize = 160 * (1 / dim_size)
  cell.append(number);
  // Add input box for letters. Add attributes.
  input = document.createElement("input");
  input.maxLength = 1;
  input.name = "letter"
  input.style.fontSize = 400 * (1 / dim_size)
  cell.append(input);
  // Add hidden input box for form submission.
  hidden_number = document.createElement("input");
  hidden_number.type = 'hidden';
  hidden_number.name = 'square';
  cell.append(hidden_number);
}

export function buildTable(dimension) {
  let row, square
  // Clear table if it exists.
  let tbl = document.getElementsByTagName('table')[0]
  tbl.innerHTML = "";
  // Loop through 2D array of whatever size is in input box.
  for (let i = 0; i < dimension; i += 1) {
    row = tbl.insertRow(i);
    for (let j = 0; j < dimension; j += 1) {
      square = row.insertCell(j);
      square.setAttribute("row", i)
      square.setAttribute("col", j)
      buildCell(square, dimension);
    }
  }
}