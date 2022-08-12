<template>
    <b-container>
        <h3>
            {{ title }}:
        </h3>
        <b-row>
            <b-col v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" 
                              :recipe="r" 
                              :watched="watched.includes(r.id)" 
                              :favorite="favorites.includes(r.id)"
                              :addFavorite="addFavorite" />
            </b-col>
        </b-row>
        <div @click="setRecipes" class="slot-container">
            <slot></slot>
        </div>
    </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
        type: String,
        required: true
    },
    getRecipes: {
        type: Function,
        required: true
    },
    getWatched: {
        type: Function,
        required: true
    },
    getFavorites: {
        type: Function,
        required: true
    }
  },
  data() {
    return {
      recipes: [],
      watched: [],
      favorites: []
    };
  },
  mounted() {
    this.setWatchedRecipes();
    this.setFavoriteRecipes();
    this.setRecipes();
  },
  methods: {
    async setRecipes() {
      try {
        this.recipes = await this.getRecipes();
      } catch (error) {
        console.log(error);
      }
    },
    async setWatchedRecipes() {
      try {
        if (this.$root.store.username) {
          this.watched = await this.getWatched();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFavoriteRecipes() {
      try {
        if (this.$root.store.username) {
          const result = await this.getFavorites();
          this.favorites = result.map(r => r.id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addFavorite(recipeId) {
      const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipeId: recipeId
          }
      ).then(() => this.favorites.push(recipeId));
    }
  }
};
</script>

<style lang="scss" scoped>
  .col {
    padding-left: 5px;
    padding-right: 5px;
  }

  .slot-container {
    margin-top: 10px;
    text-align: center;
  }
</style>
