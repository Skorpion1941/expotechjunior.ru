<script lang="ts" setup>
import { allAssessments } from "~/util/useAssessments";
import { commentValue, closeComment } from "./useDrawer";

const cardAssessments = ref({});
const findAssessment = () => {
  cardAssessments.value = Object.values(allAssessments.value).filter(
    (item: any) => item.projects.id == commentValue.comment.id
  );
};

onMounted(async () => {
  findAssessment();
});
</script>

<template>
  <div class="drawer">
    <div class="full-wh"></div>
    <div class="comment-list slide-in-right" v-if="commentValue.show">
      <div class="comment-list__head">
        <Icon
          @click="closeComment()"
          name="fluent:arrow-left-28-filled"
          class="back"
          size="35px"
        ></Icon>
        <h2>Комментарии к пректу:</h2>
      </div>
      <div class="comment">
        <DrawerComment
          v-for="assessment in cardAssessments"
          :key="assessment.id"
          :comment="assessment"
        ></DrawerComment>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .comment-list {
    z-index: 1001;
    position: relative;
    width: 600px;
    height: 100vh;
    background: white;
    border-left: 3px solid $first-color;
    .comment-list__head {
      width: 90%;
      margin: 10px auto;
      display: flex;
      gap: 10px;
      .back {
        align-self: center;
        cursor: pointer;
      }
    }
    .comment {
      width: 95%;
      margin: 10px auto;
    }
  }
}
</style>
