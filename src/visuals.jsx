import React, { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from './effects.jsx'

// Steps a counter while the visual is on screen; reduced motion jumps to the final frame
function useTicker(total, interval, inView) {
  const [tick, setTick] = useState(() => (prefersReducedMotion() ? total - 1 : 0))
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    const id = setInterval(() => setTick(t => (t + 1) % total), interval)
    return () => clearInterval(id)
  }, [inView, total, interval])
  return tick
}

/* ---------- AikApply: an agent filling an admission portal ---------- */
const FIELDS = [
  ['Full name', 'Ayesha Khan'],
  ['Intermediate %', '87.45'],
  ['Program', 'BS Computer Science'],
  ['Campus', 'Lahore'],
]
const PAUSE = 7
const FIELD_TICKS = FIELDS.map(([, v]) => v.length + PAUSE)
const TYPING_TICKS = FIELD_TICKS.reduce((a, b) => a + b, 0)
const FORM_TOTAL = TYPING_TICKS + 14 + 34

export function FormVisual() {
  const [ref, inView] = useInView()
  const tick = useTicker(FORM_TOTAL, 55, inView)
  let left = tick, active = FIELDS.length
  const typed = FIELDS.map(([, value], i) => {
    if (left >= FIELD_TICKS[i]) { left -= FIELD_TICKS[i]; return value }
    if (active === FIELDS.length) active = i
    const chars = Math.max(0, left - 2); left = -1
    return value.slice(0, chars)
  })
  const submitting = tick >= TYPING_TICKS && tick < TYPING_TICKS + 14
  const submitted = tick >= TYPING_TICKS + 14
  const mapped = submitted || submitting ? FIELDS.length : active
  return (
    <div className="visual visual-form" ref={ref}>
      <div className="browser-bar"><i></i><i></i><i></i><span>admissions.university.edu.pk/apply</span></div>
      <div className="form-body">
        {FIELDS.map(([label], i) => (
          <label key={label} className={`fake-field ${i === active && !submitted ? 'focus' : ''} ${typed[i] === FIELDS[i][1] ? 'filled' : ''}`}>
            <span>{label}</span>
            <b>{typed[i]}{i === active && !submitted && <em className="type-caret"></em>}</b>
          </label>
        ))}
        <div className={`fake-submit ${submitting ? 'pressing' : ''} ${submitted ? 'done' : ''}`}>
          {submitted ? 'Application submitted ✓' : submitting ? 'Submitting…' : 'Submit application'}
        </div>
      </div>
      <div className="agent-line">
        <span className={`agent-dot ${submitted ? 'ok' : ''}`}></span>
        {submitted ? `agent · ${FIELDS.length}/${FIELDS.length} fields mapped · submitted` : `agent · mapping field ${Math.min(mapped + 1, FIELDS.length)}/${FIELDS.length} · gemini-2.5-flash`}
      </div>
    </div>
  )
}

/* ---------- TaskFlow: a live request log ---------- */
const LOG = [
  { m: 'POST', p: '/api/auth/login', s: 200, ms: 41 },
  { m: 'GET', p: '/api/tasks?priority=HIGH&overdue=true', s: 200, ms: 12 },
  { body: '[{ "id": 42, "title": "Ship v2", "priority": "HIGH", "overdue": true }]' },
  { m: 'PATCH', p: '/api/tasks/42/status', s: 200, ms: 9 },
  { m: 'GET', p: '/api/tasks/summary', s: 200, ms: 7 },
  { body: '{ "overdue": 0, "dueToday": 2, "completionRate": 75 }' },
  { m: 'GET', p: '/api/tasks  (no token)', s: 401, ms: 3 },
]
const LOG_TOTAL = LOG.length + 6

export function ApiVisual() {
  const [ref, inView] = useInView()
  const tick = useTicker(LOG_TOTAL, 650, inView)
  const shown = Math.min(LOG.length, tick + 1)
  return (
    <div className="visual visual-api" ref={ref}>
      <div className="browser-bar"><i></i><i></i><i></i><span>taskflow · request log</span></div>
      <div className="log-body">
        {LOG.slice(0, shown).map((row, i) => row.body
          ? <div key={i} className="log-row log-json">{row.body}</div>
          : (
            <div key={i} className="log-row">
              <span className={`method m-${row.m.toLowerCase()}`}>{row.m}</span>
              <span className="path">{row.p}</span>
              <span className={`code ${row.s >= 400 ? 'bad' : ''}`}>{row.s}</span>
              <span className="ms">{row.ms}ms</span>
            </div>
          ))}
        {shown < LOG.length && <div className="log-row log-wait"><em className="type-caret"></em></div>}
      </div>
      <div className="agent-line"><span className="agent-dot coral"></span>spring boot · jwt · postgres · {shown} of {LOG.length} lines</div>
    </div>
  )
}

/* ---------- Chess: a scholar's mate replayed on a live board ---------- */
const BACK = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
const FILES = 'abcdefgh'
const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' }
function initialPieces() {
  const pieces = []
  BACK.forEach((type, f) => {
    pieces.push({ id: `w${type}${f}`, type, white: true, sq: `${FILES[f]}1` })
    pieces.push({ id: `wP${f}`, type: 'P', white: true, sq: `${FILES[f]}2` })
    pieces.push({ id: `bP${f}`, type: 'P', white: false, sq: `${FILES[f]}7` })
    pieces.push({ id: `b${type}${f}`, type, white: false, sq: `${FILES[f]}8` })
  })
  return pieces
}
const MOVES = [['e2', 'e4', 'e4'], ['e7', 'e5', 'e5'], ['f1', 'c4', 'Bc4'], ['b8', 'c6', 'Nc6'], ['d1', 'h5', 'Qh5'], ['g8', 'f6', 'Nf6'], ['h5', 'f7', 'Qxf7#']]
const CHESS_TOTAL = MOVES.length + 5
function positionAfter(n) {
  let pieces = initialPieces()
  for (const [from, to] of MOVES.slice(0, n)) {
    pieces = pieces.filter(p => p.sq !== to).map(p => (p.sq === from ? { ...p, sq: to } : p))
  }
  return pieces
}
const at = sq => ({ left: `${FILES.indexOf(sq[0]) * 12.5}%`, top: `${(8 - Number(sq[1])) * 12.5}%` })

export function ChessVisual() {
  const [ref, inView] = useInView()
  const tick = useTicker(CHESS_TOTAL, 1000, inView)
  const played = Math.min(MOVES.length, tick)
  const pieces = positionAfter(played)
  const last = played ? MOVES[played - 1] : null
  const mate = played === MOVES.length
  return (
    <div className="visual visual-chess" ref={ref}>
      <div className="board" role="img" aria-label="Chess board replaying a four-move checkmate">
        {Array.from({ length: 64 }, (_, i) => {
          const sq = `${FILES[i % 8]}${8 - Math.floor(i / 8)}`
          const dark = (Math.floor(i / 8) + i) % 2 === 1
          const lit = last && (sq === last[0] || sq === last[1])
          return <span key={sq} className={`square ${dark ? 'dark' : ''} ${lit ? 'lit' : ''}`}></span>
        })}
        {pieces.map(p => (
          <span key={p.id} className={`piece ${p.white ? 'white' : 'black'} ${mate && p.id === 'bK4' ? 'mated' : ''}`} style={at(p.sq)}>
            {GLYPH[p.type]}{'︎'}
          </span>
        ))}
      </div>
      <div className="move-list">
        {MOVES.map(([, , san], i) => (
          <span key={san} className={i < played ? (i === played - 1 ? 'current' : 'past') : ''}>
            {i % 2 === 0 && <small>{i / 2 + 1}.</small>}{san}
          </span>
        ))}
        <strong className={mate ? 'show' : ''}>Checkmate</strong>
      </div>
    </div>
  )
}

export const visuals = { form: FormVisual, api: ApiVisual, chess: ChessVisual }
