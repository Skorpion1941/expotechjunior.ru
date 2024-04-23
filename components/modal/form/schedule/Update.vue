<script setup>
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { closeModal, itemValue } from "../../useModal";
import { allProjects } from "~/util/useProjects";
import { fetchSchedules, updateSchedule } from "~/util/useSchedules";
const loading = ref(false);
const errorMessage = reactive({
  project: "",
});
const project = ref();
project.value = Object.values(allProjects.value).find(
  (item) => item.id == itemValue.value.project_id
);
const projectMain = ref([itemValue.value.project_id, "", project.value?.name]);
const updateProjectValue = reactive({
  project: projectMain.value,
  date: itemValue.value.date,
  time: itemValue.value.time,
});

const schema = Yup.object().shape({
  date: Yup.string().required("Это поле обязательно"),
  time: Yup.string().required("Это поле обязательно"),
});

const update = async () => {
  errorMessage.project = "";
  if (updateProjectValue.project.length == 0) {
    errorMessage.project = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    await updateSchedule({
      id: itemValue.value.id,
      date: updateProjectValue.date,
      time: updateProjectValue.time,
      project_id: updateProjectValue.project[0],
    });
    await fetchSchedules();
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
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }">
      <UiSelect
        v-model:model-value="updateProjectValue.project"
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
          v-model="updateProjectValue.date"
          min="2024-05-17"
          max="2024-05-22"
        />
        <p v-if="errors">{{ errors.date }}</p>
        <label for="">Время</label>
        <Field type="time" name="time" v-model="updateProjectValue.time" />
        <p v-if="errors">{{ errors.time }}</p>
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
