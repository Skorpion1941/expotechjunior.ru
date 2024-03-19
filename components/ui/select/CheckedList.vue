<script setup>
defineProps({
  array: Array,
});
</script>
<template>
  <UiSelectChecked
    v-for="item in array"
    :key="item.id"
    :id="item.id"
    :name="item.short_name"
    :color="item.color"
  ></UiSelectChecked>
</template>
<style scoped lang="scss"></style>
