<script setup>
import { ref } from 'vue'

// Creamos una variable reactiva llamada "contador" inicializada en 0
const contador = ref(0)

// Función para incrementar
const incrementar = () => {
  contador.value++
}

// Función para decrementar
const decrementar = () => {
  contador.value--
}
</script>

<template>
  <div class="contador-container">
    <h2>Valor actual: <span>{{ contador }}</span></h2>
    
    <div class="botones">
      <button @click="decrementar" class="btn-decrementar">- Decrementar</button>
      <button @click="incrementar" class="btn-incrementar">+ Incrementar</button>
    </div>
  </div>
</template>

<style scoped>
.contador-container {
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
  margin: 20px auto;
}

span {
  color: #42b983;
  font-weight: bold;
}

.botones {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}

.btn-incrementar {
  background-color: #42b983;
  color: white;
}

.btn-decrementar {
  background-color: #f66;
  color: white;
}

button:active {
  transform: scale(0.95);
}
</style>
