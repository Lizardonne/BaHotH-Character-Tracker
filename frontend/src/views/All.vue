<template>
<div class="all">
  <h1>Active Players</h1>
  <table>
    <tr>
      <th>Player</th>
      <th>Character</th>
      <th>Created</th>
      <th>Delete</th>
    </tr>
    <tr v-for="player in players" v-bind:key="player._id">
      <td>{{ player.playerName }}</td>
      <td>{{ player.characterId }}</td>
      <td>{{ player.created }}</td>
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
      players: []
    }
  },
  created() {
    this.getPlayers();
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
