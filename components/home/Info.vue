import type { imgProps } from '@nuxt/image/dist/runtime/components/nuxt-img';
<script setup lang="ts">
interface SwiperSlide {
  id: number;
  swiperUrl: string;
}
const SWIPER_URL = ref<SwiperSlide[]>([
  {
    id: 1,
    swiperUrl:
      "https://static.tildacdn.com/tild6332-6636-4435-b862-623238396162/DYCHIM_IIEo.jpg",
  },
  {
    id: 2,
    swiperUrl:
      "https://static.tildacdn.com/tild3133-3231-4761-b331-383661323364/_GD3isPV0eI.jpg",
  },
  {
    id: 3,
    swiperUrl:
      "https://static.tildacdn.com/tild3563-3730-4631-b862-623365666132/rgDV_aHtT7Q.jpg",
  },
  {
    id: 4,
    swiperUrl:
      "https://static.tildacdn.com/tild6464-6136-4862-b635-633536616639/pznUZb9K2gA.jpg",
  },
]);
</script>
<template>
  <section>
    <div class="info">
      <div class="text">
        <h1>ЯРМАРКА В Г. ТОМСК</h1>
        <h3>
          С 17 по 23 мая в на базе Детского технопарка в Томске состоялись
          защиты проектов участников Всероссийской Ярмарки.
        </h3>
        <h3>
          В защите примут участие ребята из г. Томска, Томской области и других
          городов России.
        </h3>
      </div>
      <Swiper
        style="background-color: white"
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :slides-per-view="1"
        :loop="false"
        :effect="'creative'"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
      >
        <SwiperSlide v-for="slide in SWIPER_URL" :key="slide.id">
          <div>
            <NuxtImg :src="slide.swiperUrl" class="img"></NuxtImg>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  background: rgb(59, 97, 168);
  background: linear-gradient(
    90deg,
    rgba(59, 97, 168, 1) 0%,
    rgba(33, 119, 190, 1) 50%,
    rgba(4, 144, 214, 1) 100%
  );
  width: 100%;
}
.info {
  height: 400px;
  display: flex;
  justify-content: space-between;
  gap: 100px;
  .text {
    width: 55%;
    color: white;
    align-self: center;
    text-align: justify;
    margin-left: 200px;
    h1 {
      font-size: 30px;
      margin-bottom: 25px;
    }
    h3 {
      font-size: 24px;
      max-width: 800px;
      min-width: 400px;
      margin-top: 10px;
    }
  }
  .swiper {
    width: 600px;
    height: 400px;
    background: rgba(4, 144, 214, 1);
    .img {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
