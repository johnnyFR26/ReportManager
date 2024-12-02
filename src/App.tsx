import { useState, useEffect } from 'react';
import './App.css';
import TasksLabel from './components/tasksLabel';
import TaskManager from './components/TodoList';
import LoginPage from './components/Login-component';

function App() {
  const [showTasksLabel, setShowTasksLabel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se há um usuário selecionado no localStorage
    const selectedUser = localStorage.getItem('selectedUser');
    if (selectedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleComponent = () => {
    setShowTasksLabel((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('selectedUser');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="App">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <div className="p-4">
        <button
          onClick={toggleComponent}
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          {showTasksLabel ? 'Agendamentos' : 'Tarefas'}
        </button>
        {showTasksLabel ? <TasksLabel /> : <TaskManager />}
      </div>
    </div>
  );
}

export default App;
