import { setBlack } from './black_squares.js'
import { getNumbers } from './numbers.js'

export function blackToggle(size) {
  let squares = document.getElementsByTagName('td');
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function (e) {
      setBlack(e, size);
      getNumbers(size);
    })
  }
}