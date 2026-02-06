<template>
  <div class="admin">
    <el-container>
      <el-header>
        <!-- logo -->
        <div class="header-logo">
          <span>慧暖夕阳</span>
        </div>
        <el-button style="padding: 24px; font-size: 16px;" type="danger" size="large"
          @click="$router.push('/monitor')">进入监控界面</el-button>
        <!-- 用户 -->
        <div class="header-user">
          <img src="@/assets/imgs/user.webp" alt="用户头像" width="48px">
          <span>{{ '王磊' }}</span>
        </div>
      </el-header>
      <el-container>
        <el-menu>
          <div class="menu">
            <router-link to="/admin/bodyData" class="menu-item" activeClass="active">
              <span>体征数据</span>
            </router-link>
            <router-link to="/admin/volunteer" class="menu-item" activeClass="active">
              <span>志愿审核</span>
            </router-link>
            <router-link to="/admin/activity" class="menu-item" activeClass="active">
              <span>活动发布</span>
            </router-link>
          </div>
        </el-menu>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.admin {
  height: 100vh;
  background: linear-gradient(135deg, #f9fbf9 0%, #ffffff 100%);

  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      background: white;
      box-shadow: 0 2px 12px rgba(68, 128, 63, 0.1);
      z-index: 100;

      .header-logo {
        display: flex;
        align-items: center;

        span {
          font-size: 24px;
          font-weight: 600;
          color: #44803f;
          letter-spacing: 2px;
          text-shadow: 0 1px 2px rgba(68, 128, 63, 0.2);
        }
      }

      .header-user {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 20px;
        border-radius: 25px;
        background: rgba(249, 251, 249, 0.9);
        box-shadow: 0 2px 8px rgba(68, 128, 63, 0.1);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(68, 128, 63, 0.15);
        }

        img {
          border-radius: 50%;
          border: 2px solid #f0f0f0;
        }

        span {
          font-size: 16px;
          font-weight: 500;
          color: #3a6636;
        }
      }
    }

    .el-menu {
      width: 230px;
      height: 100%;
      flex-shrink: 0;
      border-right: 1px solid rgba(68, 128, 63, 0.1);
      padding: 30px 0;
      background: white;
      box-shadow: 2px 0 12px rgba(68, 128, 63, 0.1);
      z-index: 50;

      .menu {
        width: 180px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
        overflow: auto;

        .menu-item {
          display: flex;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 18px 24px;
          color: #555;
          transition: all 0.3s ease;
          border-radius: 12px;
          margin-bottom: 8px;

          &:hover {
            background: rgba(68, 128, 63, 0.05);
            color: #44803f;
          }

          i {
            font-size: 20px;
            width: 24px;
            text-align: center;
          }

          span {
            flex: 1;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }

    .el-main {
      height: calc(100vh - 80px);
      background: linear-gradient(135deg, #f9fbf9 0%, #ffffff 100%);

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(68, 128, 63, 0.05);
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(68, 128, 63, 0.3);
        border-radius: 4px;

        &:hover {
          background: rgba(68, 128, 63, 0.4);
        }
      }
    }
  }
}

.active {
  background: linear-gradient(135deg, #44803f 0%, #5a9a55 100%) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(68, 128, 63, 0.3);

  i {
    color: white !important;
  }
}

// 移除默认链接样式
a {
  text-decoration: none;
  color: inherit;
}
</style>