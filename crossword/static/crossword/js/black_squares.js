
function oppositeCell(row, col) {
  var size = document.getElementById("dimensions").value;
  // Get the opposite row and column of the selected cell.
  const opp_row = size - row - 1;
  const opp_col = size - col - 1;
  return [opp_row, opp_col]
}

export function setBlack(e) {
  var size = document.getElementById("dimensions").value;
  // Get squares row and col.
  let row = e.target.parentNode.attributes.row.value
  let col = e.target.parentNode.attributes.col.value

  // Get opposite row and col.
  let opp_index = oppositeCell(row, col)

  // Get cell and opposite cell
  let cell = document.querySelector('[row="' + row + '"][col="' + col + '"]')
  let opp_cell = document.querySelector('[row="' + opp_index[0] + '"][col="' + opp_index[1] + '"]')

  // Edge case of middle square.
  if (row == opp_index[0] && col == opp_index[1]) {
    cell.classList.toggle("black")
    return;
  }

  // Toggle cell's class name (decides background color)
  cell.classList.toggle("black")
  opp_cell.classList.toggle("black")
  console.log(cell.classList)
  if (!cell.classList.length) {
    cell.childNodes[1].value = ""
    opp_cell.childNodes[1].value = ""
  }
}