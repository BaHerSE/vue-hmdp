<template>
  <NavigationBar></NavigationBar>
  <div class="workspace">
    <div class="work-left">
      <h2 class="movie-topTitle">{{ movie.name }}短评</h2>
      <div class="tRadio">
        <router-link
          :to="{ path: '/allBlog', query: { id: $route.query.id } }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          全部</router-link
        >
        <router-link
          :to="{ path: '/allBlog', query: { id: $route.query.id, star: 5 } }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          &nbsp;好评（5-4星）</router-link
        >
        <router-link
          :to="{ path: '/allBlog', query: { id: $route.query.id, star: 3 } }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          &nbsp;中评（3星）&nbsp;</router-link
        >
        <router-link
          :to="{ path: '/allBlog', query: { id: $route.query.id, star: 1 } }"
          onclick="javaScript: location.reload();"
          class="a-common a-in"
        >
          差评（2-1星）</router-link
        >
      </div>
      <div v-for="b in blog.list" :key="b.id" class="blog">
        <img :src="b.icon" alt="" class="icon" />
        <div class="blog-right">
          <div class="userInf">
            <router-link
              :to="{ path: '/Home', query: { id: b.userId } }"
              class="a-common a-in"
              style="line-height: 14px"
              >{{ b.nickName }}
            </router-link>
            &nbsp;
            <t-rate :default-value="b.star" size="14" disabled />
            &nbsp;<span class="blog-time">{{
              b.createTime.replace("T", " ")
            }}</span>
          </div>
          <span class="blog-article">{{ b.article }}</span>
        </div>
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
    <ul class="fyUl" v-show="$route.query.star == undefined">
      <li>
        <a :href="`/allBlog?id=` + $route.query.id" class="a-common">
          «&nbsp;</a
        >
      </li>
      <li v-for="page in blog.pages" :key="page">
        <a
          :href="`/allBlog?id=` + $route.query.id + `&page=` + page"
          class="a-common"
        >
          &nbsp;{{ page }}&nbsp;</a
        >
      </li>
      <li>
        <a
          :href="`/allBlog?id=` + $route.query.id + `&page=` + blog.pages"
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
            `/allBlog?id=` + $route.query.id + `&star=` + $route.query.star
          "
          class="a-common a-in"
        >
          «&nbsp;</a
        >
      </li>
      <li v-for="page in blog.pages" :key="page">
        <a
          class="a-common a-in"
          :href="
            `/allBlog?id=` +
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
            `/allBlog?id=` +
            $route.query.id +
            `&page=` +
            blog.pages +
            `&star=` +
            $route.query.star
          "
        >
          &nbsp;»&nbsp;</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import NavigationBar from "../components/element/NavigationBar.vue";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import {
  getMovieIdApi,
  getAllBlogByStar,
  getAllCinecismByMidApi,
  getAllCinecismByMidMoreApi,
  getUserByIdApi,
  getAllBlog,
} from "/src/utils/api.js";
let blog = null;
const $route = useRoute();
const $router = useRouter();
//radio按钮
//电影信息
let movie = reactive(await getMovieIdApi($route.query.id)).data.resultData;
//普通
if ($route.query.star == undefined) {
  if ($route.query.page == undefined) {
    blog = reactive(await getAllBlog($route.query.id, 1)).data.resultData;
  } else {
    blog = reactive(await getAllBlog($route.query.id, $route.query.page)).data
      .resultData;
  }
  //打分
} else {
  if ($route.query.page == undefined) {
    blog = reactive(
      await getAllBlogByStar($route.query.id, 1, $route.query.star)
    ).data.resultData;
  } else {
    blog = reactive(
      await getAllBlogByStar(
        $route.query.id,
        $route.query.page,
        $route.query.star
      )
    ).data.resultData;
  }
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
  min-height: 800px;
  margin-bottom: 20px;
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
  margin-left: 40px;
}
.tRadio {
  width: 950px;
  margin: auto;
  padding: 10px 0 10px 20px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.blog {
  width: 950px;
  margin: auto;
  display: flex;
  border-bottom: 1px solid #dddddd82;
  padding: 10px 0px 10px 20px;
}
.blog-right {
  margin-left: 15px;
  width: 800px;
}
.blog-time {
  color: rgb(160, 160, 160);
  font-size: 13px;
}
.userInf {
  display: flex;
}
.blog-article {
  color: #000000;
  line-height: 1.5;
  font-weight: 100;
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
