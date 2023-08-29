// src/api.js
const tasks = [
    { id: 1, title: 'Hacer la compra', completed: false },
    { id: 2, title: 'Lavar los platos', completed: false },
    { id: 3, title: 'Ir al gimnasio', completed: false },
  ];
  
  export async function getTasks() {
    // Simula un retraso de la API
    await delay(1000);
    return tasks;
  }
  
  export async function createTask(title) {
    // Simula un retraso de la API
    await delay(500);
    const newTask = { id: getNextId(), title, completed: false };
    tasks.push(newTask);
    return newTask;
  }
  
  export async function updateTask(taskId, title) {
    // Simula un retraso de la API
    await delay(500);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.title = title;
      return task;
    }
    throw new Error('Tarea no encontrada');
  }
  
  export async function deleteTask(taskId) {
    // Simula un retraso de la API
    await delay(500);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return { success: true };
    }
    throw new Error('Tarea no encontrada');
  }
  
  let nextId = 4;
  
  function getNextId() {
    return nextId++;
  }
  
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  