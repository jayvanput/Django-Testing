import { appendClues } from './clues.js'


function setCellContent(number, hidden_number, value) {
  number.textContent = value;
  hidden_number.value = value;
}

export function getNumbers() {
  let size = document.getElementById("dimensions").value;
  let across_div = document.getElementById("cluesA");
  let down_div = document.getElementById("cluesD");
  let tally = 1;
  let across = [];
  let down = [];
  let squares = document.getElementsByTagName('td');

  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    let number = square.childNodes[0]
    let hidden_number = square.childNodes[2]
    let number_flag = 0;
    // Clear values
    across_div.length = 0;
    down_div.length = 0;
    setCellContent(number, hidden_number, "");
    if (square.classList.contains('black')) {
      continue;
    }
    // First square edge case 
    if (i == 0) {
      setCellContent(number, hidden_number, tally);
      across.push(tally);
      down.push(tally);
      tally++;
      continue;
    }
    // Check if cell is in top row.
    if (typeof (squares[i - size]) === 'undefined') {
      if (squares[i - 1].classList.contains('black')) {
        across.push(tally);
      }
      setCellContent(number, hidden_number, tally);
      down.push(tally)
      tally++;
      continue;
    }
    // Check if cell is in first column.
    if (i % size == 0) {
      across.push(tally)
      number_flag++;
    }
    // Check cell to left is black.
    if (squares[i - 1].classList.contains('black') && i % size !== 0) {
      across.push(tally)
      number_flag++;
    }
    // Check cell above is black
    if (squares[i - size].classList.contains('black')) {
      down.push(tally)
      number_flag++;
    }
    if (number_flag > 0) {
      setCellContent(number, hidden_number, tally)
      tally++;
    }
    console.log(i)
  }
  appendClues(across, across_div, "across")
  appendClues(down, down_div, "down")

}