import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
</script>
<template>
  <div class="welcome">
    <div class="kvant-img">
      <div></div>
      <NuxtImg
        class="slide-in-fwd-left"
        src="https://avatars.mds.yandex.net/i?id=a466caf38d2bc6c687409f0097f2b3310f42654f-4888906-images-thumbs&n=13"
      ></NuxtImg>
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
            <NuxtImg
              height="45px"
              src="https://thumb.tildacdn.com/tild3036-3435-4032-b632-343164336362/-/resize/37x/-/format/webp/_.png"
            ></NuxtImg>
            <h3>
              ВСЕРОССИЙСКАЯ ЯРМАРКА<br />
              ТЕХНОЛОГИЧЕСКИХ ПРОЕКТОВ
            </h3>
          </div>
          <h1>Expo-TECH Junior</h1>
          <hr />
          <div>
            <button>Проекты участников</button>
            <button>Результаты</button>
            <NuxtLink to="https://kvantoriumtomsk.ru/"
              >Страница техопарка
              <Icon
                name="material-symbols:arrow-forward"
                color="white"
                size="30px"
              ></Icon
            ></NuxtLink>
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
      hr {
        border: 2px solid $first-color;
        margin: 20px 0;
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
