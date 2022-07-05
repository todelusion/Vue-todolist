<template>
  <div class="main-wrapper">
    <nav>
      <router-link to="/">
        <img
          src="https://i.imgur.com/cKK13oH.png"
          alt="logo"
          width="242"
          class="py-4 px-9"
        />
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  box-sizing: border-box;
  margin: 0;
}
.main-wrapper {
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: linear-gradient(172.7deg, #ffd370 50%, #fff 50%);
}
</style>
