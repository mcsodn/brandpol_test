<script setup>
import { computed } from "vue";
import { useStarWarsStore } from "../stores/starWarsStore";
import { useWidgetsStore } from "../stores/widgetStore";
import StatisticCard from "./StatisticCard.vue";

const store = useStarWarsStore();
const widgetStore = useWidgetsStore();

const statsData = computed(() => [
  {
    title: "Планеты",
    totalLabel: "Всего планет",
    inFilmLabel: "Планет в фильме",
    total: store.planets.total,
    inFilm: store.planets.inFilm,
    percentage: store.planetPercentage,
    colorClass: "text-pc-orange",
    widgetName: "planets",
  },
  {
    title: "Персонажи",
    totalLabel: "Всего персонажей",
    inFilmLabel: "Персонажей в фильме",
    total: store.characters.total,
    inFilm: store.characters.inFilm,
    percentage: store.characterPercentage,
    colorClass: "text-pc-green",
    widgetName: "characters",
  },
  {
    title: "Транспортные средства",
    totalLabel: "Всего транспортных средств",
    inFilmLabel: "Транспортных средств в фильме",
    total: store.vehicles.total,
    inFilm: store.vehicles.inFilm,
    percentage: store.vehiclePercentage,
    colorClass: "text-pc-yellow",
    widgetName: "vehicles",
  },
  {
    title: "Виды существ",
    totalLabel: "Всего видов существ",
    inFilmLabel: "Видов существ в фильме",
    total: store.species.total,
    inFilm: store.species.inFilm,
    percentage: store.speciesPercentage,
    colorClass: "text-pc-blue",
    widgetName: "species",
  },
]);
</script>

<template>
  <div class="section-wrapper">
    <div class="flex w-full gap-1">
      <StatisticCard
        v-for="data in statsData"
        :key="data.title"
        :title="data.title"
        :total-label="data.totalLabel"
        :in-film-label="data.inFilmLabel"
        :total="data.total"
        :in-film="data.inFilm"
        :percentage="data.percentage"
        :color-class="data.colorClass"
        :widget="data.widgetName"
        :display="widgetStore[data.widgetName]"
      />
    </div>
  </div>
</template>
