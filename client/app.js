const form = document.getElementById("jokeForm");
const jokeContainer = document.getElementById("jokeContainer"); // Obtain jokeContainer DOM element upfront

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const myDiv = document.getElementById("jokeContainer");
  myDiv.innerHTML = "";
  // Get the joke from the form
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  // Send the joke to the server
  const response = await fetch("http://localhost:8080/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  const json = await response.json();

  // Create and display the new joke on the page
  getJokes();
  // Clear the form for the next joke
  form.reset();
});

// Initial load of jokes

async function getJokes() {
  // Fetch jokes from the server
  const response = await fetch("http://localhost:8080/jokes");
  const jokes = await response.json();

  // Render the fetched jokes
  jokes.forEach(function (joke) {
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = joke.setup;
    p.textContent = joke.punchline;
    jokeContainer.appendChild(h3);
    jokeContainer.appendChild(p);
  });
}
getJokes();
