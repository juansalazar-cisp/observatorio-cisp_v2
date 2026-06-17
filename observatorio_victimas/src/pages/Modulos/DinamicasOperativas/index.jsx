import { useState } from 'react';
import { Box, Typography, Chip, Paper, Grid, Divider } from '@mui/material';
import { OV } from '../../../theme';
import BotonVolver    from '../../../components/BotonVolver';
import iconoEngranaje from '../../../assets/icono_engranaje.png';
import iconoComunidad from '../../../assets/icono_comunidad.png';
import iconoArchivo   from '../../../assets/icono_archivo.png';
import iconoTiempo    from '../../../assets/icono_tiempo.png';
import iconoFoco      from '../../../assets/icono_foco.png';
import iconoPin       from '../../../assets/icono_pin_georeferencia.png';
import iconoTelefono  from '../../../assets/icono_telefono.png';
import iconoPesos     from '../../../assets/icono_pesos.png';
import iconoCiclo     from '../../../assets/icono_ciclo.png';
import iconoReunion   from '../../../assets/icono_reunion.png';
import iconoBanderas  from '../../../assets/icono_banderas.png';

// ══════════════════════════════════════════════════════════════════════════════
// DATOS SIMULADOS — Instrumento 3 · Plantilla de Levantamiento (n=180)
// Cada campo referencia el código del Excel (F09, F14, etc.)
// ══════════════════════════════════════════════════════════════════════════════

const N = 180;

// ── Sección 3.2 Caracterización operativa ─────────────────────────────────────
const PERSONAS_ATENDIDAS = [          // F09
  { label: '1–20 personas',    n: 61, pct: 34 },
  { label: '21–50 personas',   n: 74, pct: 41 },
  { label: '51–100 personas',  n: 31, pct: 17 },
  { label: 'Más de 100',       n: 14, pct: 8  },
];
const COMPLEJIDAD = [                 // F11
  { label: 'Alta',   pct: 35, color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Media',  pct: 50, color: '#F97316', bg: '#FFF7ED' },
  { label: 'Baja',   pct: 15, color: '#16A34A', bg: '#F0FDF4' },
];
const KPI_INDEMNIZACION = 84;         // F10 = Sí
const KPI_AJUSTES       = 58;         // F12 = Sí

// ── Sección 3.3 Barreras operativas ──────────────────────────────────────────
const BARRERAS = [                    // F15–F22
  { id: 'contactabilidad', label: 'Contactabilidad',               pct: 74, campo: 'F15', color: OV.rojo },
  { id: 'info',            label: 'Información incompleta',        pct: 68, campo: 'F16', color: OV.rojo },
  { id: 'subsanacion',     label: 'Subsanación documental',        pct: 62, campo: 'F17', color: OV.rojoOscuro },
  { id: 'disp_inst',       label: 'Disponibilidad institucional',  pct: 49, campo: 'F20', color: OV.rojoOscuro },
  { id: 'coordinacion',    label: 'Coordinación interinstitucional', pct: 44, campo: 'F22', color: OV.amarilloOsc },
  { id: 'conectividad',    label: 'Conectividad',                  pct: 38, campo: 'F18', color: OV.amarilloOsc },
  { id: 'seguridad',       label: 'Seguridad',                     pct: 31, campo: 'F21', color: OV.grisOscuro },
  { id: 'acceso',          label: 'Acceso territorial',            pct: 29, campo: 'F19', color: OV.grisOscuro },
];
const FRECUENCIA_BARRERAS = [         // F24
  { label: 'Muy frecuentes', pct: 28, color: '#DC2626' },
  { label: 'Frecuentes',     pct: 45, color: '#F97316' },
  { label: 'Ocasionales',    pct: 21, color: '#FBBF24' },
  { label: 'Aisladas',       pct:  6, color: '#16A34A' },
];
const AFECTACION_BARRERAS = [         // F25
  { label: 'Alto',  pct: 38, color: '#DC2626' },
  { label: 'Medio', pct: 47, color: '#F97316' },
  { label: 'Bajo',  pct: 15, color: '#16A34A' },
];

// ── Sección 3.4 Contactabilidad y subsanación ─────────────────────────────────
const CAUSAS_CONTACTO = [             // F27
  { label: 'Datos desactualizados',           pct: 42 },
  { label: 'Cambio de residencia',            pct: 31 },
  { label: 'Zonas dispersas / rurales',       pct: 14 },
  { label: 'Dificultad de conectividad',      pct:  9 },
  { label: 'Condiciones de seguridad',        pct:  4 },
];
const TIPOS_SUBSANACION = [           // F30
  { label: 'Documental',              pct: 48 },
  { label: 'Bancaria',                pct: 24 },
  { label: 'Actualización de datos',  pct: 16 },
  { label: 'Validación de información', pct: 12 },
];
const RETRASOS = [                    // F32
  { label: 'Genera retrasos significativos', pct: 56, color: '#DC2626' },
  { label: 'Retrasos parciales',             pct: 31, color: '#F97316' },
  { label: 'Sin retrasos',                   pct: 13, color: '#16A34A' },
];

// ── Sección 3.5 Condiciones territoriales ────────────────────────────────────
const INDICADORES_TERRITORIO = [      // F34 F36 F37
  { label: 'Con limitaciones de acceso físico',    pct: 52, campo: 'F34', color: OV.rojo },
  { label: 'Con dificultades de conectividad',     pct: 64, campo: 'F36', color: OV.rojoOscuro },
  { label: 'Afectados por condiciones de seguridad', pct: 34, campo: 'F37', color: OV.amarilloOsc },
];
const AFECTACION_TERRITORIAL = [      // F38
  { label: 'Alto',  pct: 31, color: '#DC2626' },
  { label: 'Medio', pct: 49, color: '#F97316' },
  { label: 'Bajo',  pct: 20, color: '#16A34A' },
];

// ── Sección 3.6 Trayectorias críticas y resultados ───────────────────────────
const ETAPAS_CRITICAS = [             // F42
  { label: 'Subsanación',   pct: 38, color: OV.rojo },
  { label: 'Validación',    pct: 26, color: OV.rojoOscuro },
  { label: 'Cobro',         pct: 18, color: OV.amarilloOsc },
  { label: 'Asignación',    pct: 11, color: OV.grisOscuro },
  { label: 'Identificación', pct: 7, color: '#9D9D9C' },
];
const RESULTADOS = [                  // F44
  { label: 'Caso avanza',             pct: 52, color: '#16A34A' },
  { label: 'Pendiente de gestión',    pct: 24, color: '#F97316' },
  { label: 'Caso permanece igual',    pct: 17, color: '#FBBF24' },
  { label: 'No fue posible avanzar',  pct:  7, color: '#DC2626' },
];
const CONTRIBUCION = [                // F46
  { label: 'Contribuye a reducir barreras',      pct: 61, color: '#16A34A' },
  { label: 'Contribuye parcialmente',            pct: 30, color: '#F97316' },
  { label: 'No contribuye aún',                  pct:  9, color: '#DC2626' },
];

// ── Datos por departamento (para ranking y comparación) ───────────────────────
// Campos: n=registros, barreras=% con barreras (F14), complejidad (F11),
//         avanza=% resultado "Caso avanza" (F44), afectacion (F38), criticos=% trayectorias críticas (F40)
const DEPTOS = [
  { depto: 'Chocó',             n: 14, barreras: 93, complejidad: 'Alta',  avanza: 38, afectacion: 'Alto',  criticos: 79 },
  { depto: 'Nariño',            n: 16, barreras: 88, complejidad: 'Alta',  avanza: 44, afectacion: 'Alto',  criticos: 75 },
  { depto: 'Cauca',             n: 14, barreras: 86, complejidad: 'Alta',  avanza: 43, afectacion: 'Alto',  criticos: 71 },
  { depto: 'Magdalena',         n: 12, barreras: 83, complejidad: 'Alta',  avanza: 50, afectacion: 'Medio', criticos: 67 },
  { depto: 'Cesar',             n: 12, barreras: 75, complejidad: 'Media', avanza: 58, afectacion: 'Medio', criticos: 58 },
  { depto: 'Bolívar',           n: 12, barreras: 75, complejidad: 'Media', avanza: 58, afectacion: 'Medio', criticos: 58 },
  { depto: 'Meta',              n: 10, barreras: 70, complejidad: 'Media', avanza: 60, afectacion: 'Medio', criticos: 50 },
  { depto: 'Antioquia',         n: 18, barreras: 67, complejidad: 'Media', avanza: 61, afectacion: 'Medio', criticos: 56 },
  { depto: 'Huila',             n: 10, barreras: 60, complejidad: 'Media', avanza: 70, afectacion: 'Bajo',  criticos: 40 },
  { depto: 'Boyacá',            n:  8, barreras: 62, complejidad: 'Media', avanza: 75, afectacion: 'Bajo',  criticos: 38 },
  { depto: 'Santander',         n: 10, barreras: 50, complejidad: 'Baja',  avanza: 70, afectacion: 'Bajo',  criticos: 40 },
  { depto: 'Atlántico',         n: 12, barreras: 50, complejidad: 'Baja',  avanza: 75, afectacion: 'Bajo',  criticos: 33 },
  { depto: 'Valle del Cauca',   n: 14, barreras: 43, complejidad: 'Baja',  avanza: 79, afectacion: 'Bajo',  criticos: 29 },
  { depto: 'Cundinamarca',      n:  8, barreras: 38, complejidad: 'Baja',  avanza: 75, afectacion: 'Bajo',  criticos: 25 },
  { depto: 'Risaralda',         n: 10, barreras: 40, complejidad: 'Baja',  avanza: 80, afectacion: 'Bajo',  criticos: 20 },
];

// ── 4 Áreas del dashboard ─────────────────────────────────────────────────────
const AREAS = [
  { id: 'operacion',  label: 'Operación',         icono: iconoEngranaje, color: OV.grisOscuro,  campos: 'F09–F13' },
  { id: 'barreras',   label: 'Barreras',           icono: iconoComunidad, color: OV.rojo,        campos: 'F14–F25' },
  { id: 'contacto',   label: 'Contacto y Territorio', icono: iconoTelefono,  color: OV.rojoOscuro,  campos: 'F26–F39' },
  { id: 'resultados', label: 'Resultados',         icono: iconoFoco,      color: OV.amarilloOsc, campos: 'F40–F47' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function colorComplejidad(v) {
  if (v === 'Alta')  return { color: '#DC2626', bg: '#FEF2F2' };
  if (v === 'Media') return { color: '#F97316', bg: '#FFF7ED' };
  return { color: '#16A34A', bg: '#F0FDF4' };
}
function colorAfectacion(v) {
  if (v === 'Alto')  return { color: '#DC2626', bg: '#FEF2F2' };
  if (v === 'Medio') return { color: '#F97316', bg: '#FFF7ED' };
  return { color: '#16A34A', bg: '#F0FDF4' };
}

// ── Barra horizontal genérica ─────────────────────────────────────────────────
function BarraHorizontal({ label, pct, color, campo, height = 10, showPct = true }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Typography variant="caption" sx={{ color: OV.grisOscuro, fontWeight: 600, fontSize: '0.78rem' }}>
            {label}
          </Typography>
          {campo && (
            <Chip label={campo} size="small" sx={{
              height: 14, fontSize: '0.5rem', fontWeight: 700,
              bgcolor: `${color}12`, color, border: `1px solid ${color}30`,
            }} />
          )}
        </Box>
        {showPct && (
          <Typography variant="caption" sx={{ fontWeight: 800, color, fontSize: '0.82rem', ml: 1, flexShrink: 0 }}>
            {pct}%
          </Typography>
        )}
      </Box>
      <Box sx={{ height, borderRadius: 4, bgcolor: `${color}18`, overflow: 'hidden' }}>
        <Box sx={{ height: '100%', borderRadius: 4, bgcolor: color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
      </Box>
    </Box>
  );
}

// ── Distribución de porciones (row de chips con barra apilada) ─────────────────
function DistribucionApilada({ items, titulo }) {
  return (
    <Box>
      {titulo && (
        <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, display: 'block', mb: 1, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {titulo}
        </Typography>
      )}
      {/* Barra apilada */}
      <Box sx={{ display: 'flex', height: 12, borderRadius: 4, overflow: 'hidden', mb: 1.5 }}>
        {items.map((it) => (
          <Box key={it.label} sx={{ width: `${it.pct}%`, bgcolor: it.color, transition: 'width 0.5s' }} />
        ))}
      </Box>
      {/* Leyenda */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {items.map((it) => (
          <Box key={it.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: it.color, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ fontSize: '0.68rem', color: OV.grisOscuro }}>
              {it.label} <strong style={{ color: it.color }}>{it.pct}%</strong>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Sección de subtítulo ──────────────────────────────────────────────────────
function SubTitulo({ texto, campo }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 2.5 }}>
      <Box sx={{ width: 3, height: 16, borderRadius: 1, bgcolor: OV.rojo }} />
      <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro, fontSize: '0.82rem' }}>
        {texto}
      </Typography>
      {campo && (
        <Chip label={campo} size="small" sx={{ height: 16, fontSize: '0.55rem', fontWeight: 700, bgcolor: `${OV.rojo}10`, color: OV.rojo }} />
      )}
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TABS DE CONTENIDO
// ══════════════════════════════════════════════════════════════════════════════

function TabOperacion() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>

        {/* Personas atendidas */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SubTitulo texto="Personas atendidas por sesión" campo="F09" />
          {PERSONAS_ATENDIDAS.map((it) => (
            <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={OV.grisOscuro} height={9} />
          ))}
          <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block', fontSize: '0.65rem' }}>
            Total registros analizados: {N}
          </Typography>
        </Grid>

        {/* Complejidad operativa */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SubTitulo texto="Nivel de complejidad operativa" campo="F11" />
          <DistribucionApilada items={COMPLEJIDAD} />
          <Box sx={{ mt: 2.5 }}>
            <SubTitulo texto="Indicadores clave" />
            {[
              { label: `Casos relacionados con indemnización administrativa`, pct: KPI_INDEMNIZACION, campo: 'F10', color: OV.rojo },
              { label: `Requirió ajustes operativos no previstos`, pct: KPI_AJUSTES, campo: 'F12', color: OV.amarilloOsc },
            ].map((it) => (
              <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={it.color} campo={it.campo} height={9} />
            ))}
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

function TabBarreras() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>

        {/* 8 tipos de barreras */}
        <Grid size={{ xs: 12, md: 7 }}>
          <SubTitulo texto="Barreras identificadas por tipo" campo="F15–F22" />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontSize: '0.72rem' }}>
            % de registros donde se reportó cada barrera (F14=Sí · {Math.round(N * 0.83)} registros con barreras)
          </Typography>
          {BARRERAS.map((b) => (
            <BarraHorizontal key={b.id} label={b.label} pct={b.pct} color={b.color} campo={b.campo} height={11} />
          ))}
        </Grid>

        {/* Frecuencia + Afectación */}
        <Grid size={{ xs: 12, md: 5 }}>
          <SubTitulo texto="Frecuencia de las barreras" campo="F24" />
          <DistribucionApilada items={FRECUENCIA_BARRERAS} />

          <Box sx={{ mt: 3 }}>
            <SubTitulo texto="Nivel de afectación al proceso" campo="F25" />
            <DistribucionApilada items={AFECTACION_BARRERAS} />
          </Box>

          <Paper elevation={0} sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: `${OV.rojo}06`, border: `1px solid ${OV.rojo}18` }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: OV.rojo, display: 'block', mb: 0.5 }}>
              Barrera más frecuente
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: OV.grisOscuro }}>
              Contactabilidad — 74% de los registros
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Campo F15 · Sección 3.3
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

function TabContacto() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>

        {/* Causas de dificultad de contacto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SubTitulo texto="Principal causa de dificultad de contacto" campo="F27" />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontSize: '0.72rem' }}>
            % de registros con dificultades de localización (F26=Sí)
          </Typography>
          {CAUSAS_CONTACTO.map((it) => (
            <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={OV.rojo} height={9} />
          ))}

          <Box sx={{ mt: 3 }}>
            <SubTitulo texto="Retrasos por subsanación" campo="F32" />
            <DistribucionApilada items={RETRASOS} />
          </Box>
        </Grid>

        {/* Tipos de subsanación + Territorio */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SubTitulo texto="Tipo de subsanación más frecuente" campo="F30" />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontSize: '0.72rem' }}>
            % de registros con subsanación recurrente (F29=Sí)
          </Typography>
          {TIPOS_SUBSANACION.map((it) => (
            <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={OV.rojoOscuro} height={9} />
          ))}

          <Box sx={{ mt: 3 }}>
            <SubTitulo texto="Condiciones territoriales" campo="F34–F37" />
            {INDICADORES_TERRITORIO.map((it) => (
              <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={it.color} campo={it.campo} height={9} />
            ))}
          </Box>

          <Box sx={{ mt: 2 }}>
            <SubTitulo texto="Nivel de afectación territorial" campo="F38" />
            <DistribucionApilada items={AFECTACION_TERRITORIAL} />
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

function TabResultados() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>

        {/* Etapa de mayor dificultad */}
        <Grid size={{ xs: 12, md: 5 }}>
          <SubTitulo texto="Etapa de mayor dificultad" campo="F42" />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontSize: '0.72rem' }}>
            % de registros con trayectorias críticas (F40=Sí)
          </Typography>
          {ETAPAS_CRITICAS.map((it) => (
            <BarraHorizontal key={it.label} label={it.label} pct={it.pct} color={it.color} height={11} />
          ))}
        </Grid>

        {/* Resultados + Contribución */}
        <Grid size={{ xs: 12, md: 7 }}>
          <SubTitulo texto="Resultado predominante de la intervención" campo="F44" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3 }}>
            {RESULTADOS.map((it) => (
              <Box key={it.label} sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                p: 1.5, borderRadius: 2,
                bgcolor: `${it.color}08`, border: `1px solid ${it.color}25`,
              }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: it.color, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ flex: 1, fontWeight: 600, color: OV.grisOscuro, fontSize: '0.78rem' }}>
                  {it.label}
                </Typography>
                <Box sx={{ width: 80, height: 8, borderRadius: 4, bgcolor: `${it.color}20`, overflow: 'hidden', flexShrink: 0 }}>
                  <Box sx={{ height: '100%', borderRadius: 4, bgcolor: it.color, width: `${it.pct}%` }} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: it.color, width: 32, textAlign: 'right', flexShrink: 0 }}>
                  {it.pct}%
                </Typography>
              </Box>
            ))}
          </Box>

          <SubTitulo texto="¿La estrategia contribuye a reducir barreras?" campo="F46" />
          <DistribucionApilada items={CONTRIBUCION} />

          <Paper elevation={0} sx={{ mt: 2.5, p: 2, borderRadius: 2, bgcolor: `${OV.amarillo}10`, border: `1px solid ${OV.amarillo}40` }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: OV.amarilloOsc, display: 'block', mb: 0.25 }}>
              Dato clave
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: OV.grisOscuro }}>
              91% de los registros reporta contribución (total o parcial) de la estrategia
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

// ── Ranking de departamentos ──────────────────────────────────────────────────
function RankingDeptos({ deptoSel, onSelect }) {
  const ordenados = [...DEPTOS].sort((a, b) => b.barreras - a.barreras);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: OV.rojo }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
          Departamentos por carga de barreras
        </Typography>
        <Chip label="F14" size="small" sx={{ height: 14, fontSize: '0.5rem', fontWeight: 700, bgcolor: `${OV.rojo}10`, color: OV.rojo }} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.68rem' }}>
        Clic para ver detalle
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.7, maxHeight: 440, overflowY: 'auto', pr: 0.5 }}>
        {ordenados.map((d, idx) => {
          const nc = colorComplejidad(d.complejidad);
          const selec = deptoSel === d.depto;
          const barrColor = d.barreras >= 80 ? '#DC2626' : d.barreras >= 60 ? '#F97316' : d.barreras >= 40 ? '#FBBF24' : '#16A34A';
          return (
            <Box key={d.depto}
              onClick={() => onSelect(selec ? null : d.depto)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.2,
                px: 1.5, py: 1, borderRadius: 2, cursor: 'pointer',
                border: '1.5px solid',
                borderColor: selec ? OV.rojo : 'transparent',
                bgcolor: selec ? `${OV.rojo}07` : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: `${OV.rojo}05`, borderColor: `${OV.rojo}40` },
              }}
            >
              {/* Posición */}
              <Box sx={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                bgcolor: idx < 3 ? OV.rojo : `${OV.grisMedio}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '0.55rem', fontWeight: 800, color: idx < 3 ? '#fff' : OV.grisMedio }}>
                  {idx + 1}
                </Typography>
              </Box>

              {/* Nombre */}
              <Typography variant="caption" sx={{
                width: 120, flexShrink: 0, fontWeight: idx < 3 ? 700 : 500,
                color: selec ? OV.rojo : OV.grisOscuro, fontSize: '0.74rem',
              }}>
                {d.depto}
              </Typography>

              {/* Barra barreras */}
              <Box sx={{ flex: 1, height: 7, borderRadius: 3, bgcolor: `${OV.grisMedio}20`, overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 3, bgcolor: barrColor, width: `${d.barreras}%`, transition: 'width 0.4s' }} />
              </Box>

              {/* % barreras */}
              <Typography variant="caption" sx={{ fontWeight: 800, color: barrColor, width: 32, textAlign: 'right', flexShrink: 0, fontSize: '0.73rem' }}>
                {d.barreras}%
              </Typography>

              {/* Chip complejidad */}
              <Chip label={d.complejidad} size="small" sx={{
                height: 16, fontSize: '0.52rem', fontWeight: 700,
                bgcolor: nc.bg, color: nc.color, border: `1px solid ${nc.color}30`, flexShrink: 0,
              }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Panel detalle por departamento ────────────────────────────────────────────
function PanelDetalleDpto({ depto }) {
  const d = DEPTOS.find((x) => x.depto === depto);
  if (!d) return null;
  const nc = colorComplejidad(d.complejidad);
  const na = colorAfectacion(d.afectacion);
  const avanzaColor = d.avanza >= 70 ? '#16A34A' : d.avanza >= 50 ? '#F97316' : '#DC2626';
  const barrColor   = d.barreras >= 80 ? '#DC2626' : d.barreras >= 60 ? '#F97316' : d.barreras >= 40 ? '#FBBF24' : '#16A34A';

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: `1.5px solid ${OV.grisMedio}30`, bgcolor: '#FAFAFA' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Departamento seleccionado
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: OV.grisOscuro, lineHeight: 1.2 }}>
            {d.depto}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {d.n} registros · Instrumento 3
          </Typography>
        </Box>
        <Chip label={d.complejidad} size="small"
          sx={{ bgcolor: nc.bg, color: nc.color, fontWeight: 800, fontSize: '0.7rem' }} />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[
          { label: '% registros con barreras (F14)',        v: d.barreras,  color: barrColor,    suffix: '%' },
          { label: '% casos que avanzan (F44)',             v: d.avanza,    color: avanzaColor,  suffix: '%' },
          { label: '% trayectorias críticas (F40)',         v: d.criticos,  color: OV.rojo,      suffix: '%' },
        ].map(({ label, v, color, suffix }) => (
          <Box key={label}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
              <Typography variant="caption" sx={{ fontSize: '0.72rem', color: OV.grisOscuro, fontWeight: 600 }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color, fontSize: '0.78rem' }}>
                {v}{suffix}
              </Typography>
            </Box>
            <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${color}18`, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', borderRadius: 4, bgcolor: color, width: `${v}%`, transition: 'width 0.5s' }} />
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, bgcolor: na.bg, border: `1px solid ${na.color}30`, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: na.color, display: 'block' }}>
              {d.afectacion}
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: OV.grisMedio }}>
              Afectación territorial (F38)
            </Typography>
          </Box>
          <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, bgcolor: `${avanzaColor}08`, border: `1px solid ${avanzaColor}30`, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: avanzaColor, display: 'block' }}>
              {d.avanza}%
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: OV.grisMedio }}>
              Casos que avanzan (F44)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

// ── Resumen nacional (cuando no hay depto seleccionado) ───────────────────────
function ResumenNacional() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: `1.5px dashed ${OV.grisMedio}50`, bgcolor: `${OV.grisMedio}03` }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, display: 'block', mb: 1.5 }}>
        Promedios nacionales · n={N}
      </Typography>
      {[
        { label: 'Registros con barreras',      v: 83, color: OV.rojo,        campo: 'F14' },
        { label: 'Casos que avanzan',           v: 52, color: '#16A34A',      campo: 'F44' },
        { label: 'Con dificultad de contacto',  v: 71, color: OV.rojoOscuro,  campo: 'F26' },
        { label: 'Con afectación territorial',  v: 64, color: OV.amarilloOsc, campo: 'F34–F37' },
      ].map(({ label, v, color, campo }) => (
        <Box key={label} sx={{ mb: 1.2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="caption" sx={{ fontSize: '0.72rem', color: OV.grisOscuro }}>{label}</Typography>
              <Chip label={campo} size="small" sx={{ height: 13, fontSize: '0.48rem', fontWeight: 700, bgcolor: `${color}10`, color }} />
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color, fontSize: '0.75rem' }}>{v}%</Typography>
          </Box>
          <Box sx={{ height: 6, borderRadius: 3, bgcolor: `${color}18`, overflow: 'hidden' }}>
            <Box sx={{ height: '100%', borderRadius: 3, bgcolor: color, width: `${v}%` }} />
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function DinamicasOperativas() {
  const [tabActiva,  setTabActiva]  = useState('operacion');
  const [deptoSel,   setDeptoSel]   = useState(null);

  const areaConf = AREAS.find((a) => a.id === tabActiva);

  const tabContent = {
    operacion:  <TabOperacion  />,
    barreras:   <TabBarreras   />,
    contacto:   <TabContacto   />,
    resultados: <TabResultados />,
  };

  return (
    <Box>
      <BotonVolver to="/modulos" />

      {/* ── Encabezado ──────────────────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Módulo 05" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.rojo}12`, color: OV.rojo, fontWeight: 800 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box component="img" src={iconoEngranaje} alt=""
            sx={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Dinámicas Operativas Territoriales
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          Dashboard basado en el <strong>Instrumento 3 — Plantilla de Levantamiento</strong> (campos F01–F49).
          Visualiza las dinámicas operativas, barreras identificadas, contactabilidad, condiciones territoriales
          y resultados de la intervención en los 15 departamentos de la estrategia.
        </Typography>
        <Chip label={`n = ${N} registros simulados · ${DEPTOS.length} departamentos`} size="small"
          sx={{ mt: 1.5, bgcolor: `${OV.grisOscuro}10`, color: OV.grisOscuro, fontWeight: 700, fontSize: '0.65rem' }} />
      </Box>

      {/* ── KPIs ─────────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5, mb: 4 }}>
        {[
          { label: 'Registros analizados', valor: N,      icon: iconoArchivo,  color: OV.grisOscuro, campo: 'n total' },
          { label: '% con barreras',       valor: '83%',  icon: iconoComunidad, color: OV.rojo,       campo: 'F14' },
          { label: 'Casos que avanzan',    valor: '52%',  icon: iconoFoco,      color: '#16A34A',     campo: 'F44' },
          { label: 'Complejidad alta',     valor: '35%',  icon: iconoTiempo,    color: '#F97316',     campo: 'F11' },
        ].map((k) => (
          <Paper elevation={0} key={k.label} sx={{
            p: 2, borderRadius: 2.5, textAlign: 'center',
            border: `1.5px solid ${k.color}20`, bgcolor: `${k.color}04`,
          }}>
            <Box component="img" src={k.icon} alt=""
              sx={{ width: 28, height: 28, objectFit: 'contain', mb: 0.75, opacity: 0.75 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: k.color, lineHeight: 1 }}>
              {k.valor}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600, display: 'block', mt: 0.25 }}>
              {k.label}
            </Typography>
            <Chip label={k.campo} size="small" sx={{
              mt: 0.5, height: 14, fontSize: '0.48rem', fontWeight: 700,
              bgcolor: `${k.color}12`, color: k.color,
            }} />
          </Paper>
        ))}
      </Box>

      {/* ── Área de tarjetas de dimensiones ──────────────────────────────── */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Box sx={{ width: 5, height: 28, borderRadius: 2,
            background: `linear-gradient(180deg, ${OV.rojo} 0%, ${OV.grisOscuro} 100%)` }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Áreas de análisis — Instrumento 3
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 680, lineHeight: 1.8 }}>
          Haz clic en una tarjeta para cambiar el panel del dashboard. Cada área corresponde a una sección del instrumento de levantamiento.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {AREAS.map((area) => {
          const activa = tabActiva === area.id;
          return (
            <Grid key={area.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} onClick={() => setTabActiva(area.id)} sx={{
                borderRadius: 3, overflow: 'hidden', cursor: 'pointer',
                border: '2px solid',
                borderColor: activa ? area.color : `${area.color}25`,
                transition: 'box-shadow 0.18s, border-color 0.18s',
                '&:hover': { boxShadow: `0 6px 20px ${area.color}20`, borderColor: `${area.color}60` },
              }}>
                <Box sx={{
                  bgcolor: area.color, px: 2.5, py: 1.75,
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <Box sx={{
                    width: 38, height: 38, borderRadius: 2, flexShrink: 0,
                    bgcolor: 'rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Box component="img" src={area.icono} alt=""
                      sx={{ width: 22, height: 22, objectFit: 'contain',
                        filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, display: 'block', lineHeight: 1 }}>
                      {area.campos}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.2, fontSize: '0.95rem' }}>
                      {area.label}
                    </Typography>
                  </Box>
                  {activa && <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: OV.amarillo }} />}
                </Box>
                <Box sx={{ px: 2.5, py: 1.5 }}>
                  <Typography variant="caption" sx={{ color: activa ? area.color : OV.grisMedio, fontWeight: activa ? 800 : 600, fontSize: '0.66rem' }}>
                    {activa ? 'Dashboard activo ▸' : 'Ver análisis ▸'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* ── Dashboard ─────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: areaConf.color }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
          Dashboard — {areaConf.label}
        </Typography>
      </Box>

      <Grid container spacing={2.5}>

        {/* Panel izquierdo: Ranking + Detalle departamento */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={0} sx={{
            borderRadius: 3, overflow: 'hidden',
            border: `1.5px solid ${OV.grisMedio}25`,
          }}>
            <Box sx={{ px: 2.5, py: 1.75, bgcolor: OV.grisOscuro, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="img" src={iconoPin} alt=""
                sx={{ width: 18, height: 18, filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#fff', fontSize: '0.8rem' }}>
                Por departamento
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Box sx={{ width: 40, height: 3, bgcolor: OV.amarillo, borderRadius: 2 }} />
            </Box>
            <Box sx={{ p: 2 }}>
              <RankingDeptos deptoSel={deptoSel} onSelect={setDeptoSel} />
              <Box sx={{ mt: 2 }}>
                {deptoSel
                  ? <PanelDetalleDpto depto={deptoSel} />
                  : <ResumenNacional />
                }
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Panel derecho: Tabs de contenido */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{
            borderRadius: 3, overflow: 'hidden',
            border: `1.5px solid ${areaConf.color}30`,
          }}>
            {/* Cabecera */}
            <Box sx={{ px: 3, py: 2, bgcolor: areaConf.color, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={areaConf.icono} alt=""
                sx={{ width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                {areaConf.label} — campos {areaConf.campos}
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Chip label="Interactivo" size="small"
                sx={{ bgcolor: `${OV.amarillo}22`, color: OV.amarillo, fontWeight: 700, fontSize: '0.65rem' }} />
            </Box>

            {/* Pestañas secundarias */}
            <Box sx={{ display: 'flex', borderBottom: `2px solid ${OV.grisMedio}20`, overflowX: 'auto' }}>
              {AREAS.map((area) => {
                const activa = tabActiva === area.id;
                return (
                  <Box key={area.id}
                    onClick={() => setTabActiva(area.id)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0.75,
                      px: 2, py: 1.5, cursor: 'pointer', flexShrink: 0,
                      borderBottom: activa ? `3px solid ${area.color}` : '3px solid transparent',
                      bgcolor: activa ? `${area.color}07` : 'transparent',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: `${area.color}05` },
                    }}
                  >
                    <Box component="img" src={area.icono} alt=""
                      sx={{ width: 14, height: 14, objectFit: 'contain', opacity: activa ? 1 : 0.4 }} />
                    <Typography variant="body2" sx={{
                      fontWeight: activa ? 800 : 500, fontSize: '0.79rem',
                      color: activa ? area.color : OV.grisOscuro,
                    }}>
                      {area.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Contenido del tab */}
            {tabContent[tabActiva]}

            {/* Nota metodológica */}
            <Box sx={{ px: 3, py: 1.5, bgcolor: `${OV.grisMedio}08`, borderTop: `1px solid ${OV.grisMedio}20` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={iconoEngranaje} alt=""
                  sx={{ width: 12, height: 12, objectFit: 'contain', opacity: 0.35 }} />
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.64rem' }}>
                  Datos simulados vinculados al Instrumento 3 — Plantilla de Levantamiento · n={N} registros · {DEPTOS.length} departamentos · Estrategia de Reparación Individual CISP Colombia.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
