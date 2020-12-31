<template>
<div class="all">
  <h1>Active Players</h1>
  <div class="table">
    <!--
    <div class="table-row table-header">
      <span class="hint">Player</span>
      <span>Character</span>
      <span>Created</span>
      <span>Last Used</span>
      <span class="hint">Delete</span>
    </div>
    <div class="table-row" v-for="player in players" v-bind:key="player._id">
      <span class="actionable" v-on:click="gotoPlayer(player)">{{ player.playerName }}</span>
      <span>{{ characterName(player) }}</span>
      <span>{{ dateToString(player.created) }}</span>
      <span>{{ dateToString(player.updated) }}</span>
      <span class="actionable" v-on:click="deletePlayer(player)">X</span>
    </div>
  -->
    <table>
      <tr class="table-header">
        <th class="hint">Player</th>
        <th>Character</th>
        <th>Created</th>
        <th>Last Used</th>
        <th class="hint">Delete</th>
      </tr>
      <tr class="table-row" v-for="player in players" v-bind:key="player._id">
        <td class="actionable" v-on:click="gotoPlayer(player)">{{ player.playerName }}</td>
        <td>{{ characterName(player) }}</td>
        <td>{{ dateToString(player.created) }}</td>
        <td>{{ dateToString(player.updated) }}</td>
        <td class="actionable" v-on:click="deletePlayer(player)">X</td>
      </tr>
    </table>
  </div>
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

th,
td {
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


@media only screen and (max-width: 620px) {
  .actionable {
    background-color: darkred;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  tr:not(.table-header) {
    margin: 2em 0;
  }

}
</style>
