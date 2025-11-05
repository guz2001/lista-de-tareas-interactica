// Este es el componente principal de nuestra aplicación. Actúa como el "director de orquesta",
// conectando y gestionando todos los demás componentes.

import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks'; // Importamos nuestro "cerebro" para manejar las tareas.
import Header from './components/Header'; // Importamos la cabecera.
import TaskList from './components/TaskList'; // Importamos el componente que muestra la lista de tareas.
import TaskForm from './components/TaskForm'; // Importamos el formulario para añadir/editar tareas.
import Modal from './components/Modal'; // Importamos el componente de ventana emergente.
import { Task } from './types'; // Importamos el "plano" de una tarea.
import UserManual from './components/UserManual'; // Importamos el componente del manual de usuario.

function App() {
  // Usamos nuestro hook `useTasks` para obtener la lista de tareas y las funciones para manipularlas.
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  
  // Creamos estados locales en este componente para gestionar qué modales (ventanas emergentes) están abiertos.
  // Estado para saber qué tarea estamos editando. Si es 'null', el modal de edición está cerrado.
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  // Estado para saber qué tarea estamos a punto de borrar. Si es 'null', el modal de confirmación está cerrado.
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  // Estado para saber si el modal del manual de usuario está abierto.
  const [isManualOpen, setIsManualOpen] = useState(false);

  // Esta función se llama desde un TaskItem cuando se hace clic en el botón de editar.
  const handleEdit = (task: Task) => {
    // Guardamos la tarea que queremos editar en nuestro estado, lo que provocará que se abra el modal de edición.
    setTaskToEdit(task);
  };

  // Esta función se llama desde un TaskItem cuando se hace clic en el botón de borrar.
  const handleDeleteRequest = (task: Task) => {
    // Guardamos la tarea que se quiere borrar, lo que abrirá el modal de confirmación.
    setTaskToDelete(task);
  };

  // Esta función se llama desde el modal de confirmación cuando el usuario hace clic en "Eliminar".
  const confirmDelete = () => {
    if (taskToDelete) {
      // Si hay una tarea guardada para borrar, llamamos a la función `deleteTask` de nuestro hook.
      deleteTask(taskToDelete.id);
      // Vaciamos el estado para cerrar el modal.
      setTaskToDelete(null);
    }
  };

  // Esta función se pasa tanto al formulario principal como al formulario del modal de edición.
  const handleSaveTask = (text: string, dueDate?: number) => {
    // Si hay una tarea en 'taskToEdit', significa que estamos guardando una edición.
    if (taskToEdit) {
      updateTask(taskToEdit.id, text, dueDate);
      setTaskToEdit(null); // Cerramos el modal de edición.
    } else {
      // Si no, significa que estamos agregando una nueva tarea.
      addTask(text, dueDate);
    }
  };

  // El JSX que se va a dibujar. Esta es la estructura principal de nuestra página.
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Renderizamos el componente Header. Le pasamos una función para que sepa cómo abrir el manual. */}
        <Header onShowManual={() => setIsManualOpen(true)} />
        
        <main>
          {/* Un contenedor para el formulario principal de agregar tareas. */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
            {/* Renderizamos el formulario. Le pasamos la función de guardar y el texto del botón. */}
            <TaskForm onSave={handleSaveTask} buttonText="Agregar Tarea" />
          </div>

          {/* Renderizamos la lista de tareas. Le pasamos la lista completa y todas las funciones que los TaskItems necesitan. */}
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={handleDeleteRequest} 
            onEdit={handleEdit} 
          />
        </main>
      </div>

      {/* Modal para editar tareas. */}
      <Modal
        // 'isOpen' será true si 'taskToEdit' no es null, y false si es null.
        isOpen={!!taskToEdit}
        // Le decimos al modal que para cerrarse, debe poner 'taskToEdit' a null.
        onClose={() => setTaskToEdit(null)}
        title="Editar Tarea"
      >
        {/* El contenido del modal solo se renderiza si 'taskToEdit' existe. */}
        {taskToEdit && (
            <TaskForm 
                onSave={handleSaveTask}
                initialText={taskToEdit.text} // Le pasamos los datos de la tarea a editar.
                initialDueDate={taskToEdit.dueDate}
                buttonText="Guardar Cambios"
                isEditMode={true} // Le indicamos que está en modo edición.
            />
        )}
      </Modal>

      {/* Modal para confirmar la eliminación. */}
      <Modal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        title="Confirmar Eliminación"
      >
        {taskToDelete && (
            <div>
                <p className="text-gray-300 mb-6">¿Estás seguro de que quieres eliminar la tarea "{taskToDelete.text}"?</p>
                <div className="flex justify-end space-x-4">
                    {/* Botón para cancelar y cerrar el modal. */}
                    <button 
                        onClick={() => setTaskToDelete(null)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                    >
                        Cancelar
                    </button>
                    {/* Botón que confirma y ejecuta la eliminación. */}
                    <button 
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        )}
      </Modal>

      {/* Modal para mostrar el manual de usuario. */}
      <Modal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        title="Manual de Usuario y Documentación"
        size="lg" // Usamos un tamaño más grande para que quepa bien el texto.
      >
        <UserManual />
      </Modal>

    </div>
  );
}

export default App;
