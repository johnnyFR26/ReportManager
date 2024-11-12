import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialTasks = [
  { id: 1, name: "Instalação/atualização do desktop", progress: 0 },
  { id: 2, name: "Não envia mensagem de saudação", progress: 0 },
  { id: 3, name: "Não envia mensagem de cashback", progress: 0 },
  { id: 4, name: "Não envia mensagem de status", progress: 0 },
  { id: 5, name: "Robô não carrega (não gerou QRCODE)", progress: 0 },
  { id: 6, name: "Robô leu o QRCODE mas não carrega", progress: 0 },
  { id: 7, name: "Configurar e/ou instalar impressora", progress: 0 },
  { id: 8, name: "Encaminhar acesso", progress: 0 },
  { id: 9, name: "Tenta reproduzir bug", progress: 0 },
  { id: 10, name: "Contratar novo painel", progress: 0 },
  { id: 11, name: "Renovação painel", progress: 0 },
  { id: 12, name: "Reativação de painel", progress: 0 },
  { id: 13, name: "Venda de cardápio", progress: 0 },
  { id: 14, name: "Preenchimento / ajuda com o menu 'meu perfil'", progress: 0 },
  { id: 15, name: "Montagem de cardápio ou ajuda cardápio", progress: 0 },
  { id: 16, name: "Configurar impressora do celular/computador", progress: 0 },
  { id: 17, name: "Configurar mensagem automática no celular", progress: 0 },
  { id: 18, name: "Preenchimento / ajuda formas de pagamento (Online/manual)", progress: 0 },
  { id: 19, name: "Gerar QRCODE para o cliente", progress: 0 },
  { id: 20, name: "Questão NFC-e", progress: 0 },
  { id: 21, name: "Sugestão", progress: 0 },
  { id: 22, name: "Cliente informa que os itens não estão aparecendo (disponibilidade)", progress: 0 },
  { id: 23, name: "Redefinir senha de acesso / financeira", progress: 0 },
  { id: 24, name: "Configurações de mesas / encomendas/pdv", progress: 0 },
  { id: 25, name: "Pedido teste / PDV (Passo 5)", progress: 0 },
  { id: 26, name: "Abertura de card", progress: 0 },
  { id: 27, name: "Cancelamento", progress: 0 },
  { id: 28, name: "Gerar boleto ou enviar pix para pagamento", progress: 0 },
  { id: 29, name: "Confirmação de pagamento (cliente enviou comprovante)", progress: 0 },
  { id: 30, name: "Liberação de painel (arquivo não encontrado)", progress: 0 }
];

export default function TasksLabel() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleProgressChange = (id : number, value : string) => {
    const progress = Math.min(Math.max(parseInt(value) || 0, 0), 100);
    //@ts-expect-error break the arrow function
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, progress } : task
    ));
  };

  const totalProgress = Math.round(tasks.reduce((sum: number, task: { progress: number }) => sum + task.progress, 0) / tasks.length);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Controle de Tarefas</h1>
      <ul className="space-y-4">
        {//@ts-expect-error break the arrow function
        tasks.map(task => (
          <li key={task.id} className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`task-${task.id}`} className="flex-grow">{task.name}</Label>
              <Input
                id={`task-${task.id}`}
                type="number"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) => handleProgressChange(task.id, e.target.value)}
                className="w-16 text-right"
              />
            </div>
            <Progress value={task.progress} className="h-2" />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Total Progress</h2>
        <Progress value={totalProgress} className="h-3" />
        <p className="text-center mt-2 text-sm text-gray-600">{totalProgress}% Complete</p>
      </div>
    </div>
  );
}
