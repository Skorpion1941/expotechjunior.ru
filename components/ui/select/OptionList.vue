<script setup>
const props = defineProps({
  array: Array,
  modelValue: Array,
});
const emit = defineEmits(["addOption"]);
</script>
<template>
  <UiSelectOption
    v-for="item in array"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :on-click-option="() => emit('addOption', item)"
  ></UiSelectOption>
</template>
<style lang="scss" scoped></style>
