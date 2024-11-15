'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  id: number;
  clientNumber: string;
  description: string;
  deadline: string;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('appointments');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  const [clientNumber, setClientNumber] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!clientNumber.trim() || !description.trim() || !deadline.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      clientNumber,
      description,
      deadline,
    };

    setTasks([...tasks, newTask]);
    setClientNumber('');
    setDescription('');
    setDeadline('');
  };

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Novo Agendamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="clientNumber">Cliente</Label>
              <Input
                id="clientNumber"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
                placeholder="Numero do cliente no zenvia"
              />
            </div>
            <div>
              <Label htmlFor="description">Motivo</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Motivo do agendamento"
              />
            </div>
            <div>
              <Label htmlFor="deadline">Horario</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <Button onClick={addTask}>Adicionar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum agendamento registrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="border-b pb-2">
                  <p><strong>Cliente:</strong> {task.clientNumber}</p>
                  <p><strong>Motivo:</strong> {task.description}</p>
                  <p><strong>Horario:</strong> {formatDateTime(task.deadline)}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
