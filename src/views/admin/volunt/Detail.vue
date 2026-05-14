<script setup lang="ts">
import {
  ArrowLeft,
  Location,
  Calendar,
  Document,
  User,
  Clock,
  Check,
  Close,
} from '@element-plus/icons-vue';
import { VoluntStatus as Status } from '@/types';
import { voluntaryApi } from '@/api';
import type { voluntaryItem } from '@/types/response';

const { id } = defineProps<{
  id: number;
}>();

const router = useRouter();
const voluntDetail = ref<voluntaryItem | null>(null);
const status = ref<Status>(Status.All);

// 获取状态显示文本
const getStatusText = (status: Status) => {
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
const getStatusClass = (status: Status) => {
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

const formatDateTime = (value?: string | null) => {
  if (!value) return '--';
  const [date, timeWithZone] = value.split('T');
  if (!timeWithZone) return value;
  return `${date} ${timeWithZone.split('.')[0]}`;
};

// 返回列表页
const goBack = () => {
  router.back();
};

const mapStatus = (hasPass: number) => {
  if (hasPass === 1) return Status.Pass;
  if (hasPass === 2) return Status.Reject;
  return Status.Examine;
};

const handleReview = async (nextStatus: Status) => {
  if (!voluntDetail.value) return;
  const hasPass = nextStatus === Status.Pass ? '1' : '2';

  try {
    await voluntaryApi.check(String(voluntDetail.value.id), hasPass);
    console.log('审核结果:', { id: voluntDetail.value.id, hasPass });
    status.value = nextStatus;
    voluntDetail.value.hasPass = Number(hasPass);
    ElMessage.success(`已设置为${getStatusText(nextStatus)}`);
  } catch (error) {
    ElMessage.error('审核操作失败');
  }
};

onMounted(async () => {
  try {
    const detail = await voluntaryApi.getDetail(String(id));
    voluntDetail.value = detail;
    status.value = mapStatus(Number(voluntDetail.value?.hasPass ?? 0));
  } catch (error) {
    ElMessage.error('加载志愿详情失败');
  }
});
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
      <div class="info-card" v-if="voluntDetail">
        <div class="info-header">
          <div class="avatar-section">
            <img :src="voluntDetail.image || ''" :alt="voluntDetail.name" class="volunteer-avatar" />
            <div class="status-badge" :class="getStatusClass(status)">
              {{ getStatusText(status) }}
            </div>
          </div>
          <div class="basic-info">
            <h2 class="volunteer-name">{{ voluntDetail.userName }}</h2>
            <p class="volunteer-activity">{{ voluntDetail.name }}</p>
            <div class="info-grid">
              <div class="info-item">
                <el-icon>
                  <Location />
                </el-icon>
                <span>{{ voluntDetail.place }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Calendar />
                </el-icon>
                <span>
                  {{ formatDateTime(voluntDetail.startTime) }}
                  -
                  {{ formatDateTime(voluntDetail.endTime) }}
                </span>
              </div>
              <div class="info-item">
                <el-icon>
                  <User />
                </el-icon>
                <span>需求人数: {{ voluntDetail.neededNumber ?? '--' }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>发布时间: {{ formatDateTime(voluntDetail.createTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-cards" v-if="voluntDetail">
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Document />
            </el-icon>
            <h3>志愿详情</h3>
          </div>
          <div class="card-content">
            <p class="description">{{ voluntDetail.description || '暂无描述' }}</p>
          </div>
        </div>
      </div>

      <div class="action-section" v-if="String(status) === Status.Examine">
        <h3>审核操作</h3>
        <div class="action-buttons">
          <el-button type="success" size="large" :icon="Check" class="action-btn approve"
            @click="handleReview(Status.Pass)">
            审核通过
          </el-button>
          <el-button type="danger" size="large" :icon="Close" class="action-btn reject"
            @click="handleReview(Status.Reject)">
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
        height: 160px;
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
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;

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
    .description {
      font-size: 16px;
      line-height: 1.6;
      color: $text-secondary;
      margin: 0;
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
