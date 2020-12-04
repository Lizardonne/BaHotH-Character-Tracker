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
  stats: [
    [Number],
    [Number],
    [Number],
    [Number]
  ],
  statStarts: [Number]
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
  startStats: [Number]  Starting indexes for all stats
  */
app.post("/api/players", async (req, res) => {
  const player = new Player({
    playerName: req.body.playerName,
    characterId: req.body.characterId,
    created: new Date(Date.now()),
    updated: new Date(Date.now()),
    hp: req.body.startStats
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
    await Character.deleteMany({}).exec();
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
        stats: character.stats,
        statStarts: character.statStarts
      });
      await c.save();
    });
  } catch (error) {
    console.log(error);
  }
}
//refreshCharacters();  //breaks persistence by changing ID values

// READ
// Request body: NONE
app.get("/api/players", async (req, res) => {
  try {
    var players = await Player.find().exec();
    res.send(players);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Request body: NONE
app.get("/api/players/:player", async (req, res) => {
  try {
    var player = await Player.findById(req.params.player).exec();
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Request body: NONE
app.get("/api/characters", async (req, res) => {
  try {
    var characters = await Character.find().exec();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Request body: NONE
app.get("/api/characters/:character", async (req, res) => {
  try {
    var character = await Character.findById(req.params.character).exec();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPDATE (gameplay)
/* Request body:
  id: String      String ID of player document to be modified
  hp: [Number]    Modified HP indexes
  */
app.put("/api/players/:player", async (req, res) => {
  try {
    var player = await Player.findById(req.body.id).exec();
    if(player == null) { throw new Error("player not found"); }
    player.updated = new Date(Date.now());
    player.hp = req.body.hp;
    await player.save();
    res.send(player);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// DELETE
// Request body: NONE
app.delete("/api/players/:player", async (req, res) => {
  try {
    const response = await Player.findByIdAndDelete(req.params.player).exec();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log("Server listening on port 3000..."));
