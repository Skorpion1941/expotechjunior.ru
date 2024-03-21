<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { openModal } from "../components/modal/useModal";
import { allDirections } from "~/util/useDirections";
import { allProjects } from "~/util/useProjects";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const projects = ref() as any;
const items = ref() as any;
const filters = reactive({
  sortDirection: [],
  searchQuery: "",
});
const filtersProject = () => {
  items.value = allProjects.value;
  items.value = Object.values(allProjects.value).filter(
    (project) => project.directions.name == filters.sortDirection[4]
  );
  console.log(items.value);
};
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
  items.value = allProjects.value;
  console.log(allProjects.value);
});
watch(filters, () => {
  if (filters.sortDirection.length != 0) {
    filtersProject();
  }
});
</script>

<template>
  <div class="my-project">
    <div class="title">
      <UiTitle name="МОИ ПРОЕКТЫ"></UiTitle>
      <div class="filter">
        <UiSelect
          v-model:model-value="filters.sortDirection"
          :array="allDirections"
          :name="4"
          placeholder="Все"
        ></UiSelect>
        <UiInput
          name="search"
          type="url"
          placeholder="Поиск"
          v-model:model-value="filters.searchQuery"
        ></UiInput>
      </div>
    </div>
    <div class="container">
      <ProjectCardList :array="items"></ProjectCardList>
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
  .filter {
    display: flex;
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
