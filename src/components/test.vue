<template>
  <input type="file" id="file" />
  <button v-on:click="handleFile">提交</button>

  <div>
    <t-radio-group
      v-model="excessTagsDisplayType"
      :options="[
        { label: '选中项过多横向滚动', value: 'scroll' },
        { label: '选中项过多换行显示', value: 'break-line' },
      ]"
    />
  </div>
  <div style="width: 330px">
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
      @input-change="onInputChange"
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
</template>

<script setup>
import { result } from "lodash";
import { computed, ref } from "vue";
import { upImgTest } from "/src/utils/api.js";
import { ChevronDownIcon } from "tdesign-icons-vue-next";
const selFiles = ref([]);
const handleFile = () => {
  let file = document.getElementById("file").files[0];
  let form = new FormData();
  form.append("img", file);
  upImgTest(form).then(() => {});
};
//select

const OPTIONS = [
  // 全选
  { label: "Check All", checkAll: true },
  { label: "剧情", value: 1 },
  { label: "喜剧", value: 2 },
  { label: "动作", value: 3 },
  { label: "爱情", value: 4 },
  { label: "科幻", value: 5 },
  { label: "动画", value: 6 },
  { label: "悬疑", value: 7 },
  { label: "惊悚", value: 8 },
  { label: "记录片", value: 9 },
  { label: "战争", value: 10 },
  { label: "灾难", value: 11 },
  { label: "武侠", value: 12 },
  { label: "运动", value: 13 },
  { label: "历史", value: 14 },
  { label: "恐怖", value: 15 },
];

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
  console.log(currentTags, context);
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
const onInputChange = (val, context) => {
  console.log(val, context);
};
</script>

<style scoped>
</style>
