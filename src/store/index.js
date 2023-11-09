import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default new Vuex.Store({
  state: {
    pokemons:[],
    pokemon:[],
    query: ""
  },
  getters: {
    getPokemons(state){
      return state.pokemons;
    },
    getPokemonsLength(state){
      return state.pokemons.length;
    },
    getPokemon(state){
      return state.pokemon;
    },
    getQuery(state){
      return state.query;
    }
  },
  mutations: {
  },
  actions: {
    fetchPokemons(context){
      if(!getLS('pokemons') || getLS('pokemons').length == 0){
        fetch(pokeAPI)
          .then(response => {
           return response.json();
          })
          .then((data) => {
          data.results.forEach((element,index) => {
            data.results[index].id = index + 1;
          });
          context.state.pokemons = data.results;
          setLS('pokemons', context.state.pokemons)
         })
      }
      else{
        context.state.pokemons = getLS('pokemons');
      }
    },
    fetchSpecificPokemon(context, id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) 
        .then(response => {
         return response.json();
        }) 
        .then((data) => {
          context.state.pokemon = data;
        });
    },
    deletePokemon(context, id) {
      const index = context.state.pokemons.findIndex(pokemon => pokemon.id == id);
      if (index != -1) {
        context.state.pokemons.splice(index, 1);
        setLS('pokemons', context.state.pokemons);
      }
    },
    fillQuery(context, pokemon){
      context.state.query = pokemon;
    },
    clearSearchBar(context){
      context.state.query = "";
    }
  },
  modules: {
  },
})
