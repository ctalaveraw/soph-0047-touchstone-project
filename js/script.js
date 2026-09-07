// Roles the user has selected so far. Read from and updated
// whenever a volunteer role card is clicked.
let selectedRoles = [];

// Reference to the volunteer role list, used to attach a single
// click listener instead of one per list item.
const volunteerList = document.getElementById("volunteer-list");

// Reference to the summary text shown above the role list.
const interestSummary = document.getElementById("interest-summary");

// Adds a role to selectedRoles if it isn't already there, or
// removes it if it is. Keeps the array as the single source of
// truth for which roles are currently selected.
function toggleRole(role) {
  const index = selectedRoles.indexOf(role);

  if (index === -1) {
    selectedRoles.push(role);
  } else {
    selectedRoles.splice(index, 1);
  }
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