import { apiUrl } from "../config"

export const get = async (endpoint: string) => {
  const res = await fetch(`${apiUrl}${endpoint}`);
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
};

export const send = async (endpoint: string, payload: any, method: string = 'POST') => {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`${method} ${endpoint} failed`);
  return res.json();
};


export const clientDelete = async (endpoint: string, method: string = 'DELETE') => {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`${method} ${endpoint} failed`);
  return res.json();
};

export const patch = async (endpoint: string, method: string = 'PATCH') => {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`${method} ${endpoint} failed`);
  return res.json();
};
