<script lang="ts" setup>
import { defineProps, defineEmits, onMounted } from "vue";
import { useVModel } from "@vueuse/core";

export interface UiInput {
  label?: string;
  name: string;
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  errors?: string;
}
const props = defineProps([
  "label",
  "name",
  "modelValue",
  "type",
  "placeholder",
  "errors",
  "style",
]);
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label v-if="label">{{ props.label }}</label>
    <Field
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :name="props.name"
      :type="props.name"
      :placeholder="props.placeholder"
      :style="props.style"
    />
    <p v-if="errors">{{ props.errors }}</p>
  </div>
</template>

<style scoped lang="scss">
label {
  font-size: 20px;
}

input {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
}
p {
  color: red;
  margin: 0px;
}
</style>
