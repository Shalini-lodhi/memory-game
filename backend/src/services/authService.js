const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

exports.registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  return { message: "User registered successfully", user };
};


exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);
  return { token, user };
};

