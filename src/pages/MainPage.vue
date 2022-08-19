<template>
    <div class="container">
        <h1 class="title">Welcome</h1>
        <div class="row">
            <div class="col">
                <RecipePreviewList title="Explore these recipes" 
                                    class="RandomRecipes center" 
                                    :getRecipes="getRandomRecipes" 
                                    :getWatched="getWatchedRecipes"
                                    :getFavorites="getFavoriteRecipes"
                                    >
                    <b-button>Refresh Recipes</b-button>
                </RecipePreviewList>
            </div>
            <div class="col">
                <RecipePreviewList v-if="$root.store.username"
                                   title="Last Viewed Recipes"
                                   :getRecipes="getLastViewedRecipes"
                                   :getWatched="getWatchedRecipes"
                                   :getFavorites="getFavoriteRecipes"
                                   class="RandomRecipes center" 
                                   disabled></RecipePreviewList>
                <Login v-else></Login>            
            </div>        
        </div>
    </div>
</template>

<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    import Login from "./LoginPage.vue";
    
    export default {
        components: {
            RecipePreviewList,
            Login
        },
        methods: {
            getRandomRecipes: async function() {
                let response = JSON.parse(localStorage.getItem("getRandomRecipes"));
                if (!response || !this.$root.store.bypass_external_requests) {
                    response = await this.axios.get(
                        this.$root.store.server_domain + "/recipes/random",
                        {
                            params: { num: 3 }
                        }
                    );
                    localStorage.setItem("getRandomRecipes", JSON.stringify(response));
                }

                return response.data;
            },
            getLastViewedRecipes: async function () {
                let response = JSON.parse(localStorage.getItem("getLastViewedRecipes"));
                if (!response || !this.$root.store.bypass_external_requests) {
                    response = await this.axios.get(
                        this.$root.store.server_domain + "/users/watchedList"
                    );
                    localStorage.setItem("getLastViewedRecipes", JSON.stringify(response));
                }

                return response.data;
            },
            getWatchedRecipes: async function () {
                const response = await this.axios.get(
                    this.$root.store.server_domain + "/users/watched"
                );
                return response.data;
            },
            getFavoriteRecipes: async function () {
                let response = JSON.parse(localStorage.getItem("getLastViewedRecipes"));
                if (!response || !this.$root.store.bypass_external_requests) {
                    response = await this.axios.get(this.$root.store.server_domain + "/users/favorites");
                    localStorage.setItem("getLastViewedRecipes", JSON.stringify(response));
                }
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
