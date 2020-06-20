import { setBlack } from './black_squares.js'
import { getNumbers } from './numbers.js'

var bool = true

function button_event_listeners(event) {
  setBlack(event);
  getNumbers();
}

export function blackToggle() {
  let squares = document.getElementsByTagName('td');
  if (bool) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', button_event_listeners, true)
    }
  } else {
    for (let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener('click', button_event_listeners, true)
    }
  }
  bool = !bool
}