<template>
  <div v-for="cin in cinecism.list" :key="cin.id" class="yp">
    <img :src="cin.image" alt="" class="hb" />
    <div class="pl-k">
      <div class="pl">
        <router-link :to="{ path: '/Article', query: { id: cin.id } }">
          <span class="c-title">{{ cin.title }}</span>
        </router-link>
        <!-- <span class="title">{{ cin.title }}</span> -->
        <span v-html="cin.article"></span>
      </div>
      <div class="time-like">
        <span>{{ cin.createTime.replace("T", " ") }}</span>
        <router-link
          :to="{ path: '/reCinecism', query: { Mid: cin.movieId, id: cin.id } }"
        >
          <img src="/src/img/edit.png" alt="" class="edit" />
        </router-link>

        <img
          src="/src/img/delete.png"
          alt=""
          class="del"
          v-on:click="deleteCin(cin.id)"
        />
      </div>
    </div>
  </div>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in cinecism.pages" :key="page">
        <a :href="`/home/write?page=` + page + `&size=5&id=` + $route.query.id">
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
import { getCinecismByUserApi, delCinApi } from "/src/utils/api.js";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";

const $router = useRouter();
const $route = useRoute();
let cinecism = ref();
let blog = ref();
// let cinecism = (await getCinecismByUserApi($route.query.id)).data.resultData;
if ($route.query.page) {
  cinecism = (
    await getCinecismByUserApi(
      $route.query.id + `&page=` + $route.query.page + `&size=5`
    )
  ).data.resultData;
} else {
  cinecism = (await getCinecismByUserApi($route.query.id)).data.resultData;
}
let urlPrefix = ref(`/home/write?page=1` + `&size=5&id=` + $route.query.id);
let urlSuffix = ref(
  `/home/write?page=` + cinecism.pages + `&size=5&id=` + $route.query.id
);
const deleteCin = (id) => {
  delCinApi(id);
  window.location.reload();
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.yp {
  width: 850px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(199, 199, 199);
}
.hb {
  width: 85px;
  height: 115px;
  margin-right: 15px;
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
.title {
  color: #303a47;
  font-size: 18px;
}
.pl-k {
  width: 754px;
}
.pl {
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.time-like {
  margin-top: 25px;
}
.time-like span {
  color: #8798af;
  font-size: 14px;
  font-weight: 400;
  margin-top: 25px;
}

.edit,
.del {
  float: right;
  cursor: pointer;
}
</style>