<script setup lang="ts">

</script>

<template>
  <div class="index">
    <img class="pic" src="@/assets/imgs/loginBg.webp" alt="">
    <router-view></router-view>
  </div>

</template>
<style scoped lang="scss">
.index {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #F7F9EB;
  font-size: 16px;

  img {
    height: 100%;
    border-radius: 0 20px 20px 0;
  }
}
</style>