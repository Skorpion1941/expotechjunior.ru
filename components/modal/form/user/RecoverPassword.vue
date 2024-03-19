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
  email: string().required("Это поле обязательно").email("@"),
  password: string().required("Это поле обязательно").min(6, "Миним 6"),
});
const recoverPassword = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.updateUser({
      email: recoverValue.email,
      password: recoverValue.password,
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
  <Form
    @submit="recoverPassword()"
    :validation-schema="schema"
    v-slot="{ errors }"
  >
    <UiInput
      label="Email :"
      name="email"
      type="email"
      placeholder="Введите Email"
      v-model:model-value="recoverValue.email"
      :errors="errors.email"
    ></UiInput>
    <UiInput
      label="Пароль :"
      name="password"
      type="password"
      placeholder="Введите пароль"
      v-model:model-value="recoverValue.password"
      :errors="errors.password"
    ></UiInput>
    <div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Загрузка..." : "Востановить" }}
      </button>
      <p style="text-align: center">{{ errorMassage }}</p>
    </div>
  </Form>
</template>

<style scoped lang="scss">
form {
  width: 60%;
  margin: 40px auto;
  div {
    display: flex;
    gap: 5px;
    margin: 5px 0;
    flex-direction: column;
  }
  p {
    font-size: 16px;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
