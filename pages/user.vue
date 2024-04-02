<script lang="ts" setup>
import { onMounted } from "vue";
import { openModal } from "../components/modal/useModal";
import { allProjects } from "~/util/useProjects";
import { fetchRoles } from "~/util/useRoles";
const { user } = useAuthStore();
const myProjects = ref();
const filterProjects = ref();
const expertDirections = ref();
const filters = reactive({
  sortDirection: [],
  searchQuery: "",
});
const selectDirection = ref([]);

const userProject = () => {
  myProjects.value = allProjects.value;
  myProjects.value = Object.values(allProjects.value).filter(
    (project) => project.user_id == user.id
  );
  filtersProject();
};
const userCreate = () => {
  if (myProjects.value.length <= 5) {
    openModal("projectCreate", "Новый проект", false);
  }
};
const expertProject = () => {
  expertDirections.value = user.directions.map((item: any) => item.id);
  myProjects.value = Object.values(allProjects.value).filter((project) => {
    return Object.values(expertDirections.value).includes(project.direction_id);
  });
  filtersProject();
};
const filtersProject = () => {
  filterProjects.value = myProjects.value;
  console.log(filters.sortDirection.length);
  if (filters.sortDirection.length != 0 && filters.sortDirection[4] != "Все") {
    filterProjects.value = Object.values(filterProjects.value).filter(
      (project) => project.directions.name == filters.sortDirection[4]
    );
  }
  if (filters.searchQuery != "") {
    filterProjects.value = Object.values(filterProjects.value).filter(
      (item: any) => {
        return item.name.lastIndexOf(filters.searchQuery) !== -1;
      }
    );
  }
};

onMounted(() => {
  filterProjects.value = myProjects.value;

  console.log(allProjects.value);
  if (user.role == "user") {
    userProject();
    return;
  }
  if (user.role == "expert") {
    expertProject();
    selectDirection.value = Object.values(user.directions);
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
    return;
  }
  fetchRoles();
});
watch(filters, () => {
  filtersProject();
});
watch(allProjects, () => {
  userProject();
});
</script>

<template>
  <div>
    <UserInfo></UserInfo>
    <div class="my-project" v-if="user.role != 'admin'">
      <div class="title">
        <UiTitle
          :name="user.role == 'user' ? 'МОИ ПРОЕКТЫ' : 'ПРОЕКТЫ ДЛЯ ОЦЕНКИ'"
        ></UiTitle>
        <div class="filter">
          <button v-if="user.role == 'user'" @click="userCreate()">
            Добавить проект
          </button>
          <UiSelect
            v-if="selectDirection.length > 2 && user.role == 'expert'"
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
        <ProjectCardList
          v-if="user.role != 'admin'"
          :array="filterProjects"
          :role="user.role"
        ></ProjectCardList>
      </div>
    </div>
    <div v-else><UserAdmin></UserAdmin></div>
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
  .filter {
    display: flex;
    gap: 15px;
  }
}
</style>
