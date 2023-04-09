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
    </div>
  </t-dialog>
</template>
  
  <script setup>
import { reactive, ref } from "@vue/reactivity";
import { yzmApi, yzApi, loginAdminApi, createUserApi } from "/src/utils/api.js";
import { useRouter } from "vue-router";
const $router = useRouter();
const visible = ref(true);
const newPhone = ref("");
const yzmInputValue = ref("");
const flag = ref(false);
const password = ref("");
const passwordAgain = ref("");
const yzm = (phone) => {
  yzmApi(phone);
  setTimeout(() => {
    flag.value = false;
  }, 60000);
  flag.value = true;
};

const login = () => {
  if (yzmInputValue.value == "") {
    alert("验证码不能为空");
    return;
  }
  let userForm = reactive({
    phone: newPhone,
    code: yzmInputValue,
  });
  loginAdminApi(userForm).then((result) => {
    if (result.data.code == "404") {
      alert(result.data.message);
    } else if (result.data.code == "200") {
      localStorage.setItem("token", result.data.message);
      $router.push("/Admin/index");
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