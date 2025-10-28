<template>
  <Card
    class="bg-customwhite! w-1/4 rounded-3xl! pl-1"
    style="box-shadow: 2px 2px 14px 0px #01174f17"
  >
    <template #content>
      <div class="flex flex-col gap-5">
        <div class="flex w-full items-center justify-between gap-4">
          <h2 class="statistic-card-title grow">Планеты</h2>
          <img src="./../assets/icons/ext_icon.svg" alt="" />
        </div>
        <div class="flex flex-col gap-2 leading-none">
          <span class="text-customgray m-0">Всего планет</span>
          <h3 class="m-0 text-[32px]">500</h3>
        </div>
        <div class="flex flex-col gap-2 leading-none">
          <span class="text-customgray m-0">Планет в фильме</span>
          <div class="flex gap-2">
            <h3 class="m-0 text-[32px]">350</h3>
            <span class="leading-[140%] font-semibold text-amber-600!"
              >34%</span
            >
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
