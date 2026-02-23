import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      // The 'api' instance already adds the Bearer token from localStorage
      const res = await api.get(`/tasks?status=${filter === 'All' ? '' : filter}`);
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      alert("Failed to add task. Check your connection.");
    }
  };

  const toggleTask = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to toggle status");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Portal</h1>
        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-8">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Add Task</button>
      </form>

      <div className="flex gap-4 mb-6">
        {['All', 'Pending', 'Completed'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm ${filter === f ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task._id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition">
            <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                checked={task.status === 'Completed'} 
                onChange={() => toggleTask(task._id)}
                className="w-5 h-5 accent-green-500"
              />
              <span className={task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-700'}>
                {task.title}
              </span>
            </div>
            <span className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}