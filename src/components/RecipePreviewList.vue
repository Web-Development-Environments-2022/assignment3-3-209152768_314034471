<template>
    <b-container>
        <h3>
            {{ title }}:
        </h3>
        <b-row>
            <b-col v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
            </b-col>
        </b-row>
        <div @click="updateRecipes">
            <slot></slot>
        </div>
    </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
        type: String,
        required: true
    },
    getRecipes: {
        type: Function,
        required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const recipes = await this.getRecipes();
        this.recipes.push(...recipes);
        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
