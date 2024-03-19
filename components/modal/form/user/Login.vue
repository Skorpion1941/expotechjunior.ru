<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import { openModal, closeModal } from "../../useModal";
import { useAuthStore } from "~/store/auth.store";

const supabase = useSupabaseClient();
const authStore = useAuthStore();
const loading = ref(false);
const errorMassage = ref("");
const authValue = reactive({
  email: "",
  password: "",
});
const schema = object({
  email: string().required("Это поле обязательно").email("@"),
  password: string().required("Это поле обязательно").min(6, "Миним 6"),
});

const signIn = async () => {
  try {
    loading.value = true;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: authValue.email,
      password: authValue.password,
    });
    const id = `${user.user?.user_metadata.organization_id}`;
    const { data } = await supabase
      .from("organizations")
      .select("name, city")
      .eq("id", id);

    if (user != null) {
      authStore.set({
        id: user.user?.id,
        email: user.user?.email,
        name: user.user?.user_metadata.name,
        surname: user.user?.user_metadata.surname,
        patronymic: user.user?.user_metadata.patronymic,
        avatar_url: user.user?.user_metadata.avatar_url,
        post: user.user?.user_metadata.post,
        about_me: user.user?.user_metadata.about_me,
        directions: user.user?.user_metadata.directions,
        organization: data,
        role: user.user?.user_metadata.role,
        status: true,
      });
    }
    if (error) {
      throw error;
    }
    closeModal();
  } catch (error) {
    if (error instanceof Error) {
      switch (error.status) {
        case 400:
          errorMassage.value = "Неверный email или пароль";
          break;
        case 500:
          errorMassage.value = "Ошибка сервера";
          break;
        default:
          errorMassage.value = "Неизвестная ошибка";
          break;
      }
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Form @submit="signIn()" :validation-schema="schema" v-slot="{ errors }">
    <UiInput
      label="Email :"
      name="email"
      type="email"
      placeholder="Введите Email"
      v-model:model-value="authValue.email"
      :errors="errors.email"
    ></UiInput>
    <UiInput
      label="Пароль :"
      name="password"
      type="password"
      placeholder="Введите пароль"
      v-model:model-value="authValue.password"
      :errors="errors.password"
    ></UiInput>

    <a href="#" @click="() => openModal('confirmEmail', 'Востановление пароля')"
      >Востановить пароль</a
    >
    <div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Загрузка..." : "Войти" }}
      </button>
      <p style="text-align: center">{{ errorMassage }}</p>
    </div>
    <p>
      Нет акаунта?
      <a href="#" @click="() => openModal('register', 'Регистрация')"
        >Зарегистрироваться</a
      >
    </p>
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
    color: red;
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
