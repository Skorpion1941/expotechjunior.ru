<script setup lang="ts">
import { HEADER_DATA } from "./nav.data";

const openLink = (link: string) => {
  window.open(link);
};
</script>

<template>
  <footer>
    <div class="foot">
      <nuxt-link to="/">
        <img height="60px" src="~/public/white-logo.png"
      /></nuxt-link>
      <nav>
        <div>
          <ul>
            <li v-for="item in HEADER_DATA" :key="item.name">
              <nuxt-link :to="item.url"
                ><h5>{{ item.name }}</h5></nuxt-link
              >
            </li>
          </ul>
          <h3>8-960-970-9374<br />todoo.hobbycenter@yandex.ru</h3>
        </div>
      </nav>
      <div class="icon">
        <Icon
          class="img"
          @click="openLink('https://vk.com/hobby_center_tomsk')"
          name="entypo-social:vk-with-circle"
          size="45px"
          color="white"
        ></Icon>
        <Icon
          class="img"
          @click="openLink('https://t.me/kvantoriumtomsk')"
          name="simple-icons:telegram"
          size="45px"
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
}
img {
  align-self: center;
  margin-left: 10px;
}
nav {
  width: 50%;
  height: 100%;
  align-self: center;
  h3 {
    margin-top: 40px;
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
    padding: 10px;
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
  }
}
</style>
