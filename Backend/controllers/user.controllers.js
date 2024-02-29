const { verify } = require("../config/bcrypt");
const { generateToken } = require("../config/token");
const UserModel = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !req.file) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }
    const newUser = new UserModel({
      name,
      email,
      password,
      image: req.file.filename,
    });
    const savedUser = await newUser.save();
     const token = generateToken(savedUser._id);
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        image: savedUser.image,
        token
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ msg: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await verify(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports={register,login}