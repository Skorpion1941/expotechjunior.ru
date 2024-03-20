<script setup lang="ts">
defineProps({
  direction: Array,
});
</script>
<template>
  <HomeDirectionCard
    v-for="item in direction"
    :key="item.id"
    :name="item.name"
    :imgUrl="item.photo"
  >
  </HomeDirectionCard>
</template>
<style lang="scss" scoped></style>
