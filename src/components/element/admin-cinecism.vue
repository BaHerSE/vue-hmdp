<template>
  <table>
    <tr class="tr1">
      <th>用户</th>
      <th>电影</th>
      <th>影评</th>
      <th>时间</th>
      <th>操作</th>
    </tr>
    <tr v-for="discuss in userList.list" :key="discuss.id">
      <td>{{ discuss.nickName }}</td>
      <td>
        <router-link :to="{ path: '/list', query: { Mid: discuss.movieId } }">{{
          discuss.name
        }}</router-link>
      </td>
      <td>
        <router-link :to="{ path: '/Article', query: { id: discuss.id } }">
          {{ discuss.title }}
        </router-link>
      </td>
      <!-- <td>{{ discuss.comment }}</td> -->
      <td>{{ discuss.createTime.slice(0, 10) }}</td>
      <td>
        <t-button
          class="tb"
          theme="danger"
          v-on:click="deleteCinecism(discuss.id)"
          >删除</t-button
        >
      </td>
    </tr>
  </table>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in userList.pages" :key="page">
        <a :href="`/Admin/index/adminCinecism?page=` + page + `&size=20`">
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ userList.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
</template>
    
    <script setup>
import {
  getAllCinecismApi,
  getAllCinecismMoreApi,
  delCinApi,
} from "/src/utils/api.js";
import { reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
const $route = useRoute();
let userList = ref();
if ($route.query.page) {
  userList = (await getAllCinecismMoreApi($route.query.page)).data.resultData;
} else {
  userList = (await getAllCinecismApi()).data.resultData;
}
let urlPrefix = ref(`/Admin/index/adminCinecism?page=1` + `&size=20`);
let urlSuffix = ref(
  `/Admin/index/adminCinecism?page=` + userList.pages + `&size=20`
);
const deleteCinecism = (id) => {
    delCinApi(id);
  window.location.reload();
};
</script>
    
    <style scoped>
hr {
  border: 0px;
}
table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  background-color: white;
  text-align: center;
}

table,
th,
td {
  border: 1px solid #dbdbdb;
}
th {
  height: 30px;
}
.icon {
  width: 90px;
  height: 90px;
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
a {
  color: black;
  text-decoration: none;
}
th:nth-child(1) {
  width: 150px;
}
th:nth-child(2) {
  width: 200px;
}
th:nth-child(3) {
  width: 900px;
}
</style>