<template>
<div id="app">
  <div id="nav">
    <router-link to="/">New</router-link>
    <router-link to="/all">All</router-link>
  </div>
  <router-view />
  <div class="footer">
    <a href="https://github.com/Lizardonne/BaHotH-Character-Tracker">GitHub</a>
  </div>
</div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #26142a;
  font-family: 'Cinzel', 'Texturina', serif;
  text-align: center;
  color: yellow;
}

#nav {
  padding: 30px;
}

a {
  padding: 0.5em;
  background-color: black;
  font-weight: bold;
  text-decoration: none;
  color: yellow;
}

a:hover {
  background-color: indigo;
}

a.router-link-exact-active {
  color: orange;
}

.footer {
  margin-top: 10%;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
