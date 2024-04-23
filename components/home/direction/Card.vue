<script setup lang="ts">
const supabase = useSupabaseClient();

const props = defineProps(["name", "imgUrl"]);
const { name, imgUrl } = toRefs(props);
</script>
<template>
  <div class="card">
    <div class="scale-img">
      <UiDirectionPhoto
        :path="imgUrl"
        width="100%"
        height="100%"
      ></UiDirectionPhoto>
    </div>
    <h5>{{ name.toUpperCase() }}</h5>
  </div>
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
@media screen and (max-width: 1280px) {
  .card {
    width: 400px;
    .scale-img {
      min-width: 80px;
      height: 80px;
    }
  }
}
</style>
