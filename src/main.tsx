import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx';
import TaskList from './pages/TaskList.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NotFound from './pages/NotFound.tsx'
import CreateTask from './pages/CreateTask.tsx';
import "./app.css"


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/task-list" element={<TaskList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
)
