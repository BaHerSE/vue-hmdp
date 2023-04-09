<template>
  <navigation-bar></navigation-bar>
  <div class="work">
    <div class="work-left">
      <!-- 热门电影 -->
      <div class="lbt-hot">
        <div class="lbt-hot-top">
          <img src="../img/hot.png" class="title-img" /><span class="title">
            热门电影
          </span>
        </div>
        <br />
        <div class="lbt-hot-bottom">
          <t-swiper
            :navigation="{ type: 'fraction', size: 'large' }"
            :autoplay="false"
          >
            <t-swiper-item v-for="item in movieList" :key="item">
              <div class="block"></div>
              <div class="hot-movie" v-for="movie in item" :key="movie.id">
                <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
                  <img :src="movie.image" alt="" class="hot-movie-img" />
                  <br />
                  <span class="movie-name">
                    {{ movie.name }}
                  </span>
                  <br />
                  <span class="movie-score">
                    {{ movie.avgScore }}
                  </span>
                </router-link>
              </div>
            </t-swiper-item>
          </t-swiper>
        </div>
      </div>
      <!-- 影视top10 -->
      <div class="top-movie">
        <div class="lbt-hot-top">
          <img src="../img/hot.png" class="title-img" /><span class="title">
            影史top10
          </span>
        </div>
        <div class="top10">
          <div class="top10-movie" v-for="movie in top10.value" :key="movie.id">
            <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
              <img :src="movie.image" alt="" class="hot-movie-img" />
              <br />
              <span class="movie-name">
                {{ movie.name }}
              </span>
              <br />
              <span class="movie-score">
                {{ movie.avgScore }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 分类 -->
      <div class="fl-movie">
        <div class="lbt-hot-top">
          <img src="../img/hot.png" class="title-img" /><span class="title">
            分类
          </span>
          &nbsp;
          <span>
            <router-link
              :to="{ path: '/genreSearch', query: { genre: 1 } }"
              class="flspan"
            >
              剧情
            </router-link>
          </span>
          &nbsp;
          <span>
            <router-link
              :to="{ path: '/genreSearch', query: { genre: 2 } }"
              class="flspan"
            >
              喜剧
            </router-link>
          </span>
          &nbsp;
          <span>
            <router-link
              :to="{ path: '/genreSearch', query: { genre: 3 } }"
              class="flspan"
            >
              动作
            </router-link>
          </span>
          &nbsp;
          <span>
            <router-link
              :to="{ path: '/genreSearch', query: { genre: 4 } }"
              class="flspan"
            >
              爱情
            </router-link>
          </span>
          &nbsp;
          <span>
            <router-link
              :to="{ path: '/genreSearch', query: { genre: 5 } }"
              class="flspan"
            >
              科幻
            </router-link>
          </span>
          &nbsp;
        </div>
        <div class="lbt-hot-bottom">
          <br />
          <t-swiper
            :current="current"
            :navigation="{ type: 'bars', size: 'large' }"
            :autoplay="false"
          >
            <t-swiper-item v-for="item in flMovie" :key="item">
              <div class="block"></div>
              <div class="hot-movie" v-for="movie in item" :key="movie.id">
                <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
                  <img :src="movie.image" alt="" class="hot-movie-img" />
                  <br />
                  <span class="movie-name">
                    {{ movie.name }}
                  </span>
                  <br />
                  <span class="movie-score">
                    {{ movie.avgScore }}
                  </span>
                </router-link>
              </div>
            </t-swiper-item>
          </t-swiper>
          <div class="fl">
            <t-icon
              name="chevron-left"
              size="30px"
              @click="(current = current - 1 > 0 ? current - 1 : 5), lb()"
            />
            <span>{{ current }}/5</span>
            <t-icon
              name="chevron-right"
              size="30px"
              @click="(current = current + 2 > 6 ? 1 : current + 1), lb()"
            />
          </div>
        </div>
      </div>
      <!-- TA说 -->
      <div class="he-talk">
        <div class="lbt-hot-top">
          <img src="../img/hot.png" class="title-img" /><span class="title">
            TA说
          </span>
        </div>
        <div class="top5">
          <div v-for="c in cinecism5.value" :key="c.id" class="cinecism">
            <router-link :to="{ path: '/Article', query: { id: c.id } }">
              <span class="c-title">{{ c.title }}</span>
            </router-link>

            <div class="c-article">
              <span v-html="c.article"></span>
            </div>
            <div class="c-user">
              <div>
                <router-link :to="{ path: '/Home', query: { id: c.userId } }">
                  <img :src="c.icon" alt="" class="tx" />
                  <span>{{ c.nickName }}</span>
                </router-link>
              </div>
              <div>
                <img src="../img/clike.png" alt="" class="like" />
                &nbsp;
                <span>{{ c.liked }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="work-right">
      <div class="director">
        <span class="director-title">科波拉电影推荐</span>
        <div
          class="director-top1"
          v-for="m in directorMovie.slice(0, 1)"
          :key="m.index"
        >
          <img :src="m.image" alt="" />
          <div class="introduction">
            <router-link :to="{ path: '/list', query: { Mid: m.id } }"
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
            <router-link :to="{ path: '/list', query: { Mid: m.id } }">
              <img :src="m.image" alt="" />
              <br />
              <span>{{ m.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="friend">
        <span class="director-title">TA推荐</span>
        <div class="frd" v-for="f in friends" :key="f.id">
          <img :src="f.icon" alt="" class="friend-icon" />
          <router-link :to="{ path: '/Home', query: { id: f.id } }">
            <span>{{ f.nickName }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- <bottom></bottom> -->
</template>

<script setup>
import {
  getHotMovieListApi,
  getTop10Api,
  getTop5CinecismApi,
  getDirectorMovie5Api,
  getFriends3Api,
  getGenreMovieApi,
} from "/src/utils/api.js";
import NavigationBar from "./element/NavigationBar.vue";
import bottom from "./element/bottom.vue";
import { reactive, ref } from "@vue/reactivity";
let flMovie = reactive([[], [], [], [], []]);
reactive(await getGenreMovieApi()).data.resultData;
let current = ref(1);
let movieList = reactive([[], [], []]);
const top10 = reactive({});
const cinecism5 = reactive({});
const friends = reactive(await getFriends3Api()).data.resultData;
const directorMovie = reactive(await getDirectorMovie5Api()).data.resultData;
getHotMovieListApi().then((result) => {
  for (let index = 0; index < result.data.resultData.length; index++) {
    if (index < 5) {
      movieList[0].push(result.data.resultData[index]);
    } else if (5 <= index && index <= 9) {
      movieList[1].push(result.data.resultData[index]);
    } else if (10 <= index && index <= 14) {
      movieList[2].push(result.data.resultData[index]);
    }
  }
});
getGenreMovieApi().then((result) => {
  for (let index = 0; index < result.data.resultData.length; index++) {
    if (index < 5) {
      flMovie[0].push(result.data.resultData[index]);
    } else if (5 <= index && index <= 9) {
      flMovie[1].push(result.data.resultData[index]);
    } else if (10 <= index && index <= 14) {
      flMovie[2].push(result.data.resultData[index]);
    } else if (15 <= index && index <= 19) {
      flMovie[3].push(result.data.resultData[index]);
    } else if (20 <= index && index <= 24) {
      flMovie[4].push(result.data.resultData[index]);
    }
  }
});
getTop10Api().then((result) => {
  top10.value = result.data.resultData;
});
getTop5CinecismApi().then((result) => {
  cinecism5.value = result.data.resultData;
});
const lb = () => {
  if (current.value == 5) {
    document.getElementsByClassName("flspan")[current.value - 1].style.color =
      "#20a0da";
    document.getElementsByClassName("flspan")[0].style.color = "#91d720";
  } else {
    document.getElementsByClassName("flspan")[current.value].style.color =
      "#91d720";
  }

  if (current.value == 1) {
    document.getElementsByClassName("flspan")[0].style.color = "#20a0da";
  } else {
    document.getElementsByClassName("flspan")[current.value - 1].style.color =
      "#20a0da";
  }
};
</script>

<style scoped>
.flspan {
  color: #20a0da;
}
a {
  text-decoration: none;
  color: black;
}
.title {
  line-height: 60px;
  font-size: 22px;
  color: #20a0da;
  margin-left: 10px;
}
.title-img {
  width: 20px;
  height: 25px;
}
.hot-movie-img:hover{
  box-shadow: 0 5px 20px rgb(194, 194, 194);
  transform: translateY(-3px);
}
.work {
  width: 1200px;
  height: 1800px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.work-left {
  width: 900px;
  height: 1200px;
  /* background-color: white; */
  border-radius: 10px;
}
.work-right {
  width: 270px;
  height: 800px;
  /* padding: 15px 15px 15px 15px; */
  /* background-color: white;
  border-radius: 10px; */
}
.lbt-hot {
  width: 900px;
  height: 350px;
  background-image: linear-gradient(#f0fbff, white);
  border-radius: 10px;
}
.fl-movie {
  width: 900px;
  height: 350px;
  margin-top: 30px;
  background-image: linear-gradient(#f0fbff, white);
  border-radius: 10px;
}
.top-movie {
  width: 900px;
  height: 500px;
  margin-top: 30px;
  background-image: linear-gradient(#f0fbff, white);
  border-radius: 10px;
}
.lbt-hot-top {
  width: 860px;
  height: 60px;
  border-bottom: 1px solid rgb(196, 196, 196);
  margin: auto;
  display: flex;
  align-items: center;
}
.lbt-hot-bottom {
  width: 860px;
  height: 240px;
  margin: auto;
}
.hot-movie,
.top10-movie {
  width: 160px;
  text-align: center;
  display: inline-block;
}

.hot-movie-img {
  width: 115px;
  height: 160px;
}
.movie-name {
  font-size: 10px;
  color: #37a;
}
.movie-score {
  font-size: 10px;
  color: orange;
}
.block {
  width: 32px;
  height: 20px;
  display: inline-block;
}
.top10 {
  width: 860px;
  height: 360px;
  margin: auto;
  padding-left: 40px;
  margin-top: 20px;
}
.he-talk {
  width: 900px;
  /* height: 500px; */
  margin-top: 30px;
  background-image: linear-gradient(#f0fbff, white);
  /* background: -webkit-liner-gradient(#f0fbff, white); */
  border-radius: 10px;
  margin-bottom: 30px;
}
.top5 {
  width: 860px;
  /* height: 360px; */
  margin: auto;
  padding-bottom: 40px;
  /* padding-left: 40px; */
  /* margin-top: 20px; */
}
.cinecism {
  margin-top: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid #bababb;
}
.c-title {
  font-size: 20px;
  font-weight: lighter;
}
.c-article {
  margin-top: 10px;
  height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.c-user {
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 30px;
  justify-content: space-between;
}
.c-user div {
  display: flex;
  align-items: center;
  height: 30px;
}
.tx {
  width: 26px;
  height: 26px;
  margin-right: 10px;
  border-radius: 13px;
}
.c-user span {
  color: #a5a5a5;
  font-size: 16px;
  line-height: 20px;
}
.like {
  width: 20px;
  height: 20px;
  /* margin-left: 100px; */
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
.friend {
  margin-top: 30px;
  /* height: 300px; */
  padding: 15px 15px 15px 15px;
  background-color: white;
  border-radius: 10px;
}
.friend-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.frd {
  height: 80px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 40px 0 #ebedf2;
}
.fl {
  text-align: center;
  color: rgb(0 0 0 / 40%);
}
</style>