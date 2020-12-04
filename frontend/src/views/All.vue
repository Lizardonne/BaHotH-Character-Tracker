<template>
<div class="all">
  <h1>Active Players</h1>
  <table>
    <tr class="table-header">
      <th class="hint">Player</th>
      <th>Character</th>
      <th>Created</th>
      <th>Last Used</th>
      <th class="hint">Delete</th>
    </tr>
    <tr v-for="player in players" v-bind:key="player._id">
      <td class="actionable" v-on:click="gotoPlayer(player)">{{ player.playerName }}</td>
      <td>{{ characterName(player) }}</td>
      <td>{{ dateToString(player.created) }}</td>
      <td>{{ dateToString(player.updated) }}</td>
      <td class="actionable" v-on:click="deletePlayer(player)">X</td>
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
      } catch (error) {
        console.log(error);
      }
    },
    async getCharacters() {
      try {
        var response = await axios.get("/api/characters");
        this.characters = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    characterName(player) {
      var character = this.characters.find(c => {
        return c._id == player.characterId;
      });
      if (character == null) {
        return "";
      }
      return character.name;
    },
    dateToString(date) {
      if (typeof date == typeof "") {
        var temp = new Date(date);
        return temp.toLocaleDateString() + " @ " + temp.toLocaleTimeString()
      }
      return date.toString();
    },
    async deletePlayer(player) {
      try {
        await axios.delete("/api/players/" + player._id);
        this.getPlayers();
      } catch (error) {
        console.log(error);
      }
    },
    gotoPlayer(player) {
      this.$router.push({
        path: "/player/" + player._id
      });
    }
  }
}
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-spacing: 0 0.5em;
  /*
  border-collapse: collapse;
  */
  table-layout: fixed;
}

tr:not(.table-header) {
  background-color: black;
}

tr:not(.table-header):hover {
  background-color: gray;
}

th, td {
  padding: 0 0.5em;
}

.table-header {
  border: 3px solid black;
}

.hint {
  background-color: black;
}

.actionable:hover {
  background-color: darkred;
}

th {
  font-size: 1.5em;
}
</style>
