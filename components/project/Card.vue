<script lang="ts" setup>
import { defineProps } from "vue";
const { user } = useAuthStore();
defineProps({
  id: Number,
  name: String,
  title_photo: String,
  direction: Array,
  tilda_url: String,
});

const openLink = (link: string) => {
  window.open(link);
};
</script>

<template>
  <div class="card">
    <UiPhoto :path="title_photo" size="20"></UiPhoto>
    <div class="project-info">
      <div>
        <h3 class="project-name">{{ name }}</h3>
        <div class="check">
          <UiSelectChecked
            :name="direction.short_name"
            :color="direction.color"
          ></UiSelectChecked>
        </div>
      </div>
      <div class="btn">
        <button @click="openLink(tilda_url as string)">Просмотр</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 360px;
  height: 420px;
  border: 5px solid $first-color;
  overflow: hidden;
  border-radius: 20px;
  .project-info {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  img {
    width: 100%;
    height: 200px;
  }
  .project-name {
    font-size: 22px;
    color: $second-color;
  }
  .check {
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    justify-self: flex-end;
  }
}
</style>
