import React, { useState, useEffect } from 'react';
import { PlusIcon } from './icons';

// Definimos las "props" que este componente de formulario puede recibir.
interface TaskFormProps {
    onSave: (text: string, dueDate?: number) => void; // Función que se ejecuta al guardar, para notificar al componente padre.
    initialText?: string; // Texto inicial para el campo de texto (usado en modo edición).
    initialDueDate?: number; // Fecha inicial (usado en modo edición).
    buttonText: string; // El texto que mostrará el botón de guardar/agregar.
    isEditMode?: boolean; // Un booleano para saber si el formulario está en modo "edición" o "agregar nuevo".
}

// Creamos el componente TaskForm.
const TaskForm: React.FC<TaskFormProps> = ({ onSave, initialText = '', initialDueDate, buttonText, isEditMode = false }) => {
    // Usamos 'useState' para crear "estados" o "memoria" interna para cada campo del formulario.
    const [text, setText] = useState(initialText); // Estado para el campo de texto.
    const [date, setDate] = useState(''); // Estado para el campo de fecha.
    const [time, setTime] = useState(''); // Estado para el campo de hora.

    // 'useEffect' se ejecuta cuando los valores iniciales (initialText, initialDueDate) cambian.
    // Esto es útil para que cuando abramos el modal de edición, el formulario se rellene con los datos de la tarea a editar.
    useEffect(() => {
        setText(initialText);
        if (initialDueDate) {
            const d = new Date(initialDueDate);
            // Formateamos la fecha y hora para que los campos <input type="date"> y <input type="time"> puedan entenderlos.
            setDate(d.toISOString().split('T')[0]);
            setTime(d.toTimeString().split(' ')[0].substring(0, 5));
        } else {
            // Si no hay fecha inicial, vaciamos los campos.
            setDate('');
            setTime('');
        }
    }, [initialText, initialDueDate]);


    // Esta función se ejecuta cuando se envía el formulario (al hacer clic en el botón).
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue, que es el comportamiento por defecto de los formularios.
        if (!text.trim()) return; // Si el texto está vacío (después de quitar espacios), no hacemos nada.

        let dueDate: number | undefined = undefined; // Preparamos la variable para la fecha de vencimiento.
        // Si el usuario ha seleccionado una fecha...
        if (date) {
            // ...combinamos la fecha y la hora en un solo string. Si no hay hora, se usa la medianoche.
            const dateTimeString = time ? `${date}T${time}` : `${date}T00:00:00`;
            // Convertimos ese string a un número de milisegundos (timestamp), que es como lo guardamos.
            dueDate = new Date(dateTimeString).getTime();
        }

        // Llamamos a la función 'onSave' que nos pasó el componente padre, enviándole los datos.
        onSave(text.trim(), dueDate);
        
        // Si NO estamos en modo edición, limpiamos los campos del formulario para poder añadir otra tarea.
        if (!isEditMode) {
            setText('');
            setDate('');
            setTime('');
        }
    };

    // El JSX que se va a dibujar. Es un formulario con sus campos y un botón.
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                {/* La etiqueta 'label' con 'sr-only' es para accesibilidad (lectores de pantalla), pero no es visible. */}
                <label htmlFor="task-text" className="sr-only">Texto de la tarea</label>
                <input
                    id="task-text"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)} // Cuando el usuario escribe, actualizamos el estado 'text'.
                    placeholder="¿Qué necesitas hacer?"
                    className="w-full p-3 bg-gray-700 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                    <label htmlFor="due-date" className="sr-only">Fecha de Vencimiento</label>
                    <input
                        id="due-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} // Actualizamos el estado 'date'.
                        className="w-full p-3 bg-gray-700 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="due-time" className="sr-only">Hora de Vencimiento</label>
                    <input
                        id="due-time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)} // Actualizamos el estado 'time'.
                        className="w-full p-3 bg-gray-700 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none"
                        disabled={!date} // El campo de hora se deshabilita si no se ha seleccionado una fecha.
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full flex justify-center items-center p-3 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-transform transform hover:scale-105"
            >
                {/* Muestra el ícono de '+' solo si NO estamos en modo edición. */}
                {!isEditMode && <PlusIcon className="w-5 h-5 mr-2" />}
                {buttonText}
            </button>
        </form>
    );
};

export default TaskForm;
