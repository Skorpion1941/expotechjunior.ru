<script setup>
import { ref } from "vue";
import { allDirections } from "~/util/useDirections";
import { allProjects } from "~/util/useProjects";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Название", select: false },
  { name: "Фото", select: false },
  { name: "Направление", select: true },
  { name: "", select: false },
];

const tableSizeColumns = "60px 300px 300px 400px 240px";

const modelValue = ref(["Все", "Все", "Все", "Все", "Все"]);
const directions = ref();

const projects = ref();

const indexs = ref([
  {
    id: 0,
    name: "id",
    image: false,
  },
  {
    id: 1,
    name: "name",
    image: false,
  },
  {
    id: 2,
    name: "title_photo",
    image: true,
  },
]);
const filters = reactive({
  sortDirection: [],
});
const filtersProject = () => {
  projects.value = allProjects.value;

  if (filters.sortDirection.length > 0 && filters.sortDirection[4] != "Все") {
    projects.value = Object.values(projects.value).filter(
      (project) => project.directions.id == filters.sortDirection[0]
    );
  }
  if (search.value != "") {
    projects.value = Object.values(projects.value).filter((item) => {
      return item.name.lastIndexOf(search.value) != -1;
    });
  }
  console.log(projects.value);
};
onMounted(() => {
  directions.value = allDirections.value;
  if (directions.value[0].name != "Все")
    directions.value.unshift({
      id: 0,
      createdAt: "",
      name: "Все",
      short_name: "Все",
      description: "Все",
      color: "Все",
    });
  filtersProject();
});
watch(filters, () => {
  filtersProject();
});
watch(search, () => {
  filtersProject();
});
</script>

<template>
  <UiTableBase
    v-model:model-value="filters.sortDirection"
    :v-bind="modelValue"
    :array="directions"
    :name="2"
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <div class="tables">
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
          <div class="btn">
            <button>Изменить</button>
            <button>Удалить</button>
          </div>
        </UiTableColumn>
      </UiTableRow>
    </div>
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
