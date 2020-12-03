<template>
<div class="new">
  <h1>New Player</h1>
  <div class="player-info">
    <input type="text" v-model="playerName" placeholder="Player Name">
    <select class="characters" v-model="selectedCharacter">
      <option disabled>Character Name</option>
      <option v-for="character in characters" v-bind:key="character._id">{{ character.name }}</option>
    </select>
    <!-- TODO: option to randomize character select -->
    <button type="button" v-on:click="createPlayer">Let the Haunt begin...</button>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'New',
  data() {
    return {
      playerName: "",
      selectedCharacter: null,
      characters: []
    }
  },
  methods: {
    async createPlayer() {
      try {
        await axios.post("/api/players", {
          playerName: this.playerName,
          characterId: "fixme"
        });
      } catch(error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
  .player-info {
    display: flex;
    flex-direction: column;
  }
</style>
