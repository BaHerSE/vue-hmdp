<template>
  <NavigationBar></NavigationBar>
  <div v-if="movieList.size != 0" class="select">
    <h1>搜索内容：{{ $route.query.keyWord }}</h1>
  </div>
  <div class="movieSpace" >
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
  </div>
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
  searchCinecismApi,
  getDirectorMovie5Api,
  getUserSearchApi,
  getCinecismSearchApi,
  searchMovieMoreApi,
} from "/src/utils/api.js";
import { useRoute } from "vue-router";
import NavigationBar from "./element/NavigationBar.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { random, result } from "lodash";
const $route = useRoute();
let movieList = reactive(await searchMovieApi($route.query.keyWord)).data
    .resultData;
let cinecismList = reactive([]);
let userList = computed(reactive([]));
// if ($route.query.type == "1") {
//   movieList = reactive(await searchMovieApi($route.query.keyWord)).data
//     .resultData;
// } else if ($route.query.type == "3") {
//   userList = reactive(await getUserSearchApi($route.query.keyWord));
// }

if ($route.query.page != undefined && $route.query.type == "1") {
  movieList = reactive(
    await searchMovieMoreApi(
      $route.query.keyWord,
      $route.query.page,
      $route.query.size
    )
  ).data.resultData;
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
  /* margin-top: 30px; */
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 30px;
  justify-content: center;
}
.userSpace {
  width: 1200px;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: white;
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
</style>