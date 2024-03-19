<script lang="ts" setup>
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
onMounted(() => {
  array.value = JSON.parse(authStore.user.directions);
  console.log(array.value);
});
</script>

<template>
  <div class="user-info">
    <div class="user-block">
      <div class="icon">
        <button @click="signOut" style="background: none !important">
          <Icon name="icomoon-free:exit" color="white" size="30px"></Icon>
        </button>
      </div>
      <div class="info-avatar">
        <div>
          <UiAvatar :path="authStore.user.avatar_url" size="10"></UiAvatar>
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
            <h1>Организация</h1>
            <h2 style="padding-top: 10px">
              {{ authStore.user.organization[0].name }},
              {{ authStore.user.organization[0].city }}
            </h2>
            <h2>
              {{
                authStore.user.post.charAt(0).toUpperCase() +
                authStore.user.post.substr(1)
              }}
            </h2>
          </div>
          <div class="direction" v-if="authStore.user.role == 'expert'">
            <h1>Направления интересов</h1>
            <div>
              <UiSelectCheckedList :array="array"></UiSelectCheckedList>
            </div>
          </div>

          <div v-if="authStore.user.about_me">
            <h1 style="padding-top: 10px">О себе</h1>
            <h2>{{ authStore.user.about_me }}</h2>
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
    }
    .info-avatar {
      max-width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      .info {
        display: flex;
        flex-direction: column;
        gap: 60px;
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
