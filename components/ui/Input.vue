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
  noRequest?: { type: Boolean; default: true };
}
const props = defineProps([
  "label",
  "name",
  "modelValue",
  "type",
  "placeholder",
  "errors",
  "style",
  "noRequest",
]);
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <div class="flex" style="gap: 5px" v-if="label">
      <label>{{ props.label }}</label>
      <p v-if="!props.noRequest">*</p>
    </div>
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
input {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  color: $third-color;
}
p {
  color: red;
  margin: 0px;
}
@media screen and (max-width: 1280px) {
  input {
    padding: 7px 7px;
    border-radius: 10px;
  }
}
</style>
