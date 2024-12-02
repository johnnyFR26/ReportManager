import { useState, useEffect } from "react";
import { Progress } from "./ui/progress"; // Pode renomear este import para evitar confusão
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialTasks = [
  { id: "uuid-1", name: "Instalação/atualização do desktop", quantity: 0 },
  // ... restante das tasks
];

export default function TasksLabel() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("selectedUser"));
        console.log(userId)
        const response = await fetch(`https://api-tasks-wm.vercel.app/tasks/getByUserId/${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []); // Executa apenas na montagem do componente

  // Sync tasks with localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Atualiza a quantidade
  const handleQuantityChange = (id: string, value: string) => {
    const quantity = Math.max(parseInt(value) || 0, 0); // Garante que seja sempre >= 0
    try{
      fetch(`https://api-tasks-wm.vercel.app/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar quantidade');
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar quantidade:', error);
      });
    }catch(error){
      console.error('Erro ao atualizar quantidade:', error);
    }
    //@ts-expect-error testes
    setTasks((prevTasks) =>
      //@ts-expect-error testes
      prevTasks.map((task) =>
        task.id === id ? { ...task, quantity } : task
      )
    );
  };
//@ts-expect-error testes
  const totalQuantity = tasks.reduce((sum, task) => sum + task.quantity, 0);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Controle de Tarefas
      </h1>
      <ul className="space-y-4">
        {//@ts-expect-error testes
        tasks.map((task, index) => (
          <li key={task.id} className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor={`task-${task.id}`}
                className="flex-grow text-gray-700"
              >
                {`${index + 1}. ${task.name}`}
              </Label>
              <Input
                id={`task-${task.id}`}
                type="number"
                min="0"
                value={task.quantity}
                onChange={(e) =>
                  handleQuantityChange(task.id, e.target.value)
                }
                className="w-16 text-right bg-gray-200 text-gray-800"
              />
            </div>
            <Progress value={task.quantity} className="h-2 bg-gray-300" />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Quantidade Total
        </h2>
        <Progress value={totalQuantity} className="h-3 bg-gray-300" />
        <p className="text-center mt-2 text-sm text-gray-600">
          {totalQuantity} Total
        </p>
      </div>
    </div>
  );
}
