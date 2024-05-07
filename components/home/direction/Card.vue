<script setup lang="ts">
import { selectDirection } from "./useDirection";

const props = defineProps(["id", "name", "imgUrl"]);
const { id, name, imgUrl } = toRefs(props);
</script>
<template>
  <NuxtLink to="/projects" @click="selectDirection(id, name)">
    <div class="card">
      <div class="scale-img">
        <UiDirectionPhoto
          :path="imgUrl"
          width="100%"
          height="100%"
        ></UiDirectionPhoto>
      </div>
      <h5
        class="h5"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-offset="10"
      >
        {{ name.toUpperCase() }}
      </h5>
    </div>
  </NuxtLink>
</template>
<style lang="scss" scoped>
.card {
  width: 550px;
  height: 123px;
  display: flex;
  align-items: center;
  color: $third-color;
  gap: 10px;

  .scale-img {
    min-width: 120px;
    height: 120px;
  }
}
a {
  text-decoration: none;
}
@media screen and (max-width: 1280px) {
  .card {
    width: 400px;
    height: 93px;
    .scale-img {
      min-width: 80px;
      height: 80px;
    }
  }
}
@media screen and (max-width: 800px) {
  .card {
    width: 270px;
    height: 83px;
    .scale-img {
      min-width: 60px;
      height: 60px;
    }
  }
}
</style>
