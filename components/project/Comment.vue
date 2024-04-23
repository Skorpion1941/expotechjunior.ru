<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  comment: Object,
});
</script>
<template>
  <div class="comment">
    <div class="comment-info">
      <div class="avatar">
        <UiAvatar
          :path="comment?.profiles.avatar_url"
          width="100%"
          height="100%"
        ></UiAvatar>
      </div>
      <h4>
        {{ comment?.profiles.surname }} {{ comment?.profiles.name }}
        {{ comment?.profiles.patronymic }}
      </h4>
    </div>
    <h6>
      {{ comment?.text }}
    </h6>
  </div>
</template>
<style scoped lang="scss">
.comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &-info {
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    h4 {
      align-self: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
  h6 {
    //background: rgb(2, 202, 175, 0.2);
    background: rgb(4, 144, 214, 0.2);
    overflow: hidden;
    width: 700px;
    border: 1px solid white;
    padding: 10px;
    border-radius: 15px;
    margin: -20px 0 0 50px;
  }
}
@media screen and (max-width: 1280px) {
  .comment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-info {
      display: flex;
      gap: 5px;
      justify-content: flex-start;
      h4 {
        align-self: center;
      }
      .avatar {
        width: 35px;
        height: 35px;
      }
    }
    h6 {
      padding: 7px;
      width: 450px;
      margin: -17px 0 0 35px;
    }
  }
}
</style>
