import {create} from 'zustand';

export const useTodoStore = create((set) => ({
  completedTasks: [],
  tasks: [], 

  toggleTask: (taskId) =>
    set((state) => {
      if (state.completedTasks.includes(taskId)) {
        return { completedTasks: state.completedTasks.filter((id) => id !== taskId) };
      }
      return { completedTasks: [...state.completedTasks, taskId] };
    }),


  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),

  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      completedTasks: state.completedTasks.filter((id) => id !== taskId),
    })),
}));

export default useTodoStore;
