<script setup>
import { computed } from "vue";
import { useStarWarsStore } from "../stores/starWarsStore";
import { useWidgetsStore } from "../stores/widgetStore";
import VisibilityButton from "./VisibilityButton.vue";

const store = useStarWarsStore();
const widgetStore = useWidgetsStore();
const widgetName = "starships";

const chartOptions = computed(() => [
  {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      plotBackgroundColor: "transparent",
      plotBorderWidth: 0,
      plotShadow: false,

      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
      borderWidth: 0,

      height: 52,
      style: {
        fontFamily: ["MuseoSansCyrl", "Arial", "sans-serif"],
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0,
      ceiling: null,
      floor: null,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.round((this.y / this.point.stackTotal) * 100) + "%";
          },
          style: {
            color: "#121216",
            fontSize: "16px",
            textShadow: false,
            textOutline: "none",
          },
          verticalAlign: "middle",
          align: "left",
          crop: false,
          overflow: "none",
          x: 16,
        },
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 2,
      },
    },

    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Остальных",
        data: [store.starships.total],
        color: "#F7BC19",
      },
      {
        name: "Кораблей класса Starfighter",
        data: [store.starfighters.total],
        color: "#F96E1A",
      },
    ],
    tooltip: {
      borderRadius: 6,
      outside: true,
      style: {
        color: "#121216",
        fontSize: "16px",
        fontFamily: "MuseoSansCyrl, Arial, sans-serif",
      },
      formatter: function () {
        return (
          "<span style='font-size:12px; color:#8E8E93; text-align:center;'>Всего</span><br>" +
          this.series.name +
          " <b>" +
          this.y +
          "</b> (" +
          Math.round(this.point.percentage) +
          "%)"
        );
      },
    },
  },
  {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      plotBackgroundColor: "transparent",
      plotBorderWidth: 0,
      plotShadow: false,

      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
      borderWidth: 0,

      height: 52,
      style: {
        fontFamily: ["MuseoSansCyrl", "Arial", "sans - serif"],
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0,
      ceiling: null,
      floor: null,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.round((this.y / this.point.stackTotal) * 100) + "%";
          },
          style: {
            color: "#121216",
            fontSize: "16px",
            textShadow: false,
            textOutline: "none",
          },
          verticalAlign: "middle",
          align: "left",
          crop: false,
          overflow: "none",
          x: 16,
        },
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 2,
      },
    },

    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Остальных",
        data: [store.starships.inFilm || 0],
        color: "#F7BC19",
      },
      {
        name: "Кораблей класса Starfighter",
        data: [store.starfighters.inFilm || 1],
        color: "#F96E1A",
      },
    ],
    tooltip: {
      borderRadius: 6,
      outside: true,
      style: {
        color: "#121216",
        fontSize: "16px",
        fontFamily: "MuseoSansCyrl, Arial, sans-serif",
      },
      formatter: function () {
        return (
          "<span style='font-size:12px; color:#8E8E93; text-align:center;'>В фильме</span><br>" +
          this.series.name +
          " <b>" +
          this.y +
          "</b> (" +
          Math.round(this.point.percentage) +
          "%)"
        );
      },
    },
  },
]);
</script>

<template>
  <div class="section-wrapper">
    <Card class="card-style" style="box-shadow: 2px 2px 14px 0px #01174f17">
      <template #content>
        <div class="card-content-wrapper">
          <div class="flex justify-between">
            <h2 class="chart-card-title">
              {{ widgetStore.getWidgetName(widgetName) }}
            </h2>
            <VisibilityButton :widget="widgetName" />
          </div>
          <div class="flex">
            <div class="data-pair w-1/6 gap-1!">
              <span class="data-pair__label">Всего</span>
              <h3 class="data-pair__value">{{ store.starships.total }}</h3>
            </div>
            <div class="w-5/6">
              <highcharts
                class="rounded-xl"
                :options="chartOptions[0]"
              ></highcharts>
            </div>
          </div>
          <div class="flex" v-if="store.selectedFilm">
            <div class="data-pair w-1/6 gap-1!">
              <span class="data-pair__label">В фильме</span>
              <h3 class="data-pair__value">{{ store.starships.inFilm }}</h3>
            </div>
            <div class="w-5/6">
              <highcharts
                class="rounded-xl"
                :options="chartOptions[1]"
              ></highcharts>
            </div>
          </div>
          <div class="flex justify-center gap-8">
            <span class="legend-label__orange"
              >Кораблей класса Starfighter</span
            >
            <span class="legend-label__yellow">Остальных</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
