const express = require("express");
const http = require("http");
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);
//172.20.192.227

const ip = "127.0.0.1";
const port = 4000;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
// un tableau pour suivre mes utilisateurs actifs
const users = [];
const publicMessages = [];

//.....
io.on("connection", (socket) => {
  socket.emit("init", { message: "bienvenue cher client du chat" });
  const updateUsers = () => {
    io.emit(
      "updateUserList",
      users.map((user) => ({ id: user.id, pseudo: user.pseudo }))
    );
  };

  socket.on("privateMessage", ({ recipientId, messageContent, date }) => {
    const recipientSocket = io.sockets.sockets.get(recipientId);
    if (recipientSocket) {
      recipientSocket.emit("receivePrivateMessage", {
        pseudo: users.find((user) => user.id === socket.id).pseudo,
        messageContent,
        date,
      });
    }
  });

  // attente de l'emit sendLog
  socket.on("sendLog", (data) => {
    //console.log(socket.id);
    // securisation par authenticator ...
    data.id = socket.id;
    users.push(data);
    updateUsers();
    //console.dir(users);
  });
  socket.on("publicMessage", (data) => {
    data.id = socket.id;
    publicMessages.push(data);
    //console.dir(publicMessages);
    socket.broadcast.emit("publicMessageGlobal", data);
  });
  socket.on("disconnect", () => {
    //socket.id

    let indexDisconnect;
    users.forEach((element, index) => {
      if (element.id === socket.id) {
        indexDisconnect = index;
        updateUsers();
      }
    });
    // splice sert à supprimer une entrée de tableau à
    // partir de son index (indexDisconnect)
    users.splice(indexDisconnect, 1);
    console.dir(users);
  });
});

server.listen(port, ip, () => {
  console.log("Demarer sur http://" + ip + ":" + port);
});
