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
                              :favorite="favorites.map(r => r.id).includes(r.id)" />
            </b-col>
        </b-row>
        <div @click="setRecipes">
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
        this.watched = await this.getWatched();
      } catch (error) {
        console.log(error);
      }
    },
    async setFavoriteRecipes() {
      try {
        this.favorites = await this.getFavorites();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
