<script setup lang="ts">
import { allDirections } from "~/util/useDirections";
</script>
<template>
  <div class="direction">
    <UiTitle name="ПРОЕКТЫ ПО НАПРАВЛЕНИЯМ"></UiTitle>

    <div class="list">
      <HomeDirectionList :direction="allDirections"></HomeDirectionList>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.direction {
  width: 80%;
  margin: 150px auto;
  display: flex;
  flex-direction: column;
  .list {
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
}
</style>
