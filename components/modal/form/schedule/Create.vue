<script setup lang="ts">
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { allProjects } from "~/util/useProjects";
import { allSchedules, fetchSchedules } from "~/util/useSchedules";

const { close } = useModalStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const projects = ref();
const createScheduleValue = reactive({
  project: [],
  date: "",
  time: "",
});

const schema = Yup.object().shape({
  date: Yup.string().required("Это поле обязательно"),
  time: Yup.string().required("Это поле обязательно"),
});
const errorMessage = reactive({
  project: "",
});
const createSchedule = async () => {
  errorMessage.project = "";
  if (createScheduleValue.project.length == 0) {
    errorMessage.project = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.from("schedules").insert({
      date: createScheduleValue.date,
      time: createScheduleValue.time,
      project_id: createScheduleValue.project[0],
    });
    await fetchSchedules();
    if (error) throw error;
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
    <Form
      @submit="createSchedule()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <UiSelect
        v-model:model-value="createScheduleValue.project"
        :array="projects"
        label="Проект"
        :name="2"
        placeholder="Выберите проект"
      ></UiSelect>
      <p>{{ errorMessage.project }}</p>
      <div class="date-time">
        <div>
          <label for="">Дата</label>
          <Field
            type="date"
            name="date"
            v-model="createScheduleValue.date"
            min="2024-05-17"
            max="2024-05-22"
          />
          <p v-if="errors">{{ errors.date }}</p>
        </div>
        <div>
          <label for="">Время</label>
          <Field type="time" name="time" v-model="createScheduleValue.time" />
          <p v-if="errors">{{ errors.time }}</p>
        </div>
      </div>

      <div>
        <button type="submit" :disabled="loading">
          <h3>{{ loading ? "Загрузка..." : "Добавить" }}</h3>
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
    p {
      color: red;
      margin: 0px;
    }
    a {
      text-decoration: underline;
      color: #02c9af;
    }
  }
}
</style>
