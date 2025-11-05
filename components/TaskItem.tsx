import React from 'react';
import { Task } from '../types'; // Importamos el "plano" de Tarea.
import { TrashIcon, EditIcon, ClockIcon } from './icons'; // Importamos los íconos necesarios.

// Definimos las "props" que este componente espera recibir.
interface TaskItemProps {
  task: Task; // El objeto de la tarea que debe mostrar.
  onToggle: (id: string) => void; // Función para marcar/desmarcar como completada.
  onDelete: (task: Task) => void; // Función para solicitar la eliminación.
  onEdit: (task: Task) => void;   // Función para solicitar la edición.
}

// Creamos el componente TaskItem. Representa una única fila en nuestra lista de tareas.
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {

  // Esta función calcula y formatea la información de la fecha de vencimiento.
  const getDueDateInfo = () => {
    // Si la tarea no tiene fecha de vencimiento, no muestra nada.
    if (!task.dueDate) return null;
    
    const now = new Date(); // Fecha y hora actuales.
    const dueDate = new Date(task.dueDate); // La fecha de vencimiento de la tarea.
    const diffTime = dueDate.getTime() - now.getTime(); // Diferencia en milisegundos.
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Diferencia en días.

    // Por defecto, el color es gris y el texto es la fecha formateada.
    let colorClass = 'text-gray-400';
    let text = `Vence ${dueDate.toLocaleDateString()}`;

    if (diffTime < 0) { // Si la diferencia es negativa, la tarea ha vencido.
      colorClass = 'text-red-400 font-semibold';
      text = `Venció hace ${Math.abs(diffDays)} día(s)`;
    } else if (diffDays <= 1) { // Si vence en menos de un día (hoy).
      colorClass = 'text-yellow-400 font-semibold';
      text = 'Vence hoy';
    } else if (diffDays <= 3) { // Si vence en los próximos 3 días.
      colorClass = 'text-orange-400';
      text = `Vence en ${diffDays} día(s)`;
    }

    // Devuelve el JSX con el ícono de reloj, el texto calculado y el color correspondiente.
    return (
      <div className={`flex items-center text-xs mt-2 ${colorClass}`}>
        <ClockIcon className="mr-1.5 w-4 h-4" />
        {/* 'toLocaleTimeString' formatea la hora para que sea legible. */}
        <span>{text} - {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    );
  };

  // El JSX que se va a dibujar.
  return (
    // 'li' es un elemento de lista. Le damos estilos y la animación de entrada.
    <li
      className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700/50 hover:shadow-lg animate-pop-in"
    >
      {/* Checkbox para completar la tarea. */}
      <input
        type="checkbox"
        checked={task.completed}
        // Al cambiar (hacer clic), llama a la función 'onToggle' con el ID de esta tarea.
        onChange={() => onToggle(task.id)}
        className="form-checkbox h-6 w-6 rounded-full bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-600 cursor-pointer"
      />
      {/* Contenedor para el texto de la tarea y la fecha. */}
      <div className="flex-grow mx-4">
        {/* El texto de la tarea. Si está completada, se le añade la clase 'line-through' para tacharla. */}
        <p className={`text-lg text-gray-100 transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.text}
        </p>
        {/* Aquí se muestra la información de la fecha de vencimiento que calculamos antes. */}
        {getDueDateInfo()}
      </div>
      {/* Contenedor para los botones de acción. */}
      <div className="flex items-center space-x-2">
        {/* Botón de editar. Al hacer clic, llama a 'onEdit' con el objeto completo de esta tarea. */}
        <button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-full hover:bg-gray-700">
          <EditIcon />
        </button>
        {/* Botón de eliminar. Al hacer clic, llama a 'onDelete' con el objeto completo de esta tarea. */}
        <button onClick={() => onDelete(task)} className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-full hover:bg-gray-700">
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
