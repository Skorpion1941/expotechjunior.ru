<script setup>
import { HEADER_DATA } from "./nav.data";
import { openModal } from "../modal/useModal";

const { user } = useAuthStore();
</script>
<template>
  <header>
    <div class="logo">
      <nuxt-link to="/"> <img src="/logo.png" width="55px" /></nuxt-link>
    </div>
    <ul>
      <li v-for="item in HEADER_DATA" :key="item.name">
        <nuxt-link class="link" :to="item.url"
          ><h5>{{ item.name }}</h5></nuxt-link
        >
      </li>
    </ul>
    <div class="btn-entry">
      <div class="user-info" v-if="user.status == true">
        <NuxtLink to="/user">
          <h3>
            {{ user.surname }} {{ user.name.slice(0, 1) }}.
            {{ user.patronymic.slice(0, 1) }}.
          </h3>
          <UiAvatar
            :path="user.avatar_url"
            width="55px"
            height="55px"
          ></UiAvatar
        ></NuxtLink>
      </div>
      <button v-else @click="openModal('login', 'Вход', false)">
        <h3>ВХОД</h3>
      </button>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $second-color;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  .logo {
    margin-left: 10px;
  }
  ul {
    width: 40%;
    display: flex;
    justify-content: space-around;
    li {
      list-style-type: none;
    }
    a {
      color: $third-color;
      text-transform: uppercase;
      text-decoration: none;
      transition: all 0.4s ease 0s;
    }
  }
  .btn-entry {
    margin-right: 10px;
    .user-info {
      a {
        display: flex;
        gap: 10px;
        align-items: center;
        color: $first-color;
      }
    }
  }
}
</style>
