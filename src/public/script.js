// Socket io on client side
const socket = io();

// Refer to chatbox.html & open it in browser to know what they represent
const usersList = document.querySelector(".users-name");
const chatForm = document.getElementById("message-form");
const messageInput = document.querySelector("#msg");
const messages = document.querySelector(".messages");

// Getting username from index.html, here qs is a library to parse querystring in url 
const {username} = Qs.parse(location.search, {ignoreQueryPrefix: true});

/////////////////////// IMPLEMENT BELOW STEPS //////////////////////

// Send username about "userJoin" to server 

// Listen for "updateUsers" from server and update usersList with new list of users, each user should be a li element containing username.

// Listen for "message" from server and add new msg to messages, each message is a div element with class "message" 
// containing 2 paragraphs, one with class "meta" containing username & other with class "text" containing message.

// When a user submit a message in chatForm send {username: username, message: messageInput.value } about chatMessage to server 


socket.emit("userJoin", username);

socket.on("updateUsers", (users) => {
  usersList.innerHTML = "";
  users.forEach((user) => {
    console.log(user);
    const li = document.createElement('li');
    li.textContent = user.username;
    usersList.appendChild(li);
  });
});

socket.on("message", (msg) => {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message";

  const p1 = document.createElement("p");
  p1.className = "meta";
  p1.textContent = msg.username;
  msgDiv.appendChild(p1);

  const p2 = document.createElement("p");
  p2.className = "text";
  p2.textContent = msg.message;
  msgDiv.appendChild(p2);

  messages.appendChild(msgDiv);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chatMessage", { username, message: messageInput.value });
  messageInput.value = "";
});