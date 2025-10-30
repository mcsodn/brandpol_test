import { defineStore } from "pinia";
import axios from "axios";

export const useStarWarsStore = defineStore("starWars", {
  state: () => ({
    loading: {
      films: false,
      statistics: false,
      ships: false,
    },

    error: null,

    films: [],
    selectedFilm: null,

    allPlanets: [],
    allCharacters: [],
    allVehicles: [],
    allSpecies: [],
    allStarships: [],
    allStarfighters: [],

    planets: { total: 0, inFilm: 0 },
    characters: { total: 0, inFilm: 0 },
    vehicles: { total: 0, inFilm: 0 },
    species: { total: 0, inFilm: 0 },
    starships: { total: 0, inFilm: 0 },
    starfighters: { total: 0, inFilm: 0 },

    starshipsTypes: { total: null, inFilm: null },
  }),

  getters: {
    planetPercentage: (state) => {
      if (state.planets.total === 0) return 0;
      return Math.round((state.planets.inFilm / state.planets.total) * 100);
    },

    characterPercentage: (state) => {
      if (state.characters.total === 0) return 0;
      return Math.round(
        (state.characters.inFilm / state.characters.total) * 100,
      );
    },

    vehiclePercentage: (state) => {
      if (state.vehicles.total === 0) return 0;
      return Math.round((state.vehicles.inFilm / state.vehicles.total) * 100);
    },

    speciesPercentage: (state) => {
      if (state.species.total === 0) return 0;
      return Math.round((state.species.inFilm / state.species.total) * 100);
    },

    starshipPercentage: (state) => {
      if (state.starships.total === 0) return 0;
      return Math.round((state.starships.inFilm / state.starships.total) * 100);
    },
  },

  actions: {
    async getAllFilms() {
      this.loading.films = true;
      this.error = null;

      const starWarsFilms = {
        "The Phantom Menace": "Эпизод I: Скрытая угроза",
        "Attack of the Clones": "Эпизод II: Атака клонов",
        "Revenge of the Sith": "Эпизод III: Месть ситхов",
        "A New Hope": "Эпизод IV: Новая надежда",
        "The Empire Strikes Back": "Эпизод V: Империя наносит ответный удар",
        "Return of the Jedi": "Эпизод VI: Возвращение джедая",
      };

      try {
        const response = await axios.get("https://swapi.dev/api/films/");
        this.films = response.data.results.map((film) => {
          return {
            ...film,
            ruTitle: starWarsFilms[film.title],
          };
        });

        if (this.films.length > 0) {
          await this.loadData();
        }
      } catch (error) {
        this.error = "Failed to fetch films";
        console.error("Error fetching films:", error);
      } finally {
        this.loading.films = false;
      }
    },

    async loadData() {
      async function fetchPage(url, allResults = []) {
        try {
          const response = await axios.get(url);
          const data = response.data;

          // Добавляем результаты текущей страницы
          allResults.push(...data.results);

          // Если есть следующая страница — рекурсивно вызываем функцию
          if (data.next) {
            return fetchPage(data.next, allResults);
          }

          return allResults; // Возвращаем итоговый массив
        } catch (error) {
          console.error("Ошибка при запросе к API:", error);
          throw error;
        }
      }
      try {
        const [
          planetsRes,
          charactersRes,
          vehiclesRes,
          speciesRes,
          starshipsRes,
        ] = await Promise.all([
          fetchPage("https://swapi.dev/api/planets/"),
          fetchPage("https://swapi.dev/api/people/"),
          fetchPage("https://swapi.dev/api/vehicles/"),
          fetchPage("https://swapi.dev/api/species/"),
          fetchPage("https://swapi.dev/api/starships/"),
        ]);

        this.allPlanets = planetsRes;
        this.allCharacters = charactersRes;
        this.allVehicles = vehiclesRes;
        this.allSpecies = speciesRes;
        this.allStarships = starshipsRes;
        this.allStarfighters = starshipsRes.filter(
          (v) =>
            v.starship_class.toLowerCase().includes("starfighter") ||
            v.name.toLowerCase().includes("starfighter") ||
            v.model.toLowerCase().includes("starfighter"),
        );

        this.planets.total = planetsRes.length;
        this.characters.total = charactersRes.length;
        this.vehicles.total = vehiclesRes.length;
        this.species.total = speciesRes.length;
        this.starships.total = starshipsRes.length;
        this.starfighters.total = this.allStarfighters.length;
        this.starshipsTypes.total = [
          ...new Set(
            this.allStarships.map((v) => v.starship_class.toLowerCase()),
          ),
        ]
          .map((v) => {
            return {
              name: v,
              data: [
                this.allStarships
                  .map((v) => v.starship_class.toLowerCase())
                  .filter((el) => el === v).length,
              ],
            };
          })
          .sort((a, b) => b.data[0] - a.data[0]);
      } catch (error) {
        this.error = "Failed to load all data";
        console.error("Error loading all data:", error);
      }
    },

    async selectFilm() {
      if (!this.selectedFilm) {
        console.warn("Нет выбранного фильма. Ничего не считаем.");
        return;
      }

      this.planets.inFilm = this.selectedFilm.planets.length;
      this.characters.inFilm = this.selectedFilm.characters.length;
      this.vehicles.inFilm = this.selectedFilm.vehicles.length;
      this.species.inFilm = this.selectedFilm.species.length;
      this.starships.inFilm = this.selectedFilm.starships.length;
      this.starfighters.inFilm = this.allStarfighters.filter((v) =>
        v.films.includes(this.selectedFilm.url),
      ).length;

      const shipsInFilmFilter = this.selectedFilm.starships.map(
        (v) => this.allStarships.filter((el) => el.url === v)[0],
      );
      this.starshipsTypes.inFilm = [
        ...new Set(
          shipsInFilmFilter.map((v) => v.starship_class.toLowerCase()),
        ),
      ]
        .map((v) => {
          return {
            name: v,
            data: [
              shipsInFilmFilter.filter(
                (el) => el.starship_class.toLowerCase() === v,
              ).length,
            ],
          };
        })
        .sort((a, b) => b.data[0] - a.data[0]);
    },
  },
});
