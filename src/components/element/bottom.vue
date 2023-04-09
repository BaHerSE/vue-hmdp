<template>
  <div class="footer">
    <div class="bt">
      <ul class="one">
        <li><img src="/src/img/logo.png" alt="" class="logo" /></li>
        <li><span>联系我们</span>&nbsp;&nbsp;&nbsp;<span>站务服务</span></li>
        <li><span>社区规范</span>&nbsp;&nbsp;&nbsp;<span>隐私政策</span></li>
      </ul>
      <ul class="two">
        <li><a>Video</a></li>
        <li>
          <span>联系我们</span
          >&nbsp;<span>用户协议</span>&nbsp;<span>加入我们</span>&nbsp;<span
            >Video认证</span
          >
        </li>
        <li>
          <span>友情链接</span>&nbsp;<span>影视协议</span>&nbsp;<span
            >协议汇总</span
          >
        </li>
      </ul>
      <ul class="three">
        <img src="/src/img/bottom.PNG" alt="" />
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer {
  border-top: 1px solid rgb(210, 210, 210);
  background-color: white;
  /* margin-top: 30px; */
}
.bt {
  display: flex;
  height: 160px;
  justify-content: space-around;
  align-items: center;
}
li {
  list-style: none;
}
ul {
  margin-top: 0;
  padding-left: 0;
  margin-bottom: 0;
}
.one {
  width: 200px;
  text-align: center;
  color: #18191c;
  font-size: 15px;
}
.one li {
  margin-top: 10px;
}
.logo {
  width: 200px;
  height: 60px;
}
.two span {
  font-size: 15px;
  color: #18191c;
}
.two a {
  font-size: 16px;
  color: #9499a0;
  line-height: 25px;
}
.three {
  width: 344px;
}
.three img {
  width: 343px;
  height: 105px;
}
</style>