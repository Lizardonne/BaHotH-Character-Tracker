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
  updated: Date,
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
  /* Request body:
    playerName: String    Name of player document to be created
    characterId: String   ID string of character document associated with player
    */
app.post("/api/players", async (req, res) => {
  const player = new Player({
    playerName: req.body.playerName,
    characterId: req.body.characterId,
    created: Date.now(),
    updated: Date.now(),
    hp: [0, 0, 0, 0] // TODO: use character start values
  });
  try {
    await player.save();
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
const characterSheet = require("./characters.json");
async function refreshCharacters() {
  try {
    await Character.deleteMany({});
    characterSheet.forEach(async character => {
      const c = new Character({
        name: character.name,
        age: character.age,
        height: character.height,
        weight: character.weight,
        hobbies: character.hobbies,
        birthday: character.birthday,
        flavortext: character.flavortext,
        color: character.color,
        speed: character.speed,
        speedStart: character.speedStart,
        might: character.might,
        mightStart: character.mightStart,
        sanity: character.sanity,
        sanityStart: character.sanityStart,
        knowledge: character.knowledge,
        knowledgeStart: character.knowledgeStart
      });
      await c.save();
    });
  } catch(error) {
    console.log(error);
  }
}
refreshCharacters();

// READ
  // Request body: NONE
app.get("/api/players", async (req, res) => {
  try {
    var players = await Player.find();
    res.send(players);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  /* Request body:
    id: String    String ID of player document to be found
    */
app.get("/api/players/:player", async (req, res) => {
  try {
    var player = await Player.findOne({
      _id: req.body.id
    });
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  // Request body: NONE
app.get("/api/characters", async (req, res) => {
  try {
    var characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  /* Request body:
    id: String    String ID of character document to be found
    */
app.get("/api/characters/:character", async (req, res) => {
  try {
    var character = await Character.findOne({
      _id: req.body.id
    });
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPDATE (gameplay)
  /* Request body:
    id: String        ID string of player document to update
    speed: Number     New speed HP index
    might: Number     New might HP index
    sanity: Number    New sanity HP index
    knowledge: Number New knowledge HP index
    */
app.put("/api/players:player", async (req, res) => {
  try {
    var player = await Player.findOne({
      _id: req.body.id
    });
    player.updated = Date.now();
    player.hp: [
      req.body.speed,
      req.body.might,
      req.body.sanity,
      req.body.knowledge
    ];
    await player.save();
    res.send(player);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// DELETE
  /* Request body:
    id: String    String ID of player document to be deleted
    */
app.delete("/api/players/:player", async (req, res) => {
  try {
    const response = await Player.deleteOne({
      _id: req.body.id
    });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log("Server listening on port 3000..."));
