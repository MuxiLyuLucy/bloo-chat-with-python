document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";
  });

  // append the chat text message
  socket.on("message_another", (msg) => {
    const message = document.createElement("li");
    message.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
    messages.appendChild(message);
  });
});
