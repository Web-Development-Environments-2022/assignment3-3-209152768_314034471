<template>
  <div class="container">
    <RecipeCreator/>
    <div id="div-added">
      <RecipePreviewList title=" "></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import RecipeCreator from './RecipeCreator.vue';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    components: {
    RecipePreviewList,
    RecipeCreator
  }
}
</script>

<style scoped>
/* #div-added{
    background-color: #469bcf;
	  text-align: center;  
    margin-top:5%;
}
.btn-secondary{
  background-color: #587dc1;
  margin-top:2%;
}
.btn-secondary:hover{
  background-color: #8c6565;
} */
</style>