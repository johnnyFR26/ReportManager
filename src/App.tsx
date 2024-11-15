import { useState } from 'react';
import './App.css';
import TasksLabel from './components/tasksLabel';
import TaskManager from './components/TodoList';

function App() {
  const [showTasksLabel, setShowTasksLabel] = useState(true);

  const toggleComponent = () => {
    setShowTasksLabel((prev) => !prev);
  };

  return (
    <div className="App">
      <button onClick={toggleComponent} className="mb-4 p-2 bg-gray-200 rounded">
        {showTasksLabel ? 'Agendamentos' : 'Tarefas'}
      </button>
      {showTasksLabel ? <TasksLabel /> : <TaskManager />}
    </div>
  );
}

export default App;
