<script setup lang="ts">
import { allDirections } from "~/util/useDirections";
</script>

<template>
  <section>
    <div class="direction">
      <UiTitle name="ПРОЕКТЫ ПО НАПРАВЛЕНИЯМ"></UiTitle>
      <div class="list">
        <HomeDirectionList :direction="allDirections"></HomeDirectionList>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  width: 100%;
}
.direction {
  width: 80%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  .list {
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    z-index: 3;
  }
}
@media screen and (max-width: 1280px) {
  .direction {
    margin: 70px auto;
    .list {
      margin: 30px 0;
      gap: 0px;
    }
  }
}
@media screen and (max-width: 800px) {
  .direction {
    .list {
      margin: 20px 0;
    }
  }
}
</style>
