<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { allDirections } from "~/util/useDirections";
import { allProjects } from "~/util/useProjects";
const projects = ref() as any;
const filters = reactive({
  sortDirection: [],
  searchQuery: "",
});
const selectDirection = ref();
const filtersProject = () => {
  projects.value = allProjects.value;

  if (filters.sortDirection.length > 0 && filters.sortDirection[4] != "Все") {
    projects.value = Object.values(projects.value).filter(
      (project: any) => project.directions.id == filters.sortDirection[0]
    );
  }
  if (filters.searchQuery != "") {
    projects.value = Object.values(projects.value).filter((item: any) => {
      return item.name.lastIndexOf(filters.searchQuery) != -1;
    });
  }
};

onMounted(async () => {
  projects.value = allProjects.value;
  selectDirection.value = Object.values(allDirections.value);
  if (selectDirection.value[0].name != "Все") {
    selectDirection.value.unshift({
      id: 0,
      createdAt: "",
      name: "Все",
      short_name: "Все",
      description: "Все",
      color: "Все",
    });
  }
});
watch(filters, () => {
  filtersProject();
});
</script>

<template>
  <div class="my-project">
    <div class="title">
      <UiTitle name="ПРОЕКТЫ УЧАСТНИКОВ"></UiTitle>
      <div class="filter">
        <UiSelect
          v-model:model-value="filters.sortDirection"
          :array="selectDirection"
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
    <div class="container" v-auto-animate>
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
  .filter {
    display: flex;
    gap: 15px;
  }
  .container {
    margin: 100px 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    row-gap: 100px;
    column-gap: 200px;
  }
}
</style>
