const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./models/connectDb");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Chat = require("./models/chatmodel");

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  const { email, password, username } = req.body;
  const user = User.create({ email, password, username });
  let token = jwt.sign(
    {
      userId: user._id,
    },
    "Aayush",
    { expiresIn: "30d" }
  );
  if (user) {
    res.status(201).json({
      email: user.email,
      username: user.username,
      token: token,
    });
  } else {
    res.status(400);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  existingUser = await User.findOne({ email: email });

  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: existingUser._id,
      },
      "Aayush",
      { expiresIn: "30d" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(200).json({
    success: true,
    data: {
      userId: existingUser._id,
      email: existingUser.email,
      token: token,
    },
  });
});

// search alluser
app.get("/users",async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users =await (await User.find(keyword)).find({_id:{$ne:req.user._id}})
    res.send(users);
});

// access chat
app.post("/chat", async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    return res.status(400).json("userId not sent with request");
  }
  var chat = await Chat.find({
    groupchat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestmessage");
  chat = await User.populate(chat, {
    path: "latestmessage.sender",
    select: "username email",
  });
  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    const createdchat = await Chat.create({
      chatname: "sender",
      groupchat: false,
      users: [req.user._id, userID],
    });
    const fullchat = await Chat.findOne({ _id: createdchat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullchat);
  }
});

// fetch chat
app.get("/chats", (req, res) => {
  Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupadmin", "-password")
    .populate("latestmessage")
    .sort({ updateAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestmessage.sender",
        select: "username email",
      });
      res.status(200).send(results);
    });
});
// create groupchat
app.post("/groupchat", async (req, res) => {
  const { users, chatname } = req.body;
  users.push(req.user);
  const groupchat = await Chat.create({
    chatname: chatname,
    groupchat: true,
    users: users,
    groupadmin: req.user,
  });
  const fullgroupchat = await Chat.findOne({ _id: groupchat._id })
    .populate("users", "-password")
    .populate("groupadmin", "-password");
  res.status(200).send(fullgroupchat);
});
// add to a groupchat
app.post("/adduser", async (req, res) => {
  const { userID, chatid } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatid,
    {
      $push: { users: userID },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupadmin", "-password");
});
// remove user from groupchat
app.post("/removeuser", async (req, res) => {
  const { userID, chatid } = req.body;
  const removed = await Chat.findByIdAndDelete(
    chatid,
    {
      $pull: { users: userID },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupadmin", "-password");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
