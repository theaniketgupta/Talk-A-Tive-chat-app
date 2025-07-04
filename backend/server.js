const express = require("express");
// const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
dotenv.config();

const app = express();

app.use(express.json());

const cors = require("cors");
// app.use(
//   cors({
//     origin: "https://talk-a-tive-chatapp-eta.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );
app.use(cors());
// //------------Deployment----------------

// const __dirname1=path.resolve();

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname1, "/frontend/build")))

//     app.get("*", (req,res)=>{
//       res.sendFile(path/resolve(__dirname1, "frontend", "build", "index.html"))
//     })
// } else{
//   app.get("/", (req, res) => {
//     res.send("api is running");
//   });
// }

// //------------Deployment----------------

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB();
const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://talk-a-tive-chatapp-eta.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users is not defined.");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
