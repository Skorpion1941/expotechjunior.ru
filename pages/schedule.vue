<script lang="ts" setup>
const slides = ref([
  { index: 22, name: "2024-05-22" },
  { index: 21, name: "2024-05-21" },
  { index: 20, name: "2024-05-20" },
  { index: 19, name: "2024-05-19" },
  { index: 18, name: "2024-05-18" },
  { index: 17, name: "2024-05-17" },
]);
const activeSlide = ref(5);
let swiperRef: any = null;
const setSwiperRef = (swiper: any) => {
  swiperRef = swiper;
};
const slideTo = (index: number) => {
  swiperRef.slideTo(index - 1, 0);
};
const onSlideChange = (swiper: any) => {
  activeSlide.value = swiper.activeIndex;
};
</script>

<template>
  <main>
    <section class="title">
      <div>
        <UiTitle name="Расписание защит Ярмарки" width="600px"></UiTitle>
      </div>
      <h4>
        Расписание Финального этапа (защит проектов) на площадке ДТ Кванториум
        Томской обл.
      </h4>
      <h4>ВРЕМЯ УКАЗАНО ТОМСКОЕ</h4>
    </section>
    <section class="slider">
      <Swiper
        style="background-color: white"
        :modules="[SwiperNavigation]"
        :space-between="50"
        :slides-per-view="1"
        :initial-slide="5"
        :loop="false"
        dir="rtl"
        :navigation="true"
        @slideChange="onSlideChange"
        @swiper="setSwiperRef"
      >
        <SwiperSlide v-for="slide in slides" :key="slide.index">
          <div>
            <h1>{{ slide.index }}</h1>
          </div>
        </SwiperSlide>
      </Swiper>
      <h2>МАЯ</h2>
      <div class="btn">
        <button @click="slideTo(6)">17 мая</button>
        <button @click="slideTo(5)">18 мая</button>
        <button @click="slideTo(4)">19 мая</button>
        <button @click="slideTo(3)">20 мая</button>
        <button @click="slideTo(2)">21 мая</button>
        <button @click="slideTo(1)">22 мая</button>
      </div>
    </section>
    <div class="table">
      <ScheduleTable :day="slides[activeSlide]"></ScheduleTable>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.title {
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  color: $third-color;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  h4 {
    font-size: 18px;
  }
}
.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h2 {
    color: $third-color;
    font-size: 30px;
  }
  .btn {
    margin: 10px 0;
    display: flex;
    gap: 20px;
    justify-content: center;
    button {
      background: none !important;
      border: none !important;
      font-size: 40px;
      color: $third-color;
    }
  }
}
.swiper {
  margin-top: 100px;
  width: 300px;
  height: 100px;
  background: rgba(4, 144, 214, 1);
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    h1 {
      color: $third-color;
      align-self: center;
      font-size: 40px;
    }
  }
}
.table {
  width: 1200px;
  margin: 100px auto;
}
</style>
