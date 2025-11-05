import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem'; // Importamos el componente para una sola tarea.

// Definimos las "props" que este componente de lista espera recibir.
interface TaskListProps {
  tasks: Task[]; // La lista completa de todas las tareas.
  onToggle: (id: string) => void; // Función para marcar/desmarcar.
  onDelete: (task: Task) => void; // Función para solicitar borrado.
  onEdit: (task: Task) => void;   // Función para solicitar edición.
}

// Creamos el componente TaskList.
const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  // Filtramos y ordenamos las tareas.
  // 1. Tareas pendientes:
  const pendingTasks = tasks
    // 'filter' crea un nuevo array solo con las tareas que NO están completadas.
    .filter(task => !task.completed)
    // 'sort' ordena el array. Las tareas con fecha de vencimiento más próxima van primero.
    // Si una tarea no tiene fecha, se va al final (Infinity).
    .sort((a,b) => (a.dueDate ?? Infinity) - (b.dueDate ?? Infinity));
  
  // 2. Tareas completadas:
  const completedTasks = tasks
    // Nos quedamos solo con las tareas que SÍ están completadas.
    .filter(task => task.completed)
    // Las ordenamos por fecha de creación, de la más nueva a la más antigua.
    .sort((a,b) => b.createdAt - a.createdAt);

  // Si no hay ninguna tarea en total, mostramos un mensaje amigable.
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">¡Felicidades! No tienes tareas pendientes.</p>
        <p className="text-sm text-gray-500 mt-2">Agrega una nueva tarea para empezar.</p>
      </div>
    );
  }

  // El JSX que se va a dibujar.
  return (
    <div>
      {/* Mostramos la sección de "Pendientes" solo si hay alguna tarea pendiente. */}
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300 border-b-2 border-gray-700 pb-2">Pendientes</h2>
          <ul className="space-y-3">
            {/* 'map' recorre el array de tareas pendientes y por cada una... */}
            {pendingTasks.map(task => (
              // ...dibuja un componente <TaskItem>.
              // 'key' es un prop especial que React necesita para identificar cada elemento de una lista.
              // Le pasamos todas las props que TaskItem necesita para funcionar.
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </ul>
        </div>
      )}

      {/* Mostramos la sección de "Completadas" solo si hay alguna tarea completada. */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-300 border-b-2 border-gray-700 pb-2">Completadas</h2>
          <ul className="space-y-3">
            {/* Hacemos lo mismo que antes, pero con la lista de tareas completadas. */}
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
