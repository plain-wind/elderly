<script setup lang="ts">

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<{
  label: string;
  modelValue: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'password';
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
}>(), {
  type: 'text',
  size: 'medium',
  required: true,
});
</script>

<template>
  <div class="input-field" :class="`size-${size}`">
    <label>{{ label }}</label>
    <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type" :placeholder="placeholder" :required="required" />
  </div>
</template>

<style scoped lang="scss">
.input-field {

  label {
    display: block;
    color: #666;
    font-weight: 500;
  }

  input {
    width: 100%;
    border: 1.5px solid #eee;
    transition: all 0.3s;
    outline: none;
    background: #f9fbf9;

    &:focus {
      border-color: #44803f;
      background: #fff;
      box-shadow: 0 4px 12px rgba(68, 128, 63, 0.1);
    }
  }
}

.size-small {
  label {
    font-size: 13px;
    margin-bottom: 6px;
  }

  input {
    height: 48px;
    padding: 0 14px;
    border-radius: 10px;
    font-size: 15px;
  }
}

.size-medium {
  margin-bottom: 24px;

  label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  input {
    height: 54px;
    padding: 0 16px;
    border-radius: 12px;
    font-size: 16px;
  }
}
</style>