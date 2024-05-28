<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import { useAuthStore } from "~/store/auth.store";
import { allProfiles } from "~/util/useProfiles";

const supabase = useSupabaseClient();
const { set } = useAuthStore();
const { open, close } = useModalStore();
const router = useRouter();

const loading = ref(false);
const errorMassage = ref("");
const myProfile = ref();
const authValue = reactive({
  email: "",
  password: "",
});
const schema = object({
  email: string()
    .required("Это поле обязательно")
    .email("Введите существующий адрес эл. почты"),
  password: string().required("Это поле обязательно"),
});

const signIn = async () => {
  try {
    loading.value = true;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: authValue.email,
      password: authValue.password,
    });
    if (user == null) {
      return;
    }
    myProfile.value = Object.values(allProfiles.value).find(
      (profile: any) => profile.id == user.user?.id
    );
    set({
      id: myProfile.value.id,
      email: user.user?.email,
      name: myProfile.value.name,
      surname: myProfile.value.surname,
      patronymic: myProfile.value.patronymic,
      avatar_url: myProfile.value.avatar_url,
      post: myProfile.value.post,
      about_me: myProfile.value.about_me,
      directions: myProfile.value.directions,
      organization: myProfile.value.organization,
      city: myProfile.value.city,
      role: myProfile.value.role,
      status: true,
    });
    if (error) {
      throw error;
    }
    router.push("/user");
    close();
  } catch (error) {
    if (error instanceof Error) {
      switch (error.status) {
        case 400:
          errorMassage.value = "Неправильно указан логин и/или пароль";
          break;
        case 500:
          errorMassage.value = "Ошибка сервера";
          break;
        default:
          errorMassage.value = "Неправильно указан логин и/или пароль";
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
      label="Email:"
      name="email"
      type="email"
      placeholder="Введите Email"
      v-model:model-value="authValue.email"
      :errors="errors.email"
    ></UiInput>
    <UiInput
      label="Пароль:"
      name="password"
      type="password"
      placeholder="Введите пароль"
      v-model:model-value="authValue.password"
      :errors="errors.password"
    ></UiInput>
    <div>
      <button type="submit" :disabled="loading">
        <h3>{{ loading ? "Загрузка..." : "Войти" }}</h3>
      </button>
      <p style="text-align: center">{{ errorMassage }}</p>
    </div>
    <p>
      Забыли пароль?
      <!-- <a
        href="#"
        @click="
          () => {
            openModal('register', 'Регистрация', true);
            fromModal('login', 'Вход', true);
          }
        "
        >Зарегистрироваться</a>  -->
      <a
        href="#"
        @click="
          () => {
            open({
              name: 'emailConfirm',
              title: 'Восстановить пароль',
              backShow: true,
              nameFrom: 'login',
              titleFrom: 'Вход',
            });
          }
        "
      >
        Востановить пароль
      </a>
    </p>
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
    p {
      width: 100%;
      color: red;
      text-align: center;
    }
  }
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
</style>
