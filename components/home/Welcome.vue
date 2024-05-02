import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
import type { NuxtImg } from "#build/components";
const openLink = (link: string) => {
  window.open(link);
};
</script>
<template>
  <div class="welcome full-w">
    <div
      class="kvant-img full-w"
      data-aos="fade-right"
      data-aos-duration="2000"
    >
      <div class="full-wh"></div>
      <img class="full-wh" src="/welcome.webp" />
    </div>
    <div class="vector full-wh">
      <div class="info full-wh flex flex-column">
        <div
          class="info-img flex full-w"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3261-3862-4135-a662-663334613663/-/resize/108x/-/format/webp/pgrants_logo_gp-vert.png"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3234-3830-4236-a463-633365363132/-/resize/84x/-/format/webp/Blue_Brush_White.png"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild6262-3963-4133-a432-363035623766/-/resize/84x/-/format/webp/noroot.png"
            class="scale-img"
          ></NuxtImg>
          <NuxtImg
            src="https://thumb.tildacdn.com/tild3930-6636-4439-b033-373638663265/-/resize/211x/-/format/webp/gorizontalny_bely.png"
            class="scale-img"
          ></NuxtImg>
        </div>
        <div class="info-welcome">
          <div class="full-w flex">
            <img
              src="/white-logo.webp"
              data-aos="zoom-in"
              data-aos-duration="1100"
            />
            <h5 data-aos="fade-left" data-aos-duration="1100">
              ВСЕРОССИЙСКАЯ ЯРМАРКА<br />
              ТЕХНОЛОГИЧЕСКИХ ПРОЕКТОВ
            </h5>
          </div>
          <h1 data-aos="fade-left" data-aos-duration="1100">
            Expo-TECH Junior
          </h1>
          <div class="line" data-aos="zoom-in-left" data-aos-duration="1000">
            <div class="circle"></div>
            <hr />
          </div>
          <div
            style="gap: 10px; align-items: center"
            class="full-w flex"
            data-aos="fade-up"
            data-aos-duration="1100"
          >
            <button>
              <nuxt-link to="projects"><h3>Проекты участников</h3></nuxt-link>
            </button>
            <button class="btn">
              <nuxt-link to="schedule"><h3>Расписание</h3> </nuxt-link>
            </button>
            <a @click="openLink('https://kvantoriumtomsk.ru/')">
              <strong>Страница техопарка</strong>
              <Icon
                name="material-symbols:arrow-forward"
                color="white"
                size="25px"
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
      content: url("/public/triangle.webp");
      right: 163px;
      position: absolute;
      margin-top: -2px;
      width: 90%;
    }
  }
  .info {
    position: relative;
    z-index: 1;
    color: white;
    .info-img {
      align-items: center;
      gap: 20px;
      img {
        &:first-child {
          width: 120px;
        }
        &:last-child {
          width: 200px;
        }
        width: 80px;
      }
    }
    .info-welcome {
      margin-top: 100px;
      img {
        width: 55px;
        height: 60px;
      }
      .line {
        width: 100%;
        display: flex;
        align-self: center;
        .circle {
          width: 16px;
          height: 16px;
          background: $first-color;
          border-radius: 50px;
        }
        hr {
          width: 100%;
          border: 2px solid $first-color;
          margin: 5px 0 15px 0;
        }
      }
      .btn {
        background: none;
        border: 3px solid white;
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
  .welcome {
    height: 400px;
    .vector {
      &::after {
        right: 180px;
        width: 90%;
      }
    }
    .info {
      .info-welcome {
        margin-top: 50px;
        img {
          height: 40px;
        }
        hr {
          border: 1.5px solid $first-color;
        }
      }
      .info-img {
        img {
          width: 50px;
          &:first-child {
            width: 80px;
          }
          &:last-child {
            width: 150px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .welcome {
    height: 400px;
    grid-template-columns: 55% 45%;
    .vector {
      &::before {
        left: -102px;
        width: 200px;
      }
      &::after {
        right: 78px;
        width: 90%;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .welcome {
    height: 280px;
    .vector {
      &::after {
        right: 90px;
        width: 90%;
      }
    }
    .info {
      .info-welcome {
        margin-top: 50px;
        img {
          height: 30px;
        }
        hr {
          border: 1.5px solid $first-color;
          margin: 5px 0 5px 0;
        }
        button {
          a {
            margin-top: 0;
          }
        }
        .btn {
          border: 2px solid white;
        }
      }
      .info-img {
        img {
          &:first-child {
            width: 45px;
          }
          &:last-child {
            width: 120px;
          }
          width: 40px;
        }
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
