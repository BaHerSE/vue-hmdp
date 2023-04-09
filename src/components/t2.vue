<template>
  <h1 class="h1">123</h1>
  <span v-for="movie in m" :key="movie.id">{{ movie.name }}</span>
  <button v-on:click="t1()">test</button>
</template>

<script setup>
import { getDirectorMovie5Api, getTop10Api } from "/src/utils/api.js";
import { reactive, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { get } from "lodash";
let m = reactive([]);
(await getDirectorMovie5Api()).data.resultData.forEach((element) => {
  m.push(element);
});
// m = (await getDirectorMovie5Api()).data.resultData;
const t1 = async () => {
  (await getTop10Api()).data.resultData.forEach((e) => {
    m.push(e);
  });
};
</script>

<style scoped>
.h1 {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>