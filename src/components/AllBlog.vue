<template>
  <NavigationBar></NavigationBar>
  <div class="workspace">
    <div class="work-left">
      <h2 class="movie-topTitle">{{ movie.name }}短评</h2>
      <div class="tRadio">
        <!-- <t-radio-group default-value="1" @change="onChange"> -->
        <t-radio-group default-value="1">
          <t-radio value="1">全部</t-radio>
          <t-radio value="2">好评</t-radio>
          <t-radio value="3">中评</t-radio>
          <t-radio value="4">差评</t-radio>
        </t-radio-group>
      </div>
      <p>{{ blog.list[0].article }}</p>
    </div>
    <div class="work-right">
      <div class="movie-detail">
        <router-link
          :to="{ path: '/list', query: { Mid: movie.id } }"
          class="a-in a-common"
        >
          > 去{{ movie.name }}页面
        </router-link>
        <br />
        <br />
        <img :src="movie.image" alt="" />
        <br />
        <p>
          <span class="span-movie">导演：</span
          ><span class="span-movie">{{ movie.director }}</span>
        </p>
        <p>
          <span class="span-movie">演员：</span
          ><span class="span-movie">{{ movie.actor }}</span>
        </p>
        <p>
          <span class="span-movie">类型：</span
          ><span class="span-movie">{{ movie.type }}</span>
        </p>
        <p>
          <span class="span-movie">地区：</span
          ><span class="span-movie">{{ movie.district }}</span>
        </p>
        <p>
          <span class="span-movie">片长：</span
          ><span class="span-movie">{{ movie.time }}分钟</span>
        </p>
        <p>
          <span class="span-movie">imdb：</span
          ><span class="span-movie">{{ movie.imdb }}</span>
        </p>
        <router-link
          :to="{ path: '/means', query: { Mid: $route.query.id } }"
          class="a-in a-common"
        >
          > 查看{{ movie.name }}电影资料
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "../components/element/NavigationBar.vue";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import {
  getMovieIdApi,
  getAllCinecismByMidApi,
  getAllCinecismByMidMoreApi,
  getUserByIdApi,
  getAllBlog,
} from "/src/utils/api.js";
let blog = null;
const $route = useRoute();
let movie = reactive(await getMovieIdApi($route.query.id)).data.resultData;
if ($route.query.type == undefined) {
  blog = reactive(await getAllBlog($route.query.id, 1)).data.resultData;
}

</script>

<style scoped>
.a-common {
  text-decoration: none;
  color: black;
}
.a-in {
  color: #37a;
  font-size: 14px;
}
.workspace {
  width: 1330px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.work-left {
  width: 1000px;
  background-color: white;
  border-radius: 5px;
  height: 1000px;
}
.work-right {
  width: 300px;
  /* background-color: white; */
  border-radius: 5px;
}
.movie-detail {
  background-color: white;
  border-radius: 10px;
  padding: 15px 15px 15px 15px;
}
.movie-detail img {
  width: 100px;
  height: 150px;
}
.span-movie {
  font-size: 13px;
  /* padding-left: 2.5em; */
  text-indent: -2.5em;
}
.movie-detail p {
  padding-left: 2.5em;
  text-indent: -2.5em;
  margin-top: 0;
  margin-bottom: 0;
  color: #111;
}
.movie-topTitle {
  color: #494949;
  margin-left: 20px;
}
.tRadio {
  width: 950px;
  margin: auto;
  padding: 10px 0 10px 20px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
</style>
