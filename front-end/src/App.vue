<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link to="/" id="logo">Small Means</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/inspiration">Inspiration</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </div>
  </nav>
  <router-view />
  <div class="footer">
    <a href="https://github.com/briggsj6/creativeProject" target="blank">GitHub</a>
    <p>Hours Spent: 20 </p>
  </div>
</div>
</template>


<style>
.space {
  height: 40px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

#logo {
  padding: 5px;
  font-family: 'Baloo Tammudu 2', cursive;
  color: #2B3542;
  text-decoration: none;
  font-size: 36px;
}

p {
  color: #2B3542;
}

.navbar-nav {
  font-family: 'Baloo Tammudu 2', cursive;
  padding: 10px;
}

.navbar-nav a {
  color: #2B3542;
  text-decoration: none;
  padding: 10px;
}

.navbar-nav a:hover {
  color: #DCDCDC;
}

.navbar-nav a:active {
  color: #DCDCDC;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #555;
}

nav {
  background-color: #8EA1AB;
}

/* Footer */
.footer {
  text-align: center;
  font-size: 12px;
}

.spacer {
  height: 150px;
  width: 100%;
}

.footer a {
  color: #2B3542;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
