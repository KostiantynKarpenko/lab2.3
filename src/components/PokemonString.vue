<template>
  <div class="pokemon-string">
    <div class="avatar">
      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`">
    </div>
    <td><a class="name" @click="fillQuery(pokemon.name)">{{ pokemon.name }}</a></td>
    <td><a class="url">{{ pokemon.url }}</a></td>
    <td>
      <div class="actions">
        <router-link class="btn" :to="'pokemon/' + pokemon.id">View</router-link>
      </div>
    </td>
  </div>
</template>

<script>
export default {
  props: ['pokemon'],
  methods: {
    fillQuery(pokemon){
      this.$store.dispatch('fillQuery', pokemon)
    }
  }
}
</script> 
