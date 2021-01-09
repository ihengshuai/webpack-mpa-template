<template>
  <div id="app">
    <div class="vue-nav">
      <h2>Vue SPA Demo</h2>
      <router-link to="/home" class="nav-item">Vue Home</router-link>
      <router-link to="/user" class="nav-item">Vue User</router-link>
    </div>
    <router-view></router-view>

    <div class="backHome" @click="goHome">返回应用首页</div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    goHome() {
      location.href = "/";
    },
  },
};
</script>

<style lang="scss">
@import "@style/lib/_variable";
@import "@style/common";
body {
  margin: 0;
  padding: 0;
  background-color: $themeBgColor;
}
#app {
  text-align: center;
  .vue-nav {
    width: 100%;
    height: auto;
    padding: 20px 200px;
    box-sizing: border-box;

    h2 {
      padding: 40px;
      font-size: 30px;
    }

    .nav-item {
      width: 100%;
      padding: 20px 0;
      margin-bottom: 20px;
      background-color: rgba(255, 255, 255, 0.7);
      transition: all 400ms;
      display: block;
      text-decoration: none;
      color: rgb(52, 2, 65);

      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .backHome {
    padding: 40px;
    margin-top: 100px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
