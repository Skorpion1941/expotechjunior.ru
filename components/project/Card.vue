<script lang="ts" setup>
import { defineProps } from "vue";
import { allAssessments } from "~/util/useAssessments";

const props = defineProps({
  id: Number,
  name: String,
  title_photo: String,
  direction: Object,
  tilda_url: String,
  role: String,
  onClickCard: Function,
  onClickComment: Function,
});
const cardAssessments = ref();
const rating = ref();
const score = ref();
const countAssessments = ref();
const findAssessment = () => {
  cardAssessments.value = Object.values(allAssessments.value).filter(
    (item: any) => item.projects.id == props.id
  );
  countAssessments.value = cardAssessments.value.length;
};
const countingRating = () => {
  const scoreArray = Object.values(cardAssessments.value).map(
    (item: any) => item.score
  );
  score.value = scoreArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  if (score.value <= 0) {
    rating.value = 0;
    return;
  }
  rating.value = (score.value / (16 * countAssessments.value)) * 10;
  rating.value = parseFloat(rating.value.toFixed(1));
  console.log(score);
};
const openLink = (link: string) => {
  window.open(link);
};
onMounted(() => {
  findAssessment();
  countingRating();
});
</script>

<template>
  <div class="card">
    <div class="img-project" @click="openLink(props.tilda_url as string)">
      <UiPhoto :path="title_photo" width="100%" height="100%"></UiPhoto>
    </div>
    <div class="project-info">
      <div>
        <h3>{{ name }}</h3>
        <div style="display: flex; justify-content: space-between">
          <h4 style="align-self: center">Рейтинг: {{ rating }}</h4>
          <div class="check">
            <UiSelectChecked
              :name="props.direction?.short_name"
              :color="props.direction?.color"
            ></UiSelectChecked>
          </div>
        </div>
      </div>
      <div class="comment-export">
        <!-- <Icon
          @click="onClickComment()"
          name="ant-design:comment-outlined"
          class="comment"
          size="50"
        ></Icon> -->
      </div>
      <button
        v-if="props.role == 'expert'"
        @click="openLink('https://forms.yandex.ru/u/6612a3ac3e9d08de6e1bfe24/')"
      >
        <h4>Оценить</h4>
      </button>
      <div class="btn">
        <nuxt-link :to="`/project/${name}`">
          <button><h4>Карта проекта</h4></button>
        </nuxt-link>
        <button @click="openLink(props.tilda_url as string)">
          <h4>Лендинг</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 360px;
  height: 500px;
  border: 3px solid $first-color;
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
  }
  .img-project {
    width: 100%;
    height: 50%;
  }
  h3 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }
  .check {
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-self: flex-end;
  }
  .comment-export {
    display: flex;
    justify-content: space-between;
    .comment {
      color: $first-color;
      transition: color 0.5s ease-in-out;
      cursor: pointer;
      &:hover {
        color: $second-color;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  .card {
    width: 260px;
    height: 360px;
    h3 {
      margin-top: 10px;
    }
  }
}
@media screen and (max-width: 800px) {
  .card {
    width: 200px;
    height: 280px;
    h3 {
      margin-top: 10px;
    }
  }
}
</style>
