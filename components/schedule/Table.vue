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
  { name: "Докладчик(и)" },
];

const tableSizeColumns = "150px 350px 350px 350px";

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
    (item: any) => item.date == day.value.name
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
  <ScheduleTableBase
    v-model:model-value="filters.sortDirection"
    :v-bind="filters.sortDirection"
    :head="tableHeads"
    :columnTemplates="tableSizeColumns"
    size="30px"
    color="#3b61a8"
  >
    <ScheduleTableRow
      v-for="arr in schedules"
      :key="arr.id"
      :columnTemplates="tableSizeColumns"
      bgRow="black"
      color="#3b61a8"
      size="20px"
    >
      <ScheduleTableColumn>
        <h5>{{ arr.time.slice(0, -3) }}</h5>
      </ScheduleTableColumn>
      <ScheduleTableColumn>
        <h5>{{ arr.projects.name }}</h5>
      </ScheduleTableColumn>
      <ScheduleTableColumn>
        <h5>{{ findDirection(arr.projects.direction_id) }}</h5>
      </ScheduleTableColumn>
      <ScheduleTableColumn>
        <div
          style="display: flex; gap: 5px; justify-content: center"
          v-for="team in arr.projects.team"
          :key="team.id"
        >
          <h5>{{ team.surname }} {{ team.name }},</h5>
        </div>
      </ScheduleTableColumn>
    </ScheduleTableRow>
  </ScheduleTableBase>
</template>
<style scoped lang="scss"></style>
