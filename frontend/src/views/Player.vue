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

  <div class="stats">
    <div v-bind:class="['stat', 'stat' + statName(i)]" v-for="(stat, i) in character.stats" v-bind:key="i">
      <h3>{{ statName(i) }}</h3>
      <div class="stat-buttons">
        <button type="button" v-on:click="decrementStat(i)">&ndash;</button>
        <button type="button" v-on:click="incrementStat(i)">+</button>
      </div>
      <ul>
        <li v-bind:class="{active: activeHP(i, j)}" class="stat-point" v-for="(point, j) in stat" v-bind:key="j">{{ point }}</li>
      </ul>
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
      character: Object
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
        console.log(r1);
        var response = await axios.get("/api/players/" + this.playerId);
        this.player = response.data;
      } catch (error) {
        console.log(error);
      }
    },
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
    statName(index) {
      var statNames = [
        "Speed",
        "Might",
        "Sanity",
        "Knowledge"
      ];
      return statNames[index];
    },
    activeHP(statIndex, pointIndex) {
      if (this.player.hp[statIndex] == pointIndex) {
        return true;
      }
      return false;
    },
    incrementStat(index) {
      if (this.player.hp[index] < this.character.stats[index].length) {
        this.player.hp[index]++;
        this.updatePlayer();
      }
    },
    decrementStat(index) {
      if (this.player.hp[index] > 0) {
        this.player.hp[index]--;
        this.updatePlayer();
      }
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

.stats {
  margin-top: 1em;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-gap: 1em;
}

.stat {
  border: 5px solid black;
}

.stat h3 {
  padding: 0.5em;
}

.stat-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.stats button {
  background-color: gray;
  border: none;
  font-size: 1.25em;
  padding: 0.5em;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.stats button:hover {
  background-color: gray;
  border-color: black;
  color: black;
}

.stats ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats li {
  padding: 1em;
}

.active {
  background-color: darkred;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

p {
  margin: 5% 15%;
  font-family: 'Texturina', 'Cinzel', serif;
  text-align: left;
}
</style>
