<template>
  <div class="player">
    <h1>{{ character.name }}</h1>
    <h2>{{ player.playerName }}</h2>
    <ul>
      <li>Age: {{ character.age }}</li>
      <li>Height: {{ character.height }}</li>
      <li>Weight: {{ character.weight }}</li>
      <li>Hobbies: {{ hobbies() }}</li>
      <li>Birthday: {{ character.birthday }}</li>
    </ul>
    <p>{{ character.flavortext }}</p>
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
        console.log(playerResponse);
        this.player = playerResponse.data;
        var characterResponse = await axios.get("/api/characters/" + this.player.characterId);
        this.character = characterResponse.data;
      } catch(error) {
        console.log(error);
      }
    },
    hobbies() {
      var output = "";
      for (var i = 0; i < this.character.hobbies.length; i++) {
        output += this.character.hobbies[i];
        if(i < this.character.hobbies.length - 1) {
          output += ", ";
        }
      }
      return output;
    }
  }
}
</script>
