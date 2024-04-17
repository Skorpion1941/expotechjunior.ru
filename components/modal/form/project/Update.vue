<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import * as Yup from "yup";
import { defineProps } from "vue";
import { closeModal, itemValue } from "../../useModal";
import { allDirections } from "~/util/useDirections";
import { allProjects, fetchProjects, updateProject } from "~/util/useProjects";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
  team: "",
});
const direction = ref();
const directionMain = ref([itemValue.value.direction_id, "", "", "", ""]);

const updateProjectValue = reactive({
  name: itemValue.value.name,
  title_photo: itemValue.value.title_photo,
  tilda_url: itemValue.value.tilda_url,
  team: itemValue.value.team,
  direction: directionMain.value,
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  tilda_url: Yup.string().url().required("Это поле обязательно"),
});
const findDirection = () => {
  direction.value = Object.values(allDirections.value).find(
    (item: any) => item.id == itemValue.value.direction_id
  );
  directionMain.value = [
    direction.value.id,
    direction.value.created_at,
    direction.value.short_name,
    direction.value.description,
    direction.value.name,
  ];
};
const update = async () => {
  errorMessage.direction = "";
  if (updateProjectValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  if (updateProjectValue.team.length == 0) {
    errorMessage.team = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    updateProject({
      id: itemValue.value.id,
      name: updateProjectValue.name,
      team: updateProjectValue.team,
      tilda_url: updateProjectValue.tilda_url,
      title_photo: updateProjectValue.title_photo,
      direction_id: updateProjectValue.direction[0],
      user_id: itemValue.value.user_id,
    });
    await fetchProjects();
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
onMounted(() => {
  findDirection();
  console.log(directionMain.value);
});
watch(updateProjectValue, () => {
  console.log(updateProjectValue);
});
</script>
<template>
  <div>
    <Form @submit="update()" :validation-schema="schema" v-slot="{ errors }">
      <div class="photo">
        <UiPhoto
          v-model:path="updateProjectValue.title_photo"
          width="100%"
          height="400px"
          :update="true"
        >
        </UiPhoto>
      </div>

      <UiInput
        label="Название проекта:"
        name="name"
        type="text"
        placeholder="Введите название"
        v-model:model-value="updateProjectValue.name"
        :errors="errors.name"
      ></UiInput
      ><UiSelect
        v-model:model-value="updateProjectValue.direction"
        :array="allDirections"
        label="Напрвление проекта"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>

      <p>{{ errorMessage.direction }}</p>
      <ModalFormProjectTeam
        v-model:model-value="updateProjectValue.team"
        label="Команда проекта"
      ></ModalFormProjectTeam>
      <p>{{ errorMessage.team }}</p>
      <UiInput
        label="Сылка на проект:"
        name="tilda_url"
        type="url"
        placeholder="https://"
        v-model:model-value="updateProjectValue.tilda_url"
        :errors="errors.tilda_url"
      ></UiInput>

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
  .photo {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;

    label {
    }

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
