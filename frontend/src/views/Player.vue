<template>
<div class="player">
  <div class="player-header">
    <h1>{{ character.name }}</h1>
    <h2>{{ player.playerName }}</h2>
  </div>

  <div class="flavortext">
    <table>
      <tr>
        <th>Age</th>
        <td>{{ character.age }}</td>
      </tr>
      <tr>
        <th>Height</th>
        <td>{{ character.height }}</td>
      </tr>
      <tr>
        <th>Weight</th>
        <td>{{ character.weight }}</td>
      </tr>
      <tr>
        <th>Hobbies</th>
        <td>{{ listToString(character.hobbies) }}</td>
      </tr>
      <tr>
        <th>Birthday</th>
        <td>{{ character.birthday }}</td>
      </tr>
    </table>
  </div>

  <div class="stats-container">
    <button class="toggle-layout" v-on:click="toggleLayout">Toggle Layout</button>
    <div v-bind:class="['stats', 'stats-' + layouts[layoutIndex]]">
      <div v-bind:class="['stat', 'stat-' + statName, {dead: isDead(statName)}]" v-for="(values, statName, i) in character.stats" v-bind:key="i">
        <h3>{{ statName }}</h3>
        <div class="stat-buttons">
          <button type="button" v-on:click="decrementStat(statName)">&ndash;</button>
          <button type="button" v-on:click="incrementStat(statName)">+</button>
        </div>
        <ul>
          <li v-bind:class="[{active: activeHP(statName, j)}, {start: startHP(statName, j)}]" class="stat-point" v-for="(point, j) in values" v-bind:key="j">{{ point }}</li>
        </ul>
      </div>
    </div>
  </div>

  <p v-html="character.flavortext"></p>

</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Player',
  props: {
    playerId: String
  },
  data() {
    return {
      player: Object,
      character: Object,
      layouts: [
        "normal",
        "vertical",
        "horizontal"
      ],
      layoutIndex: 0
    };
  },
  created() {
    this.setup();
  },
  methods: {
    async setup() {
      try {
        var playerResponse = await axios.get("/api/players/" + this.playerId);
        this.player = playerResponse.data;
        var characterResponse = await axios.get("/api/characters/" + this.player.characterId);
        this.character = characterResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePlayer() {
      try {
        var r1 = await axios.put("/api/players/" + this.playerId, {
          id: this.playerId,
          hp: this.player.hp
        });
        if (r1.status != 200) {
          throw new Error();
        }
        var response = await axios.get("/api/players/" + this.playerId);
        this.player = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    //-- Helper function
    listToString(array) {
      var output = "";
      if (array != null) {
        for (var i = 0; i < array.length; i++) {
          output += array[i];
          if (i < array.length - 1) {
            output += ", ";
          }
        }
      }
      return output;
    },
    //-- Class determiners
    activeHP(stat, index) {
      if (this.player.hp[stat] == index) {
        return true;
      }
      return false;
    },
    startHP(stat, index) {
      if (this.character.start[stat] == index) {
        return true;
      }
      return false;
    },
    isDead(stat) {
      if (this.player.hp[stat] < 0) {
        return true;
      }
      return false;
    },
    //-- Button functions
    incrementStat(stat) {
      if (this.player.hp[stat] < this.character.stats[stat].length - 1) {
        this.player.hp[stat]++;
        this.updatePlayer();
      }
    },
    decrementStat(stat) {
      if (this.player.hp[stat] > -1) {
        this.player.hp[stat]--;

        if (this.player.hp[stat] > 0) {
          this.updatePlayer();
        }
      }
    },
    toggleLayout() {
      this.layoutIndex = (++this.layoutIndex) % this.layouts.length;
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5%;
}

.flavortext {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

ul {
  list-style: none;
}

th {
  padding-right: 1em;
  text-align: right;
}

button {
  background-color: gray;
  border: none;
  text-align: center;
  vertical-align: middle;
  padding: 0.25em;
}

button:hover {
  background-color: darkgray;
  border-color: black;
  color: black;
}

.toggle-layout {
  margin-top: 0.5em;
}

/* Universal Layout */
.stats-container {
  width: 100%;
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stats {
  width: 90%;
  margin-top: 0.5em;
  display: grid;
  justify-content: center;
  grid-gap: 0.5em;
}

.stat {
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat ul {
  display: flex;
  width: 100%;
  margin: 0 0.5em;
}

.stat li {
  padding: 0.5em;
}

.stat-buttons {
  width: 85%;
  display: flex;
  justify-content: space-between;
}

.stat button {
  font-size: 1.25em;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

/* END Universal Layout */

/* Normal Layout */
.stats-normal {
  grid-template-columns: 50% 50%;
}

.stats-normal ul {
  flex-direction: row;
  justify-content: space-around;
}

.stats-normal .stat-buttons {
  transform: translate(0, -50%);
}

.stats-normal .stat h3 {
  transform: translate(0, 50%);
}

/* END Normal Layout */

/* Vertical Layout (stacked) */
.stats-vertical {
  grid-template-columns: auto;
}

.stats-vertical .stat-buttons {
  padding-top: 0.5em;
}

.stats-vertical ul {
  flex-direction: row;
  justify-content: space-around;
}

.stats-vertical h3 {
  position: absolute;
  transform: translate(0, -75%);
}

/* END Vertical Layout */

/* Horizontal Layout (side-by-side) */
.stats-horizontal {
  grid-template-columns: 20% 20% 20% 20%;
}

.stats-horizontal h3 {
  width: 100%;
  margin: 0.25em;
  overflow: hidden;
  text-overflow: clip;
}

.stats-horizontal .stat-buttons {
  width: 100%;
  justify-content: space-around;
}

.stats-horizontal ul {
  flex-direction: column;
  width: 50%;
  margin-bottom: 0.25em;
}

/* END Horizontal Layout */

.active {
  background-color: darkred;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.start {
  color: white;
}

.dead {
  background-color: black;
}

p {
  margin: 5% 15%;
  font-family: 'Texturina', 'Cinzel', serif;
  text-align: left;
}

@media only screen and (max-width:620px) {
  .player-header {
    order: 1;
  }

  .stats-container {
    order: 2;
    margin: 2.5%;
    font-size: 125%;
  }

  .stats-horizontal ul {
    width: 100%;
  }

  .stats-normal ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .flavortext {
    order: 3;
    margin: 5%;
  }

  p {
    order: 4;
    margin: 0 5% 10% 5%;
  }
}
</style>
