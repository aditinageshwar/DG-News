import { useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import AuthForm from './components/AuthForm';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        // If logged in, show the main Task Portal
        <Dashboard />
      ) : (
        // If not logged in, show Login/Register UI
        <div className="flex flex-col items-center justify-center pt-20">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Welcome to TaskPortal
            </h2>
            <AuthForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;