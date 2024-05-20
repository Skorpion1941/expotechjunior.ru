<script setup lang="ts">
import { reactive, ref } from "vue";
import * as Yup from "yup";
import { allDirections } from "~/util/useDirections";
import { allForms, fetchForms } from "~/util/useForm";

const { close } = useModalStore();
const supabase = useSupabaseClient();

const loading = ref(false);
const directions = ref();

const createFormValue = reactive({
  url_form: "",
  direction: [],
});

const schema = Yup.object().shape({
  url_form: Yup.string().url().required("Это поле обязательно"),
});
const errorMessage = reactive({
  direction: "",
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
    close();
    if (error) throw error;
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
  const forms = Object.values(allForms.value).map(
    (item: any) => item.direction_id
  );

  directions.value = Object.values(allDirections.value).filter(
    (direction: any) => !forms.includes(direction.id)
  );
});
</script>
<template>
  <div>
    <Form @submit="createForm()" :validation-schema="schema" v-slot="{ errors }"
      ><UiSelect
        v-model:model-value="createFormValue.direction"
        :array="directions"
        label="Напрвление проекта:"
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
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
  }
}
</style>
