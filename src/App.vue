<script setup>
import { useStarWarsStore } from "./stores/starWarsStore";
import StatisticCards from "./components/StatisticCards.vue";
import StarshipsStatistics from "./components/StarshipsStatistics.vue";
import StarshipsClassStatistics from "./components/StarshipsClassStatistics.vue";
import { onMounted, ref } from "vue";

const store = useStarWarsStore();
onMounted(() => {
  store.getAllFilms();
});
</script>

<template>
  <div class="mt-12 mb-12 flex w-full flex-col items-center gap-1">
    <div class="section-wrapper mb-4 gap-4">
      <Select
        v-model="store.selectedFilm"
        :options="store.films"
        optionLabel="title"
        placeholder="Все фильмы вселенной Star Wars"
        class="w-full md:w-1/4"
        filter
        @change="store.selectFilm"
      />
      <Button
        icon="pi pi-cog"
        label="Настройки"
        severity="contrast"
        variant="text"
        class="text-linkblue!"
      />
    </div>
    <div
      v-if="store.loading.films || store.loading.statistics"
      class="flex items-center justify-center py-20"
    >
      <div class="text-center">
        <div
          class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-600">Загрузка данных...</p>
      </div>
    </div>
    <div
      v-else-if="store.error"
      class="mb-8 rounded-lg border border-red-200 bg-red-50 p-6"
    >
      <div class="flex items-center">
        <div class="mr-3 text-red-400">
          <i class="pi pi-exclamation-triangle text-xl"></i>
        </div>
        <div>
          <h3 class="font-medium text-red-800">Ошибка загрузки данных</h3>
          <p class="mt-1 text-sm text-red-600">{{ store.error }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex w-full flex-col items-center gap-1">
      <StatisticCards />

      <StarshipsStatistics />

      <StarshipsClassStatistics />
    </div>
  </div>
</template>
