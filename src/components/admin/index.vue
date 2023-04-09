<template>
  <div class="work">
    <div class="work-left">
      <t-menu>
        <t-submenu value="1" title="用户信息">
          <template #icon>
            <t-icon name="user-circle" />
          </template>
          <t-menu-item value="1-1">
            <span>
              <router-link :to="{ path: '/Admin/index/adminUser' }">
                用户
              </router-link>
            </span>
          </t-menu-item>
          <t-menu-item value="2-2">
            <span>
              <router-link :to="{ path: '/Admin/index/adminAdmin' }">
                管理员
              </router-link>
            </span>
          </t-menu-item>
        </t-submenu>
        <t-submenu value="2" title="电影信息">
          <template #icon>
            <t-icon name="play-circle" />
          </template>
          <t-menu-item value="2-1">
            <span>
              <router-link :to="{ path: '/Admin/index/adminMovie' }">
                电影
              </router-link>
            </span>
          </t-menu-item>
        </t-submenu>
        <t-submenu value="3" title="评论信息">
          <template #icon>
            <t-icon name="file" />
          </template>
          <t-menu-item value="3-1">
            <span>
              <router-link :to="{ path: '/Admin/index/adminCinecism' }">
                影评
              </router-link>
            </span>
          </t-menu-item>
          <t-menu-item value="3-2">
            <span>
              <router-link :to="{ path: '/Admin/index/adminDiscuss' }">
                评论
              </router-link>
            </span>
          </t-menu-item>
        </t-submenu>
      </t-menu>
    </div>
    <div class="work-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.work {
  display: flex;
}
.work-left {
  height: 100%;
}
.work-right {
  margin-left: 50px;
  margin-right: 50px;
  width: 100%;
  height: 800px;
}
</style>