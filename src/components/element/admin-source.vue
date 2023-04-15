<template>
  <hr />
  <table>
    <tr class="tr1">
      <th>名称</th>
      <th>时长</th>
      <th>片源</th>

      <th>操作</th>
    </tr>
    <tr v-for="movie in movieList.list" :key="movie.id">
      <td>
        <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
          {{ movie.name }}</router-link
        >
      </td>
      <td></td>
      <td>
        <a :href="movie.source" target="">{{ movie.source }}</a>
      </td>

      <td>
        <t-button class="tb" v-on:click="changeInf(movie.id)">修改</t-button>
        <hr />
      </td>
    </tr>
  </table>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in movieList.pages" :key="page">
        <a :href="`/Admin/index/adminSource?page=` + page + `&size=5`">
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ movieList.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
  <!-- 修改 -->
  <t-dialog v-model:visible="visible2">
    <input type="text" />
  </t-dialog>
</template>
  
  <script setup>
import {
  getAllMovieApi,
  getAllGenre,
  getAllMovieMoreApi,
  addMovieApi,
  uploadMovieImageApi,
  deleteMovieByIdApi,
  getMovieIdApi,
} from "/src/utils/api.js";
import { computed, reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { ChevronDownIcon } from "tdesign-icons-vue-next";
const visible1 = ref(false);
const visible2 = ref(false);
const $route = useRoute();
const $router = useRouter();
let movieList = ref();
let typeList = reactive(await getAllGenre()).data.resultData;
if ($route.query.page) {
  movieList = (await getAllMovieMoreApi($route.query.page)).data.resultData;
} else {
  movieList = (await getAllMovieApi()).data.resultData;
}
let urlPrefix = ref(`/Admin/index/adminSource?page=1` + `&size=6`);
let urlSuffix = ref(
  `/Admin/index/adminSource?page=` + movieList.pages + `&size=6`
);
const changeInf = (id) => {
  $router.push({ path: "/Admin/index/adminMovieChange", query: { id: id } });
};

let oneMovie = reactive({
  name: "",
  actor: "",
  director: "",
  introduction: "",
  district: "",
  imdb: "",
  screenDate: "",
  //   type: value,
  time: 0,
  image: "",
});
let Imageurl = ref();
const submitMovie = () => {
  let file = document.getElementById("file").files[0];
  let form = new FormData();
  form.append("file", file);
  uploadMovieImageApi(form).then((result) => {
    Imageurl.value = result.data.message;
    oneMovie.image = Imageurl.value;
    addMovieApi(oneMovie);
    window.location.reload();
  });
};
const deleteMovie = (id) => {
  deleteMovieByIdApi(id).then((result) => {
    if (result.data.code == "404") {
      alert("电影相关信息存在无法删除");
    } else {
      window.location.reload();
    }
  });
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
th:nth-child(1) {
  width: 150px;
}
th:nth-child(2) {
  width: 150px;
}
th:nth-child(3) {
  width: 550px;
}
th:nth-child(4) {
  width: 150px;
}
.hb {
  margin-left: 10px;
  width: 70px;
  height: 100px;
}
td {
  font-size: 13px;
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
.tb {
  margin-left: 10px;
  margin-right: 10px;
}

.dialogChange {
  padding-top: -15px;
  display: flex;
  align-items: center;
}
.dialog-span {
  width: 100px;
}
.plq {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(221, 221, 221);
}
</style>