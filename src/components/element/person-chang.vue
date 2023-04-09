<template>
  <div class="top">
    <span>|</span>
    <span>个人资料</span>
  </div>
  <ul>
    <li class="txUp">
      <span><span class="zw">占位</span>头像：</span>
      <div>
        <img :src="user.data.resultData.icon" alt="" class="tx" />
        <div class="shangchuan">
          <input type="file" id="file" />
          <t-button theme="default" variant="outline" v-on:click="handleFile"
            >上传</t-button
          >
        </div>
      </div>
    </li>
    <li>
      <span><span class="zw">占位</span>昵称：</span>
      <input
        type="text"
        v-model="user.data.resultData.nickName"
        rows="2"
        maxlength="20"
      />
    </li>
    <li>
      <span> 个性签名：</span>
      <input
        type="text"
        v-model="user.data.resultData.signature"
        maxlength="30"
        class="signature"
      />
    </li>
    <li>
      <span><span class="zw">占位</span>性别：</span>
      <t-radio-group
        @change="onChange"
        default-value="1"
        v-if="user.data.resultData.gender == 1"
      >
        <t-radio value="0">男</t-radio>
        <t-radio value="1">女</t-radio>
      </t-radio-group>
      <t-radio-group @change="onChange" default-value="0" v-else>
        <t-radio value="0">男</t-radio>
        <t-radio value="1">女</t-radio>
      </t-radio-group>
    </li>
  </ul>
  <div class="save">
    <t-button v-on:click="submit">保存</t-button>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { getChangeInfApi, updateUser, upImgTest } from "/src/utils/api.js";
import { useRouter, useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const user = reactive(await getChangeInfApi());
const genderValue = ref(10);
const onChange = (checkedValues) => {
  genderValue.value = checkedValues;
};
const submit = () => {
  if (genderValue.value != 10) {
    const form = reactive({
      nickName: user.data.resultData.nickName,
      signature: user.data.resultData.signature,
      gender: genderValue.value,
    });
    updateUser(form).then(() => {});
  } else {
    const form = reactive({
      nickName: user.data.resultData.nickName,
      signature: user.data.resultData.signature,
      gender: user.data.resultData.gender,
    });
    updateUser(form).then(() => {});
  }
  location.reload();
};
const handleFile = () => {
  let file = document.getElementById("file").files[0];
  let form = new FormData();
  form.append("img", file);
  upImgTest(form).then(() => {});
  location.reload();
};
</script>

<style scoped>
.top {
  color: #20a0da;
  margin-top: 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
  padding-bottom: 20px;
}
.top :first-child {
  margin-left: 25px;
  margin-right: 30px;
}
.top span {
  line-height: 20px;
}
li {
  list-style: none;
  margin-bottom: 25px;
}
li :first-child {
  color: #8798af;
}
.tx {
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
input {
  height: 25px;
}
.signature {
  width: 250px;
}
.zw {
  visibility: hidden;
}
.shangchuan {
  height: 35px;
}
.txUp {
  display: flex;
}
.txUp img {
  margin-right: 20px;
}
.txUp div {
  display: flex;
  align-items: center;
}
.save {
  width: 62px;
  margin: auto;
  margin-top: 40px;
}
</style>