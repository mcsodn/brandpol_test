<script setup>
// Определяем пропсы
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  totalLabel: {
    type: String,
    required: true,
  },
  inFilmLabel: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  inFilm: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  colorClass: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <Card
    class="bg-customwhite! w-1/4 rounded-3xl! pl-1"
    style="box-shadow: 2px 2px 14px 0px #01174f17"
  >
    <template #content>
      <div class="flex flex-col gap-5">
        <div class="flex w-full items-center justify-between gap-4">
          <h2 class="statistic-card-title grow">{{ props.title }}</h2>
          <img src="./../assets/icons/ext_icon.svg" alt="" />
        </div>
        <div class="flex flex-col gap-2 leading-none">
          <span class="text-customgray m-0">{{ props.totalLabel }}</span>
          <h3 class="m-0 text-[32px]">{{ props.total }}</h3>
        </div>
        <div class="flex flex-col gap-2 leading-none">
          <span class="text-customgray m-0">{{ props.inFilmLabel }}</span>
          <div class="flex gap-2">
            <h3 class="m-0 text-[32px]">{{ props.inFilm }}</h3>
            <span :class="['percent-style', props.colorClass]"
              >{{ props.percentage }}%</span
            >
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
