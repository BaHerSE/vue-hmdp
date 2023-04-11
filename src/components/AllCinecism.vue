<template>
  <NavigationBar></NavigationBar>
  <div class="work">
    <div class="work-left">
      <div v-for="cin in cinecism.list" :key="cin.id" class="articlework">
        <h2 class="title">
          <router-link :to="{ path: '/Article', query: { id: cin.id } }">
            {{ cin.title }}
          </router-link>
        </h2>
        <div class="xx">
          <img :src="author.icon" alt="" class="authIcon" />
          &nbsp;
          <router-link :to="{ path: '/Home', query: { id: author.id } }">
            <span class="ahref">{{ author.nickName }}</span>
          </router-link>
          &nbsp;
          <span class="h">评</span>
          &nbsp;
          <span class="ahref">{{ movie.name }}</span>
          &nbsp; &nbsp;
          <span class="h">{{ cin.createTime.replace("T", " ") }}</span>
        </div>
        <div>
          <span v-html="cin.article"></span>
        </div>
        <br />
      </div>
    </div>
    <div class="work-right">
      <div class="right-movie">
        <span class="movie-title">影片信息</span>
        <hr />
        <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
          <div class="movie">
            <img :src="movie.image" alt="" />
            <div class="inf">
              <span class="name">{{ movie.name }}</span>
              <br />
              <span>影片类型：{{ movie.type }}</span>
              <br />
              <span
                >上映时间：{{
                  movie.screenDate.replace("T", " ").substring(0, 10)
                }}</span
              >
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in cinecism.pages" :key="page">
        <a
          :href="
            `/allCinecism?id=` + $route.query.id + `&page=` + page + `&size=5`
          "
        >
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ cinecism.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
</template>
  
  <script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import {
  getMovieIdApi,
  getAllCinecismByMidApi,
  getAllCinecismByMidMoreApi,
  getUserByIdApi,
} from "/src/utils/api.js";
import NavigationBar from "../components/element/NavigationBar.vue";
const $route = useRoute();
let cinecism = ref();
// let cinecism = (await getAllCinecismByMidApi($route.query.id)).data.resultData;

if ($route.query.page) {
  cinecism = (
    await getAllCinecismByMidMoreApi($route.query.id, $route.query.page)
  ).data.resultData;
} else {
  cinecism = (await getAllCinecismByMidApi($route.query.id)).data.resultData;
}
let movie = reactive(await getMovieIdApi(cinecism.list[0].movieId)).data
  .resultData;
let author = reactive(await getUserByIdApi(cinecism.list[0].userId)).data
  .resultData;
let urlPrefix = ref(
  `/allCinecism?id=` + $route.query.id + `&page=1` + `&size=5`
);
let urlSuffix = ref(
  `/allCinecism?id=` + $route.query.id + `&page=` + cinecism.pages + `&size=5`
);
</script>
  
  <style scoped>
a {
  color: #333;
  text-decoration: none;
}
.work {
  width: 1300px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.articlework {
  background-color: white;
  border-radius: 10px;
  padding: 15px 25px 25px 25px;
  margin-bottom: 20px;
}
.work-left {
  width: 1000px;
  /* background-color: white; */
}
.work-right {
  width: 270px;
}
.title {
  color: #333;
}
.xx {
  display: flex;
  align-items: center;
}
.authIcon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.ahref {
  color: #20a0da;
}
.h {
  color: #8798af;
}
.right-user {
  padding: 15px 15px 15px 15px;
  background-color: white;
  width: 270px;
  display: flex;
  align-items: center;
}
.right-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.right-user span {
  color: #4e5e73;
  font-size: 17px;
  margin-left: 10px;
}
.button {
  margin-left: 105px;
  background: #20a0da;
  width: 60px;
  height: 30px;
  color: white;
  border: 0px;
  border-radius: 15px;
}
.right-movie {
  margin-top: 20px;
  padding: 15px 15px 15px 15px;
  background-color: white;
  width: 270px;
  /* height: 100px; */
}
.movie-title {
  color: #333;
  font-size: 18px;
}
.right-movie img {
  width: 80px;
  height: 110px;
}
.right-movie hr {
  border-color: #ffffff;
}
.movie {
  display: flex;
}
.inf {
  font-size: 12px;
  line-height: 20px;
  margin-left: 10px;
}
.name {
  font-size: 18px;
}
.page li {
  list-style: none;
  padding-left: 3px;
  padding-right: 3px;
}
.page {
  display: flex;
  justify-content: center;
}
</style>