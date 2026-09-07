// ---------------------------------------------------------------
// Volunteer interest tracker (Services page)
// Does nothing on pages that don't have a #volunteer-list element.
// ---------------------------------------------------------------
function initVolunteerTracker() {
  const volunteerList = document.getElementById("volunteer-list");

  // This page doesn't have the tracker, nothing to set up.
  if (!volunteerList) return;

  const interestSummary = document.getElementById("interest-summary");

  // Roles the user has selected so far. Loaded from localStorage on
  // page load if a previous selection exists, otherwise starts empty.
  let selectedRoles = loadRoles();

  // Reads the saved role list from localStorage, if one exists.
  // JSON.parse converts the stored string back into a real array.
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
  // removes it if it is. Saves to localStorage immediately after.
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
  // selectedRoles. Called after every click.
  function updateSummary() {
    if (selectedRoles.length === 0) {
      interestSummary.textContent = "You haven't selected any roles yet.";
    } else {
      interestSummary.textContent = "You're interested in: " + selectedRoles.join(", ");
    }
  }

  // Applies the "selected" class to any <li> whose role is already
  // in selectedRoles. Runs once on load so a previous selection is
  // visible immediately instead of only after a click.
  function highlightSavedRoles() {
    const items = volunteerList.querySelectorAll("li");

    items.forEach(function (item) {
      if (selectedRoles.includes(item.dataset.role)) {
        item.classList.add("selected");
      }
    });
  }

  // Single click listener on the list (event delegation), rather than
  // one listener per <li>.
  volunteerList.addEventListener("click", function (event) {
    const clickedItem = event.target.closest("li");
    if (!clickedItem) return;

    const role = clickedItem.dataset.role;

    toggleRole(role);
    updateSummary();
    clickedItem.classList.toggle("selected");
  });

  updateSummary();
  highlightSavedRoles();
}

// ---------------------------------------------------------------
// Contact form validation (Contact page)
// Does nothing on pages that don't have a #interest-form element.
// ---------------------------------------------------------------
function initContactValidation() {
  const form = document.getElementById("interest-form");

  // This page doesn't have the form, nothing to set up.
  if (!form) return;

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  const successMessage = document.getElementById("form-success");

form.addEventListener("submit", function (event) {
  // There's no real backend to submit to yet, so the actual
  // browser submission is always prevented. A valid submission
  // shows a confirmation message instead of sending a request.
  event.preventDefault();

  successMessage.textContent = "";

  const isNameValid = validateName();
  const isEmailValid = validateEmail();

  if (isNameValid && isEmailValid) {
    successMessage.textContent = "Thanks! Your interest has been submitted.";
    form.reset();
  }
});

  // Simple email pattern: something, @, something, ., something.
  // Not a full RFC-compliant check, just enough to catch obvious
  // typos like a missing @ or missing domain.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Checks that the name field isn't empty (ignoring extra spaces).
  // Shows or clears the error message next to the field.
  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      return false;
    }

    nameError.textContent = "";
    return true;
  }

  // Checks that the email field matches a basic email shape.
  // Shows or clears the error message next to the field.
  function validateEmail() {
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
    }

    emailError.textContent = "";
    return true;
  }

  // Runs both checks on submit. If either fails, the submission is
  // blocked so the user can fix the problem without losing their
  // other answers or having the page reload.
  form.addEventListener("submit", function (event) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) {
      event.preventDefault();
    }
  });

  // Clears each error message as soon as the user starts correcting
  // that field, rather than making them resubmit to see it clear.
  nameInput.addEventListener("input", function () {
    nameError.textContent = "";
  });

  emailInput.addEventListener("input", function () {
    emailError.textContent = "";
  });
}

initVolunteerTracker();
initContactValidation();
