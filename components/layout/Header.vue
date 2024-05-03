<script setup>
import { HEADER_DATA } from "./nav.data";

const { open } = useModalStore();
const { user } = useAuthStore();
</script>
<template>
  <header>
    <div class="logo">
      <nuxt-link to="/"> <img src="/logo.webp" /></nuxt-link>
    </div>
    <ul>
      <li v-for="item in HEADER_DATA" :key="item.name">
        <nuxt-link class="link" :to="item.url">
          <h5>{{ item.name }}</h5>
        </nuxt-link>
      </li>
    </ul>
    <div class="btn-entry">
      <div class="user-info" v-if="user.status == true">
        <NuxtLink to="/user">
          <h3>
            {{ user.surname }} {{ user.name.slice(0, 1) }}.
            {{ user.patronymic.slice(0, 1) }}.
          </h3>
          <div class="avatar">
            <UiAvatar
              :path="user.avatar_url"
              width="100%"
              height="100%"
            ></UiAvatar>
          </div>
        </NuxtLink>
      </div>
      <button v-else @click="open({ name: 'login', title: 'Вход' })">
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
  position: -webkit-fixed; /* Для Safari */
  position: fixed;
  top: 0;
  z-index: 1000;
  background: white;
  .logo {
    margin-top: 5px;
    margin-left: 10px;
    img {
      width: 55px;
    }
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
      text-decoration: none;
      text-transform: uppercase;
      transition: all 0.4s ease 0s;
      h5 {
        font-weight: 600;
      }
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
      .avatar {
        width: 55px;
        height: 55px;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  header {
    height: 50px;
    .logo {
      margin-top: 5px;
      img {
        width: 40px;
      }
    }

    .btn-entry {
      .user-info {
        .avatar {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
