<script setup lang="ts">
import { HEADER_DATA } from "./nav.data";

const openLink = (link: string) => {
  window.open(link);
};
</script>

<template>
  <footer>
    <div class="foot">
      <nuxt-link to="/" class="logo">
        <img src="~/public/white-logo.png"
      /></nuxt-link>
      <nav>
        <ul>
          <li v-for="item in HEADER_DATA" :key="item.name">
            <nuxt-link :to="item.url"
              ><h5>{{ item.name }}</h5></nuxt-link
            >
          </li>
        </ul>
        <h3>8-960-970-9374<br />todoo.hobbycenter@yandex.ru</h3>
      </nav>
      <div class="icon">
        <Icon
          class="img"
          @click="openLink('https://vk.com/hobby_center_tomsk')"
          name="entypo-social:vk-with-circle"
          color="white"
        ></Icon>
        <Icon
          class="img"
          @click="openLink('https://t.me/kvantoriumtomsk')"
          name="simple-icons:telegram"
          color="white"
        ></Icon>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  width: 100%;
  height: 200px;
  background: black;
  margin-top: 100px;
}
.foot {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  padding: 40px 0 0 0;
  .logo {
    img {
      height: 60px;
    }
  }
}
img {
  align-self: center;
  margin-left: 10px;
}
nav {
  width: 50%;
  height: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    color: white;
    text-align: center;
    width: 100%;
  }
}
ul {
  display: flex;
  justify-content: space-around;

  li {
    list-style-type: none;
  }
  a {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
}
.icon {
  height: 100%;
  display: flex;
  gap: 15px;
  align-self: center;
  margin-right: 10px;
  .img {
    cursor: pointer;
    width: 60px;
  }
}
@media screen and (max-width: 1280px) {
  footer {
    height: 150px;
  }
  .foot {
    .logo {
      img {
        height: 40px;
      }
    }
  }

  .icon {
    .img {
      width: 40px;
    }
  }
}
@media screen and (max-width: 800px) {
  footer {
    margin-top: 50px;
  }
}
</style>
