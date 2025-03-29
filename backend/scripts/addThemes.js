const mongoose = require("mongoose");
const Theme = require("../src/models/Theme"); // Adjust path based on your structure

mongoose.connect("mongodb://localhost:27017/memory-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const themes = [
  {
    name: "Animals",
    images: [
      "http://localhost:5000/assets/images/animals/1.jpg",
      "http://localhost:5000/assets/images/animals/2.jpg",
      "http://localhost:5000/assets/images/animals/3.jpg",
      "http://localhost:5000/assets/images/animals/4.jpg",
      "http://localhost:5000/assets/images/animals/5.jpg",
      "http://localhost:5000/assets/images/animals/6.jpg",
      "http://localhost:5000/assets/images/animals/7.jpg",
      "http://localhost:5000/assets/images/animals/8.jpg",
      "http://localhost:5000/assets/images/animals/9.jpg",
    ],
  },
  {
    name: "Harry-Potter",
    images: [
      "http://localhost:5000/assets/images/harry-potter/1.jpg",
      "http://localhost:5000/assets/images/harry-potter/2.jpg",
      "http://localhost:5000/assets/images/harry-potter/3.jpg",
      "http://localhost:5000/assets/images/harry-potter/4.jpg",
      "http://localhost:5000/assets/images/harry-potter/5.jpg",
      "http://localhost:5000/assets/images/harry-potter/6.jpg",
      "http://localhost:5000/assets/images/harry-potter/7.jpg",
      "http://localhost:5000/assets/images/harry-potter/8.jpg",
      "http://localhost:5000/assets/images/harry-potter/9.jpg",
    ],
  },
];

const uploadThemes = async () => {
  try {
    await Theme.deleteMany({}); // Clear existing themes
    await Theme.insertMany(themes);
    console.log("Themes uploaded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error uploading themes:", error);
  }
};

uploadThemes();
