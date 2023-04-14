<template>
  <NavigationBar></NavigationBar>
  <div v-if="movieList.size != 0" class="select">
    <h1>搜索内容：{{ $route.query.keyWord }}</h1>
  </div>
  <div class="cineSpace" v-show="$route.query.type == 2">
    <div v-if="movieList.size == 0" class="no-select">
      <h2>没有该相关内容</h2>
    </div>
    <div v-else v-for="cin in cinecismList.list" :key="cin.id" class="">
      <h2 class="title">
        <router-link :to="{ path: '/Article', query: { id: cin.id } }">
          {{ cin.title }}
        </router-link>
      </h2>
      <div class="xx">
        <img :src="cin.user.icon" alt="" class="authIcon" />
        &nbsp;
        <router-link :to="{ path: '/Home', query: { id: cin.user.id } }">
          <span class="ahref">{{ cin.user.nickName }}</span>
        </router-link>
        &nbsp;
        <span class="h">评</span>
        <!-- &nbsp; -->
        <!-- <span class="ahref">《{{ movie.name }}》</span> -->
        &nbsp;
        <t-rate :default-value="cin.star" size="14" disabled />&nbsp;
        <span class="h">{{ cin.createTime.replace("T", " ") }}</span>
      </div>
      <div>
        <span v-html="cin.article"></span>
      </div>
      <br />
    </div>
  </div>
  <!-- <div class="movieSpace" v-show="$route.query.type == 1">
    <div v-if="movieList.size == 0" class="no-select">
      <h2>没有该相关内容</h2>
    </div>
    <div v-else v-for="movie in movieList.list" :key="movie.id" class="movie">
      <img :src="movie.image" alt="" />
      <br />
      <span>
        <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
          {{ movie.name }}</router-link
        >
      </span>
    </div>
  </div> -->

  <!-- <div v-if="movieList.size != 0 && $route.query.type == '1'">
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in movieList.pages" :key="page">
        <a
          :href="
            `/Search?page=` +
            page +
            `&size=10&type=` +
            $route.query.type +
            `&keyWord=` +
            $route.query.keyWord
          "
        >
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ movieList.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div> -->
  <!-- <div class="userSpace" v-show="$route.query.type == '3'">
    <div v-for="u in userList.list" :key="u.id">
      <img :src="u.nickName" alt="" />
    </div>
  </div> -->
  <br />
</template>

<script setup>
import {
  searchMovieApi,
  searchUserByKeyWord,
  searchCinecismApi,
  searchMovieMoreApi,
} from "/src/utils/api.js";
import { useRoute } from "vue-router";
import NavigationBar from "./element/NavigationBar.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { random, result } from "lodash";
const $route = useRoute();
let movieList = reactive([]);
let cinecismList = reactive([]);
let userList = reactive([]);
if ($route.query.type == 1) {
  if ($route.query.page == undefined) {
    movieList = reactive(await searchMovieApi($route.query.keyWord)).data
      .resultData;
  } else if ($route.query.page != undefined) {
    movieList = reactive(
      await searchMovieMoreApi($route.query.keyWord, $route.query.page, 20)
    ).data.resultData;
  }
} else if ($route.query.type == 2) {
  if ($route.query.page == undefined) {
    cinecismList = reactive(await searchCinecismApi($route.query.keyWord, 1))
      .data.resultData;
  } else if ($route.query.page != undefined) {
    cinecismList = reactive(
      await searchCinecismApi($route.query.keyWord, $route.query.page)
    ).data.resultData;
  }
}

let urlPrefix = ref(
  "/Search?page=1&size=10&type=" +
    $route.query.type +
    "&keyWord=" +
    $route.query.keyWord
);
let urlSuffix = ref(
  "/Search?page=" +
    movieList.pages +
    "&size=10&type=" +
    $route.query.type +
    "&keyWord=" +
    $route.query.keyWord
);
</script>

<style scoped>
.select {
  width: 1200px;
  margin: auto;
  background-color: white;
}
.select h1 {
  margin-bottom: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 65px;
}

.movieSpace {
  width: 1200px;
  margin: auto;
  min-height: 1000px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 30px;
  justify-content: center;
}
.cineSpace {
  width: 1200px;
  margin: auto;
  min-height: 1000px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: white;
}
.userSpace {
  width: 1200px;
  margin: auto;
  min-height: 1000px;
  /* padding-top: 30px; */
  padding-bottom: 30px;
  background-color: white;
  /* display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 30px;
  justify-content: center; */
}
.user {
  margin-left: 20px;
}
.movie {
  text-align: center;
  transition: all 0.25s ease-in;
}
.movie:hover {
  box-shadow: 0 5px 20px rgb(194, 194, 194);
  transform: translateY(-8px);
}
.movie span {
  color: black;
  font-size: 14px;
  font-weight: bolder;
}
.movie img {
  width: 150px;
  height: 215px;
}
.page li {
  list-style: none;
  padding-left: 3px;
  padding-right: 3px;
}
a {
  text-decoration: none;
  color: black;
}
.page {
  display: flex;
  justify-content: center;
}
.articlework {
  margin-left: 15px;
  margin-right: 15px;
  padding: 0px 25px 0px 25px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.title {
  color: #333;
  font-weight: 100;
}
.xx {
  display: flex;
  align-items: center;
}
.ahref {
  color: #20a0da;
}
.h {
  color: #8798af;
}
.authIcon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>