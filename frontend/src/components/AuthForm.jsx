import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api'; 

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const { data } = await api.post(endpoint, {
        email,
        password,
      });
      
      if (isLogin) {
        login(data.access_token); 
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
        setPassword(''); // Clear password for security
      }
    } catch (err) {
      console.error("Auth Error:", err.response?.data);
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-800">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="mt-1 block w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold">
        {isLogin ? 'Sign In' : 'Register'}
      </button>
      <p className="text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 font-bold hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  );
}