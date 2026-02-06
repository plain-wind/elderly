<template>
  <div class="detail">
    <el-button type="primary" size="large" style="margin-bottom: 10px;" @click="$router.back()">
      返回列表
    </el-button>
    <div class="layout-container">
      <div class="left-column">
        <div class="user-info-card shadow-sm">
          <div class="avatar-wrapper">
            <img src="@/assets/imgs/older.png" alt="头像">
            <div class="status-badge">在线</div>
          </div>
          <div class="info-content">
            <div class="name-row">
              <h2 class="user-name">{{ name }}</h2>
              <el-tag size="small" effect="plain" type="success" round>档案已建立</el-tag>
            </div>
            <div class="contact-grid">
              <div class="contact-item">
                <el-icon>
                  <Location />
                </el-icon> {{ address }}
              </div>
              <div class="contact-item">
                <el-icon>
                  <Phone />
                </el-icon> {{ phone }}
              </div>
              <div class="contact-item highlight">
                <el-icon>
                  <Warning />
                </el-icon> 急救: {{ sonphone }}
              </div>
            </div>
          </div>
        </div>

        <div class="health-map shadow-sm">
          <div class="card-title">
            <div class="title-left">
              <span class="icon-circle"><el-icon>
                  <FirstAidKit />
                </el-icon></span>
              <h3>症状分布图</h3>
            </div>
            <el-button type="primary" link size="small">
              历史记录<el-icon class="el-icon--right">
                <ArrowRight />
              </el-icon>
            </el-button>
          </div>

          <div class="map-content">
            <div class="body-projection">
              <div class="body-img-wrapper">
                <img src="@/assets/imgs/body.png" alt="人体示意" class="human-svg">
                <div class="pulse-point headache"></div>
                <div class="pulse-point backache"></div>
              </div>
            </div>

            <div class="symptom-cards">
              <div class="symptom-box alert">
                <div class="box-header">
                  <span class="dot"></span>
                  <h4>头部偏头疼</h4>
                  <span class="time">3天前</span>
                </div>
                <p>描述：受凉后引起持续性钝痛，建议晚间足浴。</p>
              </div>

              <div class="symptom-box warning">
                <div class="box-header">
                  <span class="dot"></span>
                  <h4>腰部肌肉僵硬</h4>
                  <span class="time">今日</span>
                </div>
                <p>描述：久坐后起身困难，已提醒志愿者协助拉伸。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="vitals-section shadow-sm">
          <div class="card-title">
            <div class="title-left">
              <span class="icon-circle"><el-icon>
                  <Monitor />
                </el-icon></span>
              <h3>体征数据监测</h3>
            </div>
            <el-date-picker v-model="selectedDate" type="date" size="default" :clearable="false" style="width: 140px" />
          </div>

          <div class="vitals-grid">
            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/ydbs.gif"></div>
              <div class="vital-info">
                <label>今日运动</label>
                <div class="value-unit"><span class="val">6,432</span>步</div>
                <el-progress :percentage="70" :show-text="false" :stroke-width="4" color="#44803f" />
              </div>
            </div>

            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/xl.gif"></div>
              <div class="vital-info">
                <label>实时心率</label>
                <div class="value-unit"><span class="val">76</span>bpm</div>
                <span class="status-text safe">正常范围</span>
              </div>
            </div>

            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/xy.gif"></div>
              <div class="vital-info">
                <label>血氧饱和度</label>
                <div class="value-unit"><span class="val">98</span>%</div>
                <span class="status-text safe">呼吸顺畅</span>
              </div>
            </div>

            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/smsc.gif"></div>
              <div class="vital-info">
                <label>昨晚睡眠</label>
                <div class="value-unit"><span class="val">7.5</span>h</div>
                <span class="status-text safe">睡眠充足</span>
              </div>
            </div>

            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/ysl.gif"></div>
              <div class="vital-info">
                <label>累计饮水</label>
                <div class="value-unit"><span class="val">1,200</span>ml</div>
                <span class="status-text warning">缺 300ml</span>
              </div>
            </div>

            <div class="vital-card">
              <div class="vital-icon-bg"><img src="@/assets/imgs/bodyData/qs.gif"></div>
              <div class="vital-info">
                <label>今日情绪</label>
                <div class="value-unit"><span class="val">愉悦</span></div>
                <span class="status-text safe">心态平稳</span>
              </div>
            </div>
          </div>
        </div>

        <div class="reports-section shadow-sm">
          <div class="card-title">
            <div class="title-left">
              <span class="icon-circle"><el-icon>
                  <Document />
                </el-icon></span>
              <h3>健康检查报告</h3>
            </div>
            <el-button link type="primary">更多</el-button>
          </div>
          <div class="report-container">
            <div v-for="i in 3" :key="i" class="report-file-item">
              <div class="file-info">
                <div class="pdf-icon"><el-icon>
                    <Files />
                  </el-icon></div>
                <div class="file-text">
                  <span class="file-name">2025年度复检报告_0{{ i }}.pdf</span>
                  <span class="file-meta">2025-09-{{ 20 + i }}</span>
                </div>
              </div>
              <el-button link type="primary"><el-icon>
                  <Download />
                </el-icon></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入所有用到的图标
import {
  Location, Phone, Warning, FirstAidKit,
  ArrowRight, Monitor, Document, Files, Download
} from '@element-plus/icons-vue';

const { name, address, phone, sonphone } = useRoute().query;

const selectedDate = ref('2025-09-29');
</script>

<style scoped lang="scss">
$primary: #44803f;
$bg-light: #f9fbf9;
$border-color: #eef2ee;
$text-main: #2c3e50;

// .detail {
//   padding: 20px;
// }

.layout-container {
  display: flex;
  gap: 20px;
}

.left-column,
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shadow-sm {
  background: #fff;
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid $border-color;
  padding: 24px;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .title-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-circle {
      width: 36px;
      height: 36px;
      background: rgba($primary, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $primary;
      font-size: 18px;
    }

    h3 {
      font-size: 17px;
      font-weight: 600;
      color: $text-main;
      margin: 0;
    }
  }
}

// 个人卡片
.user-info-card {
  display: flex;
  gap: 24px;
  align-items: center;

  .avatar-wrapper {
    position: relative;

    img {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      border: 3px solid #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    .status-badge {
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      background: #67c23a;
      color: #fff;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 10px;
    }
  }

  .info-content {
    // flex: 1;

    .name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;

      h2 {
        margin: 0;
        font-size: 22px;
        color: $primary;
      }
    }

    .contact-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .contact-item {
        font-size: 15px;
        color: #606266;
        display: flex;
        align-items: center;
        gap: 6px;

        .el-icon {
          color: $primary;
        }

        &.highlight {
          color: #f56c6c;
          font-weight: 600;
        }
      }
    }
  }
}

// 症状分布图 - 核心调整
.health-map {

  .map-content {
    display: flex;
    gap: 20px;

    .body-projection {
      background: $bg-light;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      .body-img-wrapper {
        position: relative;
        height: 85%; // 限制图片高度，留出四周间隙

        .human-svg {
          transform: scale(0.8) translateY(-10%);
          width: 100%;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.05));
          opacity: 0.9;
        }

        .pulse-point {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #f56c6c;
          border-radius: 50%;
          animation: pulse-red 2s infinite;

          &.headache {
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
          }

          &.backache {
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }

    .symptom-cards {
      flex: 0 0 400px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;

      .symptom-box {
        padding: 16px;
        border-radius: 12px;
        border: 1px solid $border-color;
        background: $bg-light;

        .box-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;

          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          h4 {
            margin: 0;
            flex: 1;
            font-size: 14px;
          }

          .time {
            font-size: 15px;
            color: #909399;
          }
        }

        p {
          font-size: 13px;
          color: #606266;
          margin: 0;
          line-height: 1.4;
        }

        &.alert {
          border-left: 4px solid #f56c6c;

          .dot {
            background: #f56c6c;
          }
        }

        &.warning {
          border-left: 4px solid #e6a23c;

          .dot {
            background: #e6a23c;
          }
        }
      }
    }
  }
}

// 体征网格
.vitals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  .vital-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: $bg-light;
    border-radius: 16px;
    border: 1px solid transparent;
    transition: 0.3s;

    &:hover {
      border-color: $primary;
      background: #fff;
    }

    .vital-icon-bg {
      width: 44px;
      height: 44px;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 45px;
        height: 45px;
      }
    }

    .vital-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 15px;
        color: #909399;
      }

      .value-unit {
        .val {
          font-size: 25px;
          font-weight: 700;
          color: $primary;
        }

        font-size: 12px;
      }

      .status-text {
        font-size: 14px;

        &.safe {
          color: #67c23a;
        }

        &.warning {
          color: #e6a23c;
        }
      }
    }
  }
}

// 报告列表
.report-container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .report-file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: $bg-light;
    border-radius: 10px;

    .file-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .pdf-icon {
        color: #f56c6c;
        font-size: 20px;
      }

      .file-text {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .file-name {
          font-size: 15px;
          font-weight: 500;
        }

        .file-meta {
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 0 0 rgba(#f56c6c, 0.7);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(#f56c6c, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(#f56c6c, 0);
  }
}
</style>