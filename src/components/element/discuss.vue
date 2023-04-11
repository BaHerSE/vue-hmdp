<template>
  <div class="btm">
    <div class="inf">
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
      <t-button class="submit" @click="submit">发送</t-button>
      <div class="plq">
        <div v-for="dis in discussList.list" :key="dis.id" class="plq-ltq">
          <img :src="dis.user.icon" alt="" class="icon" />
          <div class="ltq">
            <span class="name">{{ dis.user.nickName }}</span>
            &nbsp;
            <span class="time">{{ dis.createTime.replace("T", " ") }}</span>
            <hr class="jg" />
            <span class="comment">{{ dis.comment }}</span>
          </div>
        </div>
      </div>
      <div v-show="discussList.total != 0">
        <ul>
          <li>
            <a :href="urlPrefix">«</a>
          </li>
          <li v-for="page in discussList.pages" :key="page">
            <a
              :href="`/Article?page=` + page + `&size=10&id=` + $route.query.id"
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
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  getDiscussByIdApi,
  sendDiscussApi,
  getDiscussMoreByIdApi,
  getUserApi,
} from "/src/utils/api.js";
import { reactive, ref } from "@vue/reactivity";
const $route = useRoute();
let discussList = reactive();
const getTime = () => {
  let timeNow = new Date();
  let ct =
    timeNow.getFullYear() +
    "-" +
    timeNow.getMonth() +
    "-" +
    timeNow.getDay() +
    "T" +
    timeNow.getHours() +
    ":" +
    timeNow.getMinutes() +
    ":" +
    timeNow.getSeconds();
  return ct;
};
const uI = ref("");
getUserApi().then((result) => {
  uI.value = result.data.resultData;
});
discussList = reactive(await getDiscussByIdApi($route.query.id)).data
  .resultData;
let disDemo = reactive({
  comment: "",
  createTime: getTime(),
  user: {
    id: 0,
    icon: "",
    nickName: "",
  },
});
if ($route.query.page != undefined) {
  discussList = reactive(
    await getDiscussMoreByIdApi(
      $route.query.id,
      $route.query.page,
      $route.query.size
    )
  ).data.resultData;
}
let text = ref();
const submit = (value) => {
  if (text.value == undefined) {
    alert("不能为空");
    return;
  } else if (text.value.replace(" ", "") == "") {
    alert("不能为空");
    return;
  }
  let discuss = {
    cinecismId: $route.query.id,
    comment: text.value,
  };
  sendDiscussApi(discuss);
  disDemo.comment = text.value;
  disDemo.user.id = uI.value.id;
  disDemo.user.nickName = uI.value.nickName;
  disDemo.user.icon = uI.value.icon;
  discussList.list.unshift(disDemo);
};
let urlPrefix = ref(`/Article?page=1` + `&size=10&id=` + $route.query.id);
let urlSuffix = ref(
  `/Article?page=` + discussList.pages + `&size=10&id=` + $route.query.id
);
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
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
.inf {
  width: 900px;
  background-color: white;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 0;
  margin-bottom: 50px;
  padding-bottom: 20px;
}
.plk {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(160, 201, 219);
  width: 800px;
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
  margin-top: 25px;
  display: flex;
}
.icon {
  margin-left: 35px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.name {
  font-size: 18px;
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
</style>