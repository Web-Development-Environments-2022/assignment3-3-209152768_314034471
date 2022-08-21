<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">My favorite recipe</h1>
      <RecipePreviewList title="favorite Recipes"/>
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
  mounted() {
    this.setFavoriteRecipes();
  },
  methods:
  {
    setFavoriteRecipes() {
     this.$root.$emit("favorite")
    }
  }
};