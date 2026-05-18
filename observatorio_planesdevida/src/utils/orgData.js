// Fuente de datos de organizaciones.
// Los datos base vienen del archivo compilado src/data/organizaciones.js.
// El admin puede sobrescribir campos por organización; esos cambios se guardan en localStorage
// y se aplican encima de los datos base en cada carga de página.

import { useState, useEffect } from 'react';
import organizacionesDefault from '../data/organizaciones';

const STORAGE_KEY = 'cisp_orgs_overrides'; // { [slug]: { ...camposSobrescritos } }

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function applyOverrides(baseOrgs, overrides) {
  return baseOrgs.map((o) =>
    overrides[o.slug] ? { ...o, ...overrides[o.slug] } : o
  );
}

// ── Singleton ─────────────────────────────────────────────
let overrides    = loadOverrides();
let currentOrgs  = applyOverrides([...organizacionesDefault], overrides);
const listeners  = new Set();

function notify() {
  const snapshot = [...currentOrgs];
  listeners.forEach((fn) => fn(snapshot));
}

// ── Hooks ─────────────────────────────────────────────────
export function useOrgs() {
  const [orgs, setOrgs] = useState(currentOrgs);
  useEffect(() => {
    setOrgs(currentOrgs);
    listeners.add(setOrgs);
    return () => listeners.delete(setOrgs);
  }, []);
  return orgs;
}

export function useOrgData(slug) {
  const orgs = useOrgs();
  return orgs.find((o) => o.slug === slug) ?? null;
}

export function useOrgById(id) {
  const orgs = useOrgs();
  return orgs.find((o) => o.id === Number(id)) ?? null;
}

// ── Lectura síncrona ──────────────────────────────────────
export function getOrgs()        { return currentOrgs; }
export function getOrgData(slug) { return currentOrgs.find((o) => o.slug === slug) ?? null; }
export function getOrgById(id)   { return currentOrgs.find((o) => o.id === Number(id)) ?? null; }

// ── Escritura (admin) ─────────────────────────────────────
export function updateOrg(slug, fields) {
  overrides = { ...overrides, [slug]: { ...(overrides[slug] || {}), ...fields } };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  currentOrgs = applyOverrides([...organizacionesDefault], overrides);
  notify();
}

export function resetOrg(slug) {
  const { [slug]: _removed, ...rest } = overrides;
  overrides   = rest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  currentOrgs = applyOverrides([...organizacionesDefault], overrides);
  notify();
}

// Descarga el JSON actual (datos base + overrides) para uso externo
export function downloadOrgsJSON() {
  const json = JSON.stringify(currentOrgs, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'organizaciones.json';
  a.click();
  URL.revokeObjectURL(url);
}
