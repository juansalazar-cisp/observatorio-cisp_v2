import { useState, useEffect } from 'react';
import configuracionDefault from '../data/configuracion';

const STORAGE_KEY = 'tt_config_overrides';

function loadConfig() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...configuracionDefault, ...stored } : { ...configuracionDefault };
  } catch {
    return { ...configuracionDefault };
  }
}

let currentConfig = loadConfig();
const listeners   = new Set();

function notify() {
  const snapshot = { ...currentConfig };
  listeners.forEach((fn) => fn(snapshot));
}

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

export function updateConfig(fields) {
  currentConfig = { ...currentConfig, ...fields };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
  notify();
}
