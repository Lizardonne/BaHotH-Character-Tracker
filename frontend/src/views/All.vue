<template>
<div class="all">
  <h1>Active Players</h1>
  <table>
    <tr>
      <th>Player</th>
      <th>Character</th>
      <th>Created</th>
      <th>Last Used</th>
      <th>Delete</th>
    </tr>
    <tr v-for="player in players" v-bind:key="player._id">
      <td>{{ player.playerName }}</td>
      <td>{{ characterName(player) }}</td>
      <td>{{ player.created }}</td>
      <td>{{ player.updated }}</td>
      <td><button type="button" v-on:click="deletePlayer(player)">X</button></td>
    </tr>
  </table>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'All',
  data() {
    return {
      players: [],
      characters: []
    }
  },
  created() {
    this.getPlayers();
    this.getCharacters();
  },
  methods: {
    async getPlayers() {
      try {
        var response = await axios.get("/api/players");
        this.players = response.data;
      } catch(error) {
        console.log(error);
      }
    },
    async getCharacters() {
      try {
        var response = await axios.get("/api/characters");
        console.log(response);
        this.characters = response.data;
      } catch(error) {
        console.log(error);
      }
    },
    characterName(player) {
      var character = this.characters.find(c => c._id === player.characterId);
      return character.name;
    },
    async deletePlayer(player) {
      try {
        await axios.delete("/api/players/" + player._id, {
          data: {
            id: player._id
          }
        });
        this.getPlayers();
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>
