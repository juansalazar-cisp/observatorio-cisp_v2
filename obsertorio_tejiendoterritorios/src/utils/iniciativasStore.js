// Store reactivo con localStorage para las iniciativas.
// Los cambios del admin se guardan por id en localStorage y se aplican encima de los datos base.

import { useState, useEffect } from 'react';
import baseData from '../data/iniciativasDetalle';

const STORAGE_KEY = 'tt_iniciativas_overrides'; // { [id]: { ...camposSobrescritos } }

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function applyOverrides(base, overrides) {
  return base.map((ini) =>
    overrides[ini.id] ? { ...ini, ...overrides[ini.id] } : ini
  );
}

let overrides    = loadOverrides();
let currentData  = applyOverrides(baseData, overrides);
const listeners  = new Set();

function notify() {
  const snapshot = [...currentData];
  listeners.forEach((fn) => fn(snapshot));
}

export function useIniciativas() {
  const [data, setData] = useState(currentData);
  useEffect(() => {
    setData(currentData);
    listeners.add(setData);
    return () => listeners.delete(setData);
  }, []);
  return data;
}

export function useIniciativaById(id) {
  const data = useIniciativas();
  return data.find((i) => i.id === Number(id)) ?? null;
}

export function getIniciativas() { return currentData; }
export function getIniciativaById(id) { return currentData.find((i) => i.id === Number(id)) ?? null; }

export function updateIniciativa(id, fields) {
  overrides = { ...overrides, [id]: { ...(overrides[id] || {}), ...fields } };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  currentData = applyOverrides(baseData, overrides);
  notify();
}

export function resetIniciativa(id) {
  const { [id]: _removed, ...rest } = overrides;
  overrides   = rest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  currentData = applyOverrides(baseData, overrides);
  notify();
}
