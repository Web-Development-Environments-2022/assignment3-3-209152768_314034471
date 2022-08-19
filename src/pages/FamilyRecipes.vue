
<template>
  <div class="container">
    <h1 class="Favorites">Family Recipes</h1>
    <div class="row">
      <div class="col">
        <RecipePreviewList title="Your family recipes list"
            class="RandomRecipes center"
            :getFamilyRecipe="getFamilyRecipes"
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
    getFamilyRecipes: async function () {
      let response;
      console.log(this.$root.store.server_domain + "/users/family");
      response = await this.axios.get(this.$root.store.server_domain + "/users/family", {
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