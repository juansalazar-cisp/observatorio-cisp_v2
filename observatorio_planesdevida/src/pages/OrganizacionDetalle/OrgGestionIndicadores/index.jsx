import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Paper, Grid, LinearProgress,
  Radio, RadioGroup, FormControlLabel, FormControl,
  Alert, Card, CardContent, Tooltip,
} from '@mui/material';
import ArrowBackIcon    from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import DownloadIcon     from '@mui/icons-material/Download';
import RestartAltIcon   from '@mui/icons-material/RestartAlt';
import AssessmentIcon   from '@mui/icons-material/Assessment';
import ListAltIcon      from '@mui/icons-material/ListAlt';
import PlayArrowIcon    from '@mui/icons-material/PlayArrow';
import html2canvas      from 'html2canvas';
import { jsPDF }        from 'jspdf';

import { useOrgData } from '../../../utils/orgData';
import {
  PREGUNTAS, INDICADORES, DIMENSIONES, WIZARD_STEPS,
  TOTAL_PREGUNTAS, TOTAL_INDICADORES,
  calcularPuntajeIndicador, calcularPuntajeDimension, calcularPuntajeGlobal,
  nivelDesempeno, cargarRespuestas, guardarRespuestas,
} from '../../../data/indicadoresPreguntas';

// ─── Gauge circular SVG ───────────────────────────────────────────────────────
function Gauge({ valor, max = 5, color, size = 90 }) {
  const pct  = valor / max;
  const r    = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const arc  = circ * 0.75;
  const dash = pct * arc;
  const gap  = circ - dash;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8e8e8" strokeWidth={10}
        strokeDasharray={`${arc} ${circ*0.25}`} strokeDashoffset={circ*0.125}
        strokeLinecap="round" transform={`rotate(135 ${size/2} ${size/2})`} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={`${dash} ${gap}`} strokeDashoffset={circ*0.125}
        strokeLinecap="round" transform={`rotate(135 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dasharray 0.5s ease' }} />
      <text x={size/2} y={size/2+2} textAnchor="middle" dominantBaseline="middle"
        fontSize={size*0.2} fontWeight="800" fill={color}>{valor.toFixed(1)}</text>
      <text x={size/2} y={size/2+size*0.19} textAnchor="middle" fontSize={size*0.11} fill="#aaa">/5</text>
    </svg>
  );
}

// ─── Radar SVG ────────────────────────────────────────────────────────────────
function RadarChart({ data, size = 300 }) {
  const cx = size/2, cy = size/2;
  const maxR = size/2 - 44;
  const n = data.length;
  function polarToXY(angle, r) {
    const rad = (angle - 90) * (Math.PI / 180);
    return [cx + r*Math.cos(rad), cy + r*Math.sin(rad)];
  }
  const angles = data.map((_, i) => (360/n)*i);
  const rings  = [1,2,3,4,5];
  const dataPts = data.map((d, i) => {
    const [x,y] = polarToXY(angles[i], (d.valor/5)*maxR);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((ring) => {
        const pts = angles.map((a) => { const [x,y]=polarToXY(a,(ring/5)*maxR); return `${x},${y}`; }).join(' ');
        return <polygon key={ring} points={pts} fill="none"
          stroke={ring===5?'#ccc':'#ebebeb'} strokeWidth={ring===5?1.5:1}
          strokeDasharray={ring<5?'3 3':'none'} />;
      })}
      {angles.map((a,i) => { const [x,y]=polarToXY(a,maxR); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e0e0e0" strokeWidth={1} />; })}
      <polygon points={dataPts} fill="#218380" fillOpacity={0.18} stroke="#218380" strokeWidth={2.5} />
      {data.map((d,i) => {
        const [x,y]=polarToXY(angles[i],(d.valor/5)*maxR);
        return <circle key={i} cx={x} cy={y} r={5} fill="#218380" stroke="#fff" strokeWidth={2} />;
      })}
      {data.map((d,i) => {
        const [x,y]=polarToXY(angles[i],maxR+24);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight="700" fill="#444">{d.label}</text>;
      })}
    </svg>
  );
}

// ─── Barra horizontal ─────────────────────────────────────────────────────────
function Barra({ label, valor, color }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display:'flex', justifyContent:'space-between', mb:0.5 }}>
        <Typography variant="caption" sx={{ fontWeight:600, fontSize:'0.75rem' }}>{label}</Typography>
        <Typography variant="caption" sx={{ fontWeight:800, color }}>{valor.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ height:10, borderRadius:5, bgcolor:`${color}20`, overflow:'hidden' }}>
        <Box sx={{ height:'100%', borderRadius:5, bgcolor:color, width:`${(valor/5)*100}%`, transition:'width 0.6s ease' }} />
      </Box>
    </Box>
  );
}

// ─── Tarjeta de intro de indicador ───────────────────────────────────────────
function TarjetaIntro({ indicador, color, onContinuar }) {
  return (
    <Paper elevation={0} sx={{
      p: { xs:3, md:4 }, borderRadius:3,
      border: `2px solid ${indicador.dimColor}40`,
      background: `linear-gradient(135deg, ${indicador.dimColor}10 0%, ${indicador.dimColor}04 100%)`,
    }}>
      {/* Dimensión */}
      <Chip
        label={indicador.dimension}
        sx={{ mb:2, fontWeight:800, fontSize:'0.7rem', letterSpacing:'0.08em',
          bgcolor: indicador.dimColor, color:'#fff' }}
      />

      {/* Indicador */}
      <Typography variant="h5" sx={{
        fontFamily:'"Alegreya Sans", serif', fontWeight:700,
        color: indicador.dimColor, mb:1.5, lineHeight:1.3,
      }}>
        {indicador.label}
      </Typography>

      {/* Descripción */}
      <Paper elevation={0} sx={{
        p:2.5, borderRadius:2, mb:3,
        bgcolor:'rgba(255,255,255,0.7)', border:`1px solid ${indicador.dimColor}20`,
      }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.9 }}>
          {indicador.descripcion}
        </Typography>
      </Paper>

      {/* Info variables */}
      <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:3, flexWrap:'wrap' }}>
        <Chip label={`${indicador.preguntas.length} variables`} size="small"
          sx={{ bgcolor:`${indicador.dimColor}18`, color:indicador.dimColor, fontWeight:700 }} />
        <Typography variant="caption" color="text.secondary">
          Responde cada pregunta en escala del 1 al 5
        </Typography>
      </Box>

      <Button variant="contained" endIcon={<PlayArrowIcon />} onClick={onContinuar}
        sx={{ fontWeight:700, borderRadius:2, px:3,
          bgcolor:indicador.dimColor, '&:hover':{ bgcolor:indicador.dimColor, filter:'brightness(0.9)' } }}>
        Iniciar variables
      </Button>
    </Paper>
  );
}

// ─── Wizard ───────────────────────────────────────────────────────────────────
function Wizard({ slug, color, onComplete, respuestasIniciales }) {
  const [stepIdx,    setStepIdx]    = useState(0);
  const [respuestas, setRespuestas] = useState(respuestasIniciales || {});

  const step       = WIZARD_STEPS[stepIdx];
  const totalSteps = WIZARD_STEPS.length;

  // Conteo de preguntas respondidas para la barra de progreso
  const respondidas  = Object.keys(respuestas).length;
  const pct          = Math.round((respondidas / TOTAL_PREGUNTAS) * 100);

  // Para las preguntas, identificar cuál es dentro de su indicador
  const currentPregunta = step.type === 'question' ? PREGUNTAS[step.preguntaIdx] : null;
  const currentValor    = currentPregunta ? respuestas[currentPregunta.id] : undefined;
  const indicadorActual = step.type === 'intro'
    ? step.indicador
    : INDICADORES.find((ind) => ind.preguntas.includes(step.preguntaIdx));

  // Número de la pregunta dentro de su indicador
  const nroPregEnIndicador = currentPregunta
    ? (indicadorActual?.preguntas.indexOf(step.preguntaIdx) ?? 0) + 1
    : 0;

  // Número de pregunta global
  const nroGlobal = step.type === 'question'
    ? WIZARD_STEPS.slice(0, stepIdx).filter((s) => s.type === 'question').length + 1
    : null;

  const esUltimoPaso = stepIdx === totalSteps - 1;

  function handleNext() {
    if (!esUltimoPaso) setStepIdx((i) => i + 1);
    else {
      guardarRespuestas(slug, { respuestas, fecha: new Date().toISOString(), completado: true });
      onComplete(respuestas);
    }
  }
  function handleBack() { if (stepIdx > 0) setStepIdx((i) => i - 1); }
  function handleSelectRespuesta(v) {
    setRespuestas((prev) => ({ ...prev, [currentPregunta.id]: Number(v) }));
  }

  // ¿Puede avanzar?
  const puedeAvanzar = step.type === 'intro' || currentValor !== undefined;

  return (
    <Box>
      {/* Barra de progreso global */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:0.75 }}>
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            {nroGlobal !== null && (
              <Chip label={`${nroGlobal} de ${TOTAL_PREGUNTAS}`}
                size="small"
                sx={{ bgcolor:color, color:'#fff', fontWeight:800, fontSize:'0.72rem', height:22 }} />
            )}
            {step.type === 'intro' && (
              <Chip label={`Indicador ${indicadorActual.id + 1} de ${TOTAL_INDICADORES}`}
                size="small"
                sx={{ bgcolor:`${indicadorActual.dimColor}18`, color:indicadorActual.dimColor,
                  fontWeight:700, fontSize:'0.72rem', height:22 }} />
            )}
            <Typography variant="caption" color="text.secondary">
              {respondidas} respondidas
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">{pct}% completado</Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct}
          sx={{ height:8, borderRadius:4,
            bgcolor:`${color}20`, '& .MuiLinearProgress-bar':{ bgcolor:color, borderRadius:4 } }} />
      </Box>

      {/* Paso tipo INTRO */}
      {step.type === 'intro' && (
        <TarjetaIntro
          indicador={step.indicador}
          color={color}
          onContinuar={handleNext}
        />
      )}

      {/* Paso tipo PREGUNTA */}
      {step.type === 'question' && currentPregunta && (
        <>
          {/* Contexto: dimensión + indicador */}
          <Box sx={{ display:'flex', gap:1, mb:2, flexWrap:'wrap' }}>
            <Chip label={indicadorActual?.dimension} size="small"
              sx={{ bgcolor:`${indicadorActual?.dimColor}18`, color:indicadorActual?.dimColor,
                fontWeight:800, fontSize:'0.68rem' }} />
            <Chip label={indicadorActual?.label} size="small" variant="outlined"
              sx={{ borderColor:`${indicadorActual?.dimColor}40`, color:indicadorActual?.dimColor,
                fontWeight:600, fontSize:'0.68rem' }} />
            <Typography variant="caption" color="text.disabled" sx={{ alignSelf:'center' }}>
              Variable {nroPregEnIndicador}/{indicadorActual?.preguntas.length}
            </Typography>
          </Box>

          {/* Tarjeta de pregunta */}
          <Paper elevation={0} sx={{
            p:{ xs:2.5, md:3.5 }, mb:3, borderRadius:3,
            border:`1.5px solid ${color}25`,
            background:`linear-gradient(135deg, ${color}06 0%, transparent 100%)`,
          }}>
            <Typography variant="h6" sx={{
              fontFamily:'"Alegreya Sans", serif', fontWeight:700,
              lineHeight:1.45, fontSize:{ xs:'1rem', md:'1.08rem' }, mb:2.5,
            }}>
              {currentPregunta.texto}
            </Typography>

            <FormControl component="fieldset" sx={{ width:'100%' }}>
              <RadioGroup value={currentValor ?? ''} onChange={(e) => handleSelectRespuesta(e.target.value)}>
                {currentPregunta.opciones.map((op) => (
                  <FormControlLabel
                    key={op.valor} value={op.valor}
                    control={<Radio sx={{ color:`${color}60`, '&.Mui-checked':{ color } }} />}
                    label={
                      <Typography variant="body2" sx={{ fontWeight: currentValor===op.valor ? 700 : 400 }}>
                        {op.label}
                      </Typography>
                    }
                    sx={{
                      mb:0.75, mx:0, px:1.5, py:0.75, borderRadius:2,
                      border:'1.5px solid',
                      borderColor: currentValor===op.valor ? color : 'transparent',
                      bgcolor:     currentValor===op.valor ? `${color}08` : 'transparent',
                      transition:'all 0.12s',
                      '&:hover':{ bgcolor:`${color}06`, borderColor:`${color}40` },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Navegación */}
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}
              onClick={handleBack} disabled={stepIdx===0}
              sx={{ borderColor:color, color, fontWeight:700, borderRadius:2,
                '&:hover':{ bgcolor:`${color}10` }, '&.Mui-disabled':{ borderColor:'#e0e0e0' } }}>
              Anterior
            </Button>

            {/* Dots por indicador */}
            <Box sx={{ display:'flex', gap:0.75 }}>
              {INDICADORES.map((ind) => {
                const done   = ind.preguntas.every((pi) => respuestas[pi] !== undefined);
                const active = ind.preguntas.includes(step.preguntaIdx);
                return (
                  <Tooltip key={ind.id} title={ind.label} placement="top">
                    <Box sx={{
                      width: active?14:8, height:8, borderRadius:4,
                      bgcolor: done ? ind.dimColor : active ? color : `${color}25`,
                      transition:'all 0.2s',
                    }} />
                  </Tooltip>
                );
              })}
            </Box>

            <Button variant="contained"
              endIcon={esUltimoPaso ? <CheckCircleIcon /> : <ArrowForwardIcon />}
              onClick={handleNext} disabled={!puedeAvanzar}
              sx={{ bgcolor:color, fontWeight:700, borderRadius:2,
                '&:hover':{ bgcolor:color, filter:'brightness(0.9)' },
                '&.Mui-disabled':{ bgcolor:`${color}40` } }}>
              {esUltimoPaso ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </>
      )}

      {/* Avance por indicador */}
      <Box sx={{ mt:3.5 }}>
        <Typography variant="caption" sx={{ fontWeight:700, color:'text.secondary', mb:1, display:'block' }}>
          Avance por indicador
        </Typography>
        <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.75 }}>
          {INDICADORES.map((ind) => {
            const r = ind.preguntas.filter((i) => respuestas[i] !== undefined).length;
            const p = Math.round((r / ind.preguntas.length) * 100);
            return (
              <Chip key={ind.id} size="small"
                label={`${ind.label.split(' ')[0]} ${p}%`}
                sx={{ fontSize:'0.65rem', fontWeight:700,
                  bgcolor: p===100 ? `${ind.dimColor}20` : `${ind.dimColor}10`,
                  color: ind.dimColor,
                  border:`1px solid ${p===100 ? ind.dimColor : 'transparent'}` }} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ respuestas, color, orgNombre, fecha, onReiniciar }) {
  const dashRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const global  = calcularPuntajeGlobal(respuestas);
  const nivelG  = nivelDesempeno(global);
  const fechaFmt = fecha
    ? new Date(fecha).toLocaleDateString('es-CO', { day:'2-digit', month:'long', year:'numeric' })
    : '';

  // Puntajes por indicador (8)
  const dataIndicadores = INDICADORES.map((ind) => ({
    ...ind,
    score: calcularPuntajeIndicador(ind.id, respuestas),
    nivel: nivelDesempeno(calcularPuntajeIndicador(ind.id, respuestas)),
  }));

  // Puntajes por dimensión (4) para el radar
  const dataDimensiones = DIMENSIONES.map((dim) => ({
    ...dim,
    valor: calcularPuntajeDimension(dim.id, respuestas),
  }));

  async function exportarPDF() {
    setExporting(true);
    try {
      const canvas = await html2canvas(dashRef.current, { scale:1.5, useCORS:true, backgroundColor:'#ffffff' });
      const pdf    = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
      const pageW  = pdf.internal.pageSize.getWidth();
      const pageH  = pdf.internal.pageSize.getHeight();
      const imgW   = pageW - 20;
      const imgH   = (canvas.height * imgW) / canvas.width;
      const margin = 10;
      if (imgH <= pageH - 20) {
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, margin, imgW, imgH);
      } else {
        const ratio = canvas.width / imgW;
        let srcY = 0; let first = true;
        while (srcY < canvas.height) {
          if (!first) pdf.addPage();
          const slice = document.createElement('canvas');
          slice.width  = canvas.width;
          slice.height = Math.min((pageH-20)*ratio, canvas.height - srcY);
          slice.getContext('2d').drawImage(canvas, 0, srcY, slice.width, slice.height, 0, 0, slice.width, slice.height);
          pdf.addImage(slice.toDataURL('image/png'), 'PNG', margin, margin, imgW, slice.height/ratio);
          srcY += slice.height; first = false;
        }
      }
      pdf.save(`Indicadores_${orgNombre.replace(/\s+/g,'_')}.pdf`);
    } finally { setExporting(false); }
  }

  return (
    <Box>
      {/* Acciones */}
      <Box sx={{ display:'flex', gap:2, mb:3, flexWrap:'wrap', alignItems:'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ flex:1 }}>
          {Object.keys(respuestas).length} variables respondidas · {fechaFmt}
        </Typography>
        <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={onReiniciar}
          sx={{ borderColor:'#ccc', color:'text.secondary', fontWeight:700, borderRadius:2 }}>
          Reiniciar
        </Button>
        <Button variant="contained" size="small" startIcon={<DownloadIcon />}
          onClick={exportarPDF} disabled={exporting}
          sx={{ bgcolor:color, fontWeight:700, borderRadius:2, '&:hover':{ bgcolor:color, filter:'brightness(0.9)' } }}>
          {exporting ? 'Generando…' : 'Descargar PDF'}
        </Button>
      </Box>

      <Box ref={dashRef} sx={{ bgcolor:'#fff', p:{ xs:1.5, md:3 } }}>

        {/* Encabezado */}
        <Box sx={{ mb:3, pb:2, borderBottom:`3px solid ${color}` }}>
          <Typography variant="overline" sx={{ color, fontWeight:700, fontSize:'0.68rem' }}>
            Consolidado de Indicadores — Plan de Vida
          </Typography>
          <Typography variant="h5" sx={{ fontFamily:'"Alegreya Sans", serif', fontWeight:700 }}>
            {orgNombre}
          </Typography>
          <Typography variant="caption" color="text.secondary">{fechaFmt}</Typography>
        </Box>

        {/* KPI global */}
        <Paper elevation={0} sx={{
          display:'flex', gap:3, mb:3, p:2.5, borderRadius:3,
          border:`2px solid ${nivelG.color}30`, bgcolor:`${nivelG.color}06`,
          flexWrap:'wrap', alignItems:'center',
        }}>
          <Gauge valor={global} color={nivelG.color} size={110} />
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight:600 }}>
              Puntaje Global
            </Typography>
            <Typography variant="h3" sx={{ fontWeight:900, color:nivelG.color, lineHeight:1 }}>
              {global.toFixed(1)}
              <Typography component="span" variant="body1" color="text.secondary"> /5.0</Typography>
            </Typography>
            <Chip label={nivelG.label} size="small"
              sx={{ mt:0.75, bgcolor:nivelG.color, color:'#fff', fontWeight:700 }} />
          </Box>
          <Box sx={{ flex:1, minWidth:200 }}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.9, fontSize:'0.82rem' }}>
              Evaluación de <strong>{TOTAL_INDICADORES} indicadores</strong> en{' '}
              <strong>{Object.keys(respuestas).length} variables</strong> distribuidas en{' '}
              <strong>{DIMENSIONES.length} dimensiones</strong>.
              Escala 1 (crítico) → 5 (óptimo).
            </Typography>
          </Box>
        </Paper>

        {/* Perfil por dimensión (radar) */}
        <Paper elevation={0} sx={{ p:2.5, mb:3, borderRadius:3, border:`1px solid ${color}20` }}>
          <Typography variant="subtitle2" sx={{ fontWeight:700, mb:1, color }}>
            Perfil por dimensión
          </Typography>
          <Box sx={{ display:'flex', justifyContent:'center' }}>
            <RadarChart data={dataDimensiones.map((d) => ({ label: d.label, valor: d.valor }))} size={280} />
          </Box>
          <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mt:1 }}>
            {dataDimensiones.map((d) => (
              <Box key={d.id} sx={{ display:'flex', alignItems:'center', gap:0.75 }}>
                <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:d.color }} />
                <Typography variant="caption" sx={{ fontWeight:600, fontSize:'0.7rem', color:'text.secondary' }}>
                  {d.label}: <strong style={{ color:d.color }}>{d.valor.toFixed(2)}</strong>
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Barras por indicador */}
        <Grid container spacing={2} sx={{ mb:3 }}>
          {DIMENSIONES.map((dim) => {
            const inds = dataIndicadores.filter((d) => dim.indicadores.includes(d.id));
            return (
              <Grid key={dim.id} size={{ xs:12, sm:6 }}>
                <Paper elevation={0} sx={{ p:2.5, borderRadius:3, border:`1px solid ${dim.color}25`, height:'100%' }}>
                  <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:2 }}>
                    <Box sx={{ width:4, height:20, borderRadius:1, bgcolor:dim.color }} />
                    <Typography variant="subtitle2" sx={{ fontWeight:700, color:dim.color }}>
                      {dim.label}
                    </Typography>
                    <Chip label={calcularPuntajeDimension(dim.id, respuestas).toFixed(2)} size="small"
                      sx={{ ml:'auto', bgcolor:`${dim.color}15`, color:dim.color, fontWeight:800, fontSize:'0.68rem' }} />
                  </Box>
                  {inds.map((ind) => (
                    <Barra key={ind.id} label={ind.label} valor={ind.score} color={ind.dimColor} />
                  ))}
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Cards de indicadores */}
        <Typography variant="subtitle2" sx={{ fontWeight:700, mb:2, color }}>
          Resultados por indicador
        </Typography>
        <Grid container spacing={2} sx={{ mb:3 }}>
          {dataIndicadores.map((ind) => (
            <Grid key={ind.id} size={{ xs:12, sm:6, md:3 }}>
              <Card elevation={0} sx={{ border:`1.5px solid ${ind.dimColor}28`, borderRadius:3,
                bgcolor:`${ind.dimColor}04`, height:'100%' }}>
                <CardContent sx={{ p:2 }}>
                  <Chip label={ind.dimension} size="small"
                    sx={{ mb:1, fontSize:'0.6rem', fontWeight:800,
                      bgcolor:ind.dimColor, color:'#fff', height:18 }} />
                  <Typography variant="caption" sx={{ fontWeight:700, color:ind.dimColor,
                    display:'block', lineHeight:1.3, mb:1.5, fontSize:'0.75rem' }}>
                    {ind.label}
                  </Typography>
                  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb:1 }}>
                    <Gauge valor={ind.score} color={ind.nivel.color} size={50} />
                    <Chip label={ind.nivel.label} size="small"
                      sx={{ height:18, fontSize:'0.6rem', fontWeight:700,
                        bgcolor:ind.nivel.color, color:'#fff' }} />
                  </Box>
                  <LinearProgress variant="determinate" value={(ind.score/5)*100}
                    sx={{ height:5, borderRadius:3,
                      bgcolor:`${ind.dimColor}20`, '& .MuiLinearProgress-bar':{ bgcolor:ind.nivel.color, borderRadius:3 } }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Detalle de respuestas por indicador */}
        <Typography variant="subtitle2" sx={{ fontWeight:700, mb:2, color }}>
          Detalle de variables
        </Typography>
        {INDICADORES.map((ind) => (
          <Box key={ind.id} sx={{ mb:3 }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:1.25, flexWrap:'wrap' }}>
              <Chip label={ind.dimension} size="small"
                sx={{ bgcolor:ind.dimColor, color:'#fff', fontWeight:800, fontSize:'0.65rem', height:20 }} />
              <Box sx={{ width:4, height:16, borderRadius:1, bgcolor:ind.dimColor }} />
              <Typography variant="body2" sx={{ fontWeight:700, color:ind.dimColor }}>
                {ind.label}
              </Typography>
              <Chip label={`Promedio: ${calcularPuntajeIndicador(ind.id, respuestas).toFixed(2)}`}
                size="small" sx={{ ml:'auto', fontSize:'0.65rem', fontWeight:700,
                  bgcolor:`${ind.dimColor}15`, color:ind.dimColor }} />
            </Box>
            {ind.preguntas.map((pIdx) => {
              const p   = PREGUNTAS[pIdx];
              const val = respuestas[pIdx];
              const op  = p.opciones.find((o) => o.valor === val);
              return (
                <Box key={pIdx} sx={{
                  display:'flex', gap:1.5, py:0.9, px:1.75, mb:0.5,
                  borderRadius:1.5, border:`1px solid ${ind.dimColor}18`,
                  bgcolor: val ? `${ind.dimColor}05` : '#fafafa',
                }}>
                  <Chip label={val ?? '—'} size="small"
                    sx={{ minWidth:26, height:20, fontSize:'0.68rem', fontWeight:800, flexShrink:0,
                      bgcolor: val ? ind.dimColor : '#e0e0e0', color: val ? '#fff' : '#aaa' }} />
                  <Box sx={{ flex:1, minWidth:0 }}>
                    <Typography variant="caption" sx={{ fontWeight:600, display:'block', lineHeight:1.4 }}>
                      {p.texto.length > 100 ? p.texto.slice(0,100)+'…' : p.texto}
                    </Typography>
                    {op && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize:'0.68rem' }}>
                        {op.label}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}

        {/* Pie */}
        <Box sx={{ pt:2, borderTop:'1px solid #e0e0e0', textAlign:'center' }}>
          <Typography variant="caption" color="text.disabled">
            CISP Colombia · Observatorio de Planes de Vida · {fechaFmt}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function OrgGestionIndicadores() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const org      = useOrgData(slug);

  const saved  = cargarRespuestas(slug);
  const [view,       setView]       = useState(saved?.completado ? 'dashboard' : 'wizard');
  const [respuestas, setRespuestas] = useState(saved?.respuestas || {});
  const [fecha,      setFecha]      = useState(saved?.fecha || null);

  if (!org) return (
    <Box sx={{ textAlign:'center', py:8 }}>
      <Typography variant="h5" color="text.secondary">Organización no encontrada</Typography>
      <Button onClick={() => navigate('/visualizacion')} sx={{ mt:2 }}>Volver</Button>
    </Box>
  );

  const color     = org.colores.primario;
  const tieneResp = Object.keys(respuestas).length > 0;

  function handleComplete(resp) {
    setRespuestas(resp);
    setFecha(new Date().toISOString());
    setView('dashboard');
  }

  function handleReiniciar() {
    guardarRespuestas(slug, { respuestas:{}, fecha:null, completado:false });
    setRespuestas({});
    setFecha(null);
    setView('wizard');
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/org/${slug}`)}
        sx={{ mb:3, color, fontWeight:700 }}>
        Volver a {org.etiqueta}
      </Button>

      {/* Encabezado */}
      <Paper elevation={0} sx={{
        p:{ xs:2.5, md:3.5 }, mb:4, borderRadius:3,
        background:`linear-gradient(135deg, ${color}18 0%, ${org.colores.secundario}10 100%)`,
        border:`1px solid ${color}25`, borderLeft:`5px solid ${color}`,
      }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:2, flexWrap:'wrap' }}>
          <Box sx={{ width:48, height:48, borderRadius:2, bgcolor:color, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <AssessmentIcon sx={{ color:'#fff', fontSize:26 }} />
          </Box>
          <Box sx={{ flex:1 }}>
            <Typography variant="overline" sx={{ color, fontWeight:700, fontSize:'0.68rem', lineHeight:1 }}>
              {org.etiqueta}
            </Typography>
            <Typography variant="h5" sx={{ fontFamily:'"Alegreya Sans", serif', fontWeight:700, color, lineHeight:1.2 }}>
              Gestión de Indicadores
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt:0.5 }}>
              8 indicadores · 40 variables · Seguimiento del Plan de Vida
            </Typography>
          </Box>
          <Chip label={`${Object.keys(respuestas).length}/${TOTAL_PREGUNTAS}`} size="small"
            sx={{ bgcolor:`${color}18`, color, fontWeight:700, fontSize:'0.75rem' }} />
        </Box>
      </Paper>

      {/* Tabs */}
      {tieneResp && (
        <Box sx={{ display:'flex', gap:1, mb:3 }}>
          {[
            { id:'wizard',    label:'Cuestionario', icon:<ListAltIcon /> },
            { id:'dashboard', label:'Dashboard',    icon:<AssessmentIcon /> },
          ].map((tab) => (
            <Button key={tab.id}
              variant={view===tab.id ? 'contained' : 'outlined'}
              startIcon={tab.icon}
              onClick={() => setView(tab.id)}
              sx={{ fontWeight:700, borderRadius:2,
                ...(view===tab.id
                  ? { bgcolor:color, '&:hover':{ bgcolor:color, filter:'brightness(0.9)' } }
                  : { borderColor:color, color }) }}>
              {tab.label}
            </Button>
          ))}
        </Box>
      )}

      {view === 'wizard' && (
        <>
          {tieneResp && (
            <Alert severity="info" sx={{ mb:3, borderRadius:2 }}>
              Tienes {Object.keys(respuestas).length} variables respondidas. Puedes continuar o ver el Dashboard.
            </Alert>
          )}
          <Wizard slug={slug} color={color} onComplete={handleComplete} respuestasIniciales={respuestas} />
        </>
      )}

      {view === 'dashboard' && tieneResp && (
        <Dashboard respuestas={respuestas} color={color}
          orgNombre={org.nombre || org.etiqueta} fecha={fecha} onReiniciar={handleReiniciar} />
      )}
    </Box>
  );
}
