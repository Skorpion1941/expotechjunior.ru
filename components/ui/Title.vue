import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  name: String,
  width: String,
});
</script>
<template>
  <div class="title" :style="{ width: width }">
    <div>
      <h2 data-aos="fade-up" data-aos-offset="0" data-aos-duration="500">
        {{ name }}
      </h2>
      <div class="line">
        <div
          class="circle"
          data-aos="fade-left"
          data-aos-offset="0"
          data-aos-duration="1000"
        ></div>
        <hr data-aos="zoom-in" data-aos-offset="0" data-aos-duration="1000" />
        <div
          class="circle"
          data-aos="fade-right"
          data-aos-offset="0"
          data-aos-duration="1000"
        ></div>
      </div>
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
      .line {
        display: flex;
        align-items: center;
        .circle {
          width: 12px;
          height: 12px;
          border: 3px solid $second-color;
          border-radius: 50px;
        }
        hr {
          height: 4px;
          width: 100%;
          background: $second-color;
          border: none;
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
