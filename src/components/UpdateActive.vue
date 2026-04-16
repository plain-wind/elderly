<script setup lang="ts">
import { Active, ActiveStatus } from '@/types';
import Mask from './Mask.vue';
import { Plus, Close, Loading } from '@element-plus/icons-vue';
import { activityApi } from '@/api';
import { useActiveStore } from '@/stores/active';

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
  (e: 'update', active: Active): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const isUploading = ref(false);
const isDragging = ref(false);

const activeStore = useActiveStore();

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

const submit = async () => {
  // 表单验证
  if (!updateActiveForm.value.activeName.trim()) {
    ElMessage.error('请输入活动名称');
    return;
  }
  if (!updateActiveForm.value.startTime) {
    ElMessage.error('请选择活动开始时间');
    return;
  }
  if (!updateActiveForm.value.endTime) {
    ElMessage.error('请选择活动结束时间');
    return;
  }
  if (!updateActiveForm.value.position.trim()) {
    ElMessage.error('请输入活动地点');
    return;
  }
  if (updateActiveForm.value.personNum === null || updateActiveForm.value.personNum === undefined) {
    ElMessage.error('请输入活动人数');
    return;
  }

  isLoading.value = true;
  try {
    // 构建请求体
    const requestData = {
      name: updateActiveForm.value.activeName,
      image: updateActiveForm.value.imgSrc || null,
      place: updateActiveForm.value.position,
      numberOfApplicants: updateActiveForm.value.personNum,
      credit: 0,
      description: updateActiveForm.value.description || '',
      startTime: updateActiveForm.value.startTime,
      endTime: updateActiveForm.value.endTime,
      applicants: [],
    };
    console.log('提交数据:', requestData);
    // 通过 Store 添加活动（自动重新加载列表）
    await activeStore.addActivity(requestData);
    ElMessage.success('活动添加成功');

    // 关闭弹窗
    emit('update:isOpen', false);

    // 重置表单
    resetForm();

    // 通知父组件更新
    emit('update', updateActiveForm.value);
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '提交失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

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

const onFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  await handleFileUpload(file);
};

// 统一的文件上传处理函数
const handleFileUpload = async (file: File) => {
  // 检查文件大小（限制10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过10MB');
    return;
  }

  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件');
    return;
  }

  isUploading.value = true;
  try {
    // 调用上传API获取URL
    const imageUrl = await activityApi.uploadImage(file);
    updateActiveForm.value.imgSrc = imageUrl;
    ElMessage.success('图片上传成功');
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '图片上传失败');
  } finally {
    isUploading.value = false;
  }
};

// 拖拽事件处理
const onDragOver = (e: DragEvent) => {
  isDragging.value = true;
};

const onDragEnter = (e: DragEvent) => {
  isDragging.value = true;
};

const onDragLeave = (e: DragEvent) => {
  isDragging.value = false;
};

const onDrop = async (e: DragEvent) => {
  isDragging.value = false;

  const files = e.dataTransfer?.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  await handleFileUpload(file);
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
      <div class="image-container" @dragover.stop.prevent="onDragOver" @dragenter.stop.prevent="onDragEnter"
        @dragleave.stop.prevent="onDragLeave" @drop.stop.prevent="onDrop" :class="{ dragging: isDragging }">
        <img v-if="updateActiveForm.imgSrc" :src="updateActiveForm.imgSrc" alt="活动图片" @click="fileInput?.click()" />
        <div v-else class="upload-area">
          <el-icon class="img-icon" @click="fileInput?.click()" :class="{ loading: isUploading }">
            <Loading v-if="isUploading" />
            <Plus v-else />
          </el-icon>
          <p class="upload-hint">点击或拖拽上传图片</p>
        </div>
      </div>
      <input type="file" accept="image/*" style="display: none" ref="fileInput" @change="onFileChange"
        :disabled="isUploading" />

      <!-- 活动开始时间输入 -->
      <el-time-picker size="large" v-model="updateActiveForm.startTime" placeholder="请选择开始时间" class="input-item"
        value-format="YYYY-MM-DD HH:mm:ss" />

      <!-- 活动结束时间输入 -->
      <el-time-picker size="large" v-model="updateActiveForm.endTime" placeholder="请选择结束时间" class="input-item"
        value-format="YYYY-MM-DD HH:mm:ss" />

      <!-- 活动地点输入 -->
      <el-input size="large" placeholder="请输入活动地点" v-model="updateActiveForm.position" class="input-item" />

      <!-- 活动人数输入 -->
      <el-input size="large" placeholder="请输入活动人数" v-model.number="updateActiveForm.personNum" class="input-item"
        type="number" />

      <!-- 活动介绍输入 -->
      <el-input size="large" placeholder="请输入活动介绍" v-model="updateActiveForm.description" class="input-item"
        type="textarea" :rows="3" />

      <!-- 提交按钮 -->
      <el-button size="large" type="primary" @click="submit" :loading="isLoading" :disabled="isUploading">
        提交
      </el-button>
    </div>
  </Mask>
</template>

<style scoped lang="scss">
$img-size: 150px;

.update-active {
  font-size: 18px;
  width: 450px;
  max-height: 90vh;
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

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease;

    &.dragging {
      transform: scale(1.02);
    }

    img {
      width: $img-size;
      height: $img-size;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .upload-area {
      width: $img-size;
      height: $img-size;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: 2px dashed #ccc;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;

      .img-icon {
        color: #ccc;
        font-size: 40px;
        transition: all 0.3s ease;

        &:hover:not(.loading) {
          color: var(--el-color-primary);
        }

        &.loading {
          color: var(--el-color-primary);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      }

      .upload-hint {
        margin: 0;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    }

    &.dragging .upload-area {
      border-color: var(--el-color-primary);
      background-color: rgba(64, 158, 255, 0.05);

      .img-icon {
        color: var(--el-color-primary);
      }

      .upload-hint {
        color: var(--el-color-primary);
      }
    }
  }

  .input-item {
    width: 100%;
  }
}
</style>
