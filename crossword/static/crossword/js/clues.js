export function appendClues(direction, clueNode, dir_name) {
  let dims = document.getElementById("dimensions");
  // Clear clue direction div.
  while (clueNode.childNodes.length > 2) {
    clueNode.removeChild(clueNode.lastChild);
  }

  for (let i = 0; i < direction.length; i++) {
    let clue = document.createElement("div");
    clue.style.padding = "5px";
    // Create clue id div.
    let clue_number = document.createElement("div");
    clue_number.textContent = direction[i] + ".";
    clue_number.className = 'clue_number'
    // Create editable div for clues.
    let clue_text = document.createElement("div");
    clue_text.className = 'clue_text'
    clue_text.contentEditable = true;
    // Create hidden input to send value of div content.
    let clue_hide = document.createElement("input");
    clue_hide.type = 'hidden';
    clue_hide.name = 'clue_' + dir_name;
    clue_hide.value = ""
    // Add event listener to update hidden input on div text change.
    clue_text.addEventListener('input', function () {
      clue_hide.value = clue_text.textContent;
    })
    // Append to clue container.    
    clue.append(clue_number);
    clue.append(clue_text);
    clue.append(clue_hide);

    clueNode.append(clue);
  }
}