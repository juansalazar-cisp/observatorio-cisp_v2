import { useState } from 'react';
import { Box, Typography, Chip, Paper, Divider } from '@mui/material';

import { OV } from '../../../theme';
import BotonVolver  from '../../../components/BotonVolver';
import iconoReunion from '../../../assets/icono_reunion.png';
import iconoChat    from '../../../assets/icono_chat.png';
import iconoArchivo from '../../../assets/icono_archivo.png';
import iconoFoco    from '../../../assets/icono_foco.png';
import iconoAnuncio from '../../../assets/icono_anuncio.png';
import iconoPin     from '../../../assets/icono_pin_georeferencia.png';

// ─── 4 dimensiones desde la perspectiva de las víctimas ──────────────────────
const DIMENSIONES = [
  {
    id: 'barreras',
    label: 'Percepción de barreras',
    color: OV.rojo,
    icono: iconoReunion,
    descripcion: 'Porcentaje de víctimas que declararon haber enfrentado obstáculos significativos para iniciar o completar el proceso de reclamación de la indemnización administrativa.',
    subpuntos: [
      '"Nunca llegué al punto de atención porque queda muy lejos"',
      '"No sabía qué documentos llevar y me pidieron cosas que no tenía"',
      '"Tuve miedo de ir por las amenazas en el municipio"',
      '"Fui tres veces y nunca me resolvieron nada"',
      '"No me informaron que tenía derecho a la indemnización"',
      '"El proceso me parece demasiado complicado para seguirlo sola"',
    ],
    stat: '78% de víctimas reportó al menos una barrera significativa',
  },
  {
    id: 'atencion',
    label: 'Insatisfacción con la atención',
    color: OV.rojoOscuro,
    icono: iconoChat,
    descripcion: 'Nivel de insatisfacción de las víctimas con la calidad de la atención recibida en los puntos de servicio de la UARIV: trato, claridad de la información y tiempos de respuesta.',
    subpuntos: [
      '"Me atendieron mal y sin explicarme nada"',
      '"Esperé horas para que me dijeran que volviera otro día"',
      '"El funcionario no sabía responder mis preguntas"',
      '"Me mandaron de oficina en oficina sin resolver mi caso"',
      '"Los horarios de atención no me permiten ir porque trabajo"',
      '"Nunca me notificaron el resultado de mi solicitud"',
    ],
    stat: '61% califica la atención como deficiente o muy deficiente',
  },
  {
    id: 'confianza',
    label: 'Desconfianza institucional',
    color: OV.amarilloOsc,
    icono: iconoArchivo,
    descripcion: 'Grado de desconfianza que las víctimas expresan hacia las instituciones responsables del proceso de reparación, basado en experiencias previas y percepciones colectivas.',
    subpuntos: [
      '"No creo que el Estado vaya a cumplirme"',
      '"Ya me prometieron la indemnización y nunca llegó"',
      '"Siento que nos tienen en una lista pero nunca nos llaman"',
      '"Prefiero no preguntar para no meterme en problemas"',
      '"Desconfío porque conozco casos donde les quitaron el apoyo"',
      '"Las instituciones no nos escuchan realmente"',
    ],
    stat: '54% desconfía de que el proceso llegue a buen término',
  },
  {
    id: 'derechos',
    label: 'Desconocimiento de derechos',
    color: OV.grisOscuro,
    icono: iconoAnuncio,
    descripcion: 'Proporción de víctimas que desconoce sus derechos, los montos de indemnización que le corresponden, los plazos del proceso o los pasos necesarios para completar la reclamación.',
    subpuntos: [
      '"No sé a cuánto dinero tengo derecho exactamente"',
      '"Nunca me explicaron cuáles son mis derechos como víctima"',
      '"No sé en qué etapa del proceso estoy"',
      '"Me enteré de la ley por un vecino, no por la UARIV"',
      '"No sé si puedo reclamar por más de un hecho victimizante"',
      '"Desconozco si mis hijos también tienen derecho"',
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

// ─── Datos por departamento (0–100, mayor = situación más crítica) ────────────
const DATOS = [
  { depto: 'Vaupés',             barreras: 96, atencion: 91, confianza: 88, derechos: 97 },
  { depto: 'Amazonas',           barreras: 95, atencion: 90, confianza: 87, derechos: 96 },
  { depto: 'Guainía',            barreras: 94, atencion: 89, confianza: 86, derechos: 95 },
  { depto: 'Chocó',              barreras: 91, atencion: 85, confianza: 79, derechos: 92 },
  { depto: 'Vichada',            barreras: 89, atencion: 87, confianza: 81, derechos: 91 },
  { depto: 'La Guajira',         barreras: 87, atencion: 82, confianza: 84, derechos: 89 },
  { depto: 'Putumayo',           barreras: 84, atencion: 79, confianza: 77, derechos: 83 },
  { depto: 'Guaviare',           barreras: 83, atencion: 80, confianza: 75, derechos: 82 },
  { depto: 'Nariño',             barreras: 81, atencion: 76, confianza: 78, derechos: 80 },
  { depto: 'Cauca',              barreras: 79, atencion: 74, confianza: 76, derechos: 78 },
  { depto: 'Arauca',             barreras: 76, atencion: 71, confianza: 73, derechos: 75 },
  { depto: 'Caquetá',            barreras: 74, atencion: 70, confianza: 70, derechos: 73 },
  { depto: 'Córdoba',            barreras: 70, atencion: 67, confianza: 68, derechos: 69 },
  { depto: 'Bolívar',            barreras: 68, atencion: 65, confianza: 67, derechos: 67 },
  { depto: 'Norte de Santander', barreras: 66, atencion: 63, confianza: 65, derechos: 64 },
  { depto: 'Sucre',              barreras: 64, atencion: 62, confianza: 63, derechos: 65 },
  { depto: 'Magdalena',          barreras: 61, atencion: 59, confianza: 60, derechos: 60 },
  { depto: 'Cesar',              barreras: 59, atencion: 57, confianza: 58, derechos: 57 },
  { depto: 'Antioquia',          barreras: 57, atencion: 58, confianza: 62, derechos: 55 },
  { depto: 'Tolima',             barreras: 56, atencion: 55, confianza: 57, derechos: 56 },
  { depto: 'Huila',              barreras: 53, atencion: 52, confianza: 54, derechos: 52 },
  { depto: 'Meta',               barreras: 52, atencion: 53, confianza: 56, derechos: 51 },
  { depto: 'Casanare',           barreras: 49, atencion: 48, confianza: 50, derechos: 48 },
  { depto: 'Boyacá',             barreras: 48, atencion: 47, confianza: 49, derechos: 47 },
  { depto: 'Caldas',             barreras: 47, atencion: 46, confianza: 48, derechos: 46 },
  { depto: 'Santander',          barreras: 43, atencion: 44, confianza: 46, derechos: 42 },
  { depto: 'Cundinamarca',       barreras: 41, atencion: 42, confianza: 44, derechos: 40 },
  { depto: 'Risaralda',          barreras: 39, atencion: 40, confianza: 42, derechos: 38 },
  { depto: 'Valle del Cauca',    barreras: 38, atencion: 41, confianza: 45, derechos: 37 },
  { depto: 'Atlántico',          barreras: 35, atencion: 38, confianza: 40, derechos: 35 },
  { depto: 'Quindío',            barreras: 33, atencion: 36, confianza: 38, derechos: 33 },
  { depto: 'Bogotá D.C.',        barreras: 28, atencion: 44, confianza: 48, derechos: 29 },
  { depto: 'San Andrés',         barreras: 36, atencion: 39, confianza: 41, derechos: 36 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function nivelColor(v) {
  if (v >= 80) return { color: '#DC2626', bg: '#FEF2F2', label: 'Crítico' };
  if (v >= 60) return { color: '#F97316', bg: '#FFF7ED', label: 'Alto' };
  if (v >= 40) return { color: '#FBBF24', bg: '#FFFBEB', label: 'Medio' };
  return { color: '#4ADE80', bg: '#F0FDF4', label: 'Bajo' };
}

// ─── Panel detalle por departamento ──────────────────────────────────────────
function PanelDetalle({ fila }) {
  const vals = [
    { id: 'barreras',  label: 'Percepción de barreras',     v: fila.barreras,  color: OV.rojo        },
    { id: 'atencion',  label: 'Insatisfacción atención',    v: fila.atencion,  color: OV.rojoOscuro  },
    { id: 'confianza', label: 'Desconfianza institucional', v: fila.confianza, color: OV.amarilloOsc },
    { id: 'derechos',  label: 'Desconocimiento de derechos', v: fila.derechos, color: OV.grisOscuro  },
  ];
  const total   = Math.round((fila.barreras + fila.atencion + fila.confianza + fila.derechos) / 4);
  const nvTotal = nivelColor(total);

  return (
    <Paper elevation={0} sx={{
      p: 2.5, borderRadius: 2.5, border: `1.5px solid ${OV.grisMedio}30`, bgcolor: '#FAFAFA',
    }}>
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
          bgcolor: nvTotal.bg, border: `1.5px solid ${nvTotal.color}40` }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: nvTotal.color, lineHeight: 1 }}>
            {total}
          </Typography>
          <Typography variant="caption" sx={{ color: nvTotal.color, fontWeight: 700, fontSize: '0.65rem' }}>
            Promedio
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

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
                  <Chip label={nv.label} size="small" sx={{
                    height: 16, fontSize: '0.55rem', fontWeight: 700,
                    bgcolor: nv.bg, color: nv.color, border: `1px solid ${nv.color}40`,
                  }} />
                </Box>
              </Box>
              <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${color}15`, overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 4, bgcolor: color,
                  width: `${v}%`, transition: 'width 0.5s ease' }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
function DashboardVictimas() {
  const [dimActiva, setDimActiva] = useState('barreras');
  const [deptoSel,  setDeptoSel]  = useState(null);

  const datos15   = DATOS.filter((d) => DEPTOS_ACTIVOS.has(d.depto));
  const dimConf   = DIMENSIONES.find((d) => d.id === dimActiva);
  const ranking   = [...datos15].sort((a, b) => b[dimActiva] - a[dimActiva]);
  const promedio  = Math.round(datos15.reduce((s, d) => s + d[dimActiva], 0) / datos15.length);
  const criticos  = datos15.filter((d) => d[dimActiva] >= 80).length;
  const top       = ranking[0];
  const filaSelec = deptoSel ? datos15.find((d) => d.depto === deptoSel) : null;

  return (
    <Box>
      {/* Pestañas */}
      <Box sx={{ display: 'flex', borderBottom: `2px solid ${OV.grisMedio}25`, overflowX: 'auto' }}>
        {DIMENSIONES.map((dim) => {
          const activa = dimActiva === dim.id;
          return (
            <Box key={dim.id}
              onClick={() => { setDimActiva(dim.id); setDeptoSel(null); }}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 2.5, py: 1.75, cursor: 'pointer', flexShrink: 0,
                borderBottom: activa ? `3px solid ${dim.color}` : '3px solid transparent',
                bgcolor: activa ? `${dim.color}08` : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: `${dim.color}06` },
              }}
            >
              <Box component="img" src={dim.icono} alt=""
                sx={{ width: 16, height: 16, objectFit: 'contain', opacity: activa ? 1 : 0.4 }} />
              <Typography variant="body2" sx={{
                fontWeight: activa ? 800 : 500, fontSize: '0.82rem',
                color: activa ? dim.color : OV.grisOscuro,
              }}>
                {dim.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* KPIs */}
      <Box sx={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderBottom: `1px solid ${OV.grisMedio}20`,
      }}>
        {[
          { label: 'Más afectado',      valor: top.depto.length > 14 ? top.depto.slice(0, 14) + '…' : top.depto, color: dimConf.color },
          { label: 'Puntaje máximo',    valor: `${top[dimActiva]}/100`, color: dimConf.color },
          { label: 'Promedio (15 dptos)', valor: `${promedio}/100`,    color: OV.grisOscuro },
          { label: 'En nivel crítico',  valor: `${criticos} dptos`,    color: '#DC2626' },
        ].map((k, i) => (
          <Box key={k.label} sx={{
            px: 2.5, py: 2, textAlign: 'center',
            borderLeft: i > 0 ? `1px solid ${OV.grisMedio}20` : 'none',
            bgcolor: i === 0 ? `${dimConf.color}04` : 'transparent',
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

      {/* Cuerpo: ranking + detalle */}
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: 3 }}>

          {/* Ranking */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: dimConf.color }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
                Ranking de departamentos — {dimConf.label}
              </Typography>
              <Chip label="Clic para ver detalle" size="small"
                sx={{ ml: 'auto', bgcolor: `${dimConf.color}10`, color: dimConf.color,
                  fontWeight: 700, fontSize: '0.6rem' }} />
            </Box>

            {/* Leyenda */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
              {[
                { label: 'Bajo (0–39)',    color: '#4ADE80' },
                { label: 'Medio (40–59)', color: '#FBBF24' },
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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9 }}>
              {ranking.map((fila, idx) => {
                const val   = fila[dimActiva];
                const nv    = nivelColor(val);
                const selec = deptoSel === fila.depto;
                return (
                  <Box key={fila.depto}
                    onClick={() => setDeptoSel(selec ? null : fila.depto)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 1.5, py: 0.9, borderRadius: 2, cursor: 'pointer',
                      border: '1.5px solid',
                      borderColor: selec ? dimConf.color : 'transparent',
                      bgcolor: selec ? `${dimConf.color}08` : 'transparent',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: `${dimConf.color}05`, borderColor: `${dimConf.color}40` },
                    }}
                  >
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      bgcolor: idx < 3 ? dimConf.color : `${OV.grisMedio}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography variant="caption" sx={{
                        fontWeight: 800, fontSize: '0.6rem',
                        color: idx < 3 ? '#fff' : OV.grisMedio,
                      }}>
                        {idx + 1}
                      </Typography>
                    </Box>

                    <Typography variant="caption" sx={{
                      width: 160, flexShrink: 0, fontWeight: idx < 3 ? 700 : 500,
                      color: selec ? dimConf.color : OV.grisOscuro, fontSize: '0.74rem',
                    }}>
                      {fila.depto}
                    </Typography>

                    <Box sx={{ flex: 1, height: 9, borderRadius: 4, bgcolor: `${OV.grisMedio}20`, overflow: 'hidden' }}>
                      <Box sx={{
                        height: '100%', borderRadius: 4, bgcolor: nv.color,
                        width: `${val}%`, transition: 'width 0.4s ease',
                      }} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                      <Typography variant="caption" sx={{
                        fontWeight: 800, color: nv.color, fontSize: '0.78rem', width: 26, textAlign: 'right',
                      }}>
                        {val}
                      </Typography>
                      <Chip label={nv.label} size="small" sx={{
                        height: 17, fontSize: '0.56rem', fontWeight: 700,
                        bgcolor: nv.bg, color: nv.color, border: `1px solid ${nv.color}40`,
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
              <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: OV.amarilloOsc }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
                Comparación por departamento
              </Typography>
            </Box>

            {filaSelec ? (
              <PanelDetalle fila={filaSelec} />
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
                  Selecciona un departamento en el ranking para ver las 4 dimensiones comparadas
                </Typography>
              </Box>
            )}

            {/* Resumen — 15 departamentos */}
            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, mb: 1.5, display: 'block' }}>
                Promedio — 15 departamentos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {DIMENSIONES.map((dim) => {
                  const prom = Math.round(datos15.reduce((s, d) => s + d[dim.id], 0) / datos15.length);
                  const nv   = nivelColor(prom);
                  return (
                    <Box key={dim.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box component="img" src={dim.icono} alt=""
                        sx={{ width: 14, height: 14, objectFit: 'contain', opacity: 0.6, flexShrink: 0 }} />
                      <Typography variant="caption" sx={{
                        width: 140, fontSize: '0.72rem', color: OV.grisOscuro, fontWeight: 500,
                      }}>
                        {dim.label}
                      </Typography>
                      <Box sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: `${OV.grisMedio}20`, overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', borderRadius: 3, bgcolor: nv.color, width: `${prom}%` }} />
                      </Box>
                      <Typography variant="caption" sx={{
                        fontWeight: 800, color: nv.color, width: 24, textAlign: 'right',
                      }}>
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
            Análisis limitado a los 15 departamentos de intervención. Puntaje 0–100 basado en encuestas
            de percepción, grupos focales y reportes de organizaciones de víctimas.
            Mayor puntaje = mayor afectación reportada por la población.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function MiradaVictimas() {
  return (
    <Box>
      <BotonVolver to="/modulos" />

      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Módulo 03" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.amarilloOsc}15`, color: OV.amarilloOsc, fontWeight: 800 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box component="img" src={iconoReunion} alt=""
            sx={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            La Mirada desde las Víctimas
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          Percepciones, experiencias y valoraciones de las víctimas sobre las barreras de acceso
          y el proceso de reclamación de la indemnización administrativa, analizadas por departamento.
        </Typography>
      </Box>

      {/* ══ DASHBOARD ════════════════════════════════════════════════════════ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.amarilloOsc }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
          Dashboard — Comportamiento Territorial
        </Typography>
      </Box>

      <Paper elevation={0} sx={{
        borderRadius: 3, overflow: 'hidden',
        border: `1.5px solid ${OV.amarilloOsc}30`,
      }}>
        <Box sx={{
          px: 3, py: 2, bgcolor: OV.grisOscuro,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}>
          <Box component="img" src={iconoFoco} alt=""
            sx={{ width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
            Percepciones y experiencias por departamento
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label="Interactivo" size="small"
            sx={{ bgcolor: `${OV.amarillo}22`, color: OV.amarillo, fontWeight: 700, fontSize: '0.65rem' }} />
        </Box>

        <DashboardVictimas />
      </Paper>
    </Box>
  );
}
