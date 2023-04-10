<template>
  <navigation-bar></navigation-bar>
  <br />
  <div class="backgdHB">
    <div class="divFirst">
      <h1 class="first">剧照</h1>
      <span class="num">总共{{ hb }}张</span>
    </div>
    <div
      v-for="v in list"
      :key="v.id"
      class="div1"
      v-show="v.url.includes('source') == false"
    >
      <img :src="v.url" alt="" class="img" />
    </div>
  </div>
  <div class="backgdYG">
    <div class="divFirst2">
      <h1 class="first2">预告</h1>
      <span class="num">总共{{ list.length - hb }}个</span>
    </div>
    <div
      v-for="v in list"
      :key="v.id"
      class="div2"
      v-show="v.url.includes('source') == true"
    >
      <video controls="" preload="metadata" class="vd">
        <source :src="v.url" type="video/mp4" />
      </video>
      <!-- <img :src="v.url" alt="" class="img" /> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import NavigationBar from "./NavigationBar.vue";
import { getAllMovieVideo } from "/src/utils/api.js";
import { useRoute, useRouter } from "vue-router";
const $route = useRoute();

let list = reactive(await getAllMovieVideo($route.query.Mid)).data.resultData;
let hb = list.length;
list.forEach((element) => {
  if (element.url.includes("source")) {
    hb--;
  }
});
</script>

<style scoped>
.tp {
  background-color: white;
  width: 1500px;
  margin: auto;
}
.backgdYG,
.backgdHB {
  padding: 20px 20px 20px 20px;
  margin-top: 20px;
  width: 1500px;
  background-color: white;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(5, 280px);
  grid-gap: 30px;
  justify-content: center;
}
.divFirst,
.div1 {
  width: 280px;
  height: 280px;
  overflow: hidden;
}
.img {
  height: 280px;
  width: 280px;
}
.divFirst {
  width: 260px;
  padding-left: 20px;
  background-color: #1f7dd7;
}
.divFirst2 {
  width: 260px;
  padding-left: 20px;
  background-color: rgb(80, 191, 135);
}
.num,
.first,
.first2 {
  color: white;
}
.first {
  margin-top: 160px;
}
.first2 {
  margin-top: 60px;
}
.div2 {
  height: 160px;
}
.vd {
  height: 160px;
  width: 280px;
}
/* 暂停 */
video::-webkit-media-controls-play-button {
  display: none;
}
/* 时间线 */
video::-webkit-media-controls-timeline {
  display: true;
}
</style>