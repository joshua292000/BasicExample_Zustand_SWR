// src/TodoList.js
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { getTasks, createTask, updateTask, deleteTask } from './api'; // Importa las funciones de la simulación de API
import { useTodoStore } from './Store';

function TodoList() {
  const { data: tasks, error } = useSWR('/api/tasks', getTasks);
  const { toggleTask, completedTasks } = useTodoStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === '') return;
    const newTask = await createTask(newTaskTitle); 
    mutate('/api/tasks'); // Actualiza la caché para reflejar el cambio
    setNewTaskTitle('');
  };

  const handleUpdateTask = async (taskId, updatedTitle) => {
    await updateTask(taskId, updatedTitle); 
    mutate('/api/tasks'); 
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId); 
    toggleTask(taskId); 
    mutate('/api/tasks'); 
  };

  if (error) return <div>Error al cargar las tareas</div>;
  if (!tasks) return <div>Cargando tareas...</div>;

  const incompleteTasks = tasks.filter((task) => !completedTasks.includes(task.id));
  const completedTaskIds = completedTasks.map((id) => id.toString());
  const completedTasksList = tasks.filter((task) => completedTaskIds.includes(task.id.toString()));

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <h2>Tareas Pendientes</h2>
        <ul>
          {incompleteTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
             
              <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Tareas Completadas</h2>
        <ul>
          {completedTasksList.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
             
              <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>
    </div>
  );
}

export default TodoList;
