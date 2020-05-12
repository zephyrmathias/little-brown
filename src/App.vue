<template>
  <div id="app">
    <div class="nav">
      <h1 class="title">Little Brown Book Shop</h1>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.nav {
  text-align: center;
  color: var(--primary);
  text-transform: uppercase;
  padding: 30px 0 40px 0;
}

.title {
  margin: 0;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 40px;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  height: calc(100% - 150px);
  overflow: hidden;
}

@media (max-width: 1023px) {
  #app {
    height: auto;
  }
}

.primary-btn {
  background: var(--primary);
  cursor: pointer;
  border: 0;
  outline: none;
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
}

.secondary-btn {
  border: 1px solid var(--border);
  background: #fff;
  cursor: pointer;
  outline: none;
  height: 48px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
}

.disabled-btn {
  opacity: 0.5;
}

:root {
  --border: rgb(51,51,51,0.3);
  --primary: #00C300;
  --grey: #f2f2f2;
  --discount: #FF0000;
  --error: rgb(255,0,0,0.3);
}
</style>
