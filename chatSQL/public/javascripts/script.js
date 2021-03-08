const ws = new WebSocket("ws://localhost:3000");


ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p><strong>${item.author}:</strong> ${item.message}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  ws.send(message.value);
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);