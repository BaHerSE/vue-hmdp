<template>
  <NavigationBar></NavigationBar>
  <div class="person_img">
    <img src="../img/logo.png" alt="" />
  </div>
  <div class="user">
    <img :src="user.icon" alt="" />
    <div class="user-inf">
      <h3>{{ user.nickName }}</h3>
      <router-link :to="{ path: '/friends', query: { id: user.id } }">
        关注 {{ user.follow }}
      </router-link>
      |
      <router-link :to="{ path: '/friends', query: { id: user.id } }">
        粉丝 {{ user.fans }}
      </router-link>

      <h4 v-if="flag == true">
        <router-link :to="{ path: '/person', query: { id: user.id } }">
          编辑个人信息
        </router-link>
      </h4>
      <h4
        v-if="follow == false && flag != true"
        class="follow"
        v-on:click="followUser(user.id)"
      >
        <span>&nbsp;</span>
        关注
        <span>&nbsp;</span>
      </h4>
      <h4 v-if="follow == true" class="follow" v-on:click="followUser(user.id)">
        <span>&nbsp;</span>已关注 <span>&nbsp;</span>
      </h4>
    </div>
  </div>
  <div class="work">
    <div class="work-left">
      <div class="wtdiv">
        <span class="wt">
          <router-link
            :to="{ path: '/home/write', query: { id: user.id } }"
            @click="changeColor1"
            id="yp"
          >
            影评
          </router-link>
        </span>
        <span class="wt" to="/test">
          <router-link
            :to="{ path: '/home/blog', query: { id: user.id } }"
            id="dp"
            @click="changeColor2"
            >短评</router-link
          >
        </span>
      </div>
      <router-view></router-view>
    </div>
    <div class="work-right">
      <div class="friend">
        <span class="director-title">TA推荐</span>
        <div class="frd" v-for="f in friends" :key="f.id">
          <img :src="f.icon" alt="" class="friend-icon" />
          <router-link :to="{ path: '/Home', query: { id: f.id } }">
            <span>{{ f.nickName }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <button v-on:click="getUser"></button>
</template>

<script setup>
import {
  getUserApi,
  getUserDetailedInfByIdApi,
  isUserApi,
  isFollowApi,
  followUserApi,
  getFriends3Api,
} from "../utils/api";
import { useRouter, useRoute } from "vue-router";
import NavigationBar from "./element/NavigationBar.vue";
import { reactive } from "@vue/reactivity";
const $router = useRouter();
const $route = useRoute();
const user = reactive(await getUserDetailedInfByIdApi($route.query.id)).data
  .resultData;
const flag = reactive(await isUserApi($route.query.id)).data.resultData;
const follow = reactive(await isFollowApi($route.query.id)).data.resultData;
const friends = reactive(await getFriends3Api()).data.resultData;
const yp = () => {
  $router.push({ path: "/t2" });
};
const getUser = () => {
  getUserApi().then((request) => {
    console.log(request);
  });
};
const followUser = (id) => {
  console.log(id);
  followUserApi(id);
  window.location.reload();
};
const changeColor1 = () => {
  document.getElementById("yp").style.color = "#3797ff";
  document.getElementById("dp").style.color = "#8798AF";
};
const changeColor2 = () => {
  document.getElementById("yp").style.color = "#8798AF";
  document.getElementById("dp").style.color = "#3797ff";
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(135, 152, 175);
}
body {
  background: #eff1f4;
}
.person_img {
  width: 1200px;
  height: 250px;
  background: linear-gradient(180deg, #b0e597, #05d8ec);
  margin: auto;
  margin-top: 50px;
}
.person_img img {
  margin-left: 350px;
  margin-top: 45px;
}
.user {
  width: 1200px;
  height: 150px;
  background-color: white;
  margin: auto;
}
.user img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-top: -50px;
  margin-left: 50px;
}
.user a {
  text-decoration: none;
  color: #4e5e73;
  margin-right: 10px;
  margin-left: 10px;
}
.user h3 {
  margin-left: 10px;
}
.user-inf {
  width: 1025px;
  float: right;
}
.user-inf h4 {
  float: right;
  color: #20a0da;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #1bafe0;
  padding: 5px;
  margin-right: 10px;
  margin-top: 35px;
}
.work {
  width: 1200px;
  height: 900px;
  /* background-color: white; */
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.work-left {
  width: 900px;
  height: 900px;
  background-color: white;
  border-radius: 10px;
}
.work-right {
  width: 270px;
  /* height: 800px; */
  /* background-color: white; */
  border-radius: 10px;
}
.wtdiv {
  padding-left: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #dfdfdf;
}
.wtdiv:hover {
  cursor: pointer;
}
.wt {
  font-size: 18px;
  margin-right: 40px;
  line-height: 60px;
}
.wt:hover {
  color: rgb(42, 186, 211);
}
.follow {
  cursor: pointer;
}
.friend {
  /* margin-top: 30px; */
  /* height: 300px; */
  padding: 15px 15px 15px 15px;
  background-color: white;
  border-radius: 10px;
}
.friend-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.frd {
  height: 80px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 40px 0 #ebedf2;
}
.director-title {
  font-size: 20px;
}
</style>