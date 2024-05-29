const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./models/connectDb");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
