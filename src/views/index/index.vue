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
  background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%); // 增加一个柔和的渐变底色
  background-color: #F7F9EB;

  .pic {
    flex: 1.2; // 占据稍大空间
    height: 100%;
    object-fit: cover;
    border-radius: 0 40px 40px 0; // 更圆润的切角
    box-shadow: 20px 0 40px rgba(0, 0, 0, 0.05);
  }

  .router-view-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>