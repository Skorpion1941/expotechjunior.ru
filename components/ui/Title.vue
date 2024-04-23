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
        padding: 0 20px 5px 20px;
        text-align: center;
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
@media screen and (max-width: 1280px) {
  .title {
    width: 45%;
    div {
      &:first-child {
        position: relative;
        h2 {
          padding: 0 20px 4px 20px;
          text-align: center;
        }
        hr {
          height: 3px;
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
            margin-top: -7px;
          }
          &::before {
            left: -15px;
            margin-top: -7px;
          }
        }
      }
    }
  }
}
</style>
