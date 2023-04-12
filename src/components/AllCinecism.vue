<template>
  <NavigationBar></NavigationBar>
  <div class="work">
    <div class="work-left">
      <h2 class="movie-topTitle">{{ movie.name }}影评</h2>
      <!-- 筛选 -->
      <div class="tRadio">
        <router-link
          :to="{ path: '/allCinecism', query: { id: $route.query.id } }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          全部</router-link
        >
        <router-link
          :to="{
            path: '/allCinecism',
            query: { id: $route.query.id, friend: true },
          }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          &nbsp;查看好友</router-link
        >
        <router-link
          :to="{
            path: '/allCinecism',
            query: { id: $route.query.id, star: 5 },
          }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          &nbsp;好评（5-4星）</router-link
        >
        <router-link
          :to="{
            path: '/allCinecism',
            query: { id: $route.query.id, star: 3 },
          }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          &nbsp;中评（3星）&nbsp;</router-link
        >
        <router-link
          :to="{
            path: '/allCinecism',
            query: { id: $route.query.id, star: 1 },
          }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          差评（2-1星）</router-link
        >
      </div>
      <div v-for="cin in cinecism.list" :key="cin.id" class="articlework">
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
          &nbsp;
          <span class="ahref">《{{ movie.name }}》</span>
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
  <div class="fy">
    <!-- 全部 -->
    <ul
      class="fyUl"
      v-show="
        ($route.query.star == undefined) & ($route.query.friend == undefined)
      "
    >
      <li>
        <a :href="`/allCinecism?id=` + $route.query.id" class="a-common">
          «&nbsp;</a
        >
      </li>
      <li v-for="page in cinecism.pages" :key="page">
        <a
          :href="`/allCinecism?id=` + $route.query.id + `&page=` + page"
          class="a-common"
        >
          &nbsp;{{ page }}&nbsp;</a
        >
      </li>
      <li>
        <a
          :href="
            `/allCinecism?id=` + $route.query.id + `&page=` + cinecism.pages
          "
          class="a-common"
        >
          &nbsp;»&nbsp;</a
        >
      </li>
    </ul>
    <!-- 评分 -->
    <ul class="fyUl" v-show="$route.query.star != undefined">
      <li>
        <a
          :href="
            `/allCinecism?id=` + $route.query.id + `&star=` + $route.query.star
          "
          class="a-common a-in"
        >
          «&nbsp;</a
        >
      </li>
      <li v-for="page in cinecism.pages" :key="page">
        <a
          class="a-common a-in"
          :href="
            `/allCinecism?id=` +
            $route.query.id +
            `&page=` +
            page +
            `&star=` +
            $route.query.star
          "
        >
          &nbsp;{{ page }}&nbsp;</a
        >
      </li>
      <li>
        <a
          class="a-common a-in"
          :href="
            `/allCinecism?id=` +
            $route.query.id +
            `&page=` +
            cinecism.pages +
            `&star=` +
            $route.query.star
          "
        >
          &nbsp;»&nbsp;</a
        >
      </li>
    </ul>
    <!-- 好友 -->
    <ul class="fyUl" v-show="$route.query.friend != undefined">
      <li>
        <a
          :href="`/allCinecism?id=` + $route.query.id + `&friend=` + true"
          class="a-common a-in"
        >
          «&nbsp;</a
        >
      </li>
      <li v-for="page in cinecism.pages" :key="page">
        <a
          class="a-common a-in"
          :href="
            `/allCinecism?id=` +
            $route.query.id +
            `&page=` +
            page +
            `&friend=` +
            true
          "
        >
          &nbsp;{{ page }}&nbsp;</a
        >
      </li>
      <li>
        <a
          class="a-common a-in"
          :href="
            `/allCinecism?id=` +
            $route.query.id +
            `&page=` +
            cinecism.pages +
            `&friend=` +
            true
          "
        >
          &nbsp;»&nbsp;</a
        >
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
  getAllCinecismByMidStar,
  getAllCinecismByMidFriend,
} from "/src/utils/api.js";
import NavigationBar from "../components/element/NavigationBar.vue";
const $route = useRoute();
let cinecism = ref();
// let cinecism = (await getAllCinecismByMidApi($route.query.id)).data.resultData;
if (($route.query.star == undefined) & ($route.query.friend == undefined)) {
  if ($route.query.page) {
    cinecism = (
      await getAllCinecismByMidMoreApi($route.query.id, $route.query.page)
    ).data.resultData;
  } else {
    cinecism = (await getAllCinecismByMidApi($route.query.id, 1)).data
      .resultData;
  }
} else if (
  ($route.query.star != undefined) &
  ($route.query.friend == undefined)
) {
  if ($route.query.page) {
    cinecism = (
      await getAllCinecismByMidStar(
        $route.query.id,
        $route.query.page,
        $route.query.star
      )
    ).data.resultData;
  } else {
    cinecism = (
      await getAllCinecismByMidStar($route.query.id, 1, $route.query.star)
    ).data.resultData;
  }
} else {
  if ($route.query.page) {
    cinecism = (
      await getAllCinecismByMidFriend(
        $route.query.id,
        $route.query.page,
        $route.query.friend
      )
    ).data.resultData;
  } else {
    cinecism = (await getAllCinecismByMidFriend($route.query.id, 1, true)).data
      .resultData;
  }
}

let movie = reactive(await getMovieIdApi($route.query.id)).data.resultData;
// let author = reactive(await getUserByIdApi(cinecism.list[0].userId)).data
//   .resultData;
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
a {
  color: #333;
  text-decoration: none;
}
.tRadio {
  width: 950px;
  margin: auto;
  padding: 10px 0 10px 20px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
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
  margin-left: 40px;
}
.work {
  width: 1330px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.articlework {
  margin-left: 15px;
  margin-right: 15px;
  padding: 0px 25px 0px 25px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.work-left {
  width: 1000px;
  background-color: white;
  border-radius: 5px;
  min-height: 800px;
  margin-bottom: 20px;
  /* background-color: white; */
}
.work-right {
  width: 300px;
}
.title {
  color: #333;
  font-weight: 100;
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

.fy {
  width: 1330px;
  display: flex;
  margin: auto;
}
li {
  list-style: none;
}
.fyUl {
  width: 1000px;
  height: 40px;
  background-color: white;
  padding-left: 0;
  border-radius: 10px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>