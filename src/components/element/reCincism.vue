<template>
  <div class="top">
    <div class="t-mid">
      <img src="http://bahersea.fun/public/logo.png" alt="" class="logo" />
      <span>写评论</span>
    </div>
  </div>
  <div v-for="m in movie" :key="m.id" class="movie">
    <img :src="m.image" alt="" class="img" />
    <a class="mname" href="">{{ m.name }}</a>
    <p v-for="s in star" :key="s.id" class="mp">
      {{ s.avgScore + "分（" + s.count + "人评价）" }}
    </p>
  </div>
  <div class="star">
    <span>给个评分吧：</span>
    <t-rate show-text size="18" v-model="cinm.star"></t-rate>
  </div>
  <div class="pl">
    <textarea
      name=""
      id=""
      cols="84"
      rows="1"
      class="area"
      placeholder="添加标题"
      v-model="cinm.title"
    ></textarea>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="cinm.article"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
    <t-upload
      v-model="files"
      action="http://localhost:8090/Blog/upImg"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      :auto-upload="autoUpload"
      :max="8"
      :onSuccess="success"
    ></t-upload>
  </div>
  <div class="up">
    <button class="submit" @click="cinecismTTT">发送</button>
  </div>
  <img src="" alt="" srcset="" />
  <!-- <button @click="test">1123</button> -->
</template>
  
  <script setup>
import {
  getMovieIdApi,
  getScoreByIdApi,
  getCinecismByIdApi,
  updateCinecismApi,
} from "/src/utils/api.js";
import { reactive, toRaw } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import "@wangeditor/editor/dist/css/style.css";
import NavigationBar from "./NavigationBar.vue";
components: {
  Editor, Toolbar;
}
const test = () => {
  console.log(cinm);
};
const axios = getCurrentInstance().appContext.config.globalProperties.$axios;
let movie = reactive({});
let star = reactive({});
const $route = useRoute();
const sValue = ref(5);
const title = ref();
const autoUpload = ref(false);
const files = ref([]);
const $router = useRouter();
const cinm = (await getCinecismByIdApi($route.query.id)).data.resultData;
getMovieIdApi($route.query.Mid).then((result) => {
  movie.value = result.data.resultData;
});
getScoreByIdApi($route.query.Mid).then((result) => {
  star.value = result.data.resultData;
});
const success = function (response) {
  const editor = editorRef.value;
  for (let i = 0; i < response.results.length; i++) {
    let url = response.results[i].response.message;
    editor.dangerouslyInsertHtml(
      `<img src="` + url + `" alt="" data-href="" style=""/>`
    );
  }
};

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref();
const toolbarConfig = {};
toolbarConfig.excludeKeys = ["uploadImage", "group-video"];
const editorConfig = { MENU_CONF: {}, placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
function cinecismTTT() {
  let cinecism = reactive({
    id: cinm.id,
    movieId: cinm.movieId,
    title: cinm.title,
    star: cinm.star,
    article: cinm.article,
  });
  console.log(cinecism);
  updateCinecismApi(cinecism);
  $router.push({ path: "/" });
}
</script>
  
  <style scoped>
body {
  margin: 0;
}
.top {
  width: 100%;
  height: 50px;
  background-color: rgb(247, 247, 247);
  margin-top: 0;
}
.t-mid {
  width: 850px;
  margin: auto;
}
.t-mid span {
  float: right;
  line-height: 45px;
  color: #bdbdbd;
}
.logo {
  width: 150px;
  height: 45px;
}

.movie {
  width: 800px;
  height: 80px;
  background-color: rgb(247, 247, 247);
  margin: auto;
  margin-top: 20px;
}
.img {
  width: 54px;
  height: 80px;
  float: left;
  margin-left: 20px;
  margin-right: 15px;
}
.mname {
  text-decoration: none;
  color: #37a;
  display: block;
  padding-top: 15px;
}
.mp {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
.star {
  width: 800px;
  margin: auto;
  padding-left: 35px;
  margin-top: 30px;
}
.star span {
  font-size: 12px;
  color: #111;
  float: left;
}
.pl {
  width: 800px;
  margin: auto;
  margin-top: 30px;
}
.pl textarea {
  border: 0 solid;
  margin-left: 15px;
  outline: medium;
  font-size: larger;
  font-weight: bolder;
  margin-bottom: 10px;
  resize: none;
}
.up {
  width: 800px;
  height: 25px;
  margin: auto;
  margin-top: 30px;
}
.submit {
  color: white;
  font-size: 12px;
  float: right;
  background: #3db04d;
  border: 0;
  padding: 0 12px 0 12px;
  line-height: 25px;
}
.submit:active {
  background-color: #33913f;
}
.submit:hover {
  cursor: pointer;
}
</style>