import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
const openLink = (link: string) => {
  window.open(link);
};
</script>
<template>
  <div class="welcome full-w">
    <div class="kvant-img full-w">
      <div class="full-wh"></div>
      <img class="slide-in-fwd-left full-wh" src="/welcome.webp" />
    </div>
    <div class="vector full-wh">
      <div class="info full-wh flex flex-column">
        <div class="info-img flex full-w">
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3261-3862-4135-a662-663334613663/-/resize/108x/-/format/webp/pgrants_logo_gp-vert.png"
            width="100px"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3234-3830-4236-a463-633365363132/-/resize/84x/-/format/webp/Blue_Brush_White.png"
            width="70px"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild6262-3963-4133-a432-363035623766/-/resize/84x/-/format/webp/noroot.png"
            width="50px"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3930-6636-4439-b033-373638663265/-/resize/211x/-/format/webp/gorizontalny_bely.png"
            height="45px"
            class="scale-img"
          ></NuxtImg>
        </div>
        <div class="info-welcome">
          <div class="full-w flex">
            <img height="60px" src="/white-logo.png" />
            <h5>
              ВСЕРОССИЙСКАЯ ЯРМАРКА<br />
              ТЕХНОЛОГИЧЕСКИХ ПРОЕКТОВ
            </h5>
          </div>
          <h1>Expo-TECH Junior</h1>
          <hr />
          <div class="full-w flex">
            <button>
              <nuxt-link to="projects">Проекты участников</nuxt-link>
            </button>
            <button class="btn">
              <nuxt-link to="schedule">Рассписание</nuxt-link>
            </button>
            <a @click="openLink('https://kvantoriumtomsk.ru/')">
              <strong>Страница техопарка</strong>
              <Icon
                name="material-symbols:arrow-forward"
                color="white"
                size="30px"
              ></Icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.welcome {
  height: 650px;
  display: grid;
  grid-template-columns: 60% 40%;
  .kvant-img {
    position: relative;
    img {
      z-index: 1;
    }
    div {
      position: absolute;
      z-index: 2;
      background: black;
      opacity: 0.3;
    }
  }
  .vector {
    background-color: $first-color;
    background: linear-gradient(0deg, $second-color 0%, $third-color 100%);
    position: relative;
    z-index: 3;
    &::before {
      content: "";
      z-index: 0;
      position: absolute;
      top: 0;
      left: -202px;
      width: 500px;
      height: 100%;
      background-color: $first-color;
      background: linear-gradient(0deg, $second-color, $third-color 100%);
      transform: skewX(20deg);
    }
    &::after {
      content: "";
      right: 0px;
      position: absolute;
      width: 0;
      height: 0;
      border-top: 400px solid $second-color;
      border-left: 845px solid transparent;
    }
  }
  .info {
    position: relative;
    z-index: 1;
    color: white;
    .info-img {
      align-items: center;
      gap: 20px;
    }
    .info-welcome {
      margin: 100px 0 0 0;
      div {
        gap: 5px;
        align-items: center;
      }
      h1 {
        margin-top: 10px;
      }
      hr {
        border: 2px solid $first-color;
        margin: 5px 0 15px 0;
        &::before {
          content: "";
          position: absolute;
          z-index: 10px;
          width: 16px;
          height: 16px;
          background-color: $first-color;
          border-radius: 50px;
          left: -14px;
          margin-top: -8px;
        }
      }
      .btn {
        background: none;
        border: 3px solid white;
        margin: 0 10px;

        &:hover {
          background-color: $second-color;
          border-color: $second-color;
        }
      }
      a {
        color: white;
        text-decoration: none;
        cursor: pointer;
      }
      strong {
        color: white;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  div {
  }
}
// @media screen and (width <= 1280px) {
//   img {
//     width: 70%;
//     height: 70%;
//   }
// }
</style>
