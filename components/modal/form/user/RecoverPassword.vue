<script lang="ts" setup>
import { object, string, type InferType } from "yup";

const supabase = useSupabaseClient();
const router = useRouter();
const loading = ref(false);
const errorMassage = ref("");
const recoverValue = reactive({
  email: "",
  password: "",
});
const schema = object({
  email: string()
    .required("Это поле обязательно")
    .email("Введите существующий адрес эл. почты"),
  password: string()
    .required("Это поле обязательно")
    .min(6, "Минимум 6 символов")
    .max(20, "Максимум 20 символов"),
});
const recoverPassword = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.updateUser({
      email: recoverValue.email,
      password: recoverValue.email,
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
    router.push("/");
  }
};
</script>
<template>
  <Form :validation-schema="schema" v-slot="{ errors }">
    <UiInput
      label="Email :"
      name="email"
      type="email"
      placeholder="Введите Email"
      v-model:model-value="recoverValue.email"
      :errors="errors.email"
    ></UiInput>
    <UiInput
      label="Новый пароль:"
      name="password"
      type="password"
      placeholder="Введите пароль"
      v-model:model-value="recoverValue.password"
      :errors="errors.password"
    ></UiInput>
    <div>
      <button type="submit" :disabled="loading">
        <h3>{{ loading ? "Загрузка..." : "Востановить" }}</h3>
      </button>
      <p style="text-align: center">{{ errorMassage }}</p>
    </div>
  </Form>
</template>

<style scoped lang="scss">
form {
  width: 60%;
  margin: 20px auto;
  button {
    margin-top: 10px;
  }
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
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
