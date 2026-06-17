import { useState } from 'react';
import {
  Box, Typography, Chip, Paper, Grid, Divider,
} from '@mui/material';
import { OV } from '../../../theme';
import BotonVolver from '../../../components/BotonVolver';
import MapaVictimas from '../../../components/maps/MapaVictimas';
import iconoColombia from '../../../assets/icono_colombia.png';
import iconoArchivo  from '../../../assets/icono_archivo.png';
import iconoPesos    from '../../../assets/icono_pesos.png';
import iconoBusqueda from '../../../assets/icono_busqueda.png';

import { DATOS_DEPTO, DOCS_REQUERIDOS, DOCS_POR_DEPTO } from '../../../data/radiografiaAcceso';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function norm(str) {
  return (str || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}
function fmt(n) { return n?.toLocaleString('es-CO') ?? '—'; }

// ─── Totales nacionales ────────────────────────────────────────────────────────
const TOTALES = Object.values(DATOS_DEPTO).reduce(
  (acc, d) => {
    acc.victimas    += d.victimas;
    acc.reclamaron  += d.reclamaron;
    acc.noReclamaron+= d.noReclamaron;
    return acc;
  },
  { victimas: 0, reclamaron: 0, noReclamaron: 0 },
);

// ─── Top 8 departamentos por víctimas ─────────────────────────────────────────
const TOP_DEPTOS = Object.entries(DATOS_DEPTO)
  .sort((a, b) => b[1].victimas - a[1].victimas)
  .slice(0, 8);

// ─── Colores de intensidad de requerimientos ──────────────────────────────────
const COLORES_DOCS = [OV.rojo, OV.rojoOscuro, OV.grisOscuro, OV.amarilloOsc, '#2563EB', '#7C3AED'];

export default function RadiografiaAcceso() {
  const [tabDashboard, setTabDashboard] = useState('docs'); // 'docs' | 'reclamacion'

  return (
    <Box>
      <BotonVolver to="/modulos" />

      {/* ── Encabezado ─────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Módulo 01" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.rojo}12`, color: OV.rojo, fontWeight: 800 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box component="img" src={iconoColombia} alt=""
            sx={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Radiografía del Acceso
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          Mapa interactivo por departamentos con total de víctimas en el RUV, hechos victimizantes
          reconocidos y estado de reclamación de la indemnización administrativa.
        </Typography>
      </Box>

      {/* ── KPIs nacionales ────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          {
            label: 'Total víctimas en el RUV',
            valor: fmt(TOTALES.victimas),
            color: OV.rojo,
            icono: iconoColombia,
          },
          {
            label: 'Han reclamado indemnización',
            valor: fmt(TOTALES.reclamaron),
            color: '#16A34A',
            icono: iconoPesos,
          },
          {
            label: 'No han reclamado',
            valor: fmt(TOTALES.noReclamaron),
            color: OV.amarilloOsc,
            icono: iconoBusqueda,
          },
          {
            label: 'Cobertura de reclamación',
            valor: `${Math.round((TOTALES.reclamaron / TOTALES.victimas) * 100)}%`,
            color: OV.grisOscuro,
            icono: iconoArchivo,
          },
        ].map((k) => (
          <Grid key={k.label} size={{ xs: 6, md: 3 }}>
            <Paper elevation={0} sx={{
              p: 2.5, borderRadius: 2.5,
              border: `1.5px solid ${k.color}25`,
              bgcolor: `${k.color}06`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: `${k.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Box component="img" src={k.icono} alt=""
                    sx={{ width: 18, height: 18, objectFit: 'contain' }} />
                </Box>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: k.color, lineHeight: 1, mb: 0.5 }}>
                {k.valor}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {k.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ── Mapa + panel lateral ───────────────────────────── */}
      <Paper elevation={0} sx={{
        borderRadius: 3, overflow: 'hidden',
        border: `1.5px solid ${OV.rojo}20`, mb: 5,
      }}>
        {/* Cabecera */}
        <Box sx={{
          px: 3, py: 2, bgcolor: OV.grisOscuro,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}>
          <Box component="img" src={iconoColombia} alt=""
            sx={{ width: 26, height: 26, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
            Mapa de víctimas por departamento
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label="Verde = reparación administrativa disponible" size="small"
            sx={{ bgcolor: '#DCFCE7', color: '#166534', fontWeight: 700, fontSize: '0.62rem' }} />
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <MapaVictimas />
        </Box>
      </Paper>

      {/* ── Dashboard ──────────────────────────────────────── */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.rojo }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Dashboard de Reclamación e Indemnización
          </Typography>
        </Box>

        {/* Pestañas */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, borderBottom: `2px solid ${OV.grisMedio}30`, pb: 0 }}>
          {[
            { id: 'docs',       label: 'Requerimientos documentales', icono: iconoArchivo },
            { id: 'reclamacion', label: 'Cobertura de reclamación',   icono: iconoPesos  },
          ].map((tab) => (
            <Box
              key={tab.id}
              onClick={() => setTabDashboard(tab.id)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 2, py: 1.25, cursor: 'pointer', borderRadius: '8px 8px 0 0',
                borderBottom: tabDashboard === tab.id ? `3px solid ${OV.rojo}` : '3px solid transparent',
                bgcolor: tabDashboard === tab.id ? `${OV.rojo}08` : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <Box component="img" src={tab.icono} alt=""
                sx={{ width: 16, height: 16, objectFit: 'contain', opacity: 0.6 }} />
              <Typography variant="body2" sx={{
                fontWeight: tabDashboard === tab.id ? 800 : 600,
                color: tabDashboard === tab.id ? OV.rojo : OV.grisOscuro,
                fontSize: '0.82rem',
              }}>
                {tab.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ── Tab: Requerimientos documentales ── */}
        {tabDashboard === 'docs' && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Documentos que la UARIV y aliados territoriales han solicitado en cada departamento
              para tramitar la indemnización administrativa. Los departamentos más remotos tienden a
              requerir documentación adicional para verificar identidad y filiación.
            </Typography>

            {/* Mapa de calor: departamentos × documentos */}
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: `1.5px solid ${OV.grisMedio}30`, mb: 3 }}>
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ minWidth: 680 }}>
                  {/* Encabezado de documentos */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: `180px repeat(${DOCS_REQUERIDOS.length}, 1fr)`,
                    bgcolor: OV.grisOscuro, px: 2, py: 1.5, gap: 0,
                  }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
                      Departamento
                    </Typography>
                    {DOCS_REQUERIDOS.map((doc, i) => (
                      <Box key={doc.id} sx={{ textAlign: 'center', px: 0.5 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORES_DOCS[i],
                          mx: 'auto', mb: 0.5 }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600,
                          fontSize: '0.6rem', lineHeight: 1.3, display: 'block' }}>
                          {doc.label.split(' ').slice(0, 2).join(' ')}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Filas por departamento */}
                  {Object.entries(DATOS_DEPTO)
                    .sort((a, b) => b[1].victimas - a[1].victimas)
                    .slice(0, 16)
                    .map(([key, d], idx) => {
                      const docsDepto = DOCS_POR_DEPTO[key] ?? DOCS_POR_DEPTO.DEFAULT;
                      return (
                        <Box
                          key={key}
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: `180px repeat(${DOCS_REQUERIDOS.length}, 1fr)`,
                            px: 2, py: 1, gap: 0,
                            bgcolor: idx % 2 === 0 ? '#FAFAFA' : '#fff',
                            borderBottom: `1px solid ${OV.grisMedio}15`,
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600, color: OV.grisOscuro,
                            fontSize: '0.72rem', pr: 1 }}>
                            {key.length > 22 ? key.slice(0, 22) + '…' : key}
                          </Typography>
                          {DOCS_REQUERIDOS.map((doc, i) => {
                            const requerido = docsDepto.includes(doc.id);
                            return (
                              <Box key={doc.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{
                                  width: 20, height: 20, borderRadius: 1,
                                  bgcolor: requerido ? `${COLORES_DOCS[i]}20` : 'transparent',
                                  border: requerido ? `1.5px solid ${COLORES_DOCS[i]}60` : `1px solid ${OV.grisMedio}25`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  {requerido && (
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORES_DOCS[i] }} />
                                  )}
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Paper>

            {/* Leyenda de documentos */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {DOCS_REQUERIDOS.map((doc, i) => (
                <Box key={doc.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLORES_DOCS[i], flexShrink: 0 }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {doc.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* ── Tab: Cobertura de reclamación ── */}
        {tabDashboard === 'reclamacion' && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Comparación entre el total de víctimas registradas en el RUV y las que han iniciado
              proceso de reclamación de la indemnización administrativa, por departamento.
            </Typography>

            {/* Barras horizontales */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {TOP_DEPTOS.map(([key, d]) => {
                const pct = Math.round((d.reclamaron / d.victimas) * 100);
                return (
                  <Box key={key}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, fontSize: '0.76rem' }}>
                        {key.length > 28 ? key.slice(0, 28) + '…' : key}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#16A34A', fontSize: '0.74rem' }}>
                          {fmt(d.reclamaron)} reclamaron
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.74rem' }}>
                          {pct}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ height: 10, borderRadius: 5, bgcolor: `${OV.grisMedio}25`, overflow: 'hidden' }}>
                      <Box sx={{
                        height: '100%', borderRadius: 5,
                        background: `linear-gradient(90deg, #16A34A 0%, #4ADE80 100%)`,
                        width: `${pct}%`,
                      }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.4 }}>
                      <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.66rem' }}>
                        {fmt(d.noReclamaron)} no han reclamado
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.66rem' }}>
                        Total: {fmt(d.victimas)}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Resumen nacional */}
            <Box sx={{ p: 3, borderRadius: 3, bgcolor: `${OV.rojo}06`, border: `1.5px solid ${OV.rojo}20` }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 2 }}>
                Resumen nacional
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                {[
                  { label: 'Total en RUV',       valor: fmt(TOTALES.victimas),     color: OV.rojo },
                  { label: 'Han reclamado',       valor: fmt(TOTALES.reclamaron),   color: '#16A34A' },
                  { label: 'Sin reclamar',        valor: fmt(TOTALES.noReclamaron), color: OV.amarilloOsc },
                ].map((m) => (
                  <Box key={m.label} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: m.color, lineHeight: 1 }}>
                      {m.valor}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {m.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
