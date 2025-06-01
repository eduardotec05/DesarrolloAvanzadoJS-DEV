import axios from "axios";
/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "/api";

export const getTodos = async () => {
  try {
    const todos = await axios.get(`${BASE_URL_API}/todos`);
    console.log("llamada axios", todos);
    return todos.data;
  } catch (err) {
    console.log("Error al obtener los TODOs:", err);
    return [];
  }
};

export async function addUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL_API}/users`, userData);
      return response.data;
    } catch (err) {
      console.error("Error al registrar usuario:", err.message);
      return {};
    }
  }

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {
  try {
    const response = await axios.post(`${BASE_URL_API}/todos`, {
      ...item,
      done: 0,
    });
    return response.data;
  } catch (err) {
    console.log("Error al crear el TODO :", err);
    return {};
  }
}

export async function toggleDone(id) {
    try {
      await axios.patch(`/api/todos/${id}/toggle`);
    } catch (err) {
      console.error("Error al alternar estado:", err.message);
    }
  }

export async function removeTodo(id) {
  try {
    await axios.delete(`/api/todos/${id}`);
  } catch (err) {
    console.error("Error al eliminar tarea:", err.message);
  }
}

/* function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
} */
