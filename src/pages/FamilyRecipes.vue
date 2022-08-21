<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">Family recipes</h1>
      <RecipePreviewList title="Family Recipes" class="FamilyRecipes center" />

    </div>

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "family",
  components: {
    RecipePreviewList
  },
  mounted() {
    this.setfamilyRecipes();
  },
  methods:
  {
    setfamilyRecipes() {
     this.$root.$emit("family")
    }
  }
};
</script>