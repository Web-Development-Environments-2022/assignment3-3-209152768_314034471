
<template>
  <div class="container">
    <h1 class="Favorites">Personal Recipes</h1>
    <div class="row">
      <div class="col">
        <RecipePreviewList title="Your recipes list"
            class="RandomRecipes center"
            :getPersonalRecipes="getUserRecipe"
            ></RecipePreviewList>
        </div>
      </div>        
        

</div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  methods: {
    getUserRecipe: async function () {
      try{
        const response = await this.axios.get(
        this.$root.store.base_url + "/user/personal"
      );
      console.log(response);
      const recipesResponse = response.data;
      this.recipes = [];
      this.recipes.push(...recipesResponse);
    } catch (error) {
      console.log(error);
      }
    }
  }

};
</script>


<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>