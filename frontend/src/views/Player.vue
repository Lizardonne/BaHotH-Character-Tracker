<template>
<div class="player">
  <div class="player-header">
    <h1>{{ character.name }}</h1>
    <h2>{{ player.playerName }}</h2>
  </div>

  <div class="flavortext">
    <ul>
      <li>Age: {{ character.age }}</li>
      <li>Height: {{ character.height }}</li>
      <li>Weight: {{ character.weight }}</li>
      <li>Hobbies: {{ listToString(character.hobbies) }}</li>
      <li>Birthday: {{ character.birthday }}</li>
    </ul>
    <p>{{ character.flavortext }}</p>
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
}

ul {
  list-style: none;
}

.flavortext {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.stat {
  margin: 1em;
}
.stat-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.stats button {
  padding: 0.5em;
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
  background-color: gray;
}
</style>
