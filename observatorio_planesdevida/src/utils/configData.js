// Configuración general del observatorio.
// Los valores base vienen de src/data/configuracion.js.
// El admin puede editar campos; los cambios se guardan en localStorage.

import { useState, useEffect } from 'react';
import configuracionDefault from '../data/configuracion';

const STORAGE_KEY = 'cisp_config_overrides';

function loadConfig() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...configuracionDefault, ...stored } : { ...configuracionDefault };
  } catch {
    return { ...configuracionDefault };
  }
}

// ── Singleton ─────────────────────────────────────────────
let currentConfig = loadConfig();
const listeners   = new Set();

function notify() {
  const snapshot = { ...currentConfig };
  listeners.forEach((fn) => fn(snapshot));
}

// ── Hook ──────────────────────────────────────────────────
export function useConfig() {
  const [config, setConfig] = useState(currentConfig);
  useEffect(() => {
    setConfig(currentConfig);
    listeners.add(setConfig);
    return () => listeners.delete(setConfig);
  }, []);
  return config;
}

export function getConfig() { return currentConfig; }

// ── Escritura (admin) ─────────────────────────────────────
export function updateConfig(fields) {
  currentConfig = { ...currentConfig, ...fields };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
  notify();
}

export function downloadConfigJSON() {
  const json = JSON.stringify(currentConfig, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'configuracion.json';
  a.click();
  URL.revokeObjectURL(url);
}
