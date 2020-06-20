import { buildTable } from './grid.js'
import { blackToggle } from './black_button.js'
import { getNumbers } from './numbers.js'

let dims = document.getElementById("dimensions");
var black_button = document.getElementById("black_button");
var tbl = document.getElementsByTagName('table')[0];
var spans = document.getElementsByTagName('span')
var flag = true
dims.addEventListener('change', function () {
  black_button.checked = false;
  buildTable(dims.value)
  getNumbers();
  tbl.classList = "";
})


black_button.addEventListener('click', function () {
  blackToggle();
  tbl.classList.toggle('edit_mode');
  if (flag) {
    dims.disabled = true;
  } else {
    dims.disabled = false;
  }
  flag = !flag
})

buildTable(dims.value);
getNumbers();