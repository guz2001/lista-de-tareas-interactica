import React from 'react';

// Este es un "componente presentacional" o "tonto".
// Su única responsabilidad es mostrar información estática (texto, en este caso).
// No tiene lógica compleja, ni estado, ni se conecta a hooks. Simplemente recibe props (en este caso ninguna) y dibuja JSX.

const UserManual: React.FC = () => {
    // Devuelve el JSX con toda la información del manual de usuario y la documentación técnica.
    // Usamos etiquetas semánticas de HTML como <section>, <h3>, <p>, <ul>, <li> para estructurar el contenido.
    // Las clases de Tailwind CSS se usan para dar estilo y que se vea bien.
    return (
        <div className="text-gray-300 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            {/* Sección de bienvenida */}
            <section>
                <h3 className="text-lg font-bold text-purple-400 mb-2">👋 ¡Bienvenido/a a tu Lista de Tareas Interactiva!</h3>
                <p>Esta aplicación está diseñada para ayudarte a organizar tu día de forma sencilla y elegante. Aquí puedes añadir, editar, completar y eliminar tus tareas. ¡Toda la información se guarda en tu navegador para que no pierdas nada!</p>
            </section>

            {/* Sección del Manual de Usuario */}
            <section>
                <h3 className="text-lg font-bold text-purple-400 mb-2">📘 Manual de Usuario (¡Cómo usarla!)</h3>
                <ul className="space-y-4 list-disc list-inside">
                    <li>
                        <strong>Agregar una nueva tarea:</strong> En el formulario principal, escribe lo que tienes que hacer. Si quieres, puedes añadir una fecha y hora límite. Luego, haz clic en "Agregar Tarea". ¡Tu nueva tarea aparecerá al instante en la lista de "Pendientes"!
                    </li>
                    <li>
                        <strong>Marcar una tarea como completada:</strong> Cuando termines una tarea, simplemente haz clic en el círculo que está a su izquierda. La tarea se tachará y se moverá a la lista de "Completadas". ¡Qué satisfacción!
                    </li>
                    <li>
                        <strong>Editar una tarea:</strong> ¿Te equivocaste o quieres cambiar algo? Haz clic en el ícono del lápiz (✏️). Se abrirá una ventana donde podrás cambiar el texto o la fecha de vencimiento.
                    </li>
                    <li>
                        <strong>Eliminar una tarea:</strong> Si una tarea ya no es necesaria, haz clic en el ícono de la papelera (🗑️). Por seguridad, te preguntaremos si estás seguro/a antes de borrarla permanentemente.
                    </li>
                    <li>
                        <strong>Entendiendo los colores de las fechas:</strong> La app te ayuda a priorizar. Las fechas de vencimiento cambian de color para avisarte:
                        <ul className="mt-2 ml-6 space-y-1 text-sm">
                            <li><span className="text-red-400 font-semibold">Rojo:</span> La tarea ya ha vencido.</li>
                            <li><span className="text-yellow-400 font-semibold">Amarillo:</span> La tarea vence hoy.</li>
                            <li><span className="text-orange-400">Naranja:</span> La tarea vence en los próximos 3 días.</li>
                            <li><span className="text-gray-400">Gris:</span> Vencimiento futuro sin urgencia inmediata.</li>
                        </ul>
                    </li>
                     <li>
                        <strong>Sincronización (Simulada):</strong> El botón "Sincronizar" en la cabecera simula cómo funcionaría una sincronización con la nube. Muestra diferentes estados (sincronizando, sincronizado) para dar una idea de una funcionalidad más avanzada.
                    </li>
                </ul>
            </section>

            {/* Sección de Documentación Técnica */}
            <section>
                <h3 className="text-lg font-bold text-purple-400 mb-2">🛠️ Documentación Técnica (Para los curiosos)</h3>
                <p className="mb-2">Esta aplicación, aunque parece simple, utiliza tecnologías web modernas para ser rápida e interactiva. Fue construida como una Single Page Application (SPA).</p>
                <ul className="space-y-2 list-disc list-inside">
                    <li>
                        <strong>¿Cómo funciona por dentro?:</strong> La aplicación está hecha de "componentes" reutilizables (React). Hay un componente para la cabecera, otro para el formulario, otro para la lista de tareas y otro para cada tarea individual. Todos se comunican entre sí para mantener todo actualizado.
                    </li>
                    <li>
                        <strong>Tecnologías usadas:</strong>
                         <ul className="mt-2 ml-6 space-y-1 text-sm">
                            <li><strong>React:</strong> La librería principal para construir la interfaz de usuario.</li>
                            <li><strong>TypeScript:</strong> Un "superpoder" para JavaScript que ayuda a prevenir errores en el código.</li>
                            <li><strong>Tailwind CSS:</strong> Para dar estilos y que la aplicación se vea bonita sin escribir CSS tradicional.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Almacenamiento de Datos:</strong> Tus tareas se guardan en el <strong>LocalStorage</strong> de tu navegador. Es como una pequeña base de datos privada en tu computadora. Esto hace que la app funcione incluso sin conexión a internet y que tus tareas no se borren si cierras la pestaña.
                    </li>
                </ul>
            </section>
            
            {/* Sección sobre cómo ejecutar localmente */}
             <section>
                <h3 className="text-lg font-bold text-purple-400 mb-2">🚀 Cómo ejecutar la aplicación localmente</h3>
                <p>Si eres un desarrollador y quieres ejecutar este proyecto en tu propia máquina, necesitarás Node.js y npm. Sigue estos pasos conceptuales:</p>
                 <ol className="space-y-2 list-decimal list-inside bg-gray-900 p-3 rounded-md text-sm">
                    <li>Descarga o clona el código fuente del proyecto.</li>
                    <li>Abre una terminal en la carpeta del proyecto.</li>
                    <li>Ejecuta el comando <code>npm install</code> para instalar todas las dependencias necesarias (como React).</li>
                    <li>Una vez instalado, ejecuta <code>npm run dev</code> o <code>npm start</code> (dependiendo de la configuración) para iniciar un servidor de desarrollo local.</li>
                    <li>¡Abre tu navegador en la dirección que te indique la terminal (normalmente <code>http://localhost:5173</code>) y verás la aplicación funcionando!</li>
                </ol>
            </section>
        </div>
    );
};

export default UserManual;
