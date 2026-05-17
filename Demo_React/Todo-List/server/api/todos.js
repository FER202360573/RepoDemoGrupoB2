// server/api/todos.ts

// Nuestra "Base de Datos" en memoria
let todos = [
  { id: 1, title: 'Aprender Nuxt 3', completed: false, favorite: false },
];

export default defineEventHandler(async (event) => {
  const method = event.method;

  // GET: Obtener todas las tareas
  if (method === 'GET') {
    return todos;
  }

  // POST: Agregar una nueva tarea
  if (method === 'POST') {
    const body = await readBody(event);
    const newTodo = {
      id: Date.now(),
      title: body.title,
      completed: false,
      favorite: false
    };
    todos.push(newTodo);
    return newTodo;
  }

  // PUT: Modificar (Completar, Favorito, Editar Texto)
  if (method === 'PUT') {
    const body = await readBody(event);
    todos = todos.map(t => t.id === body.id ? { ...t, ...body } : t);
    return { success: true };
  }

  // DELETE: Eliminar tarea
  if (method === 'DELETE') {
    const body = await readBody(event);
    todos = todos.filter(t => t.id !== body.id);
    return { success: true };
  }
});