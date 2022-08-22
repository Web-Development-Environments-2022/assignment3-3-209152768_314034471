<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">My favorite recipe</h1>
      <RecipePreviewList title="favorite Recipes" 
                                    class="RandomRecipes center" 
                                    :getRecipes="getFavoriteRecipes" 
                                    :getWatched="getWatchedRecipes"
                                    :getFavorites="getFavoriteRecipes"

                                    >
      </RecipePreviewList>
    </div>

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  methods:
  {
    getWatchedRecipes: async function () {
      const response = await this.axios.get(
          this.$root.store.server_domain + "/users/watched"
        );
      return response.data;
    },
    getFavoriteRecipes: async function () {
      try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorite",);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        }
      catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<!-- <template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">My favorite recipe</h1>
      <RecipePreviewList title="favorite Recipes"/>
      <RecipePreviewList title="favorite Recipes" 
                                    class="RandomRecipes center" 
                                    :getRecipes="getFavoriteRecipes" 
                                    :getWatched="getWatchedRecipes"
                                    :getFavorites="getFavoriteRecipes"

                                    >
      </RecipePreviewList>
    </div>

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "favorite",
  components: {
    RecipePreviewList
  },
  methods:
  {
    getWatchedRecipes: async function () {
      const response = await this.axios.get(
          this.$root.store.server_domain + "/users/watched"
        );
      return response.data;
    },
    getFavoriteRecipes: async function () {
      let response = JSON.parse(localStorage.getItem("favorites"));
      if (!response || !this.$root.store.bypass_external_requests) {
        response = await this.axios.get(this.$root.store.server_domain + "/users/favorites");
        localStorage.setItem("getFavoriteRecipes", JSON.stringify(response));
      }
      return response.data;
    }
  }
}; -->