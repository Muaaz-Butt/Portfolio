import React, { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True while the element is on screen; animations only run when someone can see them
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2, ...options })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

// Adds .is-in to every .reveal element the first time it scrolls into view
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (prefersReducedMotion()) { els.forEach(el => el.classList.add('is-in')); return }
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
        setScrolled(window.scrollY > 24)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return [progress, scrolled]
}

// Interactive dot field behind the hero: dots ripple on their own and bloom lime around the cursor
export function HeroCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()
    const GAP = 26, RADIUS = 180
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let w = 0, h = 0, dots = [], raf = 0, running = false

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) dots.push(x, y)
      if (!running) draw(performance.now())
    }

    function draw(t) {
      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i += 2) {
        const dx0 = dots[i], dy0 = dots[i + 1]
        const dx = dx0 - mouse.x, dy = dy0 - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const f = Math.max(0, 1 - dist / RADIUS)
        const wave = reduce ? 0.5 : (Math.sin(dx0 * 0.011 + dy0 * 0.007 - t * 0.0011) + 1) / 2
        const push = f * f * 22
        const x = dx0 + (dist ? (dx / dist) * push : 0)
        const y = dy0 + (dist ? (dy / dist) * push : 0)
        const r = 0.9 + f * 2 + wave * 0.35
        ctx.fillStyle = f > 0.02
          ? `rgba(215,243,107,${0.18 + f * 0.82})`
          : `rgba(240,237,229,${0.07 + wave * 0.11})`
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill()
      }
      if (running) raf = requestAnimationFrame(draw)
    }

    function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(draw) } }
    function stop() { running = false; cancelAnimationFrame(raf) }

    function onMove(event) {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = event.clientX - rect.left; mouse.ty = event.clientY - rect.top
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty }
      if (reduce) draw(0)
    }
    function onLeave() { mouse.tx = mouse.ty = -9999; mouse.x = mouse.y = -9999; if (reduce) draw(0) }

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    const ro = new ResizeObserver(resize)
    ro.observe(canvas); io.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      stop(); io.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}

const term = (key, value, last = false) => [
  { t: '  ' }, { t: `"${key}"`, c: 'k' }, { t: ': ' },
  ...(Array.isArray(value)
    ? [{ t: '[' }, ...value.flatMap((v, i) => [{ t: `"${v}"`, c: 's' }, ...(i < value.length - 1 ? [{ t: ', ' }] : [])]), { t: ']' }]
    : [{ t: `"${value}"`, c: 's' }]),
  { t: last ? '\n' : ',\n' },
]
const TERMINAL = [
  { t: '$ ', c: 'p' }, { t: 'curl -s localhost:8000/api/whoami\n', c: 'cmd' },
  { t: '{\n' },
  ...term('name', 'Muaaz Butt'),
  ...term('role', 'Software Engineer'),
  ...term('focus', ['Python', 'Backend', 'LLM apps']),
  ...term('now', 'Technical Content Engineer @ Educative'),
  ...term('based_in', 'Lahore, PK'),
  ...term('status', 'open to interesting problems', true),
  { t: '}' },
]
const TERMINAL_LENGTH = TERMINAL.reduce((n, s) => n + s.t.length, 0)

// A terminal that types out a JSON "whoami" response
export function Terminal() {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? TERMINAL_LENGTH : 0))
  useEffect(() => {
    if (count >= TERMINAL_LENGTH) return
    // Pause after the command so it reads like a real request
    const delay = count === 0 ? 1100 : count === 36 ? 520 : count < 36 ? 38 : 14
    const id = setTimeout(() => setCount(c => Math.min(TERMINAL_LENGTH, c + (count < 36 ? 1 : 2))), delay)
    return () => clearTimeout(id)
  }, [count])

  let remaining = count
  const parts = []
  for (const [i, seg] of TERMINAL.entries()) {
    if (remaining <= 0) break
    const text = seg.t.slice(0, remaining)
    remaining -= text.length
    parts.push(<span key={i} className={seg.c ? `tk-${seg.c}` : undefined}>{text}</span>)
  }
  return (
    <div className="terminal">
      <div className="terminal-bar"><i></i><i></i><i></i><span>~/muaaz — zsh</span></div>
      <pre aria-label="Muaaz Butt: Software Engineer focused on Python, backend and LLM apps; Technical Content Engineer at Educative; based in Lahore."><code>{parts}<span className={`caret ${count >= TERMINAL_LENGTH ? 'idle' : ''}`}></span></code></pre>
    </div>
  )
}

export function Counter({ value, decimals = 0, prefix = '', suffix = '', pad = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.6 })
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? value : 0))
  const done = useRef(false)
  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    if (prefersReducedMotion()) { setShown(value); return }
    const start = performance.now(), duration = 1700
    let raf
    const tick = now => {
      const p = Math.min(1, (now - start) / duration)
      setShown(value * (1 - Math.pow(2, -10 * p)) / (1 - Math.pow(2, -10)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setShown(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])
  const text = decimals ? shown.toFixed(decimals) : String(Math.round(shown)).padStart(pad, '0')
  return <span ref={ref}>{prefix}{text}{suffix}</span>
}

// Element drifts toward the pointer while hovered
export function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null)
  function onMove(event) {
    if (prefersReducedMotion()) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  function onLeave() { ref.current.style.transform = '' }
  return <span ref={ref} className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>{children}</span>
}

// Soft ring that trails the pointer and swells over anything clickable (desktop only)
export function CursorRing() {
  const ref = useRef(null)
  const [enabled] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion())
  useEffect(() => {
    if (!enabled) return
    const ring = ref.current
    const pos = { x: -100, y: -100, tx: -100, ty: -100 }
    let raf
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.2; pos.y += (pos.ty - pos.y) * 0.2
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onMove = e => {
      pos.tx = e.clientX; pos.ty = e.clientY
      ring.classList.add('visible')
      ring.classList.toggle('hover', !!e.target.closest('a, button'))
    }
    const onLeave = () => ring.classList.remove('visible')
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave) }
  }, [enabled])
  return enabled ? <div ref={ref} className="cursor-ring" aria-hidden="true"><span></span></div> : null
}

export function LocalTime() {
  const format = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => { const id = setInterval(() => setTime(format()), 15000); return () => clearInterval(id) }, [])
  return <span className="local-time"><i></i>Lahore {time} PKT</span>
}

// Mouse-following glow for cards
export function spotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
