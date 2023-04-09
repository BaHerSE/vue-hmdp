<template>
  <div class="top">
    <span>|</span>
    <span>账号与密码</span>
  </div>
  <ul>
    <!-- 手机号 -->
    <li>
      <span class="art"><span class="zw">占位</span>手机号：</span>
      <span>{{ phone }}</span
      >&nbsp;
      <t-button @click="visible = true">修改手机号</t-button>
      <t-dialog
        v-model:visible="visible"
        header="身份验证"
        body="对话框内容"
        :on-close="close"
        :footer="false"
        @confirm="onClickConfirm"
      >
        <div class="yzm">
          <span
            >为了保护你的账号安全，请验证身份，验证成功后可进行下一步操作</span
          >
          <br />
          <br />
          <t-input :value="phone" disabled />
          <br />
          <div class="inputYzmDiv">
            <t-input
              placeholder="输入验证码"
              class="inputYzm"
              v-model:value="yzmInputValue"
            />
            <t-button v-on:click="yzm(phone)" :disabled="flag"
              >获取验证码</t-button
            >
          </div>
          <br />
          <t-button class="yz" v-on:click="yz">验证</t-button>
        </div>
      </t-dialog>
      <t-dialog
        v-model:visible="visible2"
        header="手机号验证"
        body="对话框内容"
        :on-close="close2"
        :footer="false"
      >
        <div class="yzm">
          <span>为了保护你的账号安全，请验证手机号</span>
          <br />
          <br />
          <t-input v-model="newPhone" />
          <br />
          <div class="inputYzmDiv">
            <t-input
              placeholder="输入验证码"
              class="inputYzm"
              v-model:value="yzmInputValue"
            />
            <t-button v-on:click="yzm(newPhone)" :disabled="flag"
              >获取验证码</t-button
            >
          </div>
          <br />
          <t-button class="yz" v-on:click="changePhone">验证</t-button>
        </div>
      </t-dialog>
    </li>

    <li>
      <!-- <span class="art"><span class="zw">占位符</span>密码：</span>
      <span>******</span>
      &nbsp;
      <t-button @click="visible3 = true">修改密码</t-button> -->
      <t-dialog
        v-model:visible="visible3"
        header="修改密码"
        body="对话框内容"
        :on-close="close3"
        :footer="false"
      >
        <div class="yzm">
          <span>输入密码</span>
          <br />
          <br />
          <t-input type="password" placeholder="请输入密码" />
          <br />
          <t-input
            type="password"
            placeholder="请再次输入密码"
            v-model:value="yzmInputValue"
          />

          <br />
          <t-button class="yz">修改密码</t-button>
        </div>
      </t-dialog>
    </li>
  </ul>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { value } from "dom7";
import {
  getUserPhoneApi,
  yzmApi,
  yzApi,
  changePhoneApi,
} from "/src/utils/api.js";
const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const phone = ref();
const newPhone = ref("");
const yzmInputValue = ref("");
const flag = ref(false);
getUserPhoneApi().then((result) => {
  phone.value = result.data.message;
});
const onClickConfirm = (context) => {
  const { e } = context;
  visible.value = false;
  e.stopPropagation();
};
const close = () => {
  visible.value = false;
};
const close2 = () => {
  visible2.value = false;
};
const close3 = () => {
  visible3.value = false;
};
const yzm = (phone) => {
  yzmApi(phone);
  setTimeout(() => {
    flag.value = false;
  }, 60000);
  flag.value = true;
};
const yz = () => {
  if (yzmInputValue.value == "") {
    alert("验证码不能为空");
    return;
  }
  yzApi(phone.value, yzmInputValue.value).then((result) => {
    console.log(result);
    if (result.data.resultData == 0) {
      alert("验证码过期");
    } else if (result.data.resultData == 1) {
      alert("验证码错误");
    } else if (result.data.resultData == 3) {
      alert("手机号已被使用");
    } else {
      flag.value = false;
      yzmInputValue.value = "";
      visible.value = false;
      visible2.value = true;
    }
  });
};
const changePhone = () => {
  if (newPhone.value == phone.value) {
    alert("请输入新手机号");
    return;
  } else if (newPhone.value == "") {
    alert("请输入手机号");
    return;
  } else if (yzmInputValue.value == "") {
    alert("验证码不能为空");
    return;
  }
  changePhoneApi(newPhone.value, yzmInputValue.value).then((result) => {
    if (result.data.resultData == 0) {
      alert("验证码过期");
    } else if (result.data.resultData == 1) {
      alert("验证码错误");
    } else if (result.data.resultData == 3) {
      alert("手机号已被使用");
    } else {
      visible2.value = false;
    }
  });
  location.reload();
};
</script>

<style scoped>
.top {
  color: #20a0da;
  margin-top: 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
  padding-bottom: 20px;
  margin-bottom: 40px;
}
.top :first-child {
  margin-left: 25px;
  margin-right: 30px;
}
.top span {
  line-height: 20px;
}
.zw {
  visibility: hidden;
}
ul {
  width: 700px;
  margin: auto;
}
li {
  list-style: none;
}
.art {
  color: #8798af;
}
li {
  margin-bottom: 30px;
}
.yzm {
  width: 350px;
  margin: auto;
}
.yzm:first-child {
  margin-right: 20px;
}
.inputYzmDiv {
  display: flex;
  justify-content: space-between;
}
.inputYzm {
  width: 220px;
}
.yz {
  width: 350px;
}
</style>