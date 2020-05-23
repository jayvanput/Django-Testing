import { buildTable } from './grid.js'
import { blackToggle } from './black_button.js'
import { getNumbers } from './numbers.js'

let dims = document.getElementById("dimensions");
var black_button = document.getElementById("black_button");
var tbl = document.getElementsByTagName('table')[0];
var spans = document.getElementsByTagName('span')

dims.addEventListener('change', function () {
  black_button.checked = false;
  buildTable(dims.value)
  getNumbers(dims.value);
  tbl.classList = "";
})

black_button.addEventListener('click', function () {
  blackToggle(dims.value);
  tbl.classList.toggle('edit_mode');
})

buildTable(dims.value);
getNumbers(dims.value);
