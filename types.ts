// Este archivo define las "formas" o "planos" de nuestros datos. Usamos TypeScript para asegurarnos de que no cometemos errores con los tipos de datos.

// Una "interface" es como un contrato o un plano. Aquí definimos cómo DEBE ser cualquier objeto que consideremos una "Task" (Tarea).
export interface Task {
  // 'id': Un identificador único para cada tarea. Es de tipo 'string' (texto).
  id: string;

  // 'text': El contenido o descripción de la tarea. También es un 'string'.
  text: string;

  // 'completed': Un valor que nos dice si la tarea está terminada (true) o no (false). Es de tipo 'boolean'.
  completed: boolean;

  // 'createdAt': Un número que representa el momento exacto en que se creó la tarea (en milisegundos).
  createdAt: number;

  // 'dueDate': La fecha y hora límite para completar la tarea. El '?' significa que esta propiedad es opcional;
  // no todas las tareas necesitan tener una fecha de vencimiento. También es un 'number' (milisegundos).
  dueDate?: number;
}
