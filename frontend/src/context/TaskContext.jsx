import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    const response = await api.get(`/tasks?status=${filter === 'All' ? '' : filter}`);
    setTasks(response.data);
  };

  const addTask = async (taskData) => {
    await api.post('/tasks', taskData);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await api.patch(`/tasks/${id}/toggle`);
    setTasks(tasks.map(t => t._id === id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, filter, setFilter, addTask, toggleTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);