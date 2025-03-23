import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from './App.tsx'
import Login from './Login.tsx'
import "./app.css"
import Register from './Register.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
)
