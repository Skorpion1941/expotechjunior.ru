import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
const openLink = (link: string) => {
  window.open(link);
};
</script>
<template>
  <div class="welcome">
    <div class="kvant-img">
      <div></div>
      <img class="slide-in-fwd-left" src="~/public/welcome.webp" />
    </div>
    <div class="vector">
      <div class="info">
        <div class="info-img">
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
          <div>
            <img height="60px" src="~/public/white-logo.png" />
            <p>
              ВСЕРОССИЙСКАЯ ЯРМАРКА<br />
              ТЕХНОЛОГИЧЕСКИХ ПРОЕКТОВ
            </p>
          </div>
          <h1>Expo-TECH Junior</h1>
          <hr />
          <div>
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
  width: 100%;
  height: 650px;
  display: grid;
  grid-template-columns: 60% 40%;
  .kvant-img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;

      z-index: 1;
    }
    div {
      position: absolute;
      z-index: 2;
      width: 100%;
      background: black;
      opacity: 0.3;
      height: 100%;
    }
  }
  .vector {
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    .info-img {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 20px;
    }
    .info-welcome {
      margin: 100px 0 0 0;
      div {
        display: flex;
        gap: 5px;
        align-items: center;
        width: 100%;
      }
      p {
        font-size: 26px;
      }
      h1 {
        font-size: 44px;
        margin-top: 10px;
      }
      hr {
        border: 2px solid $first-color;
        margin: 5px 0 15px 0;
        &::before {
          content: "";
          position: absolute;
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
        font-size: 18px;
      }
    }
  }
}

// @media screen and (width <= 1280px) {
//   img {
//     width: 70%;
//     height: 70%;
//   }
// }
</style>
