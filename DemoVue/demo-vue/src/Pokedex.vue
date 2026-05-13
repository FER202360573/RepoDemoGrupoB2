<script setup>
import { ref, onMounted } from 'vue'

const listaPokemon = ref([])
const cargando = ref(true)

const obtenerPokemones = async () => {
  try {
    // Traeremos los primeros 20 pokemones
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    const data = await res.json()
    
    // Obtenemos el detalle de cada uno para tener sus imágenes
    const promesas = data.results.map(async (p) => {
      const detalleRes = await fetch(p.url)
      return await detalleRes.json()
    })
    
    listaPokemon.value = await Promise.all(promesas)
  } catch (error) {
    console.error("Error cargando Pokedex:", error)
  } finally {
    cargando.value = false
  }
}

onMounted(obtenerPokemones)
</script>

<template>
  <div class="pokedex-container">
    <h1 class="titulo-pixel">PIXEL POKÉDEX</h1>
    
    <div v-if="cargando" class="loader">Cargando bits...</div>

    <div v-else class="grid-pokedex">
      <div v-for="poke in listaPokemon" :key="poke.id" class="pixel-card">
        <div class="sprite-container">
          <img 
            :src="poke.sprites.versions['generation-v']['black-white'].animated.front_default || poke.sprites.front_default" 
            :alt="poke.name"
            class="pixel-img"
          />
        </div>
        <div class="info">
          <span class="numero">#{{ poke.id.toString().padStart(3, '0') }}</span>
          <h3 class="nombre">{{ poke.name }}</h3>
          <div class="tipos">
            <span v-for="t in poke.types" :key="t.type.name" :class="['tipo', t.type.name]">
              {{ t.type.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Importar una fuente estilo Pixel */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pokedex-container {
  background-color: #dc0a2d; /* Rojo Pokedex */
  padding: 20px;
  min-height: 100vh;
  font-family: 'Press Start 2P', cursive;
  image-rendering: pixelated; /* Crucial para el efecto Pixel Art */
}

.titulo-pixel {
  text-align: center;
  color: white;
  text-shadow: 4px 4px 0px #000;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.grid-pokedex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  max-width: 1000px;
  margin: 0 auto;
}

.pixel-card {
  background: white;
  border: 4px solid #222;
  border-radius: 0; /* Los pixeles no son redondos */
  padding: 10px;
  text-align: center;
  box-shadow: 6px 6px 0px rgba(0,0,0,0.2);
  transition: transform 0.1s;
}

.pixel-card:hover {
  transform: translateY(-5px);
}

.sprite-container {
  background: #f2f2f2;
  border: 2px solid #ccc;
  margin-bottom: 10px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pixel-img {
  width: 80px;
  height: 80px;
}

.nombre {
  font-size: 0.6rem;
  text-transform: uppercase;
  margin: 10px 0;
  color: #333;
}

.numero {
  font-size: 0.5rem;
  color: #888;
}

.tipos {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.tipo {
  font-size: 0.4rem;
  padding: 4px;
  color: white;
  text-transform: uppercase;
}

/* Colores de tipos (algunos ejemplos) */
.grass { background: #74CB48; }
.fire { background: #F57D31; }
.water { background: #6493EB; }
.bug { background: #A7B723; }
.poison { background: #A43E9E; }
.electric { background: #F9CF30; }

.loader {
  color: white;
  text-align: center;
}
</style>