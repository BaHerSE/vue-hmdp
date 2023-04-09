<template>
    <table>
      <tr class="tr1">
        <th>名称</th>
        <th>头像</th>
        <th>手机号</th>
        <th>性别</th>
        <th>个性标签</th>
        <th>操作</th>
      </tr>
      <tr v-for="user in userList.list" :key="user.id">
        <td>{{ user.nickName }}</td>
        <td><img :src="user.icon" alt="" class="icon" /></td>
        <td>{{ user.phone }}</td>
        <td>
          <span v-if="user.gender == 1"> 男 </span>
          <span v-else>女 </span>
        </td>
        <td>{{ user.signature }}</td>
        <td>
          <t-button
            class="tb"
            v-on:click="downloadAdmin(user.id)"
            >恢复普通用户</t-button
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
          <a :href="`/Admin/index/adminAdmin?page=` + page + `&size=8`">
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
    getAllAdminApi,
    getAllAdminMoreApi,
    downloadAdminApi,
  } from "/src/utils/api.js";
  import { reactive, ref } from "@vue/reactivity";
  import { useRouter, useRoute } from "vue-router";
  const $route = useRoute();
  let userList = ref();
  
  if ($route.query.page) {
    userList = (await getAllAdminMoreApi($route.query.page)).data.resultData;
  } else {
    userList = (await getAllAdminApi()).data.resultData;
  }
  let urlPrefix = ref(`/Admin/index/adminAdmin?page=1` + `&size=8`);
  let urlSuffix = ref(
    `/Admin/index/adminAdmin?page=` + userList.pages + `&size=8`
  );
  const downloadAdmin = (id) => {
    downloadAdminApi(id);
    location.reload();
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
  </style>