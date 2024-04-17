<script lang="ts" setup>
import { ref, defineProps } from "vue";
import type { openModal } from "~/components/modal/useModal";
import { allDirections } from "~/util/useDirections";
import { allSchedules } from "~/util/useSchedules";

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Дата", select: false },
  { name: "Время", select: false },
  { name: "Название проекта", select: false },
  { name: "Направление проекта", select: true },
  { name: "Комагда проекта", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 250px 192px 350px 300px 260px 380px";

const directions = ref();

const schedules = ref();

const indexs = ref([
  {
    id: 0,
    name: "id",
    image: false,
  },
  {
    id: 1,
    name: "date",
    image: false,
  },
  {
    id: 2,
    name: "time",
    image: false,
  },
]);
const filters = reactive({
  sortDirection: ["Все", "Все", "Все", "Все", "Все"],
});
const findDirection = (id: number) => {
  const direction: any = Object.values(allDirections.value).find(
    (item: any) => item.id == id
  );
  return `${direction.name}`;
};
const filterSchedules = () => {
  schedules.value = allSchedules.value;

  if (filters.sortDirection.length > 0 && filters.sortDirection[4] != "Все") {
    schedules.value = Object.values(schedules.value).filter(
      (item: any) => item.projects.direction_id == filters.sortDirection[0]
    );
  }
  if (search.value != "") {
    schedules.value = Object.values(schedules.value).filter((item: any) => {
      return item.projects.name.lastIndexOf(search.value) != -1;
    });
  }
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
  filterSchedules();
});
watch(filters, () => {
  filterSchedules();
});
watch(search, () => {
  filterSchedules();
});
watch(allSchedules, () => {
  filterSchedules();
});
</script>

<template>
  <UiTableBase
    v-model:model-value="filters.sortDirection"
    :v-bind="filters.sortDirection"
    :array="directions"
    :name="2"
    width="400px"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
  >
    <div class="tables">
      <UiTableRow
        v-for="arr in schedules"
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
          {{ arr.projects.name }}
        </UiTableColumn>
        <UiTableColumn>
          {{ findDirection(arr.projects.direction_id) }}
        </UiTableColumn>
        <UiTableColumn>
          <div
            style="display: flex; gap: 5px"
            v-for="team in arr.projects.team"
            :key="team.id"
          >
            <p>{{ team.surname }} {{ team.name }};</p>
          </div>
        </UiTableColumn>
        <UiTableColumn>
          <div class="btn">
            <button
              @click="
                () => {
                  openModal('projectUpdate', 'Изменить проект', false, arr);
                }
              "
            >
              <h3>Изменить</h3>
            </button>
            <button><h3>Удалить</h3></button>
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
