<template>
  <navigation-bar></navigation-bar>
  <div class="work">
    <div class="work-left">
      <div class="top">
        <div class="movie">
          <h1>
            {{ movie.name }}
            <a>({{ movie.screenDate.slice(0, 4) }})</a>
          </h1>
          <img :src="movie.image" alt="" />

          <span>导演：</span>{{ movie.director }}
          <br />
          <span>演员：</span><a class="actor">{{ movie.actor }}</a>
          <br />
          <span>类型：</span>{{ movie.type }}
          <br />
          <span>产地：</span>{{ movie.district }}
          <br />
          <span>上映时间：</span>{{ movie.screenDate.slice(0, 10) }}
          <br />
          <span>imdb：</span>{{ movie.imdb }}
          <br />
          <span>时长：</span>{{ movie.time }}
          <br />
        </div>
        <div class="stars" v-for="s in star" :key="s.id">
          <h1>1</h1>
          <span class="people">观众评分</span>
          <br />

          <div class="stars-line">
            <div>
              <strong class="score">{{ s.avgScore }}</strong>
            </div>
            <div class="star5">
              <t-rate disabled :defaultValue="starValue" size="14"></t-rate>
              <a href="">{{ s.count }}人评价</a>
            </div>
          </div>

          <ul>
            <li>
              五星
              <div class="fk"></div>
              {{ ((s.stars5 / s.count) * 100).toFixed(1) }}%
            </li>
            <li>
              四星
              <div class="fk"></div>
              {{ ((s.stars4 / s.count) * 100).toFixed(1) }}%
            </li>
            <li>
              三星
              <div class="fk"></div>
              {{ ((s.stars3 / s.count) * 100).toFixed(1) }}%
            </li>
            <li>
              二星
              <div class="fk"></div>
              {{ ((s.stars2 / s.count) * 100).toFixed(1) }}%
            </li>
            <li>
              一星
              <div class="fk"></div>
              {{ ((s.stars1 / s.count) * 100).toFixed(1) }}%
            </li>
          </ul>
        </div>
      </div>
      <div class="pj">
        <div class="pj-button">
          <t-button theme="success" @click="createNew(1)"> 点击播放 </t-button>
          &nbsp;
          <template v-if="personWrite == null">
            <span>评价：</span>
            <t-button @click="visible = true" class="dp-dialog">
              <t-rate size="14" class="df"></t-rate>
            </t-button>
          </template>
        </div>
        <br />
        <div class="introductions">
          <span class="in-in"> {{ movie.name }}的剧情简介 · · · · · · </span>
          <br />
          &nbsp;&nbsp;
          <span class="in-nr">
            {{ movie.introduction }}
          </span>
        </div>
      </div>
      <div class="jz">
        <span class="in-in">
          <router-link
            class="in-in"
            :to="{ path: '/means', query: { Mid: $route.query.Mid } }"
          >
            {{ movie.name }}的剧照与视频 · · · · · ·
          </router-link>
        </span>
        <span>
          <router-link
            :to="{ path: '/billUpload', query: { Mid: $route.query.Mid } }"
          >
            添加资料
          </router-link>
        </span>
        <div class="img-fk">
          <div v-for="mv in movieVideo" :key="mv.id" class="img-bg">
            <img :src="mv.url" alt="" class="v-img" />
          </div>
        </div>
      </div>
      <div class="plq">
        <a class="in-in">
          <router-link
            class="in-in"
            :to="{ path: '/allBlog', query: { id: movie.id } }"
          >
            {{ movie.name }}的短评 · · · · · ·
          </router-link>
        </a>
        <span>( 全部 {{ blogList.length }} 条 )</span>
        <div class="blogList" v-for="blog in blogList" :key="blog.id">
          <div class="bl-top">
            <span class="plq-name">{{ blog.nickName }}</span>
            &nbsp;
            <span>看过</span>
            &nbsp;
            <t-rate :default-value="blog.star" size="14" disabled />
            &nbsp;
            <span class="plq-date">{{
              blog.createTime.replace("T", " ")
            }}</span>
          </div>

          <span class="bl-art">{{ blog.article }}</span>
        </div>
      </div>
      <div class="cinecism">
        <router-link
          :to="{ path: '/allCinecism', query: { id: movie.id } }"
          class="in-in"
        >
          {{ movie.name }}的影评 · · · · · ·
        </router-link>
        <span>( 全部 {{ cinList.length }} 条 )</span>
        <router-link
          :to="{ path: '/editor', query: { Mid: movie.id } }"
          v-if="typeof personCinecism == 'undefined' || personCinecism == false"
        >
          <t-button theme="warning" class="xyp">我要写影评</t-button>
        </router-link>
        <div class="blogList" v-for="cin in cinList" :key="cin.id">
          <div class="bl-top">
            <img :src="cin.icon" alt="" class="cin-uLogo" />
            &nbsp;&nbsp;
            <span class="plq-name">{{ cin.nickName }}</span>
            &nbsp; &nbsp;
            <t-rate :default-value="cin.star" size="14" disabled />
            &nbsp;
            <span class="plq-date">{{ cin.createTime }}</span>
          </div>
          <br />
          <router-link :to="{ path: '/Article', query: { id: cin.id } }">
            <span class="cin-title">{{ cin.title }}</span>
          </router-link>
          <br />
          <div class="cin-article">
            <span class="bl-art" v-html="cin.article"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="director">
        <span class="director-title">科波拉电影推荐</span>
        <div
          class="director-top1"
          v-for="m in directorMovie.slice(0, 1)"
          :key="m.index"
        >
          <img :src="m.image" alt="" />
          <div class="introduction">
            <router-link
              :to="{ path: '/list', query: { Mid: m.id } }"
              target="_blank"
              ><span class="introduction1-name">{{ m.name }}</span>
              <br />
              <span class="introduction1-int">{{
                m.introduction.slice(0, 50)
              }}</span>
            </router-link>
          </div>
        </div>
        <div class="director-top2-4">
          <div
            class="top2-4"
            v-for="m in directorMovie.slice(1, 5)"
            :key="m.id"
          >
            <router-link
              :to="{ path: '/list', query: { Mid: m.id } }"
              target="_blank"
            >
              <img :src="m.image" alt="" />
              <br />
              <span>{{ m.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <t-dialog
    v-model:visible="visible"
    header="短评"
    confirm-btn="保存"
    cancel-btn="关闭"
    :on-confirm="onConfirm"
    :on-close="close"
  >
    <div class="discuss">
      <div class="dis-star">
        <span>给个评价吧?(可选):</span>&nbsp;
        <t-rate size="14" class="df" v-model="pjValue"></t-rate>
      </div>
      <br />
      <!-- <t-input
        placeholder="请输入标题"
        :maxlength="10"
        size="small"
        v-model="pjTitle"
      ></t-input>
      <br /> -->
      <textarea
        maxlength="150"
        name=""
        id=""
        cols="54"
        rows="5"
        placeholder="内容"
        v-model="pjDp"
      ></textarea>
    </div>
  </t-dialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import NavigationBar from "./element/NavigationBar.vue";
import {
  getMovieIdApi,
  getScoreByIdApi,
  saveBlogApi,
  getBlogListApi,
  isWriteBlogApi,
  getCinecismListApi,
  isWriteCinecismApi,
  getDirectorMovie5Api,
  getMovieVideoPart,
} from "/src/utils/api.js";
const visible = ref(false);
const $route = useRoute();
const $router = useRouter();
const directorMovie = reactive(await getDirectorMovie5Api()).data.resultData;
let movie = reactive(await getMovieIdApi($route.query.Mid)).data.resultData;
let star = reactive({});
let blogList = reactive(await getBlogListApi($route.query.Mid)).data.resultData;
let cinList = reactive(await getCinecismListApi($route.query.Mid)).data
  .resultData;
let personWrite = reactive(await isWriteBlogApi($route.query.Mid)).data
  .resultData;
let personCinecism = reactive(await isWriteCinecismApi($route.query.Mid)).data
  .resultData;
let movieVideo = reactive(await getMovieVideoPart($route.query.Mid)).data
  .resultData;
let starValue = ref(0);
let pjValue = ref(0);
let pjTitle = ref();
let pjDp = ref();
getScoreByIdApi($route.query.Mid).then((result) => {
  star.value = result.data.resultData;
  starValue.value = Math.round(result.data.resultData.avgScore / 2);
});
const createNew = (id) => {
  $router.push({ path: "/Movie", query: { Mid: $route.query.Mid } });
};
let blog = reactive({
  movieId: $route.query.Mid,
  title: pjTitle,
  star: pjValue,
  article: pjDp,
});
const close = () => {
  visible.value = false;
};
const onConfirm = () => {
  if (blog.star == 0) {
    alert("请打分");
    return;
  } else if (blog.article == null) {
    alert("内容不能为空");
    return;
  }
  saveBlogApi(blog).then((result) => {
    location.reload();
    // $router.push({ path: "/list", query: { Mid: $route.query.Mid } });
  });
  visible.value = false;
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.work {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: auto;
}
.right {
  width: 270px;
  height: 300px;
  margin-top: 40px;
  border-radius: 10px;
  background-color: white;
}
.top {
  display: flex;
  width: 900px;
  margin-top: 40px;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 40px;
  background-color: white;
}
.movie {
  width: 600px;
  font-size: 16px;
  border-right: 1px rgb(206, 206, 206) solid;
  margin-left: 50px;
}
.movie span {
  font: 15px Arial, Helvetica, sans-serif;
  line-height: 150%;
  color: #666666;
}
.movie img {
  width: 135px;
  height: 200px;
  float: left;
  margin-right: 20px;
}
.movie h1 {
  margin: 0;
}
h1 a {
  font-size: 20px;
  color: #888;
}
/* 打分 */
.stars {
  margin-left: 20px;
  width: 100px;
}
.stars h1 {
  margin: 0;
  visibility: hidden;
}
.people {
  font-size: 15px;
  color: #9b9b9b;
}
.score {
  font-size: 28px;
  color: #494949;
  font-weight: 500;
}
.stars-line {
  display: flex;
}
.stars li {
  width: 160px;
  list-style: none;
  font-size: 12px;
  color: #909090;
  display: flex;
}
.stars ul {
  margin: 20px 0 0 0;
  padding: 0;
}
.fk {
  width: 80px;
  height: 10px;
  background-color: #ffd596;
  margin-top: 2px;
  margin-left: 5px;
  margin-right: 5px;
}
.star5 a {
  color: #37a;
  text-decoration: none;
  font-size: 14px;
}
.discuss textarea {
  resize: none;
  border: 1px solid #dddddd;
  outline-color: #0052d99c;
}
.dis-star {
  display: flex;
  align-items: center;
}
.movieLogo {
  width: 20px;
}
/* 弹窗 */
.dp-dialog {
  background-color: white;
  border: 0 solid white;
}
.dialog {
  width: 550px;
}
.dis-top {
  background-color: rgb(226 255 226);
  color: #00641c;
  line-height: 44px;
  padding-left: 15px;
}
.dialog textarea {
  margin-left: 15px;
}
.pj {
  width: 860px;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  background-color: white;
}
.in-in {
  color: #007722;
}
.in-nr {
  display: block;
  text-indent: 2em;
  font-size: 13px;
  line-height: 20px;
}
.introduction {
  width: 860px;
}
.jz {
  padding: 20px 20px 20px 20px;
  margin-top: 20px;
  width: 860px;
  border-radius: 10px;
  background-color: white;
}
.plq {
  padding: 20px 20px 20px 20px;
  margin-top: 20px;
  width: 860px;
  border-radius: 10px;
  background-color: white;
}
.plq span {
  font-size: 13px;
}
.plq-name {
  color: #37a;
}
.plq-date {
  color: #aaa;
}
.blogList {
  border-top: 1px solid #eaeaea;
  margin-top: 15px;
  padding-top: 10px;
}
.bl-top {
  display: flex;
  align-items: center;
}
.bl-art {
  color: #666;
}
.personWrite {
  display: flex;
  align-items: center;
}
.kg {
  font-size: 13px;
}
.kg :nth-child(2) {
  color: #666666;
}
.cinecism {
  width: 860px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px 20px 20px 20px;
}
.cin-title {
  font-size: 15px;
  color: #37a;
  text-decoration: none;
}
.cin-uLogo {
  width: 26px;
  height: 26px;
  border-radius: 13px;
}
.bl-art {
  height: 50px;
  /* overflow: hidden; */
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden; */
}
.xyp {
  float: right;
}
.cin-article {
  margin-top: 10px;
  height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.director {
  padding: 15px 15px 15px 15px;
  background-color: white;
  border-radius: 10px;
}
.director-title {
  font-size: 20px;
}
.director-top1 {
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(219, 219, 219);
  display: flex;
}
.director-top1 img {
  width: 80px;
  height: 110px;
}
.introduction {
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* -webkit-box-orient: vertical; */
}
.introduction1-name {
  font-size: 20px;
  font-weight: 800;
}
.introduction1-int {
  font-size: 5px;
  line-height: 5px;
  color: #707070;
}
.director-top2-4 {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.top2-4 {
  text-align: center;
  width: 55px;
}
.top2-4 img {
  width: 55px;
  height: 70px;
}
.top2-4 span {
  font-size: 12px;
  color: #8798af;
}
.img-fk {
  display: flex;
}
.img-bg {
  background-color: #e2e2e22c;
  /* width: 160px; */
  text-align: center;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.v-img {
  height: 100px;
}
</style>