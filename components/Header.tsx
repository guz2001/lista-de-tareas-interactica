import React, { useState } from 'react';
// Importamos los íconos que vamos a usar en esta cabecera.
import { CloudArrowUpIcon, CheckCircleIcon, SpinnerIcon, QuestionMarkCircleIcon } from './icons';

// Definimos los posibles estados del botón de sincronización para saber qué mostrar en cada momento.
type SyncState = 'idle' | 'syncing' | 'synced';

// Definimos las "props" (propiedades) que este componente espera recibir de su componente padre.
interface HeaderProps {
    // Espera una función llamada `onShowManual` que se ejecutará cuando se haga clic en el botón de ayuda.
    onShowManual: () => void;
}

// Creamos el componente Header. Recibe las props, en este caso 'onShowManual'.
const Header: React.FC<HeaderProps> = ({ onShowManual }) => {
    // Usamos 'useState' para guardar el estado actual del botón de sincronización. Empieza en 'idle' (inactivo).
    const [syncState, setSyncState] = useState<SyncState>('idle');

    // Esta función se ejecuta cuando se hace clic en el botón de sincronizar.
    const handleSync = () => {
        setSyncState('syncing'); // Cambiamos el estado a "sincronizando".
        // 'setTimeout' simula una espera, como si se estuviera conectando a un servidor.
        setTimeout(() => {
            setSyncState('synced'); // Después de 1.5 segundos, cambiamos el estado a "sincronizado".
            setTimeout(() => {
                setSyncState('idle'); // Después de 2 segundos más, vuelve al estado inicial.
            }, 2000);
        }, 1500);
    };

    // Esta función decide qué ícono y texto mostrar en el botón según el estado actual.
    const getSyncButtonContent = () => {
        switch (syncState) {
            case 'syncing':
                return ( // Muestra un spinner y el texto "Sincronizando..."
                    <>
                        <SpinnerIcon className="w-5 h-5 mr-2" />
                        Sincronizando...
                    </>
                );
            case 'synced':
                return ( // Muestra un check y el texto "Sincronizado"
                    <>
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        Sincronizado
                    </>
                );
            case 'idle': // Estado por defecto
            default:
                return ( // Muestra una nube y el texto "Sincronizar"
                    <>
                        <CloudArrowUpIcon className="w-5 h-5 mr-2" />
                        Sincronizar
                    </>
                );
        }
    }

    // El JSX que se va a dibujar en la pantalla.
    return (
        <header className="flex justify-between items-center mb-6 md:mb-8">
            {/* Título principal de la aplicación con un degradado de color. */}
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Mis Tareas
            </h1>
            <div className="flex items-center space-x-2">
                 {/* Botón de ayuda. Al hacer clic, llama a la función `onShowManual` que le pasó el componente App. */}
                 <button
                    onClick={onShowManual}
                    title="Ayuda y Documentación"
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                >
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                </button>
                {/* Botón de sincronización. */}
                <button
                    onClick={handleSync}
                    // Se deshabilita si no está en estado 'idle' para evitar múltiples clics.
                    disabled={syncState !== 'idle'}
                    // Las clases cambian dinámicamente según el estado para cambiar el color y el cursor.
                    className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
                        ${syncState === 'synced' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}
                        ${syncState === 'syncing' ? 'cursor-not-allowed' : ''}
                        w-36 h-10
                    `}
                >
                    {/* El contenido del botón lo decide la función que creamos antes. */}
                    {getSyncButtonContent()}
                </button>
            </div>
        </header>
    );
};

export default Header;
