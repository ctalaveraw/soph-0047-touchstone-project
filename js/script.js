// Roles the user has selected so far. Read from and updated
// whenever a volunteer role card is clicked.
let selectedRoles = [];

// Reference to the volunteer role list, used to attach a single
// click listener instead of one per list item.
const volunteerList = document.getElementById("volunteer-list");

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
    console.log("You clicked:", clickedItem.dataset.role);
});