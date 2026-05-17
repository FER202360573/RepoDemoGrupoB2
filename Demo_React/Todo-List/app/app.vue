<script setup>
// Componibles de Nuxt para traer datos
const { data: todos, refresh } = await useFetch('/api/todos');
const newTask = ref('');

// Función para agregar
async function addTodo() {
  if (!newTask.value) return;
  await $fetch('/api/todos', {
    method: 'POST',
    body: { title: newTask.value }
  });
  newTask.value = '';
  refresh(); // Recarga los datos de la API
}

// Función para actualizar (Favorito, Completado, etc)
async function updateTodo(todo) {
  await $fetch('/api/todos', {
    method: 'PUT',
    body: todo
  });
  refresh();
}

// Función para eliminar
async function deleteTodo(id) {
  await $fetch('/api/todos', {
    method: 'DELETE',
    body: { id }
  });
  refresh();
}
</script>

<template>
  <div class="container">
    <h1>Lista de Tareas Nuxt</h1>

    <div class="input-group">
      <input v-model="newTask" @keyup.enter="addTodo" placeholder="Nueva tarea..." />
      <button @click="addTodo">Agregar</button>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
        
        <input 
          v-model="todo.title" 
          @blur="updateTodo(todo)" 
          class="edit-input"
        />

        <div class="actions">
          <button @click="todo.favorite = !todo.favorite; updateTodo(todo)">
            {{ todo.favorite ? '⭐' : '☆' }}
          </button>
          <button @click="deleteTodo(todo.id)">🗑️</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
/* Un poco de estilo básico */
.container { font-family: sans-serif; max-width: 400px; margin: 50px auto; }
.input-group { display: flex; gap: 10px; margin-bottom: 20px; }
li { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding: 5px; }
.completed { text-decoration: line-through; color: gray; }
.edit-input { border: none; background: transparent; font-size: 1rem; flex-grow: 1; margin: 0 10px; }
.actions { display: flex; gap: 5px; }
</style>