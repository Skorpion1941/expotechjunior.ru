<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import { openModal, closeModal, fromModal } from "../../useModal";
import { useAuthStore } from "~/store/auth.store";
import { allOrganizations } from "~/util/useOrganizations";
import { allProfiles } from "~/util/useProfiles";

const supabase = useSupabaseClient();
const authStore = useAuthStore();
const loading = ref(false);
const errorMassage = ref("");
const organization = ref();
const myProfile = ref();
const authValue = reactive({
  email: "",
  password: "",
});
const schema = object({
  email: string().required("Это поле обязательно").email("@"),
  password: string().required("Это поле обязательно").min(6, "Миним 6"),
});

const fetchMyOrganization = (id: number) => {
  organization.value = Object.values(allOrganizations.value).find(
    (item: any) => item.id === id
  );
};
const signIn = async () => {
  try {
    loading.value = true;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: authValue.email,
      password: authValue.password,
    });

    if (user != null) {
      myProfile.value = Object.values(allProfiles.value).find(
        (profile: any) => profile.id == user.user?.id
      );
      await fetchMyOrganization(user.user?.user_metadata.organization_id);
      authStore.set({
        id: myProfile.value.id,
        email: user.user?.email,
        name: myProfile.value.name,
        surname: myProfile.value.surname,
        patronymic: myProfile.value.patronymic,
        avatar_url: myProfile.value.avatar_url,
        post: myProfile.value.post,
        about_me: myProfile.value.about_me,
        directions: myProfile.value.directions,
        organization: organization.value,
        role: myProfile.value.role,
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

    <a
      href="#"
      @click="
        () => {
          openModal('confirmEmail', 'Востановление пароля', true);
          fromModal('login', 'Вход', true);
        }
      "
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
      <a
        href="#"
        @click="
          () => {
            openModal('register', 'Регистрация', true);
            fromModal('login', 'Вход', true);
          }
        "
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
