
<template>
  <div class="container">
    <p></p>
    <h1 class="Favorites">Favorite Recipes</h1>
    <RecipePreviewList title="Your favorite recipes"
            class="RandomRecipes"
            :getFavorites="getFavoriteRecipes"
            ></RecipePreviewList>        

</div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  methods: {
    getFavoriteRecipes: async function () {

      let response;
      console.log(this.$root.store.server_domain + "/users/favorites");
      response = await this.axios.get(this.$root.store.server_domain + "/users/favorites", {
      });
      console.log(response);
      this.response.data = [];  
      this.response.data.push(...response.data);
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