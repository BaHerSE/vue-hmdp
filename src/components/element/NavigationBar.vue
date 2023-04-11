<template>
  <div class="nv">
    <div class="select">
      <router-link to="/">
        <img src="http://bahersea.fun/public/logo.png" alt="" class="logo" />
      </router-link>

      <div class="inp">
        <div class="selectInp">
          <t-select v-model="inputValue" :options="option" placeholder="电影" />
        </div>
        <t-input v-model="searchValue" />
      </div>
      <img
        src="http://bahersea.fun/photo/search.png"
        alt=""
        class="search"
        v-on:click="select"
      />
    </div>

    <img
      src="http://bahersea.fun/user/unLogin.png"
      class="tx"
      alt=""
      @click="onClick"
      v-if="typeof userInf == 'undefined'"
    />
    <router-link v-else :to="{ path: '/Home', query: { id: userInf.id } }">
      <img :src="userInf.icon" alt="" class="tx" />
    </router-link>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { loginUserApi, getUserApi, userAgainApi } from "/src/utils/api.js";
import { yzmApi, yzApi, createUserApi } from "/src/utils/api.js";
import store from "../pinia/store";
import { storeToRefs } from "pinia";
const mainStore = store();
let { id, nickName, icon } = storeToRefs(mainStore);
const flag = ref(false);
const route = useRouter();
const userInf = ref("");
const newPhone = ref("");
const code = ref("");
const searchValue = ref("");
const inputValue = ref("");
const option = [
  { label: "电影", value: "1" },
  { label: "用户", value: "2" },
  { label: "影评", value: "3" },
];
getUserApi().then((result) => {
  userInf.value = result.data.resultData;
});
const select = () => {
  if (searchValue.value.trim() == "") {
    alert("搜索内容不能为空");
    return;
  } else {
    route.push({
      path: "/Search",
      query: { type: inputValue.value, keyWord: searchValue.value },
    });
  }
};
</script>

<style scoped>
.nv {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  display: flex;
}
.logo {
  width: 150px;
  height: 45px;
  margin-right: 20px;
}
.select {
  width: 650px;
  height: 45px;
  margin: auto;
  display: flex;
}
.inp {
  width: 450px;
  margin-top: 10px;
  display: flex;
}

.search {
  width: 25px;
  height: 25px;
  margin-top: 15px;
  margin-left: 5px;
}
.search:hover {
  cursor: pointer;
}
.tx {
  width: 48px;
  height: 48px;
  float: right;
  border-radius: 30px;
  margin-right: 80px;
  margin-top: 6px;
}
.selectInp {
  width: 85px;
}
.title {
  margin: auto;
  width: 350px;
  padding-top: 0;
}
.inputYzm {
  display: flex;
  justify-content: space-between;
}
.yzm {
  width: 200px;
}
.bottom {
  width: 350px;
  margin: auto;
}
.login {
  margin-bottom: 20px;
}
.qh,
.login {
  width: 350px;
}
</style>