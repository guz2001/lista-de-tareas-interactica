// Un "hook" personalizado en React es una función especial que nos permite reutilizar lógica (como manejar datos) en diferentes componentes.
// Este hook, `useTasks`, será el cerebro que maneje todo lo relacionado con nuestras tareas.

import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types'; // Importamos el "plano" de cómo debe ser una tarea.

// Definimos una "llave" única para guardar nuestras tareas en el almacenamiento del navegador.
const STORAGE_KEY = 'interactive-todo-app-tasks';

export const useTasks = () => {
  // 'useState' es un hook de React que nos permite añadir "memoria" o "estado" a nuestros componentes.
  // Aquí, creamos un estado llamado 'tasks' para guardar nuestra lista de tareas.
  // 'setTasks' es la única función que podemos usar para actualizar esa lista.
  const [tasks, setTasks] = useState<Task[]>([]);

  // 'useEffect' es un hook que nos permite ejecutar código cuando algo específico sucede.
  // Este primer 'useEffect' se ejecuta SOLO UNA VEZ, cuando el componente que usa este hook aparece por primera vez.
  // (El `[]` al final significa "ejecutar solo al montar").
  // Lo usamos para cargar las tareas guardadas.
  useEffect(() => {
    try {
      // Intentamos obtener las tareas guardadas del 'localStorage' del navegador.
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      // Si encontramos algo...
      if (storedTasks) {
        // ...lo convertimos de texto (JSON) a un array de JavaScript y actualizamos nuestro estado.
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error al cargar las tareas desde localStorage", error);
    }
  }, []); // El array vacío asegura que esto solo se ejecute una vez.

  // Este segundo 'useEffect' se ejecuta CADA VEZ que el estado 'tasks' cambia (cuando añadimos, borramos, etc.).
  useEffect(() => {
    try {
      // Guardamos la lista actual de tareas en el 'localStorage'. La convertimos a texto (JSON) para poder guardarla.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar las tareas en localStorage", error);
    }
  }, [tasks]); // '[tasks]' le dice a React que vigile la variable 'tasks' y ejecute esto si cambia.

  // 'useCallback' es una optimización. Evita que estas funciones se creen de nuevo en cada renderizado, mejorando el rendimiento.

  // Función para añadir una nueva tarea.
  const addTask = useCallback((text: string, dueDate?: number) => {
    // Creamos el objeto de la nueva tarea, siguiendo el "plano" que definimos en `types.ts`.
    const newTask: Task = {
      id: crypto.randomUUID(), // Generamos un ID único y aleatorio.
      text, // El texto de la tarea.
      completed: false, // Las tareas nuevas nunca están completadas.
      createdAt: Date.now(), // Guardamos el momento exacto de la creación.
      dueDate, // La fecha de vencimiento (si la hay).
    };
    // Actualizamos el estado. Añadimos la nueva tarea al principio de la lista existente.
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }, []);

  // Función para marcar/desmarcar una tarea como completada.
  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      // 'map' crea un nuevo array. Recorremos cada tarea...
      prevTasks.map(task =>
        // ...si encontramos la tarea con el 'id' que buscamos...
        task.id === id 
        // ...creamos una copia de esa tarea, pero con el valor de 'completed' invertido (!task.completed).
        ? { ...task, completed: !task.completed } 
        // ...si no es la tarea que buscamos, la dejamos como está.
        : task
      )
    );
  }, []);

  // Función para eliminar una tarea.
  const deleteTask = useCallback((id: string) => {
    // 'filter' crea un nuevo array solo con los elementos que cumplen una condición.
    // Nos quedamos con todas las tareas cuyo 'id' NO sea el que queremos borrar.
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Función para actualizar el texto y/o la fecha de una tarea existente.
  const updateTask = useCallback((id:string, text: string, dueDate?: number) => {
      setTasks(prevTasks =>
        // Usamos 'map' de nuevo, similar a 'toggleTask'.
        prevTasks.map(task => 
          // Si es la tarea correcta, creamos una copia con el nuevo texto y nueva fecha.
          task.id === id ? { ...task, text, dueDate } : task
        )
      )
  }, []);

  // Finalmente, el hook devuelve la lista de tareas y todas las funciones para manipularla.
  return { tasks, addTask, toggleTask, deleteTask, updateTask };
};
