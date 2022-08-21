<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>
                <router-link :to="{ name: 'main' }">Home</router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link :to="{ name: 'search' }">Search</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link :to="{ name: 'about' }">About</router-link>
                    </b-nav-item>
                    <b-nav-item-dropdown text="Personal" right v-if="$root.store.username">
                      <router-link :to="{ name: 'favorites' }">Favorite Recipes</router-link>|
                      <router-link :to="{ name: 'personal' }">Personal Recipes</router-link>|
                      <router-link :to="{ name: 'family' }">Family Recipes</router-link>|
                    </b-nav-item-dropdown>
                    <b-nav-item>
                        <router-link :to="{ name: 'addRecipe' }">Create new Recipe</router-link>|
                    </b-nav-item>                    

                </b-navbar-nav>

                <!-- Right aligned nav items -->
                 <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
                    Hello guest:
                    <b-nav-item>
                        <router-link :to="{ name: 'register' }">Register</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link :to="{ name: 'login' }">Login</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto" v-else>
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{ $root.store.username }}</em>
                        </template>
                        <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <router-view />
    </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
