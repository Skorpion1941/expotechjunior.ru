<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { allDirections } from "~/util/useDirections";
import { allProjects } from "~/util/useProjects";
const projects = ref();
const filters = reactive({
  sortDirection: [],
  searchQuery: "",
});
const selectDirection = ref();
const count = ref(0);
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
  count.value = projects.value.length;
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
  count.value = projects.value.length;
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
    <div class="card" v-auto-animate>
      <div class="container" v-auto-animate v-if="count > 0">
        <ProjectCardList :array="projects" role="user"></ProjectCardList>
      </div>
      <div v-else class="empty">
        <h2>Ничего не найдено</h2>
        <h5>Попробуйте изменить критерии поиска</h5>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.my-project {
  width: 80%;
  margin: 100px auto;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .filter {
    display: flex;
    gap: 15px;
  }
  .card {
    margin: 100px 0;
    min-height: 500px;
  }
  .container {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(3, minmax(30%, 1fr));
    width: 100%;
    gap: 50px;
  }
  .empty {
    margin-top: 200px;
    text-align: center;
  }
}
@media screen and (max-width: 800px) {
  .title {
    width: 700px;
  }
}
</style>
