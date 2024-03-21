<script lang="ts" setup>
import { onMounted } from "vue";
import { openModal } from "../components/modal/useModal";
import { allProjects } from "~/util/useProjects";
const { user } = useAuthStore();
const myProjects = ref();
const userProject = () => {
  myProjects.value = allProjects.value;
  myProjects.value = Object.values(allProjects.value).filter(
    (project) => project.user_id == user.id
  );
  console.log(myProjects.value);
};
onMounted(() => {
  userProject();
});
</script>

<template>
  <UserInfo></UserInfo>
  <div class="my-project">
    <div class="title">
      <UiTitle name="МОИ ПРОЕКТЫ"></UiTitle
      ><button @click="openModal('projectCreate', 'Новый проект')">
        Добавить проект
      </button>
    </div>
    <div class="container">
      <ProjectCardList :array="myProjects"></ProjectCardList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.my-project {
  width: 80%;
  margin: 200px auto;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .container {
    margin: 100px 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 200px;
    justify-content: flex-start;
  }
}
</style>
