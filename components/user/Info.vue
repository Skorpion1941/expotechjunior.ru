<script lang="ts" setup>
import { openModal } from "../modal/useModal";

const authStore = useAuthStore();
const router = useRouter();
const supabase = useSupabaseClient();
const array = ref([]);
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    authStore.clear();
    authStore.user.status = false;
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};
const updateMyUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    authStore.clear();
    authStore.user.status = false;
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};
onMounted(() => {
  array.value = authStore.user.directions;
});
</script>

<template>
  <div class="user-info">
    <div class="user-block">
      <div class="icon">
        <button
          @click="openModal('userUpdate', 'Обновление', false)"
          style="background: none !important"
        >
          <Icon name="fa-solid:user-edit" color="white" size="30px"></Icon>
        </button>
        <button @click="signOut" style="background: none !important">
          <Icon name="icomoon-free:exit" color="white" size="30px"></Icon>
        </button>
      </div>
      <div class="info-avatar">
        <div class="avatar">
          <UiAvatar
            :path="authStore.user.avatar_url"
            width="200px"
            height="200px"
          ></UiAvatar>
        </div>
        <div class="info">
          <div>
            <h1>
              {{ authStore.user.surname }} {{ authStore.user.name }}
              {{ authStore.user.patronymic }}
            </h1>
            <h3 class="">{{ authStore.user.email }}</h3>
          </div>
          <div class="info" style="gap: 5px !important">
            <h2>Организация</h2>
            <h3 style="padding-top: 10px">
              {{ authStore.user.organization }},
              {{ authStore.user.city }}
            </h3>
            <h3>
              {{
                authStore.user.post.charAt(0).toUpperCase() +
                authStore.user.post.substr(1)
              }}
            </h3>
          </div>
          <div class="direction" v-if="authStore.user.role == 'expert'">
            <h2>Направления интересов</h2>
            <div>
              <UiSelectCheckedList :array="array"></UiSelectCheckedList>
            </div>
          </div>

          <div v-if="authStore.user.about_me">
            <h2 style="padding-top: 10px">О себе</h2>
            <h4>{{ authStore.user.about_me }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  width: 100%;
  background-color: #1572b5;
  color: white;
  .user-block {
    max-width: 40%;
    min-width: 20%;
    margin: auto;
    padding: 30px;
    .icon {
      display: flex;
      justify-content: flex-end;
      button {
        border: none !important;
      }
    }

    .info-avatar {
      max-width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      .info {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
    }
    .direction {
      div {
        padding: 10px;
        display: flex;
        gap: 10px;
      }
    }
  }
}
</style>
