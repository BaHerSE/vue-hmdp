<template>
  <navigation-bar></navigation-bar>
  <div class="workspace">
    <br />

    <div class="work-left">
      <h1>添加海报/预告/壁纸</h1>
      <span class="ms">
        你可以上传JPG, JPEG, GIF, PNG或BMP文件，每个文件大小可以达到15M。
      </span>
      <br />
      <span class="ms">
        为了保证图片质量，请提供图片短边尺寸不小于400像素的海报/剧照/壁纸。
      </span>
      <h1></h1>
      <t-upload
        :headers="head"
        v-model="files"
        action="http://localhost:8090/Movie/uploadTest"
        placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
        theme="file-flow"
        multiple
        :disabled="disabled"
        :auto-upload="autoUpload"
        :max="10"
        :allow-upload-duplicate-file="allowUploadDuplicateFile"
        :is-batch-upload="isBatchUpload"
        :upload-all-files-in-one-request="uploadAllFilesInOneRequest"
      ></t-upload>
    </div>
    <div class="work-right">
      <br />

      <span class="gf">收录规范</span>
      <br />
      <br />
      <ul>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电影图片是指和影片正片内容相关的海报 /
          剧照 / 壁纸等图片，影人写真 / 生活照请传到对应的影人条目相册里。
        </li>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          普通海报、剧照、壁纸请直接添加到分类下，其他海报、工作照、新闻图片、粉丝图片请参考如下说明：
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span> 海报 - 其他海报 </span>
          （包括DVD封套、蓝光封套、原声碟封套、录像带封套、二维码海报、非官方设计海报、粉丝自制海报等）
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span> 剧照 - 工作照 </span>
          （包括片场照、场景照、道具图/模型、概念图、设计稿、配音现场、定妆照、穿戏服的宣传照、角色图、官方人物关系谱/分析解构图、有文字注释或修饰的官网图片等）
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span></span>
          剧照 -
          新闻图片（包括首映现场、新闻发布会、颁奖典礼现场、非戏服的宣传写真照、期刊封面或内页特辑等）
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 剧照 -
          粉丝图片（包括粉丝自制的角色图、漫画图、非恶意恶搞图、人物关系谱/分析解构图等民间作品，以及粉丝上传的道具图等）
          <br />
        </li>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 请勿上传不符合豆瓣社区指导原则的图片。
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavigationBar from "./NavigationBar.vue";
import { useRouter, useRoute } from "vue-router";
const $route = useRoute();
const files = ref([]);
const head = ref({
  authorization: localStorage.getItem("token"),
  id: $route.query.Mid,
});
const disabled = ref(false);
const autoUpload = ref(false);
const allowUploadDuplicateFile = ref(false);
const isBatchUpload = ref(false);
const uploadAllFilesInOneRequest = ref(false);
</script>

<style scoped>
.workspace {
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.ms {
  font: 12px Arial, Helvetica, sans-serif;
  line-height: 150%;
  color: #666666;
}
.work-left {
  width: 600px;
}
.work-right {
  width: 300px;
}
.gf {
  color: green;
}
ul {
  list-style-type: decimal;
}
li {
  font-size: 14px;
}
</style>