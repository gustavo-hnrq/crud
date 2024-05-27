import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import LoginPage from './components/pages/login.jsx'
import Turmas from './components/pages/turmas.jsx'
import Tarefas from './components/pages/tarefas.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/turmas",
        element: <Turmas />,
      },
      {
        path: "/turmas/:turmaId/tarefas", // Adicione o parâmetro de ID da turma
        element: <Tarefas />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

