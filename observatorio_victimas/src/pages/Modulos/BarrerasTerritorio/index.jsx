import { useState } from 'react';
import { Box, Typography, Chip, Paper, Divider } from '@mui/material';

import { OV } from '../../../theme';
import BotonVolver    from '../../../components/BotonVolver';
import iconoComunidad from '../../../assets/icono_comunidad.png';
import iconoMundo     from '../../../assets/icono_mundo.png';
import iconoAnuncio   from '../../../assets/icono_anuncio.png';
import iconoReunion   from '../../../assets/icono_reunion.png';
import iconoArchivo   from '../../../assets/icono_archivo.png';
import iconoPin       from '../../../assets/icono_pin_georeferencia.png';
import iconoFoco      from '../../../assets/icono_foco.png';

// ─── Configuración de los 4 tipos de barrera ─────────────────────────────────
const BARRERAS_CONFIG = [
  {
    id: 'geo',
    label: 'Geográficas',
    color: OV.grisOscuro,
    icono: iconoMundo,
    descripcion: 'Distancias extensas, vías en mal estado, ausencia de transporte y presencia de actores armados que bloquean el acceso a los puntos de atención de la UARIV.',
    subbarreras: [
      'Largas distancias a puntos de atención UARIV',
      'Vías terciarias en mal estado o inexistentes',
      'Ausencia de transporte público intermunicipal',
      'Presencia de grupos armados en corredores viales',
      'Zonas selváticas, montañosas o insulares de difícil acceso',
      'Inundaciones y fenómenos climáticos que bloquean vías',
    ],
    stat: '62% de víctimas en zonas rurales dispersas',
  },
  {
    id: 'adm',
    label: 'Administrativas',
    color: OV.rojoOscuro,
    icono: iconoArchivo,
    descripcion: 'Procesos extensos, requisitos documentales excesivos, poca cobertura de puntos de atención y lentitud institucional que impiden completar los trámites de indemnización.',
    subbarreras: [
      'Procesos de valoración que pueden tardar varios años',
      'Requisitos documentales complejos para población desplazada',
      'Escasa cobertura de puntos de atención presencial',
      'Horarios restrictivos que no se adaptan a jornadas rurales',
      'Inconsistencias en el RUV que generan errores de identidad',
      'Dificultades para tramitar por apoderado o terceros',
    ],
    stat: '48% reporta al menos una barrera administrativa significativa',
  },
  {
    id: 'soc',
    label: 'Sociales',
    color: OV.amarilloOsc,
    icono: iconoReunion,
    descripcion: 'Estigmatización, desconfianza institucional, barreras idiomáticas y culturales, y temor a represalias que disuaden a las víctimas de iniciar o continuar la reclamación.',
    subbarreras: [
      'Temor a represalias por parte de actores armados',
      'Desconfianza hacia las instituciones del Estado',
      'Barreras idiomáticas en comunidades indígenas y afro',
      'Falta de redes de apoyo para acompañar el proceso',
      'Violencia de género que disuade a mujeres de reclamar',
      'Retraumatización en la declaración de hechos',
    ],
    stat: '71% de comunidades étnicas reportan barreras culturales',
  },
  {
    id: 'inf',
    label: 'De información',
    color: OV.rojo,
    icono: iconoAnuncio,
    descripcion: 'Desconocimiento de derechos, falta de información sobre procedimientos, baja conectividad y ausencia de comunicación institucional en lenguas locales.',
    subbarreras: [
      'Desconocimiento de derechos y medidas de la Ley 1448',
      'Falta de información sobre pasos y requisitos del proceso',
      'Comunicación insuficiente en zonas sin internet',
      'Bajo nivel de alfabetización funcional',
      'Desinformación sobre montos y criterios de priorización',
      'Ausencia de materiales en lenguas nativas',
    ],
    stat: '55% no conoce el monto al que tiene derecho',
  },
];

// ─── Departamentos incluidos en el análisis ───────────────────────────────────
const DEPTOS_ACTIVOS = new Set([
  'Antioquia', 'Atlántico', 'Bolívar', 'Boyacá', 'Cauca',
  'Cesar', 'Chocó', 'Cundinamarca', 'Huila', 'Magdalena',
  'Meta', 'Nariño', 'Risaralda', 'Santander', 'Valle del Cauca',
]);

// ─── Datos por departamento (puntaje 0–100, mayor = más severo) ───────────────
const DATOS = [
  { depto: 'Vaupés',             geo: 98, adm: 92, soc: 84, inf: 97 },
  { depto: 'Amazonas',           geo: 97, adm: 90, soc: 82, inf: 96 },
  { depto: 'Guainía',            geo: 96, adm: 91, soc: 83, inf: 95 },
  { depto: 'Chocó',              geo: 91, adm: 83, soc: 74, inf: 90 },
  { depto: 'Vichada',            geo: 90, adm: 88, soc: 80, inf: 90 },
  { depto: 'Putumayo',           geo: 83, adm: 74, soc: 71, inf: 82 },
  { depto: 'Guaviare',           geo: 82, adm: 80, soc: 70, inf: 80 },
  { depto: 'Nariño',             geo: 80, adm: 72, soc: 78, inf: 79 },
  { depto: 'La Guajira',         geo: 74, adm: 70, soc: 88, inf: 81 },
  { depto: 'Cauca',              geo: 72, adm: 70, soc: 79, inf: 71 },
  { depto: 'Arauca',             geo: 71, adm: 68, soc: 70, inf: 70 },
  { depto: 'Caquetá',            geo: 70, adm: 69, soc: 63, inf: 69 },
  { depto: 'Córdoba',            geo: 63, adm: 68, soc: 69, inf: 62 },
  { depto: 'Bolívar',            geo: 62, adm: 70, soc: 68, inf: 61 },
  { depto: 'Norte de Santander', geo: 61, adm: 63, soc: 67, inf: 60 },
  { depto: 'Sucre',              geo: 60, adm: 66, soc: 62, inf: 66 },
  { depto: 'Magdalena',          geo: 55, adm: 61, soc: 62, inf: 59 },
  { depto: 'Cesar',              geo: 53, adm: 60, soc: 60, inf: 54 },
  { depto: 'Antioquia',          geo: 52, adm: 61, soc: 66, inf: 53 },
  { depto: 'Tolima',             geo: 58, adm: 59, soc: 59, inf: 57 },
  { depto: 'Huila',              geo: 51, adm: 57, soc: 53, inf: 51 },
  { depto: 'Meta',               geo: 50, adm: 58, soc: 58, inf: 50 },
  { depto: 'Casanare',           geo: 49, adm: 55, soc: 50, inf: 48 },
  { depto: 'Boyacá',             geo: 48, adm: 56, soc: 49, inf: 47 },
  { depto: 'Caldas',             geo: 48, adm: 57, soc: 50, inf: 48 },
  { depto: 'Santander',          geo: 42, adm: 51, soc: 50, inf: 43 },
  { depto: 'Cundinamarca',       geo: 40, adm: 50, soc: 48, inf: 41 },
  { depto: 'Risaralda',          geo: 39, adm: 48, soc: 47, inf: 40 },
  { depto: 'Valle del Cauca',    geo: 32, adm: 49, soc: 51, inf: 39 },
  { depto: 'Atlántico',          geo: 30, adm: 47, soc: 48, inf: 37 },
  { depto: 'Quindío',            geo: 29, adm: 46, soc: 43, inf: 36 },
  { depto: 'Bogotá D.C.',        geo: 18, adm: 50, soc: 58, inf: 30 },
  { depto: 'San Andrés',         geo: 35, adm: 52, soc: 48, inf: 38 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function nivelColor(v) {
  if (v >= 80) return { color: '#DC2626', bg: '#FEF2F2', label: 'Crítico' };
  if (v >= 60) return { color: '#F97316', bg: '#FFF7ED', label: 'Alto' };
  if (v >= 40) return { color: '#FBBF24', bg: '#FFFBEB', label: 'Medio' };
  return { color: '#4ADE80', bg: '#F0FDF4', label: 'Bajo' };
}

// ─── Panel de detalle de un departamento ─────────────────────────────────────
function PanelDetalleDpto({ fila }) {
  const vals = [
    { id: 'geo', label: 'Geográfica',    v: fila.geo, color: OV.grisOscuro  },
    { id: 'adm', label: 'Administrativa', v: fila.adm, color: OV.rojoOscuro  },
    { id: 'soc', label: 'Social',         v: fila.soc, color: OV.amarilloOsc },
    { id: 'inf', label: 'Información',    v: fila.inf, color: OV.rojo        },
  ];
  const total = Math.round((fila.geo + fila.adm + fila.soc + fila.inf) / 4);
  const nivelTotal = nivelColor(total);

  return (
    <Paper elevation={0} sx={{
      p: 2.5, borderRadius: 2.5, border: `1.5px solid ${OV.grisMedio}30`,
      bgcolor: '#FAFAFA',
    }}>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Departamento seleccionado
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: OV.grisOscuro, lineHeight: 1.2 }}>
            {fila.depto}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', px: 2, py: 1, borderRadius: 2,
          bgcolor: nivelTotal.bg, border: `1.5px solid ${nivelTotal.color}40` }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: nivelTotal.color, lineHeight: 1 }}>
            {total}
          </Typography>
          <Typography variant="caption" sx={{ color: nivelTotal.color, fontWeight: 700, fontSize: '0.65rem' }}>
            Promedio
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Barras por tipo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {vals.map(({ id, label, v, color }) => {
          const nv = nivelColor(v);
          return (
            <Box key={id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color, fontSize: '0.75rem' }}>
                  {label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: nv.color }}>
                    {v}/100
                  </Typography>
                  <Chip label={nv.label} size="small"
                    sx={{ height: 16, fontSize: '0.55rem', fontWeight: 700,
                      bgcolor: nv.bg, color: nv.color, border: `1px solid ${nv.color}40` }} />
                </Box>
              </Box>
              <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${color}15`, overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 4, bgcolor: color, width: `${v}%`,
                  transition: 'width 0.5s ease' }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
function DashboardBarreras() {
  const [barreraActiva, setBarreraActiva] = useState('geo');
  const [deptoSeleccionado, setDeptoSeleccionado] = useState(null);

  const datos15   = DATOS.filter((d) => DEPTOS_ACTIVOS.has(d.depto));
  const barrConf  = BARRERAS_CONFIG.find((b) => b.id === barreraActiva);
  const ranking   = [...datos15].sort((a, b) => b[barreraActiva] - a[barreraActiva]);
  const promedio  = Math.round(datos15.reduce((s, d) => s + d[barreraActiva], 0) / datos15.length);
  const criticos  = datos15.filter((d) => d[barreraActiva] >= 80).length;
  const deptoTop  = ranking[0];
  const filaSelec = deptoSeleccionado ? DATOS.find((d) => d.depto === deptoSeleccionado) : null;

  return (
    <Box>
      {/* ── Pestañas de barrera ── */}
      <Box sx={{
        display: 'flex', borderBottom: `2px solid ${OV.grisMedio}25`,
        overflowX: 'auto', mb: 0,
      }}>
        {BARRERAS_CONFIG.map((b) => {
          const activa = barreraActiva === b.id;
          return (
            <Box key={b.id} onClick={() => { setBarreraActiva(b.id); setDeptoSeleccionado(null); }}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 2.5, py: 1.75, cursor: 'pointer', flexShrink: 0,
                borderBottom: activa ? `3px solid ${b.color}` : '3px solid transparent',
                bgcolor: activa ? `${b.color}08` : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: `${b.color}06` },
              }}>
              <Box component="img" src={b.icono} alt=""
                sx={{ width: 16, height: 16, objectFit: 'contain',
                  opacity: activa ? 1 : 0.4 }} />
              <Typography variant="body2" sx={{
                fontWeight: activa ? 800 : 500, fontSize: '0.82rem',
                color: activa ? b.color : OV.grisOscuro,
              }}>
                {b.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── KPIs rápidos ── */}
      <Box sx={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderBottom: `1px solid ${OV.grisMedio}20`,
      }}>
        {[
          { label: 'Más afectado', valor: deptoTop.depto.length > 14 ? deptoTop.depto.slice(0, 14) + '…' : deptoTop.depto, color: barrConf.color },
          { label: 'Puntaje máximo', valor: `${deptoTop[barreraActiva]}/100`, color: barrConf.color },
          { label: 'Promedio nacional', valor: `${promedio}/100`, color: OV.grisOscuro },
          { label: 'En nivel crítico', valor: `${criticos} dptos`, color: '#DC2626' },
        ].map((k, i) => (
          <Box key={k.label} sx={{
            px: 2.5, py: 2, textAlign: 'center',
            borderLeft: i > 0 ? `1px solid ${OV.grisMedio}20` : 'none',
            bgcolor: i === 0 ? `${barrConf.color}04` : 'transparent',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: k.color, lineHeight: 1, mb: 0.4 }}>
              {k.valor}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem', fontWeight: 600 }}>
              {k.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Cuerpo: ranking + detalle ── */}
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: 3 }}>

          {/* Ranking */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: barrConf.color }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
                Ranking de departamentos — Barreras {barrConf.label}
              </Typography>
              <Chip label="Clic para ver detalle" size="small"
                sx={{ ml: 'auto', bgcolor: `${barrConf.color}10`, color: barrConf.color,
                  fontWeight: 700, fontSize: '0.6rem' }} />
            </Box>

            {/* Leyenda */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
              {[
                { label: 'Bajo (0–39)',    color: '#4ADE80' },
                { label: 'Medio (40–59)',  color: '#FBBF24' },
                { label: 'Alto (60–79)',   color: '#F97316' },
                { label: 'Crítico (80+)', color: '#DC2626' },
              ].map((n) => (
                <Box key={n.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: n.color }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>
                    {n.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Filas */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9 }}>
              {ranking.map((fila, idx) => {
                const val   = fila[barreraActiva];
                const nv    = nivelColor(val);
                const selec = deptoSeleccionado === fila.depto;
                return (
                  <Box
                    key={fila.depto}
                    onClick={() => setDeptoSeleccionado(selec ? null : fila.depto)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 1.5, py: 0.9, borderRadius: 2, cursor: 'pointer',
                      border: '1.5px solid',
                      borderColor: selec ? barrConf.color : 'transparent',
                      bgcolor: selec ? `${barrConf.color}08` : 'transparent',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: `${barrConf.color}05`, borderColor: `${barrConf.color}40` },
                    }}
                  >
                    {/* Posición */}
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      bgcolor: idx < 3 ? barrConf.color : `${OV.grisMedio}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography variant="caption" sx={{
                        fontWeight: 800, fontSize: '0.6rem',
                        color: idx < 3 ? '#fff' : OV.grisMedio,
                      }}>
                        {idx + 1}
                      </Typography>
                    </Box>

                    {/* Nombre */}
                    <Typography variant="caption" sx={{
                      width: 160, flexShrink: 0, fontWeight: idx < 3 ? 700 : 500,
                      color: selec ? barrConf.color : OV.grisOscuro, fontSize: '0.74rem',
                    }}>
                      {fila.depto}
                    </Typography>

                    {/* Barra */}
                    <Box sx={{ flex: 1, height: 9, borderRadius: 4, bgcolor: `${OV.grisMedio}20`, overflow: 'hidden' }}>
                      <Box sx={{
                        height: '100%', borderRadius: 4,
                        bgcolor: nv.color, width: `${val}%`,
                        transition: 'width 0.4s ease',
                      }} />
                    </Box>

                    {/* Valor + nivel */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                      <Typography variant="caption" sx={{
                        fontWeight: 800, color: nv.color, fontSize: '0.78rem', width: 26, textAlign: 'right',
                      }}>
                        {val}
                      </Typography>
                      <Chip label={nv.label} size="small" sx={{
                        height: 17, fontSize: '0.56rem', fontWeight: 700,
                        bgcolor: nv.bg, color: nv.color,
                        border: `1px solid ${nv.color}40`,
                      }} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Panel de detalle */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: OV.rojoOscuro }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
                Comparación de barreras
              </Typography>
            </Box>

            {filaSelec ? (
              <PanelDetalleDpto fila={filaSelec} />
            ) : (
              <Box sx={{
                p: 3, borderRadius: 2.5,
                border: `1.5px dashed ${OV.grisMedio}50`,
                bgcolor: `${OV.grisMedio}05`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minHeight: 220, gap: 1.5,
              }}>
                <Box component="img" src={iconoPin} alt=""
                  sx={{ width: 32, height: 32, objectFit: 'contain', opacity: 0.25 }} />
                <Typography variant="body2" color="text.secondary"
                  sx={{ textAlign: 'center', lineHeight: 1.6, fontSize: '0.82rem' }}>
                  Selecciona un departamento en el ranking para ver la comparación de los 4 tipos de barrera
                </Typography>
              </Box>
            )}

            {/* Mini resumen de barreras nacionales */}
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1.5, display: 'block' }}>
                Promedio — 15 departamentos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {BARRERAS_CONFIG.map((bc) => {
                  const prom = Math.round(datos15.reduce((s, d) => s + d[bc.id], 0) / datos15.length);
                  const nv   = nivelColor(prom);
                  return (
                    <Box key={bc.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box component="img" src={bc.icono} alt=""
                        sx={{ width: 14, height: 14, objectFit: 'contain', opacity: 0.6, flexShrink: 0 }} />
                      <Typography variant="caption" sx={{ width: 110, fontSize: '0.72rem', color: OV.grisOscuro, fontWeight: 500 }}>
                        {bc.label}
                      </Typography>
                      <Box sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: `${OV.grisMedio}20`, overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', borderRadius: 3, bgcolor: nv.color, width: `${prom}%` }} />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: nv.color, width: 24, textAlign: 'right' }}>
                        {prom}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Nota metodológica */}
      <Box sx={{ px: 3, py: 1.5, bgcolor: `${OV.grisMedio}08`, borderTop: `1px solid ${OV.grisMedio}20` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src={iconoPin} alt=""
            sx={{ width: 13, height: 13, objectFit: 'contain', opacity: 0.35 }} />
          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.67rem' }}>
            Análisis limitado a los 15 departamentos de intervención. Puntaje 0–100 construido a partir de reportes
            territoriales, % de víctimas sin reclamar, cobertura de puntos UARIV y distancia promedio a cabecera.
            Mayor puntaje = mayor severidad de la barrera.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Página principal del módulo ──────────────────────────────────────────────
export default function BarrerasTerritorio() {
  return (
    <Box>
      <BotonVolver to="/modulos" />

      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Módulo 02" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.rojoOscuro}12`, color: OV.rojoOscuro, fontWeight: 800 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box component="img" src={iconoComunidad} alt=""
            sx={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Barreras desde el Territorio
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          Análisis de las dificultades que se presentan para el cobro o reclamación de la indemnización
          administrativa, clasificadas en cuatro tipos y analizadas por departamento.
        </Typography>
      </Box>

      {/* ══ DASHBOARD ════════════════════════════════════════════════════════ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.rojoOscuro }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
          Dashboard — Comportamiento Territorial
        </Typography>
      </Box>

      <Paper elevation={0} sx={{
        borderRadius: 3, overflow: 'hidden',
        border: `1.5px solid ${OV.rojoOscuro}22`,
      }}>
        {/* Cabecera */}
        <Box sx={{
          px: 3, py: 2, bgcolor: OV.grisOscuro,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}>
          <Box component="img" src={iconoFoco} alt=""
            sx={{ width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
            Análisis de barreras por departamento
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label="Interactivo" size="small"
            sx={{ bgcolor: `${OV.amarillo}22`, color: OV.amarillo, fontWeight: 700, fontSize: '0.65rem' }} />
        </Box>

        <DashboardBarreras />
      </Paper>
    </Box>
  );
}
