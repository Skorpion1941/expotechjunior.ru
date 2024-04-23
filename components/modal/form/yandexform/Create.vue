<script setup>
import { reactive, ref, onMounted } from "vue";
import * as Yup from "yup";
import { closeModal } from "../../useModal";
import { allDirections } from "~/util/useDirections";
import { fetchForms } from "~/util/useForm";
const supabase = useSupabaseClient();
const loading = ref(false);
const errorMessage = reactive({
  direction: "",
});
const createFormValue = reactive({
  url_form: "",
  direction: [],
});

const schema = Yup.object().shape({
  url_form: Yup.string().url().required("Это поле обязательно"),
});

const createForm = async () => {
  errorMessage.direction = "";
  if (createFormValue.direction.length == 0) {
    errorMessage.direction = "Это поле обязательно";
    return;
  }
  try {
    loading.value = true;
    const { error } = await supabase.from("forms").insert({
      direction_id: createFormValue.direction[0],
      url_form: createFormValue.url_form,
    });
    await fetchForms();
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
    <Form @submit="createForm()" :validation-schema="schema" v-slot="{ errors }"
      ><UiSelect
        v-model:model-value="createFormValue.direction"
        :array="allDirections"
        label="Напрвление проекта"
        :name="4"
        placeholder="Выберите направление"
      ></UiSelect>

      <p>{{ errorMessage.direction }}</p>

      <UiInput
        label="Сылка на YandexForm:"
        name="url_form"
        type="url"
        placeholder="https://"
        v-model:model-value="createFormValue.url_form"
        :errors="errors.url_form"
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
