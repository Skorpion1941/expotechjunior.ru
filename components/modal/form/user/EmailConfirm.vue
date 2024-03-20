<script lang="ts" setup>
import { object, string, type InferType } from "yup";

const supabase = useSupabaseClient();
const loading = ref(false);
const isConfirm = ref(false);
const errorMassage = ref("");
const confirmValue = reactive({
  email: "",
});
const schema = object({
  email: string().required("Это поле обязательно").email("@"),
});

const confirmEmail = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.resetPasswordForEmail(
      confirmValue.email
    );
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
    isConfirm.value = true;
  }
};
</script>
<template>
  <Form
    v-if="!isConfirm"
    @submit="confirmEmail()"
    :validation-schema="schema"
    v-slot="{ errors }"
  >
    <UiInput
      label="Email :"
      name="email"
      type="email"
      placeholder="Введите Email"
      v-model:model-value="confirmValue.email"
      :errors="errors.email"
    ></UiInput>
    <div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Загрузка..." : "Подтвердить" }}
      </button>
      <p style="text-align: center">{{ errorMassage }}</p>
    </div>
  </Form>
  <div v-else class="notification">
    <h3>
      Вам на почту {{ confirmValue.email }} было отправленно письмо для
      востановления пароля <NuxtLink to="/">на главную</NuxtLink>
    </h3>
  </div>
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
  a {
    text-decoration: underline;
    color: #02c9af;
  }
}
.notification {
  width: 100%;
  h3 {
    margin: 30px 50px;
    text-align: center;
  }
}
</style>
