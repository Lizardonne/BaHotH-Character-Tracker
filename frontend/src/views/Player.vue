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
      <div v-for="stat in character.stats" v-bind:key="indexOf(stat, character.stats)">
        <h3>{{ statName(indexOf(stat, character.stats)) }}</h3>
        <button type="button">-</button>
        <ul>
          <li class="stat-point" v-for="point in stat" v-bind:key="indexOf(point, stat)">{{ point }}</li>
        </ul>
        <button type="button">+</button>
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
    indexOf(item, array) {
      return array.indexOf(item);
    }
  }
}
</script>
