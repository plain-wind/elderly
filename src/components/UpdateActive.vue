<script setup lang="ts">
import { Active, ActiveStatus } from '@/types';
import { ref } from 'vue';
import Mask from './Mask.vue';
import { Plus, Close } from '@element-plus/icons-vue';
import { activeApi } from '@/api';
import type { activityReq } from '@/types/request';

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
  (e: 'update', active: Active): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

defineProps<{
  isOpen: boolean;
}>();

const updateActiveForm = ref<Active>({
  id: 0,
  imgSrc: '',
  activeName: '',
  startTime: '',
  endTime: '',
  position: '',
  personNum: null,
  description: '',
  status: ActiveStatus.Open,
});

const resetForm = () => {
  updateActiveForm.value = {
    id: 0,
    imgSrc: '',
    activeName: '',
    startTime: '',
    endTime: '',
    position: '',
    personNum: null,
    description: '',
    status: ActiveStatus.Open,
  };
};

const submit = () => {
  emit('update:isOpen', false);
  emit('update', updateActiveForm.value);
  // 这里可以添加表单验证和提交逻辑
  const param: activityReq = {
    id: Math.floor(Math.random() * 10000), // 生成随机 ID，实际应用中应由后端生成
    name: updateActiveForm.value.activeName,
    image: updateActiveForm.value.imgSrc,
    place: updateActiveForm.value.position,
    numberOfApplicants: updateActiveForm.value.personNum ?? 0,
    credit: updateActiveForm.value.personNum ?? 0,
    description: updateActiveForm.value.description,
    startTime: updateActiveForm.value.startTime,
    endTime: updateActiveForm.value.endTime,
    applicants: []
  };
  try {
    activeApi.addActivity(param);
  } catch (error) {
    console.error('添加活动失败:', error);
  }
  resetForm();
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    updateActiveForm.value.imgSrc = String(reader.result ?? '');
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <Mask v-show="isOpen">
    <div class="update-active">
      <div class="close" @click="emit('update:isOpen', false)">
        <el-icon>
          <Close />
        </el-icon>
      </div>
      <h2>添加活动</h2>
      <!-- 活动名称输入 -->
      <el-input size="large" placeholder="请输入活动名称" v-model="updateActiveForm.activeName" class="input-item" />
      <!-- 活动图片输入 -->
      <img v-if="updateActiveForm.imgSrc" :src="updateActiveForm.imgSrc" alt="活动图片" />
      <el-icon v-else class="img-icon" @click="fileInput?.click()">
        <Plus />
      </el-icon>
      <input type="file" accept="image/*" style="display: none" ref="fileInput" @change="onFileChange" />
      <!-- 活动日期输入 -->
      <el-date-picker size="large" v-model="updateActiveForm.startTime" value-format="YYYY-MM-DD" type="date"
        placeholder="请选择开始日期" class="input-item" />
      <el-date-picker size="large" v-model="updateActiveForm.endTime" value-format="YYYY-MM-DD" type="date"
        placeholder="请选择结束日期" class="input-item" />
      <!-- 活动地点输入 -->
      <el-input size="large" placeholder="请输入活动地点" v-model="updateActiveForm.position" class="input-item" />
      <!-- 活动人数输入 -->
      <el-input size="large" placeholder="请输入活动人数" v-model.number="updateActiveForm.personNum" class="input-item" />
      <!-- 活动介绍输入 -->
      <el-input size="large" placeholder="请输入活动介绍" v-model="updateActiveForm.description" class="input-item" />
      <!-- 提交按钮 -->
      <el-button size="large" type="primary" @click="submit">提交</el-button>
    </div>
  </Mask>
</template>

<style scoped lang="scss">
$img-size: 150px;

.update-active {
  font-size: 18px;
  width: 450px;
  height: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  padding: 30px;
  padding-top: 40px;
  border-radius: 10px;
  position: relative;

  .close {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    color: #999;
    transition: all 0.3s ease;

    &:hover {
      color: #666;
    }
  }

  img {
    width: $img-size;
    height: $img-size;
    object-fit: cover;
    border-radius: 8px;
  }

  .img-icon {
    border: 2px dashed #ccc;
    border-radius: 8px;
    color: #ccc;
    width: $img-size;
    height: $img-size;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
