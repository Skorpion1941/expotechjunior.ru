<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { closeModal } from "../../useModal";
import { allProjects } from "~/util/useProjects";
import { fetchSchedules } from "~/util/useSchedules";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  project: "",
});
const createProjectValue = reactive({
  project: [],
  date: "",
  time: "",
});

const schema = Yup.object().shape({
  date: Yup.string().required("Это поле обязательно"),
  time: Yup.string().required("Это поле обязательно"),
});

const createProject = async () => {
  errorMessage.project = "";
  if (createProjectValue.project.length == 0) {
    errorMessage.project = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.from("schedules").insert({
      date: createProjectValue.date,
      time: createProjectValue.time,
      project_id: createProjectValue.project[0],
    });
    await fetchSchedules();
    if (error) throw error;
    closeModal();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      console.log(error);
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <Form
      @submit="createProject()"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <UiSelect
        v-model:model-value="createProjectValue.project"
        :array="allProjects"
        label="Проект"
        :name="2"
        placeholder="Выберите направление"
      ></UiSelect>
      <p>{{ errorMessage.project }}</p>
      <div class="date">
        <label for="">Дата</label>
        <Field
          type="date"
          name="date"
          v-model="createProjectValue.date"
          min="2024-05-17"
          max="2024-05-22"
        />
        <p v-if="errors">{{ errors.date }}</p>
        <label for="">Время</label>
        <Field type="time" name="time" v-model="createProjectValue.time" />
        <p v-if="errors">{{ errors.time }}</p>
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
  margin: 40px auto;
  button {
    margin-top: 10px;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
    input {
      padding: 12px 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
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
