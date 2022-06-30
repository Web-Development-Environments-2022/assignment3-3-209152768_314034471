<template>
    <div class="container">
        <h1 class="title">Main Page</h1>
        <div class="row">
            <div class="col">
                <RecipePreviewList title="Explore these recipes" class="RandomRecipes center" :getRecipes="getRandomRecipes">
                    <button>Refresh Recipes</button>
                </RecipePreviewList>
            </div>
            <div class="col">
                <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
                {{ !$root.store.username }}
                <RecipePreviewList title="Last Viewed Recipes"
                                   :getRecipes="getLastViewedRecipes"
                                   :class="{
                                        RandomRecipes: true,
                                        blur: !$root.store.username,
                                        center: true
                                   }"
                                   disabled></RecipePreviewList>
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
            getRandomRecipes: async function() {
                const response = await this.axios.get(
                    this.$root.store.server_domain + "/recipes/random",
                    {
                        params: { num: 3 }
                    }
                );

                return response.data;
            },
            getLastViewedRecipes: async function () {
                const response = await this.axios.get(
                    this.$root.store.server_domain + "/users/watchedList"
                );

                return response.data;
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
