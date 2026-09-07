// Roles the user has selected so far. Loaded from localStorage on
// page load if a previous selection exists, otherwise starts empty.
let selectedRoles = loadRoles();

// Reference to the volunteer role list, used to attach a single
// click listener instead of one per list item.
const volunteerList = document.getElementById("volunteer-list");

// Reference to the summary text shown above the role list.
const interestSummary = document.getElementById("interest-summary");

// Reads the saved role list from localStorage, if one exists.
// JSON.parse converts the stored string back into a real array.
// Returns an empty array if nothing has been saved yet.
function loadRoles() {
  const stored = localStorage.getItem("selectedRoles");
  return stored ? JSON.parse(stored) : [];
}

// Saves the current selectedRoles array to localStorage.
// JSON.stringify converts the array into a string, since
// localStorage can only store strings, not arrays or objects directly.
function saveRoles() {
  localStorage.setItem("selectedRoles", JSON.stringify(selectedRoles));
}

// Adds a role to selectedRoles if it isn't already there, or
// removes it if it is. Saves to localStorage immediately after,
// so the array and browser storage never fall out of sync.
function toggleRole(role) {
  const index = selectedRoles.indexOf(role);

  if (index === -1) {
    selectedRoles.push(role);
  } else {
    selectedRoles.splice(index, 1);
  }

  saveRoles();
}

// Updates the summary text to reflect the current contents of
// selectedRoles. Called after every click so the page always
// matches the underlying data.
function updateSummary() {
  if (selectedRoles.length === 0) {
    interestSummary.textContent = "You haven't selected any roles yet.";
  } else {
    interestSummary.textContent = "You're interested in: " + selectedRoles.join(", ");
  }
}

// Applies the "selected" class to any <li> whose role is already
// in selectedRoles. Runs once when the page loads, so a previous
// selection is visible immediately instead of only after a click.
function highlightSavedRoles() {
  const items = volunteerList.querySelectorAll("li");

  items.forEach(function (item) {
    if (selectedRoles.includes(item.dataset.role)) {
      item.classList.add("selected");
    }
  });
}

// Single click listener on the list (event delegation), rather than
// one listener per <li>. Works automatically if roles are added later.
volunteerList.addEventListener("click", function (event) {
  // event.target is whatever element was actually clicked: the <li>,
  // the <strong> tag inside it, or the description text. closest("li")
  // finds the nearest <li> ancestor regardless of which part was clicked.
  const clickedItem = event.target.closest("li");

  // Ignore clicks that land outside any <li>.
  if (!clickedItem) return;

  // data-role holds the clean role name, set directly on each <li>
  // in the HTML, so no parsing of the <strong> text is needed.
  const role = clickedItem.dataset.role;

  toggleRole(role);
  updateSummary();

  // Adds the "selected" class if it's missing, removes it if it's
  // present. The visual result is defined in CSS, not here.
  clickedItem.classList.toggle("selected");
});

// Run once when the page loads, so a returning visitor immediately
// sees their previous selection reflected in both the summary text
// and the highlighted cards, without needing to click anything.
updateSummary();
highlightSavedRoles();
