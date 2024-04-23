<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { openDelete, openModal } from "~/components/modal/useModal";
import { allDirections } from "~/util/useDirections";
import { allProfiles } from "~/util/useProfiles";
import { allProjects } from "~/util/useProjects";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Фото", select: false },
  { name: "Название", select: false },
  { name: "Описание", select: false },
  { name: "Направление", select: true },
  { name: "Команда", select: false },
  { name: "Пользователь", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 192px 250px 380px 350px 300px 260px 405px";

const directions = ref();

const projects = ref();

const indexs = ref([
  {
    id: 0,
    name: "id",
    image: false,
  },
  {
    id: 2,
    name: "title_photo",
    image: true,
  },
  {
    id: 1,
    name: "name",
    image: false,
  },
  {
    id: 1,
    name: "description",
    image: false,
  },
]);
const filters = reactive({
  sortDirection: ["Все", "Все", "Все", "Все", "Все"],
});
const filtersProjects = () => {
  projects.value = allProjects.value;

  if (filters.sortDirection.length > 0 && filters.sortDirection[4] != "Все") {
    projects.value = Object.values(projects.value).filter(
      (project: any) => project.directions.id == filters.sortDirection[0]
    );
  }
  if (search.value != "") {
    projects.value = Object.values(projects.value).filter((item: any) => {
      return item.name.lastIndexOf(search.value) != -1;
    });
  }
};
const findProfile = (id: string) => {
  const profile: any = Object.values(allProfiles.value).find(
    (prof: any) => prof.id == id
  );
  return `${profile.surname} ${profile.name} ${profile.patronymic}`;
};
const openLink = (link: string) => {
  window.open(link);
};
onMounted(() => {
  directions.value = Object.values(allDirections.value);
  if (directions.value[0].name != "Все")
    directions.value.unshift({
      id: 0,
      createdAt: "",
      name: "Все",
      short_name: "Все",
      description: "Все",
      color: "Все",
    });
  filtersProjects();
  console.log(allProjects.value);
});
watch(filters, () => {
  filtersProjects();
});
watch(search, () => {
  filtersProjects();
});
watch(allProjects, () => {
  filtersProjects();
});
</script>

<template>
  <UiTableBase
    v-model:model-value="filters.sortDirection"
    :v-bind="filters.sortDirection"
    :array="directions"
    :name="2"
    width="350px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <UiTableRow
      v-for="arr in projects"
      :key="arr.id"
      :columnTemplates="tableSizeColumns"
      bgRow="black"
    >
      <UiTableColumn
        v-for="index in indexs"
        :key="index.id"
        :columnTitle="index.name"
        :image="index.image"
        :src-image="arr.title_photo"
      >
        {{ arr[`${index.name}`] }}
      </UiTableColumn>
      <UiTableColumn>
        {{ arr.directions.name }}
      </UiTableColumn>

      <UiTableColumn>
        <div style="display: flex" v-for="team in arr.team" :key="team.id">
          <p>{{ team.surname }} {{ team.name }};</p>
        </div>
      </UiTableColumn>
      <UiTableColumn> {{ findProfile(arr.user_id) }}</UiTableColumn>
      <UiTableColumn>
        <div class="btn">
          <button @click="openLink(arr.tilda_url)"><h3>Просмотр</h3></button>
          <button
            @click="
              () => {
                openModal('projectUpdate', 'Изменить проект', false, arr);
              }
            "
          >
            <h3>Изменить</h3>
          </button>
          <button
            @click="
              () => {
                openModal('delete', 'Удалить проект', false, arr);
                openDelete('projects', 'проект');
              }
            "
          >
            <h3>Удалить</h3>
          </button>
        </div>
      </UiTableColumn>
    </UiTableRow>
  </UiTableBase>
</template>
<style scoped lang="scss">
.tables {
  width: 100%;
  max-height: 900px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: white;
    border-radius: 0 0 20px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $first-color;
    border-radius: 20px;
  }
}
.btn {
  display: flex;
  gap: 10px;
}
</style>
