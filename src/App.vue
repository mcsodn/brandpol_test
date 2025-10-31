<script setup>
import { useStarWarsStore } from "./stores/starWarsStore";
import { useWidgetsStore } from "./stores/widgetStore";
import StatisticCards from "./components/StatisticCards.vue";
import StarshipsStatistics from "./components/StarshipsStatistics.vue";
import StarshipsClassStatistics from "./components/StarshipsClassStatistics.vue";
import { onMounted, onUnmounted, ref } from "vue";

// стор данных
const store = useStarWarsStore();
// стор виджетов
const widgetStore = useWidgetsStore();
//локальный стор виджетов
const localWidgets = ref({
  ...widgetStore,
  changeVisibility(widget) {
    this[widget] = !this[widget];
  },
});

const unsubscribe = widgetStore.$subscribe((mutation, state) => {
  // Обновляем локальное состояние при изменении глобального
  localWidgets.value = {
    ...state,
    changeVisibility(widget) {
      this[widget] = !this[widget];
    },
  };
});

onUnmounted(() => {
  unsubscribe();
});

const applyChanges = () => {
  // Копируем локальные изменения в стор
  widgetStore.$patch({ ...localWidgets.value });
  // Закрываем всплывашку
  op.value.hide();
};

onMounted(() => {
  store.getAllFilms();
});

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
</script>

<template>
  <div class="mt-12 mb-12 flex w-full flex-col items-center gap-1">
    <div class="section-wrapper mb-4 gap-4">
      <Select
        v-model="store.selectedFilm"
        :options="store.films"
        optionLabel="ruTitle"
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
        @click="toggle"
      />
      <Popover ref="op">
        <div class="flex w-[302px] flex-col gap-0.5">
          <template v-for="widget in widgetStore.validKeys" :key="widget">
            <Button
              v-model="localWidgets[widget]"
              :label="widgetStore.getWidgetName(widget)"
              :icon="localWidgets[widget] ? 'pi pi-eye' : 'pi pi-eye-slash'"
              severity="contrast"
              variant="text"
              iconPos="right"
              class="w-full justify-between!"
              @click="localWidgets.changeVisibility(widget)"
            />
            <Divider class="m-0!" />
          </template>
          <Button label="Применить" class="mt-4!" @click="applyChanges" />
        </div>
      </Popover>
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

      <StarshipsStatistics v-if="widgetStore['starships']" />

      <StarshipsClassStatistics v-if="widgetStore['starshipsTypes']" />
    </div>
  </div>
</template>
