<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { allDirections } from "~/util/useDirections";
import { allSchedules } from "~/util/useSchedules";

const props = defineProps(["day"]);
const { day } = toRefs(props);
const tableHeads = [
  { name: "Время" },
  { name: "Название проекта" },
  { name: "Направление" },
  { name: "Выступающий" },
];

const tableSizeColumns = "80px 300px 227px 230px";

const directions = ref();
const schedules = ref();

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
  schedules.value = Object.values(allSchedules.value).filter(
    (item: any) => item.date == day.value.day.data
  );
};

const openLink = (link: string) => {
  window.open(link);
};
onMounted(() => {
  filterSchedules();
});
watch(day, () => {
  filterSchedules();
});
</script>

<template>
  <div class="tables">
    <ScheduleTableBase
      v-model:model-value="filters.sortDirection"
      :v-bind="filters.sortDirection"
      :head="tableHeads"
      :columnTemplates="tableSizeColumns"
      size="22px"
      color="white"
    >
      <ScheduleTableRow
        v-for="arr in schedules"
        :key="arr.id"
        :columnTemplates="tableSizeColumns"
        bgRow="black"
        color="white"
        size="16px"
      >
        <ScheduleTableColumn>
          {{ arr.time.slice(0, -3) }}
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          {{ arr.projects.name }}
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          {{ findDirection(arr.projects.direction_id) }}
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          <div
            style="display: flex; gap: 5px"
            v-for="team in arr.projects.team"
            :key="team.id"
          >
            <p>{{ team.surname }} {{ team.name }};</p>
          </div>
        </ScheduleTableColumn>
      </ScheduleTableRow>
    </ScheduleTableBase>
  </div>
</template>
<style scoped lang="scss">
.tables {
  color: wheat;
}
</style>
