<template>
  <input type="text" v-model="phone" placeholder="手机号" />
  <button @click="tj()">提交</button>
  <br />
  <input type="text" placeholder="验证码" v-model="code" />
  <button @click="login()">登录</button>
  <br />
  <button @click="test()">测试</button>
  <br />
  <input type="text" v-model="id" />
  <button @click="testSelectId()">测试</button>
  <br />

</template>

<script>
import { getCurrentInstance, ref } from "vue";

export default {
  name: "Login",
  setup() {
    const axios =
      getCurrentInstance().appContext.config.globalProperties.$axios;
    let phone = ref();
    let code = ref();
    let id = ref();
    function tj() {
      axios
        .post("/user/yzm?phone=" + phone.value)
        .then((result) => {})
        .catch((err) => {});
    }
    function login() {
      axios
        .post("/user/loginUser", {
          phone: phone.value,
          code: code.value,
        })
        .then((result) => {
          localStorage.setItem("token", result.data.message);
        })
        .catch((err) => {});
    }
    function test() {
      axios
        .post("/t1")
        .then((result) => {})
        .catch((err) => {});
    }
    function testSelectId() {
      axios.post("/Movie/MovieId?id=" + id.value).then((result) => {
        console.log(result.data);
      });
    }
    return {
      phone,
      code,
      id,
      tj,
      login,
      test,
      testSelectId,
    };
  },
};
</script>

<style scoped>
</style>