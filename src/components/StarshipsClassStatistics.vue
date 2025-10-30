<script setup>
import { computed } from "vue";
import { useStarWarsStore } from "../stores/starWarsStore";

const store = useStarWarsStore();

const chartOptions = computed(() => {
  if (!store.starshipsTypes?.total?.length) {
    return [{}];
  }

  const capitalizeFirstLetter = (inputString) => {
    return String(inputString).charAt(0).toUpperCase() + inputString.slice(1);
  };

  const shipCategories = !store.starshipsTypes.inFilm
    ? store.starshipsTypes.total.map((v) => capitalizeFirstLetter(v.name))
    : store.starshipsTypes.inFilm.map((v) => capitalizeFirstLetter(v.name));
  const shipCounts = !store.starshipsTypes.inFilm
    ? store.starshipsTypes.total.map((v) => v.data[0])
    : store.starshipsTypes.inFilm.map((v) => v.data[0]);

  return [
    {
      chart: {
        type: "bar",

        style: {
          fontFamily: ["MuseoSansCyrl", "Arial", "sans-serif"],
        },
        backgroundColor: "transparent",
        plotBackgroundColor: "transparent",
        plotBorderWidth: 0,
        plotShadow: false,

        marginRight: 50,
        borderWidth: 0,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: shipCategories,
        lineWidth: 0,
        labels: {
          style: {
            color: "#121216",
            fontSize: "14px",
            fontFamily: "MuseoSansCyrl, Arial, sans-serif",
          },
        },
      },
      yAxis: {
        max: shipCounts[0],
        allowDecimals: false,
        title: "",
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        series: {
          color: "#3379E2",
          borderRadius: {
            radius: "50%",
          },
          pointWidth: 12,

          dataLabels: {
            enabled: true,
            style: {
              color: "#121216",
              fontSize: "14px",
              textShadow: false,
              textOutline: "none",
            },
            verticalAlign: "middle",
            align: "right",
            crop: false,
            overflow: "none",
            x: 25,
          },
        },
      },
      series: [
        {
          name: "Ships",
          data: shipCounts.slice(0, 11),
        },
      ],
    },
  ];
});
</script>

<template>
  <div class="section-wrapper">
    <Card class="card-style" style="box-shadow: 2px 2px 14px 0px #01174f17">
      <template #content>
        <div class="card-content-wrapper gap-2!">
          <h2 class="chart-card-title">Корабли по классам</h2>
          <highcharts
            class="rounded-xl"
            :options="chartOptions[0]"
          ></highcharts>
        </div>
      </template>
    </Card>
  </div>
</template>
