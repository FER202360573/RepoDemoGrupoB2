<script setup>
import { ref } from 'vue'

// Datos temporales del input
const nombreInput = ref('')
const emailInput = ref('')

// Datos que se mostrarán al final
const nombreMostrado = ref('')
const emailMostrado = ref('')

// Función para procesar el clic del botón
const procesarDatos = () => {
  nombreMostrado.value = nombreInput.value
  emailMostrado.value = emailInput.value
}
</script>

<template>
  <div class="card">
    <h2>Registro</h2>
    
    <div class="form-group">
      <input v-model="nombreInput" type="text" placeholder="Tu nombre" />
      <input v-model="emailInput" type="email" placeholder="Tu correo" />
      
      <button @click="procesarDatos">Mostrar Datos</button>
    </div>

    <div class="resultado" v-if="nombreMostrado || emailMostrado">
      <p><strong>Nombre registrado:</strong> {{ nombreMostrado }}</p>
      <p><strong>Correo registrado:</strong> {{ emailMostrado }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  max-width: 350px;
  margin: 10px auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #33a06f;
}

.resultado {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #ccc;
}
</style>