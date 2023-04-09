<template>
  <navigation-bar></navigation-bar>
  <div class="workspace">
    <div class="work-left">
      <span class="M-title">{{ movie.name }}</span>
      <hr class="hrt" />

      <!-- 视频 -->
      <videoPlay
        v-bind="option"
        class="videoPlay"
        :src="movie.source"
      ></videoPlay>

      <!-- 评论区 -->
      <div class="infP">
        <h2 class="pl">全部评论 &nbsp;{{ discussList.total }}</h2>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="plk"
          maxlength="150"
          v-model="text"
        ></textarea>
        <t-button class="submit" v-on:click="submitDiscuss">发送</t-button>
        <div class="plq">
          <div v-for="dis in discussList.list" :key="dis.id" class="plq-ltq">
            <div class="p1">
              <img :src="dis.user.icon" alt="" class="icon" />
              <div class="ltq">
                <span class="name">{{ dis.user.nickName }}</span>
                &nbsp;
                <span class="time">{{ dis.createTime.replace("T", " ") }}</span>
                <hr class="jg" />
                <span class="comment">{{ dis.comment }}</span>
              </div>
            </div>
            <div class="hf">
              <t-button size="small" v-on:click="changeHF(dis.id)"
                >回复</t-button
              >
              <br />
              <div :id="dis.id" style="display: none">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  class="plk-hf"
                  maxlength="100"
                  v-model="replyText"
                ></textarea>
                <t-button
                  style="margin-top: -25px; margin-left: 15px"
                  v-on:click="submitReply(dis.id)"
                >
                  发送
                </t-button>
              </div>
            </div>
            <template v-if="dis.replyList[0].id != null">
              <div class="reply" v-for="rep in dis.replyList" :key="rep.id">
                <img :src="rep.user.icon" alt="" class="icon" />
                <div class="ltq">
                  <span class="name">{{ rep.nickName }}</span>
                  &nbsp;
                  <span class="time">{{ rep.createTime }}</span>
                  <hr class="jg" />
                  <span class="comment">{{ rep.comment }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- 分页 -->
        <div v-show="discussList.total != 0">
          <ul>
            <li>
              <a :href="urlPrefix">«</a>
            </li>
            <li v-for="page in discussList.pages" :key="page">
              <a
                :href="
                  `/Movie?page=` + page + `&size=20&Mid=` + $route.query.Mid
                "
              >
                {{ page }}
              </a>
            </li>
            <li><a :href="urlSuffix">»</a></li>
            <li>
              <span>共</span><span>{{ discussList.pages }}</span
              ><span>页</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="work-right">
      <div class="right-movie">
        <span class="movie-title">影片信息</span>
        <hr />
        <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
          <div class="movie">
            <img :src="movie.image" alt="" />
            <div class="inf">
              <span class="name">{{ movie.name }}</span>
              <br />
              <span>影片类型：{{ movie.type }}</span>
              <br />
              <span>IMDB: {{ movie.imdb }}</span>
              <br />
              <span>
                上映时间：{{
                  movie.screenDate.replace("T", " ").substring(0, 10)
                }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <br />
      <div class="dytj">
        <span class="m-title">电影推荐</span>
        <div class="movie-t" v-for="m in movieList" :key="m.id">
          <video
            preload="metadata"
            class="videoSmall"
            style="height: 80px; width: 140px"
          >
            <source :src="m.source" type="video/mp4" />
          </video>
          <span class="tjName">{{ m.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "../components/element/NavigationBar.vue";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getMovieIdApi,
  getMovieDiscussById,
  getMovieDiscussByIdMore,
  sendMovieDiscuss,
  replyApi,
  getRecommendApi,
} from "/src/utils/api.js";
const $route = useRoute();
const $router = useRouter();
let text = ref();
let replyText = ref();
let movie = reactive(await getMovieIdApi($route.query.Mid)).data.resultData;
//分页
let discussList = reactive(await getMovieDiscussById($route.query.Mid)).data
  .resultData;
let movieList = reactive(await getRecommendApi()).data.resultData;
console.log(movieList);
if ($route.query.page != undefined) {
  discussList = reactive(
    await getMovieDiscussByIdMore(
      $route.query.Mid,
      $route.query.page,
      $route.query.size
    )
  ).data.resultData;
}
let urlPrefix = ref(`/Movie?page=1` + `&size=20&Mid=` + $route.query.Mid);
let urlSuffix = ref(
  `/Movie?page=` + discussList.pages + `&size=20&Mid=` + $route.query.Mid
);
//播放器
const option = reactive({
  width: "1000px", //播放器高度
  height: "600px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: true, //关灯模式
  volume: 0.3, //
  control: true, //是否显示控制器
});
const option2 = reactive({
  width: "150px", //播放器高度
  height: "80px", //播放器高度
  color: "#409eff", //主题色
  volume: 0, //
  control: false, //是否显示控制器
});
const changeHF = (value) => {
  if (document.getElementById(value).style.display == "none") {
    document.getElementById(value).style.display = "block";
  } else if (document.getElementById(value).style.display == "block") {
    document.getElementById(value).style.display = "none";
  }
};

const submitDiscuss = () => {
  if (text.value == undefined) {
    alert("不能为空");
    return;
  } else if (text.value.replace(" ", "") == "") {
    alert("不能为空");
    return;
  }
  let discuss = {
    movieId: $route.query.Mid,
    comment: text.value,
  };
  sendMovieDiscuss(discuss);
  window.location.reload();
};
const submitReply = (value) => {
  if (replyText.value == undefined) {
    alert("不能为空");
    return;
  } else if (replyText.value.replace(" ", "") == "") {
    alert("不能为空");
    return;
  }
  let reply = {
    mdId: value,
    comment: replyText.value,
  };
  replyApi(reply);
};
</script>

<style scoped>
a {
  color: #333;
  text-decoration: none;
}
.workspace {
  width: 1350px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
.work-left {
  width: 1000px;
}
.work-right {
  width: 300px;
}
.pl {
  font-size: 18px;
  color: #525e75;
  font-weight: 700;
}
.M-title {
  font-weight: 300;
  font-size: 23px;
}
.hrt {
  border: 0px;
}
.right-movie {
  margin-top: 45px;
  padding: 15px 15px 15px 15px;
  background-color: white;
  width: 270px;
  border-radius: 10px;
  /* height: 100px; */
}
.movie-title {
  color: #333;
  font-size: 18px;
}
.right-movie img {
  width: 80px;
  height: 110px;
}
.right-movie hr {
  border-color: #ffffff;
}
.movie {
  display: flex;
}
.inf {
  font-size: 12px;
  line-height: 20px;
  margin-left: 10px;
}
.name {
  font-size: 18px;
}
.pl {
  font-size: 18px;
  color: #525e75;
  font-weight: 700;
}
.btm {
  width: 1250px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.infP {
  margin-top: 20px;
  width: 950px;
  background-color: white;
  padding-top: 10px;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 0;
  margin-bottom: 50px;
  padding-bottom: 20px;
  box-shadow: 2px 2px 5px #888888;
}
.plk {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(160, 201, 219);
  width: 840px;
  height: 100px;
  padding: 8px 10px 5px 10px;
  border-radius: 5px;
  margin-left: 40px;
  margin-top: 10px;
}
.submit {
  float: right;
  margin-top: 10px;
  margin-right: 48px;
}
.plq {
  margin-top: 50px;
}
.plq-ltq {
  /* margin-top: 25px; */
  padding-bottom: 15px;
  /* display: flex; */

  border-bottom: 1px solid #eff0f1;
}
.p1 {
  margin-top: 25px;
  padding-bottom: 15px;
  display: flex;
  /* border-bottom: 1px solid  #eff0f1; */
}
.icon {
  margin-left: 35px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.name {
  font-size: 18px;
  color: #61666d;
}
.time {
  font-size: 14px;
  color: #8798af;
}
.ltq {
  margin-left: 20px;
  width: 750px;
}
.comment {
  font-size: 13px;
  color: #353535;
}
.jg {
  border: 0px;
  margin-top: 4px;
  margin-bottom: 4px;
}
ul {
  padding-left: 0;
  display: flex;
  justify-content: center;
}
li {
  list-style: none;
  padding-left: 3px;
  padding-right: 3px;
}
.reply {
  margin-left: 50px;
  display: flex;
  margin-top: 10px;
}
.hf {
  padding-left: 90px;
}
.plk-hf {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(160, 201, 219);
  width: 500px;
  height: 20px;
  padding: 8px 10px 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.dytj {
  padding: 15px 15px 15px 15px;
  border-radius: 10px;
  background-image: linear-gradient(#f6f6f6, white);
}
.m-title {
  font-weight: bolder;
}
.movie-t {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
}
.tjName{
  font-size: 15px;
  margin-left: 5px;
  font-weight: 600;
}
</style>