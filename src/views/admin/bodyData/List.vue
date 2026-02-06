<template>
  <div class="bdmain">
    <!-- 头部数据统计 -->
    <div class="bdm-header">
      <div class="stats-card">
        <div class="stats-content">
          <div class="stats-value">{{ '8' }}</div>
          <div class="stats-label">{{ '老年人总数' }}</div>
        </div>
        <div class="stats-icon green">
          <el-icon :size="32">
            <User />
          </el-icon>
        </div>
      </div>
      <div class="stats-card">
        <div class="stats-content">
          <div class="stats-value">{{ '6' }}</div>
          <div class="stats-label">{{ '体征数据正常' }}</div>
        </div>
        <div class="stats-icon blue">
          <el-icon :size="32">
            <CircleCheck />
          </el-icon>
        </div>
      </div>
      <div class="stats-card">
        <div class="stats-content">
          <div class="stats-value">{{ '2' }}</div>
          <div class="stats-label">{{ '体征数据异常' }}</div>
        </div>
        <div class="stats-icon red">
          <el-icon :size="32">
            <Warning />
          </el-icon>
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="bdm-search">
      <el-input v-model="searchInput" class="search-input" placeholder="搜索患者信息">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <!-- 表格 -->
    <div class="bdm-table">
      <el-table :data="tableData" border stripe class="data-table">
        <el-table-column prop="name" label="患者名称" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="address" label="住址" width="300" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="sonphone" label="监护人联系方式" />
        <el-table-column prop="tzsj" label="体征数据">
          <template #default="{ row }">
            <span :class="row.tzsj == '异常' ? 'status-badge warning' : 'status-badge success'">
              {{ row.tzsj }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="do" label="操作">
          <template #default="{ row }">
            <el-button link type="primary" size="default" @click="$router.push({
              name: 'detail',
              query: {
                name: row.name,
                address: row.address,
                phone: row.phone,
                sonphone: row.sonphone,
              }
            })" class="detail-btn">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, User, CircleCheck, Warning } from '@element-plus/icons-vue';

let searchInput = ref('')

const tableData = [
  {
    name: '刘志强',
    age: '78',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110001',
    sonphone: '13821110001',
    tzsj: '正常',
  },
  {
    name: '张桂兰',
    age: '65',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110002',
    sonphone: '13821110002',
    tzsj: '正常',
  },
  {
    name: '李明',
    age: '86',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110003',
    sonphone: '13821110003',
    tzsj: '异常',
  },
  {
    name: '王秀英',
    age: '71',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110004',
    sonphone: '13821110004',
    tzsj: '异常',
  },
  {
    name: '赵国华',
    age: '69',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110005',
    sonphone: '13821110005',
    tzsj: '正常',
  },
  {
    name: '陈桂芳',
    age: '75',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110006',
    sonphone: '13821110006',
    tzsj: '正常',
  },
  {
    name: '孙建国',
    age: '63',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110007',
    sonphone: '13821110007',
    tzsj: '正常',
  },
  {
    name: '周玉珍',
    age: '86',
    address: '天津市西青区檀园嘉苑',
    phone: '13811110008',
    sonphone: '13821110008',
    tzsj: '正常',
  },
]

</script>

<style scoped lang="scss">
.bdmain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  // padding: 20px 0;

  // 头部数据统计
  .bdm-header {
    display: flex;
    gap: 24px;
    width: 100%;

    .stats-card {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(68, 128, 63, 0.15);
      }

      .stats-content {
        flex: 1;

        .stats-value {
          font-size: 36px;
          font-weight: 600;
          color: #3a6636;
          margin-bottom: 4px;
        }

        .stats-label {
          font-size: 14px;
          color: #6f6f6f;
          font-weight: 500;
        }
      }

      .stats-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;

        &.green {
          background: rgba(68, 128, 63, 0.1);
          color: #44803f;
        }

        &.blue {
          background: rgba(29, 115, 238, 0.1);
          color: #1d73ee;
        }

        &.red {
          background: rgba(223, 22, 22, 0.1);
          color: #df1616;
        }
      }
    }
  }

  // 搜索框
  .bdm-search {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 0 4px;

    .search-input {
      width: 320px;
      height: 48px;
    }

    .status-select {
      width: 180px;
      height: 48px;
    }
  }

  // 表格
  .bdm-table {
    flex: 1;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
    overflow: hidden;

    .data-table {
      width: 100%;
      height: 100%;
    }
  }
}

// 状态标签
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;

  &.success {
    background: rgba(68, 128, 63, 0.1);
    color: #44803f;
    border: 1px solid rgba(68, 128, 63, 0.2);
  }

  &.warning {
    background: rgba(223, 22, 22, 0.1);
    color: #df1616;
    border: 1px solid rgba(223, 22, 22, 0.2);
  }
}

// 详情按钮
.detail-btn {
  color: #44803f !important;
  font-weight: 500 !important;
  font-size: 14px !important;

  &:hover {
    color: #356632 !important;
    text-decoration: underline !important;
  }
}

// 输入框样式
:deep(.el-input__wrapper) {
  border-radius: 24px;
  border: 1px solid rgba(68, 128, 63, 0.1);
  box-shadow: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(68, 128, 63, 0.3);
    box-shadow: 0 2px 8px rgba(68, 128, 63, 0.1);
  }

  &.is-focus {
    border-color: #44803f;
    box-shadow: 0 0 0 2px rgba(68, 128, 63, 0.1);
  }
}

// 选择器样式
:deep(.el-select__wrapper) {
  border-radius: 24px;
  border: 1px solid rgba(68, 128, 63, 0.1);
  box-shadow: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(68, 128, 63, 0.3);
    box-shadow: 0 2px 8px rgba(68, 128, 63, 0.1);
  }

  &.is-focus {
    border-color: #44803f;
    box-shadow: 0 0 0 2px rgba(68, 128, 63, 0.1);
  }
}

// 表格样式
:deep(.el-table) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-table__header) {
  background: linear-gradient(135deg, #f9fbf9 0%, #f0f7f0 100%);

  th {
    background: transparent !important;
    border-bottom: 1px solid rgba(68, 128, 63, 0.1) !important;
    font-size: 14px;
    font-weight: 600;
    color: #3a6636;
    height: 52px;
  }
}

:deep(.el-table__body-wrapper) {
  color: #555;
  font-size: 14px;
}

:deep(.el-table__row) {
  height: 48px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(68, 128, 63, 0.02) !important;
  }
}

:deep(.el-table__row.el-table__row--striped) {
  background: rgba(68, 128, 63, 0.01) !important;
}

// 选项样式
:deep(.el-option) {
  &[data-value="异常"] {
    color: #df1616 !important;
    font-weight: 500;
  }

  &[data-value="正常"] {
    color: #44803f !important;
    font-weight: 500;
  }
}
</style>