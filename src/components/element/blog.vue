<template>
  <div v-for="cin in blog.list" :key="cin.id" class="yp">
    <img :src="cin.image" alt="" class="hb" />
    <div class="pl-k">
      <div class="pl">
        <span class="title">{{ cin.title }}</span>
        <br />
        <span class="article">{{ cin.article }}</span>
      </div>
      <div class="time-like">
        <img
          src="/src/img/delete.png"
          alt=""
          class="del"
          v-on:click="deleteBlog(cin.id)"
        />
      </div>
    </div>
  </div>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in blog.pages" :key="page">
        <a :href="`/home/blog?page=` + page + `&size=5&id=` + $route.query.id">
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ blog.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
</template>
  
  <script setup>
import { getBlogByUserApi, delBlogApi } from "/src/utils/api.js";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "@vue/reactivity";

const $router = useRouter();
const $route = useRoute();

let blog = ref();
if ($route.query.page) {
  blog = (
    await getBlogByUserApi(
      $route.query.id + `&page=` + $route.query.page + `&size=5`
    )
  ).data.resultData;
} else {
  blog = (await getBlogByUserApi($route.query.id)).data.resultData;
}
let urlPrefix = ref(`/home/blog?page=1` + `&size=5&id=` + $route.query.id);
let urlSuffix = ref(
  `/home/blog?page=` + blog.pages + `&size=5&id=` + $route.query.id
);
const deleteBlog = (id) => {
  delBlogApi(id);
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
  height: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
}
.article {
  color: #4e5e73;
  font-size: 14px;
}
.del {
  margin-top: 5px;
  float: right;
  cursor: pointer;
}
</style>