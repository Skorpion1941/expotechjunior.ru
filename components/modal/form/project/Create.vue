<script setup>
import { reactive, ref, onMounted } from "vue";
import * as Yup from "yup";
import { closeModal } from "../../useModal";
import { allDirections } from "~/util/useDirections";
import { allProjects, fetchProjects } from "~/util/useProjects";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
  team: "",
});
const createProjectValue = reactive({
  name: "",
  title_photo: "default.png",
  tilda_url: "",
  description: "",
  team: null,
  direction: [],
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  tilda_url: Yup.string().url().required("Это поле обязательно"),
});

const createProject = async () => {
  errorMessage.direction = "";
  if (createProjectValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  if (createProjectValue.team.length == 0) {
    errorMessage.team = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.from("projects").insert({
      name: createProjectValue.name,
      title_photo: createProjectValue.title_photo,
      tilda_url: createProjectValue.tilda_url,
      description: createProjectValue.description,
      team: createProjectValue.team,
      direction_id: createProjectValue.direction[0],
      user_id: user.id,
    });
    await fetchProjects();
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
      <div class="photo">
        <UiPhoto
          v-model:path="createProjectValue.title_photo"
          width="100%"
          height="100%"
          :update="true"
        >
        </UiPhoto>
      </div>

      <UiInput
        label="Название проекта:"
        name="name"
        type="text"
        placeholder="Введите название"
        v-model:model-value="createProjectValue.name"
        :errors="errors.name"
      ></UiInput>
      <div>
        <label>О себе:</label>
        <textarea v-model="createProjectValue.description"></textarea>
      </div>
      <UiSelect
        v-model:model-value="createProjectValue.direction"
        :array="allDirections"
        label="Напрвление проекта"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>

      <p>{{ errorMessage.direction }}</p>
      <ModalFormProjectTeam
        v-model:model-value="createProjectValue.team"
        label="Команда проекта"
      ></ModalFormProjectTeam>
      <p>{{ errorMessage.team }}</p>
      <UiInput
        label="Сылка на проект Tilda:"
        name="tilda_url"
        type="url"
        placeholder="https://"
        v-model:model-value="createProjectValue.tilda_url"
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
    height: 400px;
    display: flex;
    justify-content: center;
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
  textarea {
    max-width: 96%;
    min-width: 96%;
    min-height: 60px;
    max-height: 300px;
    padding: 10px;
    border-radius: 20px;
    font-size: 14px;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background: $second-color;
      border-radius: 0 20px 20px 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $first-color;
      border-radius: 20px;
    }
  }
}
@media screen and (max-width: 1280px) {
  form {
    .photo {
      height: 300px;
    }
  }
}
</style>
