const addButton = document.getElementById("add-entry");
const restbtton = document.getElementById("reset");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const entrieslist = document.getElementById("entries");
const filter = document.getElementById(`input[name="filter]`);

// Load data from localStorage
let entries = JSON.parse(localStorage.getItem("entries")) || [];

function addEntry() {
  const description = descriptionInput.value;
  const amount = parseInt(amountInput.value);
  const type = typeInput.value;
  if (description && amount && !isNaN(amount)) {
    const entry = { description, amount, type };
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    const description = "";
    const amount = "";
    const type = typeInput.value;
  } else {
    alert("Enter the Entries");
  }
}

addButton.addEventListener("click", addEntry);
