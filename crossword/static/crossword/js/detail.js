const squares = JSON.parse(JSON.parse(document.getElementById('squares').textContent))

var btn = document.getElementById('check')
var all_cells = document.getElementsByTagName("td")

// Create answer array
var answer = []

for (let i = 0; i < squares.length; i++) {
  // Create black squares
  if (squares[i].fields.value == "") {
    all_cells[i].firstElementChild.style.backgroundColor = "black"
  }
  // Push to answer array
  answer.push(squares[i].fields.value)
}

// Add win check functionality
btn.addEventListener("click", function () {
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] !== all_cells[i].firstElementChild.value) {
      alert('not quite!')
      return
    }
  }
  alert('you win!')
})