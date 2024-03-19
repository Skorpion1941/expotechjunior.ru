<script setup>
import { HEADER_DATA } from "./header.data";
import { openModal } from "../modal/useModal";

const { user } = useAuthStore();
</script>
<template>
  <header>
    <div>
      <NuxtImg src="/logo.svg" width="55px"></NuxtImg>
    </div>
    <ul>
      <nuxt-link
        class="link"
        v-for="item in HEADER_DATA"
        :key="item.name"
        :to="item.url"
        ><span>{{ item.name }}</span></nuxt-link
      >
    </ul>
    <div class="btn-entry">
      <div class="user-info" v-if="user.status == true">
        <NuxtLink to="/user">
          <h3>
            {{ user.surname }} {{ user.name.slice(0, 1) }}.
            {{ user.patronymic.slice(0, 1) }}.
          </h3>
          <UiAvatar :path="user.avatar_url" size="3"></UiAvatar
        ></NuxtLink>
      </div>
      <button v-else @click="openModal('login', 'Вход')"><b>ВХОД</b></button>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 2px solid $second-color;
  ul {
    .link {
      text-transform: uppercase;
      text-decoration: none;
      padding: 10px;
      display: inline-block;
      transition: all 0.4s ease 0s;
      span {
        color: $third-color;
        font-size: 24px;
      }
    }
  }
  .user-info {
    a {
      display: flex;
      gap: 10px;
      align-items: center;
      color: $first-color;
    }
  }
}
</style>
