const Theme = require("../src/models/Theme"); // Adjust path based on your structure

const themes = [
  {
    name: "Animals",
    images: [
      "/assets/images/animals/1.jpg",
      "/assets/images/animals/2.jpg",
      "/assets/images/animals/3.jpg",
      "/assets/images/animals/4.jpg",
      "/assets/images/animals/5.jpg",
      "/assets/images/animals/6.jpg",
      "/assets/images/animals/7.jpg",
      "/assets/images/animals/8.jpg",
      "/assets/images/animals/9.jpg",
    ],
  },
  {
    name: "Harry-Potter",
    images: [
      "/assets/images/harry-potter/1.jpg",
      "/assets/images/harry-potter/2.jpg",
      "/assets/images/harry-potter/3.jpg",
      "/assets/images/harry-potter/4.jpg",
      "/assets/images/harry-potter/5.jpg",
      "/assets/images/harry-potter/6.jpg",
      "/assets/images/harry-potter/7.jpg",
      "/assets/images/harry-potter/8.jpg",
      "/assets/images/harry-potter/9.jpg",
    ],
  },{
    name: "Fruits",
    images: [
      "/assets/images/fruits/1.jpg",
      "/assets/images/fruits/2.jpg",
      "/assets/images/fruits/3.jpg",
      "/assets/images/fruits/4.jpg",
      "/assets/images/fruits/5.jpg",
      "/assets/images/fruits/6.jpg",
      "/assets/images/fruits/7.jpg",
      "/assets/images/fruits/8.jpg",
      "/assets/images/fruits/9.jpg",
    ],
  },{
    name: "World",
    images: [
      "/assets/images/wonders-of-world/1.jpg",
      "/assets/images/wonders-of-world/2.jpg",
      "/assets/images/wonders-of-world/3.jpg",
      "/assets/images/wonders-of-world/4.jpg",
      "/assets/images/wonders-of-world/5.jpg",
      "/assets/images/wonders-of-world/6.jpg",
      "/assets/images/wonders-of-world/7.jpg",
      "/assets/images/wonders-of-world/8.jpg",
      "/assets/images/wonders-of-world/9.jpg",
    ],
  },
];

exports.uploadThemes = async () => {
  try {
    await Theme.deleteMany({}); // Clear existing themes
    await Theme.insertMany(themes);
    console.log("Themes uploaded successfully!");
  } catch (error) {
    console.error("Error uploading themes:", error);
  }
};


