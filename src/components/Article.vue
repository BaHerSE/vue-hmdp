<template>
  <NavigationBar></NavigationBar>
  <div class="work">
    <div class="work-left">
      <h2 class="title">{{ cinecism.title }}</h2>
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
        <span class="h">{{ cinecism.createTime.replace("T", " ") }}</span>
      </div>
      <div>
        <span v-html="cinecism.article"></span>
      </div>
      <br />
    </div>
    <div class="work-right">
      <div class="right-user">
        <img :src="author.icon" alt="" />
        <span>{{ author.nickName }}</span>
        <!-- <button class="button">关注</button> -->
      </div>
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
  <discuss></discuss>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import {
  getCinecismByIdApi,
  getMovieIdApi,
  getUserByIdApi,
  getDiscussByIdApi,
  sendDiscussApi,
} from "/src/utils/api.js";
import NavigationBar from "../components/element/NavigationBar.vue";
import discuss from "../components/element/discuss.vue";
const $route = useRoute();
let cinecism = (await getCinecismByIdApi($route.query.id)).data.resultData;
let movie = reactive(await getMovieIdApi(cinecism.movieId)).data.resultData;
let author = reactive(await getUserByIdApi(cinecism.userId)).data.resultData;
let discussList = reactive(await getDiscussByIdApi(cinecism.id)).data
  .resultData;
</script>

<style scoped>
a {
  color: #333;
  text-decoration: none;
}
.work {
  width: 1250px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.work-left {
  width: 900px;
  background-color: white;

  padding: 15px 25px 25px 25px;
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
</style>