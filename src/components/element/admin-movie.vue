<template>
  <hr />
  <t-button v-on:click="addMovie()">添加电影</t-button>
  <table>
    <tr class="tr1">
      <th>名称</th>
      <th>海报</th>
      <th>导演</th>
      <th>简介</th>
      <th>类型</th>
      <th>拍摄地</th>
      <th>上映时间</th>
      <th>时长</th>
      <th>imdb</th>
      <th>操作</th>
    </tr>
    <tr v-for="movie in movieList.list" :key="movie.id">
      <td>
        <router-link :to="{ path: '/list', query: { Mid: movie.id } }">
          {{ movie.name }}</router-link
        >
      </td>
      <td><img :src="movie.image" alt="" class="hb" /></td>
      <td>{{ movie.director }}</td>
      <td>{{ movie.introduction }}</td>
      <td>{{ movie.type }}</td>
      <td>{{ movie.district }}</td>
      <td>{{ movie.screenDate.slice(0, 10) }}</td>
      <td>{{ movie.time }}分钟</td>
      <td>{{ movie.imdb }}</td>
      <td>
        <t-button class="tb" v-on:click="changeInf(movie.id)">修改</t-button>
        <hr />
        <t-button theme="danger" class="tb" v-on:click="deleteMovie(movie.id)"
          >删除
        </t-button>
      </td>
    </tr>
  </table>
  <div>
    <ul class="page">
      <li>
        <a :href="urlPrefix">«</a>
      </li>
      <li v-for="page in movieList.pages" :key="page">
        <a :href="`/Admin/index/adminMovie?page=` + page + `&size=5`">
          {{ page }}
        </a>
      </li>
      <li><a :href="urlSuffix">»</a></li>
      <li>
        <span>共</span><span>{{ movieList.pages }}</span
        ><span>页</span>
      </li>
    </ul>
  </div>
  <!-- 添加 -->
  <t-dialog
    v-model:visible="visible1"
    header="添加电影"
    :on-confirm="submitMovie"
  >
    <div class="dialogChange">
      <span class="dialog-span">电影名称：</span>
      <t-input v-model="oneMovie.name" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导演：</span
      >
      <t-input v-model="oneMovie.director" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演员：</span
      >
      <t-input v-model="oneMovie.actor" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span" style="width: 90px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介：</span
      >
      <textarea
        class="plq"
        id=""
        cols="50"
        rows="5"
        maxlength="150"
        v-model="oneMovie.introduction"
      ></textarea>
    </div>
    <hr />
    <div class="dialogChange">
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
            <div v-else class="tdesign-demo__select-empty-multiple">
              暂无数据
            </div>
          </template>
          <template #suffixIcon>
            <chevron-down-icon />
          </template>
        </t-select-input>
      </div>
      <!-- select -->
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span"> &nbsp;&nbsp;&nbsp;&nbsp;拍摄地：</span>
      <t-input v-model="oneMovie.district" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span" style="width: 80px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</span
      >
      <t-date-picker v-model="oneMovie.screenDate" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span" style="width: 80px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时长：</span
      >
      <t-input-number :min="0" v-model="oneMovie.time" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span" style="width: 98px">
        &nbsp;&nbsp;&nbsp;&nbsp;imdb：</span
      >
      <t-input v-model="oneMovie.imdb" />
    </div>
    <hr />
    <div class="dialogChange">
      <span class="dialog-span" style="width: 98px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海报：</span
      >
      <input type="file" id="file" />
    </div>
  </t-dialog>
  <!-- 修改 -->
  <t-dialog v-model:visible="visible2">
    <input type="text" />
  </t-dialog>
</template>

<script setup>
import {
  getAllMovieApi,
  getAllMovieMoreApi,
  addMovieApi,
  uploadMovieImageApi,
  deleteMovieByIdApi,
  getMovieIdApi,
} from "/src/utils/api.js";
import { computed, reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { ChevronDownIcon } from "tdesign-icons-vue-next";
const selFiles = ref([]);
const visible1 = ref(false);
const visible2 = ref(false);
const $route = useRoute();
const $router = useRouter();
let movieList = ref();
if ($route.query.page) {
  movieList = (await getAllMovieMoreApi($route.query.page)).data.resultData;
} else {
  movieList = (await getAllMovieApi()).data.resultData;
}
let urlPrefix = ref(`/Admin/index/adminMovie?page=1` + `&size=6`);
let urlSuffix = ref(
  `/Admin/index/adminMovie?page=` + movieList.pages + `&size=6`
);
const changeInf = (id) => {
  $router.push({ path: "/Admin/index/adminMovieChange", query: { id: id } });
};
const addMovie = () => {
  visible1.value = true;
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

let oneMovie = reactive({
  name: "",
  actor: "",
  director: "",
  introduction: "",
  district: "",
  imdb: "",
  screenDate: "",
  type: value,
  time: 0,
  image: "",
});
let Imageurl = ref();
const submitMovie = () => {
  let file = document.getElementById("file").files[0];
  let form = new FormData();
  form.append("file", file);
  uploadMovieImageApi(form).then((result) => {
    Imageurl.value = result.data.message;
    oneMovie.image = Imageurl.value;
    addMovieApi(oneMovie);
    window.location.reload();
  });
};
const deleteMovie = (id) => {
  deleteMovieByIdApi(id).then((result) => {
    if (result.data.code == "404") {
      alert("电影相关信息存在无法删除");
    } else {
      window.location.reload();
    }
  });
};
</script>

<style scoped>
hr {
  border: 0px;
}
table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  background-color: white;
  text-align: center;
}

table,
th,
td {
  border: 1px solid #dbdbdb;
}
th {
  height: 30px;
}
th:nth-child(1) {
  width: 150px;
}
th:nth-child(2) {
  width: 150px;
}
th:nth-child(3) {
  width: 150px;
}
th:nth-child(4) {
  width: 550px;
}
th:nth-child(6) {
  width: 100px;
}
th:nth-child(7) {
  width: 100px;
}
th:nth-child(8) {
  width: 60px;
}
th:nth-child(9) {
  width: 100px;
}
.hb {
  margin-left: 10px;
  width: 70px;
  height: 100px;
}
td {
  font-size: 13px;
}
.page li {
  list-style: none;
  padding-left: 3px;
  padding-right: 3px;
}
.page {
  display: flex;
  justify-content: center;
}
a {
  color: black;
  text-decoration: none;
}
.tb {
  margin-left: 10px;
  margin-right: 10px;
}

.dialogChange {
  padding-top: -15px;
  display: flex;
  align-items: center;
}
.dialog-span {
  width: 100px;
}
.plq {
  resize: none;
  border: 1px rgb(221, 221, 221) solid;
  outline-color: rgb(221, 221, 221);
}
</style>