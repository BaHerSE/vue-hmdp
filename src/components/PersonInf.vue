<template>
  <navigation-bar></navigation-bar>
  <div class="inf">
    <div class="inf-left">
      <ul>
        <li>设置</li>
        <li>
          <img src="../img/person-inf.png" alt="" />
          <router-link
            :to="{
              path: '/person/personChange',
              query: { id: $route.query.id },
            }"
            >个人资料</router-link
          >
        </li>
        <li>
          <img src="../img/lock.png" alt="" />
          <!-- <router-link to="/person/passwordChange">账号与密码</router-link> -->
          <router-link to="/person/passwordChange">账号</router-link>
        </li>
        <li>
          <img src="../img/del-inf.png" alt="" />
          <router-link to="/person/logout"> 注销账号 </router-link>
        </li>
      </ul>
    </div>
    <div class="inf-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./element/NavigationBar.vue";
name: "PersonInf";
export default {
  components: { NavigationBar },
  setup() {
    return {};
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.inf {
  width: 1200px;
  height: 600px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.inf-left {
  width: 270px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
}
.inf-right {
  width: 900px;
  height: 600px;
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