// This can be placed in your JavaScript file (e.g., app.js)
const correctPasscode = process.env.PASSCODE; // Fetch the environment variable set on Netlify

// Prompt the user for the passcode when they load the page
function checkPasscode() {
  const userPasscode = prompt("Please enter the passcode:");

  if (userPasscode === correctPasscode) {
    alert("Access granted!");
    // Proceed to show the content
  } else {
    alert("Access denied. Invalid passcode.");
    window.location.reload(); // Refresh the page to re-prompt
  }
}

// Run checkPasscode on page load
window.onload = checkPasscode;

async function validatePasscode(userPasscode) {
    const response = await fetch("/.netlify/functions/check-passcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passcodeInput: userPasscode }),
    });
  
    const data = await response.json();
  
    if (response.status === 200) {
      alert(data.message); // Success
      // Proceed to show the content
    } else {
      alert(data.message); // Failure
      window.location.reload(); // Refresh the page to re-prompt
    }
  }
  
  // Prompt the user and call the validation function
  const userPasscode = prompt("Please enter the passcode:");
  validatePasscode(userPasscode);
  


let allRecipes = []; // To store all recipes for search functionality
const content = document.getElementById("content");

// Function to load a category
async function showCategory(category) {
    try {
      const response = await fetch(`data/${category}.json`);
      if (!response.ok) throw new Error('Failed to load recipes');
      const recipes = await response.json();
      allRecipes = recipes; // Store recipes for search functionality
      displayRecipes(recipes);
    } catch (error) {
      content.innerHTML = `<p>Error loading ${category} recipes: ${error.message}</p>`;
    }
  }
  
// Function to display recipes
function displayRecipes(recipes) {
  content.innerHTML = ""; // Clear existing content

  if (recipes.length === 0) {
    content.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe";

    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <p><strong>Type:</strong> ${recipe.type}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(i => `<li>${i.amount} ${i.unit} ${i.name}</li>`).join("")}
      </ul>
      <p><strong>Process:</strong> ${recipe.process}</p>
    `;

    content.appendChild(recipeCard);
  });
}

// Search functionality
function searchRecipes(event) {
  const query = event.target.value.toLowerCase();
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.type.toLowerCase().includes(query)
  );
  displayRecipes(filteredRecipes);
}

