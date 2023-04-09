<template>
  <div class="top">
    <span>|</span>
    <span>注销账户</span>
  </div>
  <div class="text">
    <h3>特别提醒</h3>
    <p>
      账号一经注销成功将不可恢复，
      <span class="ts">
        您将无法再使用本账号或找回任何本账号相关内容及虚拟资产（即使您使用相同手机号或者邮件重新注册），包括但不限于：</span
      >
    </p>
    <p>
      <span class="ts">
        1、账号下的个人资料（头像、用户名、身份认证信息等）、与账号有关的信息和数据（关注、评论、点赞、收藏、私信、交易记录、发布的内容、草稿箱内容等）都将无法找回。
      </span>
      请您务必注销之前自行备份与账号相关的所有内容及信息。
    </p>
    <p>
      2、账号绑定的
      礼品卡、优惠券、M豆、卡片大富翁金币及卡片及其他财产性权益，在您注销账号后将无法继续使用，即使您使用相同的手机号或邮箱再次注册时光网账户，也无法协助您重新恢复前述权益，
      <span class="moneyText"
        >如账号有余额及未完成的订单
        请先联系客服处理，否则无法进行注销操作。</span
      >
    </p>
    <p>
      <span class="ts">
        3、您在平台发布的所有内容，在注销账号后，内容发布者将转为注销用户发布并继续保留在平台，平台仍对其拥有管理及使用权。
      </span>
      如您需删除内容，请务必在申请账号注销前自行删除。
    </p>
    <p>
      4、如账号存在权属或其他争议问题，时光网有权禁用该账号，禁用期间时光网有权拒绝账号注销操作。
    </p>
    <p>
      5、如您的账号被他人举报、投诉、被国家机关调查或正处于诉讼、仲裁程序中，时光网有权自行终止您的账号注销流程并绝账号注销操作。
    </p>
  </div>
  <br />
  <div class="radio">
    <t-radio allow-uncheck v-model="checked"> </t-radio>我已同意并阅读
    <span class="tbtx">《特别提醒》</span>
    <br />
    <t-button v-on:click="next()">下一步</t-button>
  </div>
  <t-dialog
    v-model:visible="visible"
    header="身份验证"
    body="对话框内容"
    :on-close="close"
    :footer="false"
    @confirm="onClickConfirm"
  >
    <div class="yzm">
      <span>为了保护你的账号安全，请验证身份，验证成功后可进行下一步操作</span>
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
        <t-button v-on:click="yzm(phone)" :disabled="flag">获取验证码</t-button>
      </div>
      <br />
      <t-button class="yz" v-on:click="yz">注销</t-button>
    </div>
  </t-dialog>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import {
  getUserPhoneApi,
  yzmApi,
  yzApi,
  changePhoneApi,
  logOutApi,
} from "/src/utils/api.js";
const $router = useRouter();
const checked = ref(true);
const visible = ref(false);
const flag = ref(false);
const yzmInputValue = ref("");
const phone = ref();
getUserPhoneApi().then((result) => {
  phone.value = result.data.message;
});
const onClickConfirm = (context) => {
  const { e } = context;
  visible.value = false;
  e.stopPropagation();
};
const next = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
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
    } else {
      logOutApi();
    }
  });
  $router.push("/login");
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
.text {
  width: 850px;
  margin: auto;
  font-size: 14px;
}
.ts {
  color: rgb(135, 152, 175);
}
.moneyText {
  color: red;
  text-decoration: underline;
  font-weight: bold;
}
.tbtx {
  color: rgb(32, 160, 218);
}
.radio {
  width: 250px;
  margin: auto;
}
.radio button {
  margin-left: 75px;
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