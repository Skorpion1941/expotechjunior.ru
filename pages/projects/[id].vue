<script lang="ts" setup>
import { allAssessments } from "~/util/useAssessments";
import { allProjects } from "~/util/useProjects";

const supabase = useSupabaseClient();

const route = useRoute();
const nameProject = route.params.id;

const project = ref();
const commentsProject = ref([]);
const error = ref(false);
const find = ref(false);

const cardAssessments = ref();
const rating = ref(0);
const score = ref(0);
const countAssessments = ref(0);

const findProject = () => {
  project.value = Object.values(allProjects.value).find(
    (item: any) => item.name == nameProject
  );
  if (project.value == null) {
    error.value = true;
    return;
  }
  find.value = true;
};

const findAssessment = () => {
  cardAssessments.value = Object.values(allAssessments.value).filter(
    (item: any) => item.projects.id == project.value?.id
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

const fetchComments = async () => {
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("project_id", project.value.id)
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    if (comments === null) {
      commentsProject.value = [];
      return;
    }
    commentsProject.value = comments;
  } catch (err) {
    console.error("Ошибка", err);
  }
};
const openLink = (link: string) => {
  window.open(link);
};
onMounted(async () => {
  await findProject();
  fetchComments();
  findAssessment();
  countingRating();
});
</script>

<template>
  <div class="project" v-if="find && !error">
    <!-- Название прокета -->
    <div class="project-head" data-aos="zoom-in-down" data-aos-duration="1000">
      <h1>{{ project?.name }}</h1>
    </div>
    <div class="project-info">
      <div class="info">
        <div class="direction flex" data-aos="zoom-in" data-aos-duration="1000">
          <h3>Рейтинг: {{ rating }}</h3>
          <div class="btn">
            <!-- Кнока "Лендинг" -->
            <button @click="openLink(project?.tilda_url)">
              <h4>Лендинг проекта</h4>
            </button>
            <div style="align-self: center">
              <!-- Компонетн Направления -->
              <UiSelectChecked
                :name="project?.directions?.short_name"
                :color="project?.directions?.color"
              ></UiSelectChecked>
            </div>
          </div>
        </div>
        <!-- Описание проекта -->
        <div data-aos="fade-right" data-aos-duration="1000">
          <h2>О проекте:</h2>
          <h3 style="text-align: justify">{{ project?.description }}</h3>
        </div>
        <div
          style="margin-top: 7px"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <!-- Список команды -->
          <h2>Над проектом работали</h2>
          <ol>
            <li v-for="team in project?.team" :key="team.id">
              <h3>{{ team.surname }} {{ team.name }}</h3>
            </li>
          </ol>
        </div>
      </div>
      <div class="photo" data-aos="fade-left" data-aos-duration="1500">
        <!-- Компонетн фотографии -->
        <UiPhoto
          :path="project?.title_photo"
          width="100%"
          height="100%"
        ></UiPhoto>
      </div>
    </div>
    <div class="comment flex flex-column">
      <!-- Компонетн списка комметнарий -->
      <ProjectCommentList
        :id="project?.id"
        :comments="commentsProject"
        :on-reload-comments="() => fetchComments()"
      ></ProjectCommentList>
    </div>
  </div>
  <div class="error flex" v-else>
    <h2>Проект не найден</h2>
  </div>
</template>
<style lang="scss" scoped>
.project {
  width: 80%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  &-head {
    display: flex;
    gap: 15px;
  }
  &-info {
    display: grid;
    grid-template-columns: 50% 50%;
    .info {
      width: 95%;
    }
    .direction {
      justify-content: space-between;
      .btn {
        width: 310px;
        display: flex;
        gap: 10px;
      }
      div {
        width: 100px;
      }
      h3 {
        align-self: center;
      }
    }
    ol {
      li {
        margin-left: 25px;
        font-size: 20px;
      }
    }
  }
  .list {
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    z-index: 3;
  }
  .back {
    cursor: pointer;
  }
  .photo {
    height: 420px;
  }
}
.error {
  widows: 100%;
  height: 600px;
  justify-content: center;
  h2 {
    align-self: center;
  }
}
@media screen and (max-width: 1280px) {
  .project {
    &-info {
      .direction {
        justify-content: space-between;
        .btn {
          width: 240px;
          display: flex;
          gap: 10px;
        }
        div {
          width: 100px;
          margin-right: 10px;
        }
      }
      ol {
        li {
          margin-left: 15px;
          font-size: 14px;
        }
      }
    }
    .photo {
      height: 350px;
    }
  }
}
</style>
