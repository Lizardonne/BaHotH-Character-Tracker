<template>
<div id="app">
  <div id="nav">
    <a href="/">Betrayal at House on the Hill<br />Character Tracker</a>
    <div>
      <router-link to="/">New</router-link>
      <router-link to="/all">All</router-link>
    </div>
  </div>
  <div class="router-view">
    <router-view />
  </div>
</div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #26142a;
  font-family: 'Cinzel', 'Texturina', serif;
  text-align: center;
  color: yellow;
}

body {
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1 0 auto;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
}

#nav div a {
  font-size: 1.5em;
}

a {
  padding: 0.5em;
  background-color: black;
  text-decoration: none;
  color: yellow;
}

a:hover {
  background-color: darkred;
}

a.router-link-exact-active {
  color: darkred;
}
a.router-link-exact-active:hover {
  color: red;
}

.footer {
  flex-shrink: 0;

  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
