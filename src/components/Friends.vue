<template>
  <navigation-bar></navigation-bar>
  <div class="inf">
    <div class="inf-left">
      <ul>
        <li>我的好友</li>
        <li>
          <img src="../img/follow.png" alt="" />
          <router-link
            :to="{
              path: '/friends/follow',
              query: { id: $route.query.id },
            }"
            >我的关注</router-link
          >
        </li>
        <li>
          <img src="../img/fans.png" alt="" />
          <router-link
            :to="{
              path: '/friends/fans',
              query: { id: $route.query.id },
            }"
            >我的粉丝</router-link
          >
        </li>
      </ul>
    </div>
    <div class="inf-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "./element/NavigationBar.vue";
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.inf {
  width: 1200px;
  height: 800px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.inf-left {
  width: 270px;
  height: 700px;
  background-color: white;
  border-radius: 10px;
}
.inf-right {
  width: 900px;
  height: 700px;
  background-color: white;
  border-radius: 10px;
}
.inf-left li {
  list-style: none;
  margin-bottom: 20px;
  display: flex;
}
.inf-left img {
  margin-right: 10px;
}
</style>