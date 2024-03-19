<script setup>
const props = defineProps({
  array: Array,
});
</script>
<template>
  <ProjectCard
    v-for="item in array"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :title_photo="item.title_photo"
    :tilda_url="item.tilda_url"
    :direction="item.directions"
  ></ProjectCard>
</template>
<style lang="scss" scoped></style>
