<script lang="ts" setup>
import { defineProps } from "vue";
import { allAssessments } from "~/util/useAssessments";
import { allForms } from "~/util/useForm";

const props = defineProps({
  id: Number,
  name: String,
  title_photo: String,
  direction: Object,
  tilda_url: String,
  role: String,
  onClickCard: Function,
});
const cardForm = ref();
const urlForm = ref("");

const cardAssessments = ref();
const rating = ref(0);
const score = ref(0);
const countAssessments = ref(0);

const findForm = () => {
  cardForm.value = Object.values(allForms.value).filter(
    (item: any) => item.direction_id == props.direction?.id
  );
  urlForm.value = cardForm.value[0]?.url_form;
};

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

  rating.value =
    10 /
    ((cardAssessments.value[0]?.score_max * countAssessments.value) /
      score.value);
  rating.value = parseFloat(rating.value.toFixed(1));
};
const openLink = (link: string) => {
  window.open(link);
};
onMounted(() => {
  findForm();
  findAssessment();
  countingRating();
});
</script>

<template>
  <div class="card" data-aos="fade-up" data-aos-duration="500">
    <div class="img-project" @click="openLink(props.tilda_url as string)">
      <UiPhoto :path="title_photo" width="100%" height="100%"></UiPhoto>
    </div>
    <div class="project-info">
      <div class="info">
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
      <button v-if="props.role == 'expert'" @click="openLink(`${urlForm}`)">
        <h4>Оценить</h4>
      </button>
      <div class="btn">
        <nuxt-link :to="`/projects/${name}`">
          <button><h3>Карта проекта</h3></button>
        </nuxt-link>
        <button @click="openLink(props.tilda_url as string)">
          <h3>Лендинг</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 400px;
  height: 480px;
  border: 3px solid $first-color;
  overflow: hidden;
  border-radius: 20px;
  &:hover {
    box-shadow: 0 10px 40px rgb(2, 202, 175, 0.2);
  }
  .project-info {
    width: 90%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info {
      h3 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .img-project {
    width: 100%;
    height: 50%;
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
    margin-bottom: 20px;
  }
  // .comment-export {
  //   display: flex;
  //   justify-content: space-between;
  //   .comment {
  //     color: $first-color;
  //     transition: color 0.5s ease-in-out;
  //     cursor: pointer;
  //     &:hover {
  //       color: $second-color;
  //     }
  //   }
  // }
}
@media screen and (max-width: 1280px) {
  .card {
    width: 260px;
    height: 360px;
  }
}
@media screen and (max-width: 800px) {
  .card {
    width: 200px;
    height: 280px;
  }
}
</style>
