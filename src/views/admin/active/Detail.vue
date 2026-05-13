<script setup lang="ts">
import {
  ArrowLeft,
  Calendar,
  Location,
  User,
  Phone,
  Document,
} from '@element-plus/icons-vue';
import { ActiveStatus as Status } from '@/types';
import { ActivityItem } from '@/types/response';
import { activityApi } from '@/api';
const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const activeDetails = ref<ActivityItem>({
  id: 0,
  image: '',
  name: '',
  startTime: '',
  endTime: '',
  numberOfApplicants: 0,
  publisher: '',
  place: '',
  phone: '',
  applicants: [],
  description: '',
});
const status = ref<Status>(Status.Close);

onMounted(async () => {
  try {
    activeDetails.value = await activityApi.getDetail(props.id);
    status.value = Date.now() < new Date(activeDetails.value.endTime).getTime() ? Status.Open : Status.Close;
    console.log('活动详情', activeDetails.value);
  } catch (error) {
    ElMessage.error('加载活动详情失败');
  }
});

// 获取状态显示文本
const getStatusText = (status: Status) => {
  const statusStr = String(status || '');
  switch (statusStr) {
    case Status.Open:
      return '进行中';
    case Status.Close:
      return '已结束';
    default:
      return '未知状态';
  }
};

// 获取状态样式类
const getStatusClass = (status: Status) => {
  const statusStr = String(status || '');
  switch (statusStr) {
    case Status.Open:
      return 'status-open';
    case Status.Close:
      return 'status-close';
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
  <div class="active-detail">
    <!-- 头部导航 -->
    <div class="detail-header">
      <el-button @click="goBack()" size="large" plain>
        <el-icon>
          <ArrowLeft />
        </el-icon>
        返回列表
      </el-button>
      <h1 class="page-title">活动详情</h1>
    </div>

    <!-- 主要内容 -->
    <div class="detail-content">
      <!-- 活动基本信息 -->
      <div class="info-card">
        <div class="info-header">
          <div class="activity-image">
            <img :src="activeDetails?.image!" :alt="activeDetails?.name" class="event-image" />
            <div class="status-badge" :class="getStatusClass(status)">
              {{ getStatusText(status) }}
            </div>
          </div>
          <div class="basic-info">
            <h2 class="activity-name">{{ activeDetails?.name }}</h2>
            <div class="info-grid">
              <div class="info-item">
                <el-icon>
                  <Calendar />
                </el-icon>
                <span>
                  {{ activeDetails?.startTime.split('T')[0] + ' ' + activeDetails?.startTime.split('T')[1] }}
                  -
                  {{ activeDetails?.endTime.split('T')[0] + ' ' + activeDetails?.endTime.split('T')[1] }}
                </span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Location />
                </el-icon>
                <span>{{ activeDetails?.place }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <User />
                </el-icon>
                <span>参与人数: {{ activeDetails?.numberOfApplicants }}人</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Phone />
                </el-icon>
                <span>{{ activeDetails?.phone }}</span>
              </div>
            </div>
            <div class="organizer-info">
              <span class="organizer-label">组织者:</span>
              <span class="organizer-name">{{ activeDetails?.publisher }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- 活动详情 -->
      <div class="detail-cards">
        <!-- 活动介绍 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Document />
            </el-icon>
            <h3>活动介绍</h3>
          </div>
          <div class="card-content">
            <p class="description">{{ activeDetails.description }}</p>
          </div>
        </div>

        <!-- 参与者名单 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <User />
            </el-icon>
            <h3>参与者名单</h3>
          </div>
          <div class="card-content">
            <div class="participants-grid">
              <el-tag v-for="(participant, index) in activeDetails.applicants" :key="index" size="large" effect="plain"
                class="participant-tag">
                {{ participant.name }}
              </el-tag>
            </div>
          </div>
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

.active-detail {
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
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 32px;
    margin-bottom: 32px;

    .activity-image {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(68, 128, 63, 0.15);
      font-size: 0;

      .event-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
      }

      .status-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 8px rgba(68, 128, 63, 0.15);

        &.status-open {
          background: rgba(76, 175, 80, 0.1);
          color: $primary;
          border: 1px solid rgba(76, 175, 80, 0.2);
        }

        &.status-close {
          background: rgba(153, 153, 153, 0.1);
          color: #999;
          border: 1px solid rgba(153, 153, 153, 0.2);
        }
      }
    }

    .basic-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .activity-name {
        font-size: 28px;
        font-weight: 600;
        color: $text-main;
        margin: 0 0 24px 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin-bottom: 24px;

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

      .organizer-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;

        .organizer-label {
          color: $text-secondary;
        }

        .organizer-name {
          color: $primary;
          font-weight: 500;
        }
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    padding-top: 24px;
    border-top: 1px solid $border-color;

    el-button {
      min-width: 150px;
      font-size: 16px;
      padding: 12px 32px;
      border-radius: 8px;
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

    el-icon {
      color: $primary;
      font-size: 20px;
    }
  }

  .card-content {
    .description {
      font-size: 16px;
      line-height: 1.6;
      color: $text-secondary;
      margin: 0;
    }

    .schedule-list {
      .schedule-item {
        display: flex;
        gap: 24px;
        padding: 12px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        .schedule-time {
          min-width: 120px;
          font-size: 14px;
          color: $primary;
          font-weight: 500;
          padding-top: 2px;
        }

        .schedule-content {
          flex: 1;
          font-size: 14px;
          color: $text-secondary;
          line-height: 1.5;
        }
      }
    }

    .requirements-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 14px;
        color: $text-secondary;
        padding: 8px 0;
        padding-left: 24px;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $primary;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }

    .participants-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .participant-tag {
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

    .reviews-list {
      .review-item {
        padding: 16px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
          border-bottom: none;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .reviewer-name {
            font-size: 16px;
            font-weight: 600;
            color: $text-main;
          }

          .review-rating {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            color: #ffc107;

            el-icon {
              font-size: 16px;
            }
          }
        }

        .review-content {
          font-size: 14px;
          color: $text-secondary;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .info-header {
    grid-template-columns: 1fr !important;
  }

  .activity-image {
    order: 1;
  }

  .basic-info {
    order: 2;
  }

  .detail-cards {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  el-button {
    width: 100%;
  }
}
</style>
