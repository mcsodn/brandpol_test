import { defineStore } from "pinia";

export const useWidgetsStore = defineStore("widgets", {
  state: () => ({
    planets: true,
    characters: true,
    vehicles: true,
    species: true,
    starships: true,
    starshipsTypes: true,

    validKeys: [
      "planets",
      "characters",
      "vehicles",
      "species",
      "starships",
      "starshipsTypes",
    ],
  }),

  actions: {
    changeVisibility(widget) {
      this[widget] = !this[widget];
    },
    getWidgetName(widget) {
      switch (widget) {
        case "planets":
          return "Планеты";
        case "characters":
          return "Персонажи";
        case "vehicles":
          return "Транспортные средства";
        case "species":
          return "Виды существ";
        case "starships":
          return "Корабли";
        case "starshipsTypes":
          return "Корабли по классам";
        default:
          return widget;
      }
    },
  },
});
