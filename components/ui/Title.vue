import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
import { defineProps } from "vue";
defineProps({
  name: String,
  width: String,
});
</script>
<template>
  <div class="title" :style="{ width: width }">
    <div>
      <h1>{{ name }}</h1>
      <hr />
    </div>
    <div></div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  width: 45%;
  div {
    &:first-child {
      position: relative;
      h1 {
        padding: 0 30px;
        text-align: center;
        color: $third-color;
        font-size: 30px;
      }
      hr {
        height: 4px;
        width: 100%;
        background: $second-color;
        border: none;
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border: 4px solid $second-color;
          border-radius: 50px;
        }
        &::after {
          right: -18px;
          margin-top: -8px;
        }
        &::before {
          left: -18px;
          margin-top: -8px;
        }
      }
    }
  }
}
</style>
