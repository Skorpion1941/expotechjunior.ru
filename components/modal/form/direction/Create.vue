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
const createDirectionValue = reactive({
  name: "",
  short_name: "",
  description: "",
  color: "",
  photo: "default.png",
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  short_name: Yup.string().required("Это поле обязательно"),
  description: Yup.string().required("Это поле обязательно"),
  color: Yup.string().required("Это поле обязательно"),
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
          v-model:path="createDirectionValue.photo"
          width="100%"
          height="400px"
          :update="true"
        >
        </UiPhoto>
      </div>

      <UiInput
        label="Название направления:"
        name="name"
        type="text"
        placeholder="Введите направлнеие"
        v-model:model-value="createDirectionValue.name"
        :errors="errors.name"
      ></UiInput>
      <UiInput
        label="Аббревиатура:"
        name="short_name"
        type="text"
        placeholder="Введите аббревиатуру"
        v-model:model-value="createDirectionValue.short_name"
        :errors="errors.short_name"
      ></UiInput>
      <UiInput
        label="Описание направления:"
        name="description"
        type="text"
        placeholder="Введите описание"
        v-model:model-value="createDirectionValue.description"
        :errors="errors.description"
      ></UiInput>

      <UiInput
        label="Цвет направления:"
        name="color"
        type="text"
        placeholder="Выбирите цвет"
        v-model:model-value="createDirectionValue.color"
        :errors="errors.color"
      ></UiInput>
      <div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Загрузка..." : "Добавить" }}
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
      font-size: 20px;
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
    font-size: 16px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
