import { useState } from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';

import { OV } from '../../../theme';
import BotonVolver    from '../../../components/BotonVolver';
import iconoPin       from '../../../assets/icono_pin_georeferencia.png';
import iconoTelefono  from '../../../assets/icono_telefono.png';
import iconoAgenda    from '../../../assets/icono_agenda.png';
import iconoArchivo   from '../../../assets/icono_archivo.png';
import iconoFoco      from '../../../assets/icono_foco.png';
import iconoComunidad from '../../../assets/icono_comunidad.png';

// ─── Datos simulados — 15 departamentos de intervención ──────────────────────
const DATOS = [
  { depto: 'Antioquia',       tel_exito: 68, tel_activos: 72, tel_intentos: 2.1, jornadas: 24, atendidas: 3200, municipios: 18, cobertura: 62 },
  { depto: 'Atlántico',       tel_exito: 75, tel_activos: 79, tel_intentos: 1.8, jornadas: 12, atendidas: 1800, municipios:  8, cobertura: 70 },
  { depto: 'Bolívar',         tel_exito: 61, tel_activos: 65, tel_intentos: 2.5, jornadas: 18, atendidas: 2400, municipios: 12, cobertura: 54 },
  { depto: 'Boyacá',          tel_exito: 70, tel_activos: 73, tel_intentos: 2.0, jornadas: 10, atendidas: 1200, municipios:  7, cobertura: 58 },
  { depto: 'Cauca',           tel_exito: 44, tel_activos: 48, tel_intentos: 3.2, jornadas: 15, atendidas: 2100, municipios: 10, cobertura: 41 },
  { depto: 'Cesar',           tel_exito: 58, tel_activos: 62, tel_intentos: 2.7, jornadas: 14, atendidas: 1900, municipios:  9, cobertura: 49 },
  { depto: 'Chocó',           tel_exito: 32, tel_activos: 35, tel_intentos: 4.1, jornadas: 20, atendidas: 2800, municipios: 14, cobertura: 38 },
  { depto: 'Cundinamarca',    tel_exito: 74, tel_activos: 77, tel_intentos: 1.9, jornadas:  8, atendidas:  950, municipios:  6, cobertura: 65 },
  { depto: 'Huila',           tel_exito: 66, tel_activos: 69, tel_intentos: 2.3, jornadas: 11, atendidas: 1400, municipios:  8, cobertura: 55 },
  { depto: 'Magdalena',       tel_exito: 55, tel_activos: 59, tel_intentos: 2.8, jornadas: 16, atendidas: 2200, municipios: 11, cobertura: 47 },
  { depto: 'Meta',            tel_exito: 62, tel_activos: 65, tel_intentos: 2.4, jornadas: 13, atendidas: 1700, municipios:  9, cobertura: 52 },
  { depto: 'Nariño',          tel_exito: 40, tel_activos: 44, tel_intentos: 3.5, jornadas: 22, atendidas: 3000, municipios: 15, cobertura: 44 },
  { depto: 'Risaralda',       tel_exito: 78, tel_activos: 81, tel_intentos: 1.7, jornadas:  9, atendidas: 1100, municipios:  6, cobertura: 72 },
  { depto: 'Santander',       tel_exito: 72, tel_activos: 75, tel_intentos: 2.0, jornadas: 10, atendidas: 1300, municipios:  7, cobertura: 60 },
  { depto: 'Valle del Cauca', tel_exito: 76, tel_activos: 80, tel_intentos: 1.8, jornadas: 15, atendidas: 2500, municipios: 11, cobertura: 68 },
];

function nivelEfectividad(v) {
  if (v >= 70) return { color: '#16A34A', bg: '#F0FDF4', label: 'Alto' };
  if (v >= 50) return { color: '#FBBF24', bg: '#FFFBEB', label: 'Medio' };
  if (v >= 30) return { color: '#F97316', bg: '#FFF7ED', label: 'Bajo' };
  return { color: '#DC2626', bg: '#FEF2F2', label: 'Muy bajo' };
}

// ─── Tarjeta compacta: muestra ambos canales a la vez ────────────────────────
function TarjetaDpto({ fila, seleccionada, onSelect }) {
  const nvTel     = nivelEfectividad(fila.tel_exito);
  const nvCob     = nivelEfectividad(fila.cobertura);
  const combined  = Math.round((fila.tel_exito + fila.cobertura) / 2);
  const nvGeneral = nivelEfectividad(combined);

  return (
    <Paper
      elevation={0}
      onClick={onSelect}
      sx={{
        p: 1.75, borderRadius: 2, cursor: 'pointer',
        border: '2px solid',
        borderColor: seleccionada ? nvGeneral.color : `${OV.grisMedio}28`,
        bgcolor: seleccionada ? `${nvGeneral.color}08` : '#fff',
        transition: 'all 0.18s',
        '&:hover': {
          borderColor: `${nvGeneral.color}70`,
          boxShadow: `0 4px 16px ${nvGeneral.color}18`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Nombre + chip global */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Typography sx={{
          fontWeight: 700, fontSize: '0.75rem', color: OV.grisOscuro,
          lineHeight: 1.25, flex: 1, pr: 0.75,
        }}>
          {fila.depto}
        </Typography>
        <Chip label={nvGeneral.label} size="small" sx={{
          height: 15, fontSize: '0.52rem', fontWeight: 700, flexShrink: 0,
          bgcolor: nvGeneral.bg, color: nvGeneral.color,
          border: `1px solid ${nvGeneral.color}40`,
        }} />
      </Box>

      {/* Mini barra — telefónico */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Box component="img" src={iconoTelefono} alt=""
              sx={{ width: 9, height: 9, objectFit: 'contain', opacity: 0.5 }} />
            <Typography sx={{ fontSize: '0.58rem', color: 'text.secondary' }}>Tel</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.63rem', fontWeight: 800, color: nvTel.color }}>
            {fila.tel_exito}%
          </Typography>
        </Box>
        <Box sx={{ height: 4, borderRadius: 2, bgcolor: `${OV.grisMedio}22`, overflow: 'hidden' }}>
          <Box sx={{ height: '100%', borderRadius: 2, bgcolor: nvTel.color, width: `${fila.tel_exito}%` }} />
        </Box>
      </Box>

      {/* Mini barra — jornadas */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Box component="img" src={iconoAgenda} alt=""
              sx={{ width: 9, height: 9, objectFit: 'contain', opacity: 0.5 }} />
            <Typography sx={{ fontSize: '0.58rem', color: 'text.secondary' }}>Cob</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.63rem', fontWeight: 800, color: nvCob.color }}>
            {fila.cobertura}%
          </Typography>
        </Box>
        <Box sx={{ height: 4, borderRadius: 2, bgcolor: `${OV.grisMedio}22`, overflow: 'hidden' }}>
          <Box sx={{ height: '100%', borderRadius: 2, bgcolor: nvCob.color, width: `${fila.cobertura}%` }} />
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Panel de detalle (ancho completo, dos columnas) ──────────────────────────
function PanelDetalle({ fila, onCerrar }) {
  const nvTel = nivelEfectividad(fila.tel_exito);
  const nvCob = nivelEfectividad(fila.cobertura);

  return (
    <Paper elevation={0} sx={{ borderRadius: 2.5, border: `1.5px solid ${OV.grisMedio}30`, overflow: 'hidden', mt: 2 }}>
      {/* Cabecera del panel */}
      <Box sx={{
        px: 3, py: 1.75, bgcolor: OV.grisOscuro,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
          Detalle — {fila.depto}
        </Typography>
        <Box onClick={onCerrar} sx={{
          cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontWeight: 700,
          fontSize: '0.78rem', transition: 'color 0.15s',
          '&:hover': { color: '#fff' },
        }}>
          ✕ cerrar
        </Box>
      </Box>

      {/* Dos columnas: telefónico | jornadas */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, p: 3, gap: 3 }}>

        {/* ── Columna 1: Contacto telefónico ── */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, pb: 1.5,
            borderBottom: `2px solid ${OV.rojo}25` }}>
            <Box component="img" src={iconoTelefono} alt=""
              sx={{ width: 20, height: 20, objectFit: 'contain' }} />
            <Typography sx={{ fontWeight: 800, color: OV.rojo, fontSize: '0.9rem' }}>
              Contacto telefónico
            </Typography>
            <Box sx={{ ml: 'auto', px: 1.5, py: 0.4, borderRadius: 1.5,
              bgcolor: nvTel.bg, border: `1px solid ${nvTel.color}40` }}>
              <Typography sx={{ fontWeight: 900, color: nvTel.color, fontSize: '1rem', lineHeight: 1 }}>
                {fila.tel_exito}%
              </Typography>
            </Box>
          </Box>

          {[
            { label: '% Éxito primer contacto', v: fila.tel_exito,   color: OV.rojo       },
            { label: '% Registros activos',      v: fila.tel_activos, color: OV.rojoOscuro },
          ].map(({ label, v, color }) => {
            const nv = nivelEfectividad(v);
            return (
              <Box key={label} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color, fontSize: '0.74rem' }}>
                    {label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: nv.color }}>{v}%</Typography>
                    <Chip label={nv.label} size="small" sx={{
                      height: 16, fontSize: '0.55rem', fontWeight: 700,
                      bgcolor: nv.bg, color: nv.color, border: `1px solid ${nv.color}40`,
                    }} />
                  </Box>
                </Box>
                <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${color}12`, overflow: 'hidden' }}>
                  <Box sx={{ height: '100%', borderRadius: 4, bgcolor: nv.color,
                    width: `${v}%`, transition: 'width 0.5s ease' }} />
                </Box>
              </Box>
            );
          })}

          {/* Visualización de intentos */}
          <Box sx={{ pt: 1.5, borderTop: `1px solid ${OV.grisMedio}25` }}>
            <Typography variant="caption" sx={{
              fontWeight: 700, color: OV.grisOscuro, fontSize: '0.74rem', display: 'block', mb: 1,
            }}>
              Promedio de llamadas hasta lograr contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <Box key={i} sx={{
                  width: 32, height: 32, borderRadius: 1.5,
                  bgcolor: i < Math.round(fila.tel_intentos) ? OV.rojo : `${OV.grisMedio}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Typography sx={{
                    fontSize: '0.7rem', fontWeight: 800,
                    color: i < Math.round(fila.tel_intentos) ? '#fff' : OV.grisMedio,
                  }}>
                    {i + 1}
                  </Typography>
                </Box>
              ))}
              <Typography variant="caption" sx={{ color: OV.grisOscuro, fontWeight: 700, ml: 0.5 }}>
                {fila.tel_intentos} prom.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Columna 2: Despliegue y jornadas ── */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, pb: 1.5,
            borderBottom: `2px solid ${OV.grisOscuro}25` }}>
            <Box component="img" src={iconoAgenda} alt=""
              sx={{ width: 20, height: 20, objectFit: 'contain' }} />
            <Typography sx={{ fontWeight: 800, color: OV.grisOscuro, fontSize: '0.9rem' }}>
              Despliegue y jornadas
            </Typography>
            <Box sx={{ ml: 'auto', px: 1.5, py: 0.4, borderRadius: 1.5,
              bgcolor: nvCob.bg, border: `1px solid ${nvCob.color}40` }}>
              <Typography sx={{ fontWeight: 900, color: nvCob.color, fontSize: '1rem', lineHeight: 1 }}>
                {fila.cobertura}%
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: OV.grisOscuro, fontSize: '0.74rem' }}>
                % Cobertura territorial
              </Typography>
              <Chip label={nvCob.label} size="small" sx={{
                height: 16, fontSize: '0.55rem', fontWeight: 700,
                bgcolor: nvCob.bg, color: nvCob.color, border: `1px solid ${nvCob.color}40`,
              }} />
            </Box>
            <Box sx={{ height: 8, borderRadius: 4, bgcolor: `${OV.grisOscuro}12`, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', borderRadius: 4, bgcolor: nvCob.color,
                width: `${fila.cobertura}%`, transition: 'width 0.5s ease' }} />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, mt: 2.5 }}>
            {[
              { label: 'Jornadas realizadas',   valor: fila.jornadas,                          color: OV.grisOscuro  },
              { label: 'Víctimas atendidas',    valor: fila.atendidas.toLocaleString('es-CO'), color: OV.rojo        },
              { label: 'Municipios cubiertos',  valor: fila.municipios,                        color: OV.rojoOscuro  },
              { label: 'Cobertura territorial', valor: `${fila.cobertura}%`,                   color: OV.amarilloOsc },
            ].map(({ label, valor, color }) => (
              <Box key={label} sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}08`, border: `1px solid ${color}18` }}>
                <Typography sx={{ fontWeight: 900, color, fontSize: '1.1rem', lineHeight: 1, mb: 0.25 }}>
                  {valor}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.67rem', lineHeight: 1.3 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
function DashboardContactabilidad() {
  const [deptoSel, setDeptoSel] = useState(null);

  const promTel    = Math.round(DATOS.reduce((s, d) => s + d.tel_exito,  0) / DATOS.length);
  const promCob    = Math.round(DATOS.reduce((s, d) => s + d.cobertura, 0) / DATOS.length);
  const totalJorn  = DATOS.reduce((s, d) => s + d.jornadas,  0);
  const totalAtend = DATOS.reduce((s, d) => s + d.atendidas, 0);

  const datosOrdenados = [...DATOS].sort(
    (a, b) => ((b.tel_exito + b.cobertura) / 2) - ((a.tel_exito + a.cobertura) / 2),
  );

  const filaSelec = deptoSel ? DATOS.find((d) => d.depto === deptoSel) : null;

  return (
    <Box>
      {/* ── KPIs ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${OV.grisMedio}20` }}>
        {[
          { label: 'Éxito telefónico prom.',    valor: `${promTel}%`,                          color: OV.rojo,        icono: iconoTelefono  },
          { label: 'Cobertura jornadas prom.',  valor: `${promCob}%`,                          color: OV.grisOscuro,  icono: iconoAgenda    },
          { label: 'Total jornadas realizadas', valor: totalJorn,                              color: OV.rojoOscuro,  icono: iconoComunidad },
          { label: 'Víctimas atendidas',        valor: totalAtend.toLocaleString('es-CO'),     color: OV.amarilloOsc, icono: iconoArchivo   },
        ].map((k, i) => (
          <Box key={k.label} sx={{
            px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 1.5,
            borderLeft: i > 0 ? `1px solid ${OV.grisMedio}20` : 'none',
          }}>
            <Box component="img" src={k.icono} alt=""
              sx={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.6, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontWeight: 900, color: k.color, fontSize: '1.3rem', lineHeight: 1, mb: 0.3 }}>
                {k.valor}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.67rem', fontWeight: 600 }}>
                {k.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Leyenda + instrucción */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {[
              { label: 'Muy bajo (<30%)', color: '#DC2626' },
              { label: 'Bajo (30–49%)',   color: '#F97316' },
              { label: 'Medio (50–69%)',  color: '#FBBF24' },
              { label: 'Alto (≥70%)',     color: '#16A34A' },
            ].map((n) => (
              <Box key={n.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: n.color }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.67rem' }}>
                  {n.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary"
            sx={{ ml: 'auto', fontSize: '0.67rem', fontStyle: 'italic' }}>
            Chip = efectividad combinada · Clic en tarjeta para ver detalle
          </Typography>
        </Box>

        {/* ── Grilla de departamentos (5 columnas en desktop) ── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
          gap: 1.25,
        }}>
          {datosOrdenados.map((fila) => (
            <TarjetaDpto
              key={fila.depto}
              fila={fila}
              seleccionada={deptoSel === fila.depto}
              onSelect={() => setDeptoSel(deptoSel === fila.depto ? null : fila.depto)}
            />
          ))}
        </Box>

        {/* ── Panel de detalle expandible ── */}
        {filaSelec && (
          <PanelDetalle fila={filaSelec} onCerrar={() => setDeptoSel(null)} />
        )}
      </Box>

      {/* Nota metodológica */}
      <Box sx={{ px: 3, py: 1.5, bgcolor: `${OV.grisMedio}08`, borderTop: `1px solid ${OV.grisMedio}20` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src={iconoPin} alt=""
            sx={{ width: 13, height: 13, objectFit: 'contain', opacity: 0.35 }} />
          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.67rem' }}>
            Análisis limitado a los 15 departamentos de intervención. Datos simulados a partir de registros operativos
            de la UARIV y reportes de sedes regionales. Mayor porcentaje = mayor efectividad del canal de contacto.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function TrayectoriasContactabilidad() {
  return (
    <Box>
      <BotonVolver to="/modulos" />

      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Módulo 04" size="small"
          sx={{ mb: 1.5, bgcolor: `${OV.grisOscuro}12`, color: OV.grisOscuro, fontWeight: 800 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box component="img" src={iconoPin} alt=""
            sx={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
            Trayectorias de Contactabilidad y Localización
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
          Análisis de los canales y mecanismos a través de los cuales se llega hoy a las víctimas:
          contacto telefónico y despliegue territorial mediante jornadas, por departamento.
        </Typography>
      </Box>

      {/* ══ DASHBOARD ════════════════════════════════════════════════════════ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box sx={{ width: 5, height: 28, borderRadius: 2, bgcolor: OV.grisOscuro }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: OV.grisOscuro }}>
          Dashboard — Cómo se llega a la víctima hoy
        </Typography>
      </Box>

      <Paper elevation={0} sx={{
        borderRadius: 3, overflow: 'hidden',
        border: `1.5px solid ${OV.grisOscuro}25`,
      }}>
        <Box sx={{
          px: 3, py: 2, bgcolor: OV.grisOscuro,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}>
          <Box component="img" src={iconoFoco} alt=""
            sx={{ width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
            Efectividad de canales de contacto por departamento
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label="Interactivo" size="small"
            sx={{ bgcolor: `${OV.amarillo}22`, color: OV.amarillo, fontWeight: 700, fontSize: '0.65rem' }} />
        </Box>

        <DashboardContactabilidad />
      </Paper>
    </Box>
  );
}
