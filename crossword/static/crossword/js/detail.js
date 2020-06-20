const test = JSON.parse(JSON.parse(document.getElementById('squares').textContent))

var btn = document.getElementById('check')
var all_cells = document.getElementsByTagName("td")
var answer = []

for (let i = 0; i < test.length; i++) {
  answer.push(test[i].fields.value)
}

btn.addEventListener("click", function () {
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] !== all_cells[i].firstElementChild.value) {
      alert('not quite!')
      return
    }
  }
  alert('you win!')
})


