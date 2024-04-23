<script setup lang="ts">
import { itemValue } from "../../useModal";

const openLink = (link: string) => {
  window.open(link);
};
</script>
<template>
  <div class="photo" @click="openLink(itemValue.tilda_url)">
    <UiPhoto v-model:path="itemValue.title_photo" width="100%" height="400px">
    </UiPhoto>
  </div>
  <div class="card">
    <h3>{{ itemValue.name }}</h3>
    <div>
      <h3>Описание проекта:</h3>
      <h6>{{ itemValue.description }}</h6>
    </div>
    <div>
      <h3>Над проектом работали</h3>
      <ol>
        <li v-for="team in itemValue.team" :key="team.id">
          <h3>{{ team.surname }} {{ team.name }}</h3>
        </li>
      </ol>
    </div>
  </div>
</template>
<style scoped lang="scss">
.photo {
  width: 100%;

  display: flex;
  justify-content: center;
}

.card {
  width: 90%;
  margin: 20px auto;
  li {
    margin: 0 20px;
    font-size: 20px;
    font-weight: bold;
  }
  h1,
  h6 {
    text-align: justify;
  }
  .comment {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
