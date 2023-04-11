<template>
  <t-dialog
    v-model:visible="visible"
    header="手机号登录"
    :footer="false"
    :showOverlay="false"
    :closeBtn="false"
  >
    <div class="title">
      <t-input placeholder="手机号" v-model="newPhone" />
      <br />
      <div class="inputYzm">
        <div class="yzm">
          <t-input placeholder="验证码" v-model="yzmInputValue" />
        </div>
        <t-button :disabled="flag" v-on:click="yzm(newPhone)"
          >发送验证码</t-button
        >
      </div>
      <br />
    </div>
    <div class="bottom">
      <t-button class="login" v-on:click="login">登录</t-button>
      <br />
      <t-button class="qh" variant="outline" v-on:click="change">
        注册</t-button
      >
    </div>
  </t-dialog>

  <t-dialog
    v-model:visible="visible2"
    header="注册"
    :footer="false"
    :showOverlay="false"
    :closeBtn="false"
  >
    <div class="title">
      <t-input placeholder="手机号" v-model="newPhone" />
      <br />
      <div class="inputYzm">
        <div class="yzm">
          <t-input placeholder="验证码" v-model="yzmInputValue" />
        </div>
        <t-button :disabled="flag" v-on:click="yzm(newPhone)"
          >发送验证码</t-button
        >
      </div>
      <br />
      <t-input placeholder="输入密码" v-model="password" type="password" />
      <br />
      <t-input
        placeholder="再次输入密码"
        v-model="passwordAgain"
        type="password"
      />
    </div>
    <br />
    <div class="bottom">
      <t-button class="login" v-on:click="regist">注册</t-button>
    </div>
  </t-dialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import {
  yzmApi,
  yzApi,
  loginUserApi,
  createUserApi,
  getUserApi,
} from "/src/utils/api.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const $router = useRouter();
const visible = ref(true);
const visible2 = ref(false);
const newPhone = ref("");
const yzmInputValue = ref("");
const flag = ref(false);
const password = ref("");
const passwordAgain = ref("");
const userInf = ref("");
const change = () => {
  visible.value = false;
  visible2.value = true;
};
const yzm = (phone) => {
  yzmApi(phone);
  setTimeout(() => {
    flag.value = false;
  }, 60000);
  flag.value = true;
};
//登录
const login = () => {
  if (yzmInputValue.value == "") {
    alert("验证码不能为空");
    return;
  }
  let userForm = reactive({
    phone: newPhone,
    code: yzmInputValue,
  });
  loginUserApi(userForm).then((result) => {
    if (result.data.code == "404") {
      alert(result.data.message);
    } else if (result.data.code == "200") {
      localStorage.setItem("token", result.data.message);
      $router.push("/");
    }
  });
};

//注册
const regist = () => {
  if (yzmInputValue.value == "") {
    alert("验证码不能为空");
    return;
  }
  if (password == undefined || passwordAgain == undefined) {
    alert("密码不能为空");
    return;
  }
  if (password.value != passwordAgain.value) {
    alert("输入密码不一致");
    return;
  }
  let userForm = reactive({
    phone: newPhone,
    code: yzmInputValue,
  });
  let user = {
    phone: newPhone.value,
    password: passwordAgain.value,
  };
  yzApi(newPhone.value, yzmInputValue.value).then((result) => {
    if (result.data.code == "404") {
      alert(result.data.message);
    } else if (result.data.code == "200") {
      createUserApi(user);
      window.location.reload();
    }
  });
};
</script>

<style scoped>
/* .work {
  width: 450px;
  height: 350px;
  margin: auto;
  margin-top: 200px;
  background-color: black;
} */
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