<script setup>
import { addChecked } from "../useSelect";

defineProps({
  directions: Array,
  array: Array,
});
</script>
<template>
  <UiSelectMultipleOption
    v-for="direction in directions"
    :key="direction.id"
    :id="direction.id"
    :name="direction.name"
    :on-click-option="
      () => {
        direction.checked = !direction.checked;
        addChecked(array, direction, direction.checked);
      }
    "
  ></UiSelectMultipleOption>
</template>
<style lang="scss" scoped></style>
