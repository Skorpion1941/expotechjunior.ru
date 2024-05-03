<script setup lang="ts">
import { allDirections } from "~/util/useDirections";
const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const numbers = ref([
  { id: 1, canSelect: false, color: "white" },
  { id: 2, canSelect: false, color: "white" },
  { id: 3, canSelect: false, color: "white" },
  { id: 4, canSelect: false, color: "white" },
  { id: 5, canSelect: false, color: "white" },
  { id: 6, canSelect: false, color: "white" },
  { id: 7, canSelect: false, color: "white" },
  { id: 8, canSelect: false, color: "white" },
  { id: 9, canSelect: false, color: "white" },
  { id: 10, canSelect: false, color: "white" },
  { id: 11, canSelect: false, color: "white" },
  { id: 12, canSelect: false, color: "white" },
  { id: 13, canSelect: false, color: "white" },
  { id: 14, canSelect: false, color: "white" },
  { id: 15, canSelect: false, color: "white" },
  { id: 16, canSelect: false, color: "white" },
  {
    id: 17,
    canSelect: true,
    color: "#3b61a8",
    day: { name: "17 мая", data: "2024-05-17" },
  },
  {
    id: 18,
    canSelect: true,
    color: "#0490d6",
    day: { name: "18 мая", data: "2024-05-18" },
  },
  {
    id: 19,
    canSelect: true,
    color: "#0490d6",
    day: { name: "19 мая", data: "2024-05-19" },
  },
  {
    id: 20,
    canSelect: true,
    color: "#0490d6",
    day: { name: "20 мая", data: "2024-05-20" },
  },
  {
    id: 21,
    canSelect: true,
    color: "#0490d6",
    day: { name: "21 мая", data: "2024-05-21" },
  },
  {
    id: 22,
    canSelect: true,
    color: "#0490d6",
    day: { name: "22 мая", data: "2024-05-22" },
  },
  { id: 23, canSelect: false, color: "white" },
  { id: 24, canSelect: false, color: "white" },
  { id: 25, canSelect: false, color: "white" },
  { id: 26, canSelect: false, color: "white" },
  { id: 27, canSelect: false, color: "white" },
  { id: 28, canSelect: false, color: "white" },
  { id: 29, canSelect: false, color: "white" },
  { id: 30, canSelect: false, color: "white" },
  { id: 31, canSelect: false, color: "white" },
]);
const activeDay = ref();
activeDay.value = numbers.value.find((item: any) => item.id == 17);
const onSelectDay = (id: number) => {
  numbers.value.forEach((item: any) => {
    if (item.canSelect == false) {
      item.color = "white";
      return;
    }
    if (item.id == id) {
      item.color = "#3b61a8";
      return;
    }
    item.color = "#0490d6";
  });
  activeDay.value = numbers.value.find((item: any) => item.id == id);
  console.log(activeDay.value);
};
const openLink = (link: string) => {
  window.open(link);
};
</script>

<template>
  <section>
    <UiTitle name="РАСПИСАНИЕ ЗАЩИТ ПРОЕКТОВ"></UiTitle>

    <div class="schedule">
      <div class="calendar">
        <h2 data-aos="fade-down" data-aos-duration="1000" data-aos-offset="0">
          МАЙ 2024
        </h2>
        <div class="days">
          <div v-for="day in days" :key="day">
            <h5>{{ day }}</h5>
          </div>
        </div>
        <div class="numbers">
          <div v-for="number in numbers" :key="number.id">
            <button
              class="btn"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-offset="0"
            >
              <h5
                v-if="number.canSelect"
                @click="onSelectDay(number.id)"
                :style="{
                  background: number.color,
                }"
                :class="{ can_select: number.canSelect }"
              >
                {{ number.id }}
              </h5>
              <h5 v-else>
                {{ number.id }}
              </h5>
            </button>
          </div>
        </div>
      </div>
      <div
        class="schedule-table"
        data-aos="zoom-left"
        data-aos-duration="1200"
        data-aos-offset="0"
      >
        <div class="title">
          <h2>{{ activeDay.day.name }}</h2>
          <a @click="openLink('https://www.youtube.com/@kvantorium_tomsk')">
            <h4>Переходите на трансляцию</h4>
            <Icon
              class="img"
              name="material-symbols:arrow-forward"
              color="white"
            ></Icon>
          </a>
        </div>
        <div class="table">
          <HomeScheduleTable :day="activeDay"></HomeScheduleTable>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  width: 80%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
}
.schedule {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.calendar {
  width: 40%;
  min-width: 500px;
  text-align: center;
  .days {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #ccc;
    div {
      padding: 20px;
    }
  }
  .numbers {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    div {
      width: 14.2857142857142857%;
      border: none;
      .btn {
        color: $third-color;
        background: none;
        border: none;
        border-radius: 0;

        cursor: auto;
        h5 {
          padding: 20px;
        }
        .can_select {
          color: white;
          border-radius: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
.schedule-table {
  width: 55%;
  min-width: 400px;
  height: 600px;
  background: $second-color;
  border-radius: 20px;
  color: white;
  overflow: hidden;
  .title {
    margin: 20px;
    display: flex;
    justify-content: space-between;
    a {
      cursor: pointer;
      display: flex;
      h4 {
        align-self: center;
      }
      .img {
        font-size: 30px;
      }
    }
  }
  .table {
    height: 525px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $third-color;
      border-radius: 20px;
    }
  }
}
@media screen and (max-width: 1280px) {
  h5 {
    padding: 10px;
  }
  .calendar {
    min-width: 300px;

    .days {
      div {
        padding: 10px;
      }
    }

    .numbers {
      div {
        .btn {
          h5 {
            padding: 15px;
          }
        }
      }
    }
  }
  .schedule-table {
    width: 50%;
    height: 400px;
  }
}
@media screen and (max-width: 1024px) {
  section {
    margin: 70px auto;
  }
  h5 {
    padding: 8px;
  }
  .calendar {
    min-width: 280px;
    .days {
      div {
        padding: 6px;
      }
    }

    .numbers {
      div {
        .btn {
          h5 {
            padding: 10px;
          }
        }
      }
    }
  }
  .schedule-table {
    width: 40%;
    height: 300px;
    min-width: 300px;
    .title {
      margin: 20px;
      display: flex;
      justify-content: space-between;
      a {
        cursor: pointer;
        display: flex;
        h4 {
          align-self: center;
        }
        .img {
          font-size: 20px;
          align-self: center;
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  section {
    margin: 50px auto;
  }
  .schedule-table {
    width: 30%;
    height: 270px;
    .title {
      a {
        .img {
          font-size: 20px;
          align-self: center;
        }
      }
    }
  }
}
</style>
