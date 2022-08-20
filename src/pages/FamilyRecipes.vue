
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
  created() {
    this.getFamilyRecipeFromServer();
  },
  methods: {
    getFamilyRecipes: async function () {
      let response;
      console.log(this.$root.store.server_domain + "/user/family");
      response = await this.axios.get(this.$root.store.server_domain + "/user/family", {
      });
      console.log(response);
      this.response.data = [];  
      this.response.data.push(...response.data);
    },
    async getFamilyRecipeFromServer() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/user/family"
        );
        const recipes = response.data;
        for(let i=0;i<recipes.length;i++){
        
          recipes[i].instructions=JSON.parse(recipes[i].instructions);
          recipes[i].ingredients=JSON.parse(recipes[i].ingredients);
        }
        this.recipes = [];
        this.recipes.push(...recipes);
                        console.log(this.recipes);
         for(let i=0;i<this.recipes.length;i++){
              if(this.recipes[i].id ===  this.$route.params.recipeId){
                  this.choosenRecipe=this.recipes[i];
              }
         }
      } catch (error) {
        console.log(error);
      }
    },
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