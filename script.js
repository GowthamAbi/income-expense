
// Initializing variables
const addButton = document.getElementById("add-entry");
const resetButton = document.getElementById("reset-button");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const entriesList = document.getElementById("entries");
const filterButtons = document.querySelectorAll('input[name="filter"]');

// Load data from localStorage
let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Update the display of total income, expenses, and net balance
function updateBalance() {
  let totalIncome = 0;
  let totalExpenses = 0;
  entries.forEach((entry) => {
    if (entry.type === "income") totalIncome += parseFloat(entry.amount);
    if (entry.type === "expense") totalExpenses += parseFloat(entry.amount);
  });

  document.getElementById(
    "total-income"
  ).textContent = `Total Income: $${totalIncome.toFixed(2)}`;
  document.getElementById(
    "total-expenses"
  ).textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
  document.getElementById("net-balance").textContent = `Net Balance: $${(
    totalIncome - totalExpenses
  ).toFixed(2)}`;
}

// Update the entries list
function updateEntriesList() {
  entriesList.innerHTML = "";
  const filter = document.querySelector('input[name="filter"]:checked').value;

  entries
    .filter((entry) => filter === "all" || entry.type === filter)
    .forEach((entry, index) => {
      const li = document.createElement("li");
      li.classList.add("flex", "justify-between", "p-2", "mb-2", "border-b");
      li.innerHTML = `
                <span>${entry.description} - $${entry.amount}</span>
                <div>
                    <button onclick="editEntry(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onclick="deleteEntry(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
            `;
      entriesList.appendChild(li);
    });

  updateBalance();
}

// Add new entry
function addEntry() {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && amount && !isNaN(amount)) {
    const newEntry = { description, amount, type };
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));
    updateEntriesList();

    // Clear inputs
    descriptionInput.value = "";
    amountInput.value = "";
    typeInput.value = "income";
  } else {
    alert("Please fill out all fields");
  }
}

// Edit existing entry
function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;

  deleteEntry(index);
}

// Delete entry
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateEntriesList();
}

// Reset all fields and data
function resetData() {
  entries = [];
  localStorage.removeItem("entries");
  updateEntriesList();
}

// Event Listeners
addButton.addEventListener("click", addEntry);
resetButton.addEventListener("click", resetData);

// Filter entries
filterButtons.forEach((button) => {
  button.addEventListener("change", updateEntriesList);
});

// Initial call to display data
updateEntriesList();
