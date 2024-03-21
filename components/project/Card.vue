<script lang="ts" setup>
import { defineProps } from "vue";
const { user } = useAuthStore();
const props = defineProps({
  id: Number,
  name: String,
  title_photo: String,
  direction: Object,
  tilda_url: String,
});

const openLink = (link: string) => {
  window.open(link);
};
</script>

<template>
  <div class="card">
    <div class="img-project">
      <UiPhoto :path="title_photo" width="100%" height="100%"></UiPhoto>
    </div>
    <div class="project-info">
      <div>
        <h3 class="project-name">{{ name }}</h3>
        <div class="check">
          <UiSelectChecked
            :name="props.direction.short_name"
            :color="props.direction.color"
          ></UiSelectChecked>
        </div>
      </div>
      <div class="btn">
        <button @click="openLink(props.tilda_url as string)">Просмотр</button>
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
  &:hover {
    box-shadow: 0 10px 40px rgb(0, 0, 0, 0.2);
  }
  .project-info {
    width: 90%;
    height: 45%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  .img-project {
    width: 100%;
    height: 50%;
  }
  .project-name {
    margin-top: 10px;
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
