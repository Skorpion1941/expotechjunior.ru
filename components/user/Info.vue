<script lang="ts" setup>
const { open } = useModalStore();
const { user, clear } = useAuthStore();
const router = useRouter();
const supabase = useSupabaseClient();
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    clear();
    user.status = false;
    if (error) throw error;
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};
</script>

<template>
  <div class="user-info">
    <div class="user-block">
      <div class="icon">
        <button
          @click="
            open({
              name: 'userUpdate',
              title: 'Изменить учетную запись',
            })
          "
          style="background: none !important"
        >
          <Icon name="fa-solid:user-edit" class="img" color="white"></Icon>
        </button>
        <button @click="signOut" style="background: none !important">
          <Icon name="icomoon-free:exit" class="img" color="white"></Icon>
        </button>
      </div>
      <div class="info-avatar">
        <div class="avatar">
          <UiAvatar :path="user.avatar_url"></UiAvatar>
        </div>
        <div class="info">
          <div>
            <h1>
              {{ user.surname }} {{ user.name }}
              {{ user.patronymic }}
            </h1>
            <h5 class="">{{ user.email }}</h5>
          </div>
          <div class="info" style="gap: 5px !important">
            <h2>Организация</h2>
            <h5 style="padding-top: 10px">
              {{ user.organization }},
              {{ user.city }}
            </h5>
            <h5>
              {{ user.post.charAt(0).toUpperCase() + user.post.substr(1) }}
            </h5>
          </div>
          <div class="direction" v-if="user.role == 'expert'">
            <h2>Направления интересов</h2>
            <div>
              <UiSelectCheckedList
                :array="user.directions"
              ></UiSelectCheckedList>
            </div>
          </div>

          <div v-if="user.about_me">
            <h2 style="padding-top: 10px">О себе</h2>
            <h6>{{ user.about_me }}</h6>
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
    min-width: 20%;
    margin: auto;
    padding: 30px;
    .icon {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      button {
        border: none !important;
        .img {
          width: 30px;
          height: 30px;
        }
      }
    }

    .info-avatar {
      max-width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      .avatar {
        width: 200px;
        height: 200px;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
    }
    .direction {
      div {
        padding: 10px 0 0 10px;
        display: flex;
        gap: 10px;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  .user-info {
    .user-block {
      .icon {
        button {
          .img {
            width: 25px;
            height: 25px;
          }
        }
      }

      .info-avatar {
        .avatar {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
}
</style>
