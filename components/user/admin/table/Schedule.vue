<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { allDirections } from "~/util/useDirections";
import { allSchedules } from "~/util/useSchedules";

const { open } = useModalStore();

const props = defineProps(["search"]);
const { search } = toRefs(props);
const tableHeads = [
  { name: "№", select: false },
  { name: "Дата", select: false },
  { name: "Время", select: false },
  { name: "Название проекта", select: false },
  { name: "Направление проекта", select: true },
  { name: "Команда проекта", select: false },
  { name: "", select: false },
];

const tableSizeColumns = "60px 250px 192px 350px 400px 300px 345px";

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
  return `${direction?.name}`;
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
onMounted(() => {
  directions.value = Object.values(allDirections.value);
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
        {{ arr.projects?.name }}
      </UiTableColumn>
      <UiTableColumn>
        {{ findDirection(arr.projects?.direction_id) }}
      </UiTableColumn>
      <UiTableColumn>
        <div
          style="display: flex; gap: 5px"
          v-for="team in arr.projects?.team"
          :key="team.id"
        >
          <p>{{ team.surname }} {{ team.name }};</p>
        </div>
      </UiTableColumn>
      <UiTableColumn>
        <div class="btn">
          <button
            @click="
              open({
                name: 'scheduleUpdate',
                title: 'Изменить расписание',
                item: arr,
              })
            "
          >
            <h3>Изменить</h3>
          </button>
          <button
            @click="
              open({
                name: 'delete',
                title: 'Удалить расписание',
                item: arr,
                tableDelete: 'schedules',
                textDelete: 'расписание',
              })
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
.btn {
  display: flex;
  gap: 10px;
}
</style>
