<template>
  <div class="container" id="mainPage">
    <div class="column" id="left">
      <h1 class="title">My recipes</h1>
      <RecipePreviewList title="Personal Recipes"/>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "personal",
  components: {
    RecipePreviewList
  },
  mounted() {
    this.setPersonalRecipes();
  },
  methods:
  {
    setPersonalRecipes() {
     this.$root.$emit("personal")
    }
  }
};