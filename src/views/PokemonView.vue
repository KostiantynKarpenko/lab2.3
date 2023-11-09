<template>
  <div class="cntr">
    <img :src="pictureHover" @mouseover="hover=true" @mouseleave="hover=false" class="pokemon-image">
    <div class="data-container">
      <p class="pokemon-name">{{ pokemon.name }}</p>
      <ul class="characteristics">
        <p class="char-title">Stats:</p>
        <ul class="stats">
          <li class="stat_item" v-for="(st, index) in pokemon.stats" :key="index">
            <strong>{{ st.stat.name.toUpperCase() }}</strong>: {{ st.base_stat }}
          </li>
        </ul>
        <p class="char-title">Abilities:</p>
        <ul class="stats">
          <li v-for="(ab, index) in pokemon.abilities" :key="index">
            {{ ab.ability.name }}
          </li>
        </ul>
      </ul>
      <div class="actions">
        <button class="btn delete" @click="deletePokemon()">Delete</button>
        <button class="btn return" @click="returnHome()">Return</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      hover: false
    }
  },
  created() {
    this.$store.dispatch('fetchSpecificPokemon', this.pokemonID);
  },
  computed: {
    pokemonID() {
      return this.$route.params.id;
    },
    pokemon() {
      return this.$store.getters['getPokemon'];
    },
    pictureHover () {
      if (this.hover == true) {
        return this.pokemon.sprites?.back_default
      } else {
        return this.pokemon.sprites?.front_default
      }
    },
  },
  methods: {
    deletePokemon(){
      this.$store.dispatch('deletePokemon', this.pokemonID);
      this.$router.push("/");
    },
    returnHome(){
      this.$router.push("/");
    }
  }
}
</script>