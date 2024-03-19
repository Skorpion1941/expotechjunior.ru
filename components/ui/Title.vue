import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
import { defineProps } from "vue";
defineProps({
  name: String,
});
</script>
<template>
  <div class="title">
    <div>
      <h2>{{ name }}</h2>
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
      h2 {
        padding: 0 30px;
        text-align: center;
        color: $third-color;
      }
      hr {
        height: 7px;
        width: 100%;
        background: $second-color;
        border: none;
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border: 3px solid $second-color;
          border-radius: 50px;
        }
        &::after {
          right: -15px;
          margin-top: -6px;
        }
        &::before {
          left: -15px;
          margin-top: -6px;
        }
      }
    }
  }
}
</style>
