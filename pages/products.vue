<script lang="ts" setup>
import { onMounted } from "vue";
import { openModal } from "../components/modal/useModal";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const projects = ref();
const fetchProjectsUser = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, directions(*)")
      .order("id");

    projects.value = data;
  } catch {}
};
onMounted(async () => {
  await fetchProjectsUser();
});
</script>

<template>
  <div class="my-project">
    <div class="title">
      <UiTitle name="МОИ ПРОЕКТЫ"></UiTitle
      ><button @click="openModal('projectCreate', 'Новый проект')">
        Добавить
      </button>
    </div>
    <div class="container">
      <ProjectCardList :array="projects"></ProjectCardList>
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
