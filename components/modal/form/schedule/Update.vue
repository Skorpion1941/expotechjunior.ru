<script setup lang="ts">
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { allProjects } from "~/util/useProjects";
import {
  allSchedules,
  fetchSchedules,
  updateSchedule,
} from "~/util/useSchedules";

const { modal, close } = useModalStore();
const loading = ref(false);

const projects = ref();
const project = ref();
project.value = Object.values(allProjects.value).find(
  (item: any) => item.id == modal.item.project_id
);

const projectMain = ref([modal.item.project_id, "", project.value?.name]);
const updateScheduleValue = reactive({
  project: projectMain.value,
  date: modal.item.date,
  time: modal.item.time,
});

const schema = Yup.object().shape({
  date: Yup.string().required("Это поле обязательно"),
  time: Yup.string().required("Это поле обязательно"),
});

const errorMessage = reactive({
  project: "",
});

const update = async () => {
  errorMessage.project = "";
  if (updateScheduleValue.project.length == 0) {
    errorMessage.project = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    await updateSchedule({
      id: modal.item.id,
      date: updateScheduleValue.date,
      time: updateScheduleValue.time,
      project_id: updateScheduleValue.project[0],
    });
    await fetchSchedules();
    close();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  const schedules = Object.values(allSchedules.value).map(
    (item: any) => item.project_id
  );

  projects.value = Object.values(allProjects.value).filter(
    (project: any) => !schedules.includes(project.id)
  );
});
</script>
<template>
  <div>
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }">
      <UiSelect
        v-model:model-value="updateScheduleValue.project"
        :array="projects"
        label="Проект:"
        :name="2"
        placeholder="Выберите направление"
      ></UiSelect>
      <p>{{ errorMessage.project }}</p>

      <div class="date-time">
        <div>
          <div class="flex" style="gap: 5px; flex-direction: row">
            <label for="">Дата:</label>
            <p>*</p>
          </div>
          <Field
            type="date"
            name="date"
            v-model="updateScheduleValue.date"
            min="2024-05-17"
            max="2024-05-22"
          />
          <p v-if="errors">{{ errors.date }}</p>
        </div>
        <div>
          <div class="flex" style="gap: 5px; flex-direction: row">
            <label for="">Время:</label>
            <p>*</p>
          </div>
          <Field type="time" name="time" v-model="updateScheduleValue.time" />
          <p v-if="errors">{{ errors.time }}</p>
        </div>
      </div>

      <div>
        <button type="submit" :disabled="loading">
          <h3>{{ loading ? "Загрузка..." : "Изменить" }}</h3>
        </button>
      </div>
    </Form>
  </div>
</template>
<style scoped lang="scss">
form {
  width: 80%;
  margin: 20px auto;
  button {
    margin-top: 10px;
  }
  .date-time {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    div {
      display: flex;
      gap: 5px;
      margin: 5px 0;
      flex-direction: column;
      input {
        width: 150px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 15px;
      }
    }
  }
  p {
    color: red;
    margin: 0px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
