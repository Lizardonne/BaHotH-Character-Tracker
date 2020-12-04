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
      <div v-for="(stat, i) in character.stats" v-bind:key="i">
        <h3>{{ statName(i) }}</h3>
        <button type="button" v-on:click="decrementStat(i)">-</button>
        <ul>
          <li class="stat-point" v-for="(point, j) in stat" v-bind:key="j">{{ point }}</li>
        </ul>
        <button type="button" v-on:click="incrementStat(i)">+</button>
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
      } catch(error) {
        console.log(error);
      }
    },
    async updatePlayer() {
      try {
        await axios.put("/api/players/" + this.playerId, {
          hp: this.player.hp
        });
        var response = await axios.get("/api/players/" + this.playerId);
        this.player = response.data;
      } catch(error) {
        console.log(error);
      }
    },
    listToString(array) {
      var output = "";
      if(array != null) {
        for (var i = 0; i < array.length; i++) {
          output += array[i];
          if(i < array.length - 1) {
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
    incrementStat(index) {
      console.log(this.player.hp[index]);
      this.player.hp[index]++;
      console.log(this.player.hp[index]);
      this.updatePlayer();
      console.log(this.player.hp[index]);
    },
    decrementStat(index) {
      console.log(this.player.hp[index]);
      this.player.hp[index]--;
      console.log(this.player.hp[index]);
      this.updatePlayer();
      console.log(this.player.hp[index]);
    }
  }
}
</script>
