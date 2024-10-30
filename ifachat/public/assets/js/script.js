const sendPublic = document.querySelector("#sendPublic");
const messagesPublic = document.getElementById("messagesPublic");
const messagesPrivate = document.getElementById("messagesPrivate");
const usersContainer = document.getElementById("usersContainer");
const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const pseudo = urlParams.get("pseudo");
const pwd = urlParams.get("pwd");

const displayPublicMessage = (data) => {
  messagesPublic.innerHTML += `
    <div class="newMessage">
        <h2>${data.pseudo}</h2>
        <p class="content">${data.messageContent}</p>
        <p class="date">${data.date}</p>
    </div>`;
};

const displayPrivateMessage = (data) => {
  messagesPrivate.innerHTML += `
    <div class="privateMessage">
        <h2>${data.pseudo} [Private message]</h2>
        <p class="content">${data.messageContent}</p>
        <p class="date">${data.date}</p>
    </div>`;
};

tinymce.init({
  selector: "#textPublic",
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | formatpainter casechange blocks | bold italic backcolor | " +
    "alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
});

socket.on("init", (data) => {
  socket.emit("sendLog", { pseudo, pwd });
});

sendPublic.addEventListener("click", () => {
  const messageContent = tinyMCE.get("textPublic").getContent();
  const date = new Date();
  socket.emit("publicMessage", { pseudo, messageContent, date });
  displayPublicMessage({ pseudo, messageContent, date });
  tinyMCE.get("textPublic").setContent("");
});

socket.on("publicMessageGlobal", (data) => {
  displayPublicMessage(data);
});

socket.on("updateUserList", (users) => {
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const userElement = document.createElement("p");
    userElement.innerHTML = user.pseudo;

    userElement.onclick = () => {
      console.log("Selected User:", user.pseudo);
      displayPrivateMessagePopup(user.id, user.pseudo);
    };

    usersContainer.appendChild(userElement);
  });
});

const displayPrivateMessagePopup = (recipientId, recipientName) => {
  const existingPopup = document.querySelector(".privateMessagePopup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.className = "privateMessagePopup";
  popup.innerHTML = `
      <h2>Message for: ${recipientName || "Unknown recipient"}</h2>
      <textarea id="privateMessage"></textarea>
      <button onclick="sendPrivateMessage('${recipientId}')">Send Private</button>
      <button onclick="closePrivateMessagePopup()">Close</button>`;
  document.body.appendChild(popup);
  tinymce.init({ selector: "#privateMessage" });
};

const closePrivateMessagePopup = () => {
  const popup = document.querySelector(".privateMessagePopup");
  if (popup) popup.remove();
};

const sendPrivateMessage = (recipientId) => {
  const messageContent = tinyMCE.get("privateMessage").getContent();
  const date = new Date();
  socket.emit("privateMessage", { recipientId, messageContent, date });
  displayPrivateMessage({ pseudo, messageContent, date });
  closePrivateMessagePopup();
};

socket.on("receivePrivateMessage", (data) => {
  displayPrivateMessage(data);
});
