const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const createdRecipe = await Recipe.create({
      // TODO: write the schema
      title: "Spagetosh",
      level: "UltraPro Chef",
      ingredients: ["pasta", "fromaggia"],
      cuisine: "cuisinela",
      dishType: "main_course",
      duration: "1hour",
      creator: "DamdamTouch",
    });

    console.log(createdRecipe.title);
  })
  .then(async () => {
    //iteration 3
    const myAddedRecipe = await Recipe.insertMany(data);
    //console.log(myAddedRecipe)
  })
  .then(async () => {
    //iteration 4
    const myFindAndUpdate = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "60" }
    );
    //   console.log(myFindAndUpdate);
  })
  .then(async () => {
    //iteration 5
    const myDeleted = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(myDeleted);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
