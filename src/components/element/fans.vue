<template>
  <div class="top">
    <span>|</span>
    <span>粉丝</span>
  </div>
  <ul>
    <li v-for="follow in followList.list" :key="follow.id" class="li-1">
      <img :src="follow.icon" alt="" class="icon" />
      <div class="xx">
        <router-link :to="{ path: '/Home', query: { id: follow.id } }">
          <span class="name">{{ follow.nickName }}</span>
          <br />
          <span class="sig">{{ follow.signature }}</span>
        </router-link>
      </div>
    </li>
  </ul>
  <div class="fy">
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      &nbsp;
      <li v-for="page in followList.pages" :key="page">
        <a
          :href="
            `/friends/fans?page=` + page + `&size=8&id=` + $route.query.id
          "
        >
          {{ page }}
        </a>
      </li>
      &nbsp;
      <li><a :href="urlSuffix">»</a></li>
      &nbsp;
      <li>
        <span>共</span><span>{{ followList.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
</template>
  
  <script setup>
import { getFansByIdApi } from "/src/utils/api.js";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
const $router = useRouter();
const $route = useRoute();
let followList = ref();
followList = (await getFansByIdApi($route.query.id)).data.resultData;
let urlPrefix = ref(`/friends/fans?page=1` + `&size=5&id=` + $route.query.id);
let urlSuffix = ref(
  `/friends/fans?page=` + followList.pages + `&size=5&id=` + $route.query.id
);
</script>
  
  <style scoped>
a {
  text-decoration: none;
  color: black;
}
.top {
  color: #20a0da;
  margin-top: 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
  padding-bottom: 20px;
}
.top :first-child {
  margin-left: 25px;
  margin-right: 30px;
}
.top span {
  line-height: 20px;
}
ul {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 25px;
  padding-right: 25px;
}
.li-1 {
  list-style: none;
  height: 70px;
  border-bottom: 1px solid rgb(218, 218, 218);
  display: flex;
  align-items: center;
}
.name {
  font-size: 18px;
  font-weight: 500;
  color: #303a47;
}
.sig {
  font-size: 16px;
  font-weight: 400;
  color: #8798af;
}
.fy {
  /* position: absolute; */
  bottom: 0px;
}
.fy ul {
  width: 850px;
  display: flex;
  justify-content: center;
}
.fy li {
  border-bottom: 0px;
  list-style: none;
}
.icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>