<template>
  <div class="change">
    <span>电影名称:</span>&nbsp;&nbsp;<t-input
      class="inputStyle"
      v-model="changeMovie.name"
    />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导演：</span
    ><t-input class="inputStyle" v-model="changeMovie.director" />
    <br />
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演员：</span
    ><t-input class="inputStyle" v-model="changeMovie.actor" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介：</span
    ><textarea
      class="plq"
      id=""
      cols="60"
      rows="6"
      maxlength="150"
      v-model="changeMovie.introduction"
    ></textarea>
    <br />
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;拍摄地：</span
    ><t-input class="inputStyle" v-model="changeMovie.district" />
    <br />
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</span
    ><t-date-picker v-model="changeMovie.screenDate" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时长：</span>
    <t-input-number :min="0" v-model="changeMovie.time" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;imdb：</span>
    <t-input class="inputStyle" v-model="changeMovie.imdb" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海报：</span>
    <img :src="changeMovie.image" alt="" class="image" />
    &nbsp;&nbsp;&nbsp;
    <input type="file" id="file" />
    <br />
  </div>
  <br />
  <t-button v-on:click="sub()">提交</t-button>
</template>

<script setup>
import {
  getMovieIdApi,
  uploadMovieImageApi,
  UpdateMovieApi,
} from "/src/utils/api.js";
import { computed, reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
const $route = useRoute();
const $router = useRouter();

let movie = ref();
movie = (await getMovieIdApi($route.query.id)).data.resultData;
let changeMovie = reactive({
  id: movie.id,
  name: movie.name,
  actor: movie.actor,
  director: movie.director,
  introduction: movie.introduction,
  district: movie.district,
  imdb: movie.imdb,
  screenDate: movie.screenDate,
  time: movie.time,
  image: movie.image,
});
let Imageurl = ref();
const sub = () => {
  let file = document.getElementById("file").files[0];
  let form = new FormData();
  form.append("file", file);
  uploadMovieImageApi(form).then((result) => {
    Imageurl.value = result.data.message;
    changeMovie.image = Imageurl.value;
    UpdateMovieApi(changeMovie.id, changeMovie);
    window.location.reload();
  });
};
</script>

<style scoped>
.change {
  width: 600px;
  margin-top: 30px;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.inputStyle {
  width: 300px;
}
.plq {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(221, 221, 221);
}
.image {
  width: 150px;
}
</style>