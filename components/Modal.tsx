import React from 'react';

// Definimos las "props" (propiedades) que este componente Modal puede recibir.
interface ModalProps {
  isOpen: boolean; // Un booleano para saber si el modal debe estar visible o no.
  onClose: () => void; // Una función que se ejecutará para cerrar el modal.
  children: React.ReactNode; // 'children' es un prop especial que representa cualquier cosa que pongamos DENTRO del componente Modal.
  title: string; // El título que se mostrará en la cabecera del modal.
  size?: 'md' | 'lg' | 'xl'; // Un tamaño opcional para el modal. Por defecto será 'md'.
}

// Creamos el componente Modal. Es una plantilla reutilizable para cualquier ventana emergente.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md' }) => {
  // Si 'isOpen' es falso, el componente no dibuja nada (devuelve null).
  if (!isOpen) return null;

  // Un objeto para mapear el 'prop' de tamaño a la clase de Tailwind CSS correspondiente.
  const sizeClasses = {
    md: 'max-w-md', // mediano
    lg: 'max-w-3xl', // grande
    xl: 'max-w-5xl', // extra-grande
  };

  // El JSX que se va a dibujar.
  return (
    // Contenedor principal que ocupa toda la pantalla, con un fondo oscuro semitransparente.
    // 'onClick={onClose}' hace que el modal se cierre si hacemos clic fuera de la ventana del modal.
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      {/* Esta es la ventana del modal en sí. */}
      <div
        // Las clases de estilo le dan un fondo, bordes redondeados, sombra, etc.
        // La clase `animate-pop-in` le da la animación de entrada que definimos en index.html.
        // `sizeClasses[size]` aplica la clase de tamaño correcta.
        // 'onClick={e => e.stopPropagation()}' es importante: evita que un clic DENTRO del modal se "propague" al fondo y lo cierre.
        className={`bg-gray-800 rounded-xl shadow-2xl p-6 w-full border border-gray-700 animate-pop-in ${sizeClasses[size]}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-100">{title}</h2>
          {/* Botón de 'X' para cerrar. */}
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Aquí se renderiza el contenido ('children') que le pasamos al modal. */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
