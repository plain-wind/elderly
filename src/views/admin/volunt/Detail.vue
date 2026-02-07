<script setup lang="ts">
import { ArrowLeft, Check, Close, Star, Phone, Location, Calendar, Clock, Medal } from '@element-plus/icons-vue';
import { VoluntStatus as Status } from '@/types';
import StarRating from '@/components/StarRating.vue';

const route = useRoute();
const router = useRouter();
const { imgSrc, activeName, name, position, status }: Record<string, any> = route.query;

// 模拟额外数据
const voluntDetails = {
  contact: '138' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
  skills: ['打扫卫生', '陪伴聊天', '购物', '维修家电', '做饭'],
  experience: Math.floor(Math.random() * 5) + 1,
  rating: (Math.random() * 2 + 3).toFixed(1),
  totalHours: Math.floor(Math.random() * 200) + 50,
  completedTasks: Math.floor(Math.random() * 50) + 10,
  joinDate: '2025-' + (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0') + '-' + (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'),
  description: '热心公益事业，积极参与社区志愿服务，有丰富的老年人照护经验，性格开朗，善于沟通。'
};

// 获取状态显示文本
const getStatusText = (status: any) => {
  const statusStr = String(status || '');
  switch (statusStr) {
    case Status.Examine:
      return '待审核';
    case Status.Pass:
      return '审核通过';
    case Status.Reject:
      return '审核拒绝';
    default:
      return '未知状态';
  }
};

// 获取状态样式类
const getStatusClass = (status: any) => {
  const statusStr = String(status || '');
  switch (statusStr) {
    case Status.Examine:
      return 'status-pending';
    case Status.Pass:
      return 'status-approved';
    case Status.Reject:
      return 'status-rejected';
    default:
      return '';
  }
};

// 返回列表页
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="volunteer-detail">
    <!-- 头部导航 -->
    <div class="detail-header">
      <el-button @click="goBack()" size="large" plain>
        <el-icon>
          <ArrowLeft />
        </el-icon>
        返回列表
      </el-button>
      <h1 class="page-title">志愿详情</h1>
    </div>

    <!-- 主要内容 -->
    <div class="detail-content">
      <!-- 基本信息卡片 -->
      <div class="info-card">
        <div class="info-header">
          <div class="avatar-section">
            <img :src="imgSrc" :alt="name" class="volunteer-avatar">
            <div class="status-badge" :class="getStatusClass(status)">
              {{ getStatusText(status) }}
            </div>
          </div>
          <div class="basic-info">
            <h2 class="volunteer-name">{{ name }}</h2>
            <p class="volunteer-activity">{{ activeName }} 志愿者</p>
            <div class="info-grid">
              <div class="info-item">
                <el-icon>
                  <Location />
                </el-icon>
                <span>{{ position }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Phone />
                </el-icon>
                <span>{{ voluntDetails.contact }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 评分和统计 -->
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-value">{{ voluntDetails.rating }}</div>
            <div class="stat-label">服务评分</div>
            <StarRating :rating="Math.round(Number(voluntDetails.rating))" />
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ voluntDetails.experience }}年</div>
            <div class="stat-label">服务经验</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ voluntDetails.totalHours }}h</div>
            <div class="stat-label">服务时长</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ voluntDetails.completedTasks }}次</div>
            <div class="stat-label">完成任务</div>
          </div>
        </div>
      </div>

      <!-- 详细信息卡片 -->
      <div class="detail-cards">
        <!-- 技能特长 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Medal />
            </el-icon>
            <h3>技能特长</h3>
          </div>
          <div class="card-content">
            <div class="skills-list">
              <el-tag v-for="skill in voluntDetails.skills" :key="skill" size="large" effect="plain" class="skill-tag">
                {{ skill }}
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 个人简介 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Star />
            </el-icon>
            <h3>个人简介</h3>
          </div>
          <div class="card-content">
            <p class="description">{{ voluntDetails.description }}</p>
          </div>
        </div>

        <!-- 服务记录 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Calendar />
            </el-icon>
            <h3>服务记录</h3>
          </div>
          <div class="card-content">
            <div class="service-records">
              <div class="record-item">
                <div class="record-date">2025-12-15</div>
                <div class="record-content">
                  <h4>社区老年人陪伴服务</h4>
                  <p>为独居老人提供陪伴聊天、打扫卫生等服务，获得老人及家属好评。</p>
                  <div class="record-meta">
                    <span class="record-duration">4小时</span>
                    <span class="record-status completed">已完成</span>
                  </div>
                </div>
              </div>
              <div class="record-item">
                <div class="record-date">2025-12-10</div>
                <div class="record-content">
                  <h4>老年人购物助手</h4>
                  <p>帮助行动不便的老年人购买日常用品，贴心服务受到称赞。</p>
                  <div class="record-meta">
                    <span class="record-duration">2小时</span>
                    <span class="record-status completed">已完成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 审核操作 -->
      <div class="action-section" v-if="String(status) === Status.Examine">
        <h3>审核操作</h3>
        <div class="action-buttons">
          <el-button type="success" size="large" :icon="Check" class="action-btn approve">
            审核通过
          </el-button>
          <el-button type="danger" size="large" :icon="Close" class="action-btn reject">
            审核拒绝
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary: #44803f;
$bg-light: #f9fbf9;
$border-color: #eef2ee;
$text-main: #2c3e50;
$text-secondary: #666;

.volunteer-detail {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fbf9 0%, #ffffff 100%);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  .page-title {
    font-size: 28px;
    font-weight: 600;
    color: $primary;
    margin: 0;
  }
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(68, 128, 63, 0.1);
  padding: 32px;
  margin-bottom: 32px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(68, 128, 63, 0.15);
    transform: translateY(-2px);
  }

  .info-header {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
    align-items: center;

    .avatar-section {
      position: relative;

      .volunteer-avatar {
        width: 160px;
        // height: 160px;
        border-radius: 50%;
        border: 4px solid $bg-light;
        box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
      }

      .status-badge {
        position: absolute;
        bottom: 8px;
        right: -40px;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(68, 128, 63, 0.15);
        text-shadow: 0 5px 10px 20px rgba(255, 255, 255, 1);

        &.status-pending {
          background: rgba(255, 193, 7, 0.1);
          color: #ff9800;
          border: 1px solid rgba(255, 152, 0, 0.2);
        }

        &.status-approved {
          background: rgba(76, 175, 80, 0.1);
          color: $primary;
          border: 1px solid rgba(76, 175, 80, 0.2);
        }

        &.status-rejected {
          background: rgba(244, 67, 54, 0.1);
          color: #f44336;
          border: 1px solid rgba(244, 67, 54, 0.2);
        }
      }
    }

    .basic-info {
      flex: 1;

      .volunteer-name {
        font-size: 28px;
        font-weight: 600;
        color: $text-main;
        margin: 0 0 8px 0;
      }

      .volunteer-activity {
        font-size: 18px;
        color: $primary;
        font-weight: 500;
        margin: 0 0 24px 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          color: $text-secondary;

          el-icon {
            color: $primary;
            font-size: 20px;
          }
        }
      }
    }
  }

  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid $border-color;

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: $primary;
        margin-bottom: 4px;
      }

      .stat-label {
        font-size: 14px;
        color: $text-secondary;
        margin-bottom: 8px;
      }

    }
  }
}

.detail-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.detail-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(68, 128, 63, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: $text-main;
      margin: 0;
    }

    .el-icon {
      color: $primary;
      font-size: 20px;
    }
  }

  .card-content {
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .skill-tag {
        border-color: $primary;
        color: $primary;
        border-radius: 20px;
        padding: 8px 16px;

        &:hover {
          background: $primary;
          color: white;
        }
      }
    }

    .description {
      font-size: 16px;
      line-height: 1.6;
      color: $text-secondary;
      margin: 0;
    }

    .service-records {
      .record-item {
        display: flex;
        gap: 24px;
        padding: 16px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        .record-date {
          min-width: 120px;
          font-size: 14px;
          color: $primary;
          font-weight: 500;
          padding-top: 4px;
        }

        .record-content {
          flex: 1;

          h4 {
            font-size: 16px;
            font-weight: 600;
            color: $text-main;
            margin: 0 0 8px 0;
          }

          p {
            font-size: 14px;
            color: $text-secondary;
            margin: 0 0 12px 0;
            line-height: 1.5;
          }

          .record-meta {
            display: flex;
            gap: 16px;
            font-size: 12px;

            .record-duration {
              color: $primary;
              font-weight: 500;
            }

            .record-status {
              padding: 2px 12px;
              border-radius: 12px;
              font-weight: 500;

              &.completed {
                background: rgba(76, 175, 80, 0.1);
                color: $primary;
              }
            }
          }
        }
      }
    }
  }
}

.action-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
  padding: 24px;
  margin-top: 32px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: $text-main;
    margin: 0 0 24px 0;
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 24px;

    .action-btn {
      min-width: 150px;
      font-size: 16px;
      padding: 12px 32px;
      border-radius: 8px;
    }

    .approve {
      --el-button-bg-color: #{$primary};
      --el-button-border-color: #{$primary};
      --el-button-hover-bg-color: #5a9a55;
      --el-button-hover-border-color: #5a9a55;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .info-header {
    flex-direction: column;
    text-align: center;
  }

  .detail-cards {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
