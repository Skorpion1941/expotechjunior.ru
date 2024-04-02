<script setup>
import { reactive, ref, onMounted } from "vue";
import * as Yup from "yup";
import { closeModal } from "../../useModal";
import { allDirections } from "~/util/useDirections";
import { fetchOrganizations } from "~/util/useOrganizations";
const { user } = useAuthStore();
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
  team: "",
});
const createOrganizationValue = reactive({
  name: "",
  city: "",
});

const schema = Yup.object().shape({
  name: Yup.string().required("Это поле обязательно"),
  city: Yup.string().required("Это поле обязательно"),
});

const createProject = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.from("organizations").insert({
      name: createOrganizationValue.name,
      city: createOrganizationValue.city,
    });
    await fetchOrganizations();
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
      <UiInput
        label="Название организации:"
        name="name"
        type="text"
        placeholder="Введите название"
        v-model:model-value="createOrganizationValue.name"
        :errors="errors.name"
      ></UiInput>
      <UiInput
        label="Город организации:"
        name="city"
        type="text"
        placeholder="Введите город"
        v-model:model-value="createOrganizationValue.city"
        :errors="errors.city"
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
