<template>
  <div class="change">
    <span>电影名称:</span>&nbsp;&nbsp;<t-input
      class="inputStyle"
      v-model="changeMovie.name"
    />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导演：</span
    ><t-input class="inputStyle" v-model="changeMovie.director" />
    <br />
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演员：</span
    ><t-input class="inputStyle" v-model="changeMovie.actor" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介：</span
    ><textarea
      class="plq"
      id=""
      cols="60"
      rows="6"
      maxlength="150"
      v-model="changeMovie.introduction"
    ></textarea>
    <br />
  </div>
  <div class="change">
    <span class="dialog-span" style="width: 81px">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型：</span
    >
    <!-- select -->
    <div style="width: 335px">
      <t-select-input
        v-model:inputValue="inputValue"
        :value="value"
        :allow-input="allowInput"
        :placeholder="allowInput ? '请选择或输入' : '请选择'"
        :tag-input-props="{ excessTagsDisplayType }"
        :popup-props="{
          overlayInnerClassName: ['narrow-scrollbar'],
          overlayInnerStyle: {
            maxHeight: '280px',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            padding: '6px',
          },
        }"
        clearable
        multiple
        @tag-change="onTagChange"
      >
        <template #panel>
          <t-checkbox-group
            v-if="options.length"
            :value="checkboxValue"
            :options="options"
            class="tdesign-demo__panel-options-multiple"
            @change="onCheckedChange"
          />
          <div v-else class="tdesign-demo__select-empty-multiple">暂无数据</div>
        </template>
        <template #suffixIcon>
          <chevron-down-icon />
        </template>
      </t-select-input>
    </div>
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;拍摄地：</span
    ><t-input class="inputStyle" v-model="changeMovie.district" />
    <br />
  </div>
  <div class="change">
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</span
    ><t-date-picker v-model="changeMovie.screenDate" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时长：</span>
    <t-input-number :min="0" v-model="changeMovie.time" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;imdb：</span>
    <t-input class="inputStyle" v-model="changeMovie.imdb" />
    <br />
  </div>
  <div class="change">
    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海报：</span>
    <img :src="changeMovie.image" alt="" class="image" />
    &nbsp;&nbsp;&nbsp;
    <input type="file" id="file" />
    <br />
  </div>
  <br />
  <t-button v-on:click="sub()">提交</t-button>
</template>

<script setup>
import {
  getMovieIdApi,
  uploadMovieImageApi,
  UpdateMovieApi,
  getAllGenre,
} from "/src/utils/api.js";
import { computed, reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
const $route = useRoute();
const $router = useRouter();
let typeList = reactive(await getAllGenre()).data.resultData;
let movie = ref();
movie = (await getMovieIdApi($route.query.id)).data.resultData;
let OPTIONS = [
  // 全选
  { label: "Check All", checkAll: true },
];
for (let index = 0; index < typeList.length; index++) {
  OPTIONS.push({ label: typeList[index].type, value: typeList[index].id });
}
const excessTagsDisplayType = ref("scroll");
const allowInput = ref(false);
const creatable = ref(false);
const inputValue = ref("");
// 全量数据
const options = ref([...OPTIONS]);
const value = ref([]);
const checkboxValue = computed(() => {
  const arr = [];
  const list = value.value;
  // 此处不使用 forEach，减少函数迭代
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].value && arr.push(list[i].value);
  }
  return arr;
});
// 直接 checkboxgroup 组件渲染输出下拉选项
const onCheckedChange = (val, { current, type }) => {
  console.log(current);
  // current 不存在，则表示操作全选
  if (!current) {
    value.value = type === "check" ? options.value.slice(1) : [];
    return;
  }
  // 普通操作
  if (type === "check") {
    const option = options.value.find((t) => t.value === current);
    value.value.push(option);
  } else {
    value.value = value.value.filter((v) => v.value !== current);
  }
};
// 可以根据触发来源，自由定制标签变化时的筛选器行为
const onTagChange = (currentTags, context) => {
  const { trigger, index, item } = context;
  if (trigger === "clear") {
    value.value = [];
  }
  if (["tag-remove", "backspace"].includes(trigger)) {
    value.value.splice(index, 1);
  }
  // 如果允许创建新条目
  if (creatable.value && trigger === "enter") {
    const current = { label: item, value: item };
    value.value.push(current);
    const newOptions = options.value.concat(current);
    options.value = newOptions;
    inputValue.value = "";
  }
};
let changeMovie = reactive({
  id: movie.id,
  name: movie.name,
  actor: movie.actor,
  director: movie.director,
  introduction: movie.introduction,
  district: movie.district,
  imdb: movie.imdb,
  screenDate: movie.screenDate,
  time: movie.time,
  type: value,
  image: movie.image,
});
let Imageurl = ref();
const sub = () => {
  let file = document.getElementById("file").files[0];
  console.log(document.getElementById("file").files.length);
  let form = new FormData();
  form.append("file", file);
  if (document.getElementById("file").files.length == 0) {
    UpdateMovieApi(changeMovie.id, changeMovie);
    window.location.reload();
  } else if (document.getElementById("file").files.length == 1) {
    uploadMovieImageApi(form).then((result) => {
      Imageurl.value = result.data.message;
      changeMovie.image = Imageurl.value;
      UpdateMovieApi(changeMovie.id, changeMovie);
      window.location.reload();
    });
  }
};
</script>

<style scoped>
.change {
  width: 600px;
  margin-top: 30px;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.inputStyle {
  width: 300px;
}
.plq {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(221, 221, 221);
}
.image {
  width: 150px;
}
</style>