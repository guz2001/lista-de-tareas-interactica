// Importamos las bibliotecas necesarias. 'React' es la base para crear componentes y 'ReactDOM' es para dibujar esos componentes en la página web.
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importamos nuestro componente principal, 'App', que contiene toda nuestra aplicación.
import App from './App';

// Buscamos en el archivo index.html el elemento que tiene el id "root". Este es nuestro "escenario".
const rootElement = document.getElementById('root');

// Por seguridad, comprobamos si el elemento "root" realmente existe antes de intentar usarlo.
if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento raíz para montar la aplicación");
}

// Creamos un "punto de montaje" de React en nuestro elemento "root". A partir de aquí, React tomará el control de todo lo que haya dentro de ese <div>.
const root = ReactDOM.createRoot(rootElement);

// 'root.render()' es la acción de "dibujar". Le decimos a React que dibuje nuestro componente <App /> dentro del punto de montaje.
// <React.StrictMode> es una herramienta de ayuda que nos avisa de posibles problemas en nuestro código durante el desarrollo. No afecta a la versión final de la app.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
