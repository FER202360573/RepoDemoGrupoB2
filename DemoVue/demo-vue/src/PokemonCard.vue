<script setup>
import { ref, onMounted } from 'vue'

const pokemon = ref(null)
const cargando = ref(true)

// Función para obtener los datos de la API
const obtenerPokemon = async () => {
  try {
    // Vamos a buscar a Pikachu (ID 25) o puedes cambiar el número
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/25')
    const datos = await respuesta.json()
    pokemon.value = datos
  } catch (error) {
    console.error("Error al traer el pokemon:", error)
  } finally {
    cargando.value = false
  }
}

// Llamamos a la función cuando el componente se monta
onMounted(() => {
  obtenerPokemon()
})
</script>

<template>
  <div class="pokemon-card">
    <div v-if="cargando">Cargando Pokémon...</div>
    
    <div v-else-if="pokemon">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <h2 class="nombre">{{ pokemon.name }}</h2>
      
      <div class="stats">
        <span class="tipo" v-for="t in pokemon.types" :key="t.type.name">
          {{ t.type.name }}
        </span>
      </div>
      
      <p>Peso: {{ pokemon.weight / 10 }} kg</p>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  border: 2px solid #ffcb05; /* Color clásico de Pokémon */
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  width: 200px;
  margin: 10px auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  font-family: 'Arial', sans-serif;
}

.nombre {
  text-transform: capitalize;
  color: #3b4cca;
  margin: 10px 0;
}

img {
  width: 120px;
  background: white;
  border-radius: 50%;
}

.tipo {
  background: #3b4cca;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 2px;
  display: inline-block;
  text-transform: uppercase;
}
</style>