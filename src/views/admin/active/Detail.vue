<script setup lang="ts">
import { ArrowLeft, Calendar, Location, User, Clock, Star, Phone, ChatDotRound, Document, Share, Star as Bookmark } from '@element-plus/icons-vue';
import { ActiveStatus as Status } from '@/types';

const route = useRoute();
const router = useRouter();

// 接收路由参数
const { id, imgSrc, activeName, date, position, personNum, status }: Record<string, any> = route.query;

// 模拟额外数据
const activeDetails = {
  organizer: '社区服务中心',
  contact: '138' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
  description: '本次活动旨在丰富老年人的精神文化生活，提供一个交流互动的平台。活动内容包括专业讲座、互动游戏和集体合影等环节，希望通过这样的活动让老年人感受到社区的温暖和关怀。',
  schedule: [
    {
      time: '09:00-09:30',
      content: '签到入场'
    },
    {
      time: '09:30-10:00',
      content: '开场致辞'
    },
    {
      time: '10:00-11:00',
      content: '主题活动'
    },
    {
      time: '11:00-11:30',
      content: '互动交流'
    },
    {
      time: '11:30-12:00',
      content: '合影留念'
    }
  ],
  requirements: [
    '请提前15分钟到场签到',
    '穿着舒适的服装和鞋子',
    '可自带水杯和小点心',
    '如有特殊需求请提前告知'
  ],
  participants: [
    '张阿姨', '李大爷', '王奶奶', '赵爷爷', '刘阿姨',
    '陈大爷', '杨奶奶', '黄爷爷', '周阿姨', '吴大爷'
  ],
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: [
    {
      name: '张阿姨',
      content: '活动非常精彩，组织者很用心，认识了很多新朋友！',
      rating: 5
    },
    {
      name: '李大爷',
      content: '内容丰富，安排合理，希望以后能多举办这样的活动。',
      rating: 4
    }
  ],
  shareUrl: window.location.href
};

// 获取状态显示文本
const getStatusText = (status: any) => {
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
const getStatusClass = (status: any) => {
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

// 分享活动
const shareActivity = () => {
  if (navigator.share) {
    navigator.share({
      title: activeName,
      text: activeDetails.description,
      url: activeDetails.shareUrl
    });
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(activeDetails.shareUrl)
      .then(() => {
        ElMessage.success('链接已复制到剪贴板');
      });
  }
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
            <img :src="imgSrc" :alt="activeName" class="event-image">
            <div class="status-badge" :class="getStatusClass(status)">
              {{ getStatusText(status) }}
            </div>
          </div>
          <div class="basic-info">
            <h2 class="activity-name">{{ activeName }}</h2>
            <div class="info-grid">
              <div class="info-item">
                <el-icon>
                  <Calendar />
                </el-icon>
                <span>{{ date }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Location />
                </el-icon>
                <span>{{ position }}</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <User />
                </el-icon>
                <span>参与人数: {{ personNum }}人</span>
              </div>
              <div class="info-item">
                <el-icon>
                  <Phone />
                </el-icon>
                <span>{{ activeDetails.contact }}</span>
              </div>
            </div>
            <div class="organizer-info">
              <span class="organizer-label">组织者:</span>
              <span class="organizer-name">{{ activeDetails.organizer }}</span>
            </div>
          </div>
        </div>

        <!-- 活动操作 -->
        <div class="action-buttons">
          <el-button type="primary" size="large" @click="shareActivity()">
            <el-icon>
              <Share />
            </el-icon>
            分享活动
          </el-button>
          <el-button size="large" plain>
            <el-icon>
              <Bookmark />
            </el-icon>
            收藏
          </el-button>
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

        <!-- 活动流程 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Clock />
            </el-icon>
            <h3>活动流程</h3>
          </div>
          <div class="card-content">
            <div class="schedule-list">
              <div class="schedule-item" v-for="(item, index) in activeDetails.schedule" :key="index">
                <div class="schedule-time">{{ item.time }}</div>
                <div class="schedule-content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 注意事项 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <Star />
            </el-icon>
            <h3>注意事项</h3>
          </div>
          <div class="card-content">
            <ul class="requirements-list">
              <li v-for="(item, index) in activeDetails.requirements" :key="index">
                {{ item }}
              </li>
            </ul>
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
              <el-tag v-for="(participant, index) in activeDetails.participants" :key="index" size="large"
                effect="plain" class="participant-tag">
                {{ participant }}
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 活动评价 -->
        <div class="detail-card">
          <div class="card-header">
            <el-icon>
              <ChatDotRound />
            </el-icon>
            <h3>活动评价</h3>
          </div>
          <div class="card-content">
            <div class="reviews-list">
              <div class="review-item" v-for="(review, index) in activeDetails.reviews" :key="index">
                <div class="review-header">
                  <span class="reviewer-name">{{ review.name }}</span>
                  <div class="review-rating">
                    <el-icon>
                      <Star />
                    </el-icon>
                    <span>{{ review.rating }}分</span>
                  </div>
                </div>
                <p class="review-content">{{ review.content }}</p>
              </div>
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