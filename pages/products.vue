<script lang="ts" setup>
import { onMounted } from "vue";
import { openModal } from "../components/modal/useModal";
import { allDirections } from "~/util/useDirections";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const projects = ref();
const filters = reactive({
  sortDirection: [],
  searchQuery: "",
});
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
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
  await fetchProjectsUser();
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
