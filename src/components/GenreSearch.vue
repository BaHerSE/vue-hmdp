<template>
  <NavigationBar></NavigationBar>
  <br />
  <div v-if="movieList.size != 0" class="select">
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 1 } }"
        class="flspan"
        @click="flash(1)"
      >
        剧情
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 2 } }"
        class="flspan"
        @click="flash(2)"
      >
        喜剧
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 3 } }"
        class="flspan"
        @click="flash(3)"
      >
        动作
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 4 } }"
        class="flspan"
        @click="flash(4)"
      >
        爱情
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 5 } }"
        class="flspan"
        @click="flash(5)"
      >
        科幻
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 6 } }"
        class="flspan"
        @click="flash(6)"
      >
        动画
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 7 } }"
        class="flspan"
        @click="flash(7)"
      >
        悬疑
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 8 } }"
        class="flspan"
        @click="flash(8)"
      >
        惊悚
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 9 } }"
        class="flspan"
        @click="flash(9)"
      >
        纪录片
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 10 } }"
        class="flspan"
        @click="flash(10)"
      >
        战争
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 11 } }"
        class="flspan"
        @click="flash(11)"
      >
        灾难
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 12 } }"
        class="flspan"
        @click="flash(12)"
      >
        武侠
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 13 } }"
        class="flspan"
        @click="flash(13)"
      >
        运动
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 14 } }"
        class="flspan"
        @click="flash(14)"
      >
        历史
      </router-link>
    </span>
    <span>
      <router-link
        :to="{ path: '/genreSearch', query: { genre: 15 } }"
        class="flspan"
        @click="flash(15)"
      >
        恐怖
      </router-link>
    </span>
  </div>
  <div class="movieSpace">
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
  <!-- <div v-if="movieList.size != 0">
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
</template>
  
  <script setup>
import {
  searchMovieApi,
  searchCinecismApi,
  getDirectorMovie5Api,
  searchMovieMoreApi,
  getMovieByGenreApi,
} from "/src/utils/api.js";
import { useRoute, useRouter } from "vue-router";
import NavigationBar from "./element/NavigationBar.vue";
import { reactive, ref } from "@vue/reactivity";
import { watch, watchEffect } from "@vue/runtime-core";
import { result } from "lodash";
const $route = useRoute();
const $router = useRouter();
let movieList = reactive([]);
movieList = reactive(await getMovieByGenreApi($route.query.genre)).data
  .resultData;
//   if ($route.query.page != undefined) {
//     movieList = reactive(
//       await searchMovieMoreApi(
//         $route.query.keyWord,
//         $route.query.page,
//         $route.query.size
//       )
//     ).data.resultData;
//   }

//   let urlPrefix = ref(
//     "/Search?page=1&size=10&type=" +
//       $route.query.type +
//       "&keyWord=" +
//       $route.query.keyWord
//   );
//   let urlSuffix = ref(
//     "/Search?page=" +
//       movieList.pages +
//       "&size=10&type=" +
//       $route.query.type +
//       "&keyWord=" +
//       $route.query.keyWord
//   );
const flash = (gen) => {
  window.open("http://localhost:3000/genreSearch?genre=" + gen);
  //   $router.push("/gengenreSearch?genre=" + 15);
  //   $router.go(0);
};
</script>
  
  <style scoped>
.select {
  width: 1200px;
  margin: auto;
  background-color: white;
  text-align: center;
  padding-top: 20px;
}
.select h1 {
  margin-bottom: 0;
  padding-top: 20px;
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