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

const tableSizeColumns = "110px 320px 227px 260px";

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

const compareTime = (a: any, b: any) => {
  let dateA = new Date(a.time);
  let dateB = new Date(b.time);
  return dateA - dateB;
};

const filterSchedules = () => {
  schedules.value = Object.values(allSchedules.value).filter(
    (item: any) => item.date == day.value.day.data
  );
  schedules.value.sort(compareTime);
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
  <div class="table">
    <ScheduleTableBase
      style="height: 545px"
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
          <nuxt-link :to="`/projects/${arr.projects.name}`">
            <h5>{{ arr.time.slice(0, -3) }}</h5>
          </nuxt-link>
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          <nuxt-link :to="`/projects/${arr.projects.name}`">
            <h5>{{ arr.projects.name }}</h5>
          </nuxt-link>
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          <nuxt-link :to="`/projects/${arr.projects.name}`">
            <h5>{{ findDirection(arr.projects.direction_id) }}</h5>
          </nuxt-link>
        </ScheduleTableColumn>
        <ScheduleTableColumn>
          <nuxt-link :to="`/projects/${arr.projects.name}`">
            <div
              style="display: flex; gap: 5px; justify-content: center"
              v-for="team in arr.projects.team"
              :key="team.id"
            >
              <h5>{{ team.surname }} {{ team.name }},</h5>
            </div>
          </nuxt-link>
        </ScheduleTableColumn>
      </ScheduleTableRow>
    </ScheduleTableBase>
  </div>
</template>
<style scoped lang="scss">
.table {
  background: rgba(196, 196, 196, 0.3);
}
a {
  text-decoration: none;
  color: white;
}
</style>
