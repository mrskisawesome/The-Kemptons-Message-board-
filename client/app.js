const form = document.getElementById("messageBoard");
const messageContainer = document.getElementById("messageContainer"); // Obtain messageContainer DOM element upfront

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const myDiv = document.getElementById("messageContainer");
  myDiv.innerHTML = "";
  // Get the name and message from the form
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  // Send the message to the server
  const response = await fetch("http://localhost:8080/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  const json = await response.json();

  // Create and display the new message on the page
  getMessages();
  // Clear the form for the next message
  form.reset();
});

// Initial load of messages

async function getMessages() {
  // Fetch message from the server
  const response = await fetch("http://localhost:8080/messages");
  const messages = await response.json();

  // Render the fetched messages
  messages.forEach(function (message) {
    //const likeButton = document.createElement("button");
    //likeButton.textContent = "Like";
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = message.name;
    p.textContent = message.message;
    messageContainer.appendChild(h3);
    messageContainer.appendChild(p);
  });
}
getMessages();
