<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">My Family Recipe</h1>
      <RecipePreviewList title="Family Recipes" 
                                    class="RandomRecipes center" 
                                    :getFamilyRecipes="getFamilyRecipes" 

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
    getFamilyRecipes: async function () {
      try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/family",);
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