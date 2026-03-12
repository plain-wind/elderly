<script setup lang="ts">
import { Active, ActiveStatus } from '@/types';
import { ref } from 'vue';
import Mask from './Mask.vue';
import { Plus } from '@element-plus/icons-vue';

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
  date: '',
  position: '',
  personNum: null,
  status: ActiveStatus.Open,
});

const submit = () => {
  emit('update:isOpen', false);
  emit('update', updateActiveForm.value);
  // 这里可以添加表单验证和提交逻辑
  updateActiveForm.value = {
    id: 0,
    imgSrc: '',
    activeName: '',
    date: '',
    position: '',
    personNum: null,
    status: ActiveStatus.Open,
  };
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
      <h2>添加活动</h2>
      <!-- 活动名称输入 -->
      <el-input size="large" placeholder="请输入活动名称" v-model="updateActiveForm.activeName" class="input-item" />
      <!-- 活动图片输入 -->
      <img v-if="updateActiveForm.imgSrc" :src="updateActiveForm.imgSrc" alt="活动图片">
      <el-icon v-else class="img-icon" @click="fileInput?.click()">
        <Plus />
      </el-icon>
      <input type="file" accept="image/*" style="display: none;" ref="fileInput" @change="onFileChange" />
      <!-- 活动日期输入 -->
      <el-date-picker size="large" v-model="updateActiveForm.date" value-format="YYYY-MM-DD" type="date" placeholder="请选择活动日期"
        class="input-item" />
      <!-- 活动地点输入 -->
      <el-input size="large" placeholder="请输入活动地点" v-model="updateActiveForm.position" class="input-item" />
      <!-- 活动人数输入 -->
      <el-input size="large" placeholder="请输入活动人数" v-model.number="updateActiveForm.personNum" class="input-item" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;

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