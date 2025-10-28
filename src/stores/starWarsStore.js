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

    planets: { total: 0, inFilm: 0 },
    characters: { total: 0, inFilm: 0 },
    vehicles: { total: 0, inFilm: 0 },
    species: { total: 0, inFilm: 0 },
    starships: { total: 0, inFilm: 0 },
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

      try {
        const response = await axios.get("https://swapi.dev/api/films/");
        this.films = response.data.results;
        if (this.films.length > 0) {
          await this.calcStats();
        }
      } catch (error) {
        this.error = "Failed to fetch films";
        console.error("Error fetching films:", error);
      } finally {
        this.loading.films = false;
        console.log(this.films);
      }
    },

    async calcStats() {
      this.loading.statistics = true;
      this.error = null;

      try {
        const [
          planetsRes,
          charactersRes,
          vehiclesRes,
          speciesRes,
          starshipsRes,
        ] = await Promise.all([
          axios.get("https://swapi.dev/api/planets/"),
          axios.get("https://swapi.dev/api/people/"),
          axios.get("https://swapi.dev/api/vehicles/"),
          axios.get("https://swapi.dev/api/species/"),
          axios.get("https://swapi.dev/api/starships/"),
        ]);

        this.planets.total = planetsRes.data.count;
        this.characters.total = charactersRes.data.count;
        this.vehicles.total = vehiclesRes.data.count;
        this.species.total = speciesRes.data.count;
        this.starships.total = starshipsRes.data.count;
      } catch (error) {
        this.error = "Failed to fetch statistics";
        console.error("Error fetching statistics:", error);
      } finally {
        this.loading.statistics = false;
        console.log(this.planets);
      }
    },
  },
});
