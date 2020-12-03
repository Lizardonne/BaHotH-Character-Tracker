const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require("mongoose");

const playerScheme = new mongoose.Schema({
  playerName: String,
  characterId: String,
  created: Date,
  hp: [Number]
});
const characterScheme = new mongoose.Schema({
  name: String,
  age: Number,
  height: String,
  weight: String,
  hobbies: [String],
  birthday: String,
  flavortext: String,
  color: String,
  speed: [Number],
  speedStart: Number,
  might: [Number],
  mightStart: Number,
  sanity: [Number],
  sanityStart: Number,
  knowledge: [Number],
  knowledgeStart: Number
});

const Player = mongoose.model("Player", playerScheme);
const Character = mongoose.model("Character", characterScheme);

// Connect to the database
mongoose.connect("mongodb://localhost:27017/bahoth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// CREATE
app.post("/api/players", async (req, res) => {
  const player = new Player({
    playerName: req.body.playerName,
    characterId: req.body.characterId,
    created: Date.now(),
    hp: [0,0,0,0] // TODO: use character start values
  });
  try {
    await player.save();
    res.send(player);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// READ
app.get("/api/players", async (req, res) => {
  try {
    var players = await Player.find();
    res.send(players);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPDATE (gameplay)

// DELETE
app.delete("/api/players/:player", async (req, res) => {
  try {
    const response = await Player.deleteOne({
      _id: req.body.id
    });
    res.send(response);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log("Server listening on port 3000..."));
