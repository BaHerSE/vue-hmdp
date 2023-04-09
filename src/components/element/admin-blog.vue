<template>
    <table>
      <tr class="tr1">
        <th>用户</th>
        <th>影评文章</th>
        <th>评论</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="discuss in userList.list" :key="discuss.id">
        <td>{{ discuss.user.nickName }}</td>
        <td>{{ discuss.cinecism.title }}</td>
        <td>{{ discuss.comment }}</td>
        <td>{{ discuss.createTime.slice(0, 10) }}</td>
        <td>
          <t-button
            class="tb"
            theme="danger"
            v-on:click="deleteDiscuss(discuss.id)"
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
          <a :href="`/Admin/index/adminDiscuss?page=` + page + `&size=20`">
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
  import { getAllDiscussApi, getAllDiscussMoreApi } from "/src/utils/api.js";
  import { reactive, ref } from "@vue/reactivity";
  import { useRouter, useRoute } from "vue-router";
  const $route = useRoute();
  let userList = ref();
  if ($route.query.page) {
    userList = (await getAllDiscussMoreApi($route.query.page)).data.resultData;
  } else {
    userList = (await getAllDiscussApi()).data.resultData;
  }
  let urlPrefix = ref(`/Admin/index/adminDiscuss?page=1` + `&size=20`);
  let urlSuffix = ref(
    `/Admin/index/adminDiscuss?page=` + userList.pages + `&size=20`
  );
  const deleteDiscuss = (id) => {};
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