<script lang="ts" setup>
import { openModal } from "../components/modal/useModal";
const { user } = useAuthStore();
</script>

<template>
  <UserInfo></UserInfo>
  <div class="my-project">
    <div class="title">
      <UiTitle name="МОИ ПРОЕКТЫ"></UiTitle
      ><button @click="openModal('projectCreate', 'Новый проект')">
        Добавить
      </button>
    </div>
    <div class="container">
      <div class="card">
        <NuxtImg src="/logo.svg"></NuxtImg>
        <div class="project-info">
          <h3>Приложение ITCUBE_YADRIN</h3>
          <div class="check">
            <UiSelectChecked name="КОСМО" color="red"></UiSelectChecked>
          </div>
          <div class="btn">
            <button>Просмотр</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.my-project {
  width: 80%;
  margin: 200px auto;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .card {
      width: 360px;
      height: 420px;
      border: 1px solid $first-color;
      border-radius: 20px;
      .project-info {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      img {
        width: 100%;
        height: 200px;
      }
      h3 {
        font-size: 22px;
        margin: 10px;
        color: $second-color;
      }
      .check {
        width: 35%;
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        justify-self: flex-end;
      }
    }
  }
}
</style>
