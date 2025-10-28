<script setup>
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
</script>

<template>
  <div class="mt-12 flex w-full flex-col items-center gap-4">
    <div class="section-wrapper gap-4">
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Все фильмы вселенной Star Wars"
        class="w-full md:w-1/4"
      />
      <Button
        icon="pi pi-cog"
        label="Настройки"
        severity="contrast"
        variant="text"
      />
    </div>
    <div class="section-wrapper">
      <Card class="w-1/4">
        <template #title>Планеты</template>
        <template #content>
          <p class="m-0">Всего планет: 500</p>
          <p class="m-0">Планет в фильме: 350</p>
        </template>
      </Card>
    </div>
    <div class="section-wrapper">
      <Card class="w-full">
        <template #title>Корабли</template>
        <template #content>
          <p class="m-0">Всего планет: 500</p>
          <p class="m-0">Планет в фильме: 350</p>
        </template>
      </Card>
    </div>
    <div class="section-wrapper">
      <Card class="w-full">
        <template #title>Корабли по классам</template>
        <template #content>
          <p class="m-0">Всего планет: 500</p>
          <p class="m-0">Планет в фильме: 350</p>
        </template>
      </Card>
    </div>
  </div>
</template>
