<template>
  <div class="container">
    <div class="title">
      <p class="users">Users</p>
      <p class="users-number">{{ pokemons.length }} users</p>
    </div>
    <div class="search-field">
      <div class="search-bar" :class="{'active': focused}">
        <img src="../assets/img/svg/magnifying-glass-thin.svg">
          <input type="text" class="field" @focus="focused=true" @blur="focused=false" placeholder="Search for pokemon..." v-model="$store.state.query">
          <img src="../assets/img/svg/x-symbol.svg" class="clear-search-bar" @click="clearSearchBar()">
      </div>
      <table class="users-table" v-if="filteredPokemons.length > 0">
        <tr v-for="(pokemon,index) in filteredPokemons" :key="index">
          <PokemonString :pokemon="pokemon" />
        </tr>
      </table>
      <p v-else class="empty">Not found</p>
    </div>
  </div>
</template>

<script>
import PokemonString from '@/components/PokemonString.vue'

export default {
  name: 'HomeView',
  components: {
    PokemonString
  },
  data() {
    return {
      focused: false,
    }
  },
  created() {
    this.$store.dispatch('fetchPokemons');
  },
  computed: {
    pokemons() {
      return this.$store.getters['getPokemons'];
    },
    filteredPokemons() {
      let query = this.query.toLowerCase()
      return this.pokemons.filter(pokemon => {
        return ~pokemon.name.toLowerCase().indexOf(query);
      })
    },
    query() {
      return this.$store.getters['getQuery']
    }
  },
  methods: {
    clearSearchBar(){
      this.$store.dispatch('clearSearchBar')
    }
  }
}
</script>
