import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Cpu, Code2, Smartphone, Globe, Package, Cloud,
  Instagram, Send, Mail, MapPin, Clock, CheckCircle,
} from "lucide-react";
import logoUrl from "../logo.jpeg";

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useMouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return { x: springX, y: springY };
}

function useCountUp(end: number, duration = 2000, start = 0, suffix = "") {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - start) + start));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration, start]);

  return { count: count + suffix, ref };
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLE NETWORK CANVAS
   ═══════════════════════════════════════════════════════════════ */

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; pulse: number; pulseSpeed: number }[] = [];
    const count = Math.min(Math.floor((w * h) / 18000), 80);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const pulseSize = p.size + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.72 0.15 195 / ${0.15 + Math.sin(p.pulse) * 0.08})`;
        ctx.fill();
      }

      const connectionDist = 140;
      const mouseDist = 180;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.72 0.15 195 / ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        // Mouse connections
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouseDist) {
          const alpha = (1 - mDist / mouseDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `oklch(0.72 0.15 195 / ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.5 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ═══════════════════════════════════════════════════════════════
   REVEAL WRAPPERS
   ═══════════════════════════════════════════════════════════════ */

const smoothEase = [0.25, 0.46, 0.45, 0.94];

function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const variants: Record<string, { hidden: Record<string, number>; visible: Record<string, number> }> = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration, delay, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: staggerDelay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCUIT SVG DIVIDER
   ═══════════════════════════════════════════════════════════════ */

function CircuitDivider() {
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 1200 80" className="w-full max-w-5xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main horizontal trace */}
        <motion.line
          x1="0" y1="40" x2="1200" y2="40"
          stroke="oklch(0.72 0.15 195 / 0.15)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Vertical branches with nodes */}
        {[
          { x: 150, h: 20 }, { x: 350, h: 25 }, { x: 500, h: 18 },
          { x: 650, h: 22 }, { x: 800, h: 28 }, { x: 1000, h: 20 },
        ].map((node, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
          >
            <line x1={node.x} y1="40" x2={node.x} y2={40 + node.h} stroke="oklch(0.72 0.15 195 / 0.12)" strokeWidth="1" />
            <line x1={node.x} y1="40" x2={node.x} y2={40 - node.h} stroke="oklch(0.72 0.15 195 / 0.12)" strokeWidth="1" />
            <circle cx={node.x} cy={40 + node.h} r="3" fill="oklch(0.72 0.15 195 / 0.2)" />
            <circle cx={node.x} cy={40 - node.h} r="3" fill="oklch(0.72 0.15 195 / 0.2)" />
            {/* Pulse dot */}
            <motion.circle
              cx={node.x} cy="40" r="2"
              fill="oklch(0.72 0.15 195 / 0.4)"
              animate={{ r: [2, 5, 2], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.g>
        ))}
        {/* Center chip icon */}
        <motion.rect
          x="588" y="28" width="24" height="24" rx="4"
          stroke="oklch(0.72 0.15 195 / 0.2)"
          strokeWidth="1"
          fill="oklch(0.72 0.15 195 / 0.03)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        />
        {/* Chip pins */}
        {[32, 38, 44, 50].map((y, i) => (
          <motion.line key={`top-${i}`} x1="588" y1={y} x2="582" y2={y}
            stroke="oklch(0.72 0.15 195 / 0.15)" strokeWidth="1"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
        {[32, 38, 44, 50].map((y, i) => (
          <motion.line key={`bot-${i}`} x1="612" y1={y} x2="618" y2={y}
            stroke="oklch(0.72 0.15 195 / 0.15)" strokeWidth="1"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AMBIENT BACKGROUND (gradient orbs)
   ═══════════════════════════════════════════════════════════════ */

function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <motion.div
        className="gradient-orb"
        style={{ width: 500, height: 500, top: "5%", left: "10%", background: "oklch(0.65 0.2 195)", filter: "blur(100px)", opacity: 0.08 }}
        animate={{ x: [0, 60, -30, 40, 0], y: [0, -40, -80, -20, 0], scale: [1, 1.15, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="gradient-orb"
        style={{ width: 400, height: 400, top: "35%", right: "5%", background: "oklch(0.65 0.2 260)", filter: "blur(100px)", opacity: 0.06 }}
        animate={{ x: [0, -40, 20, -50, 0], y: [0, -60, -20, -90, 0], scale: [1, 0.85, 1.2, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="gradient-orb"
        style={{ width: 450, height: 450, bottom: "5%", left: "35%", background: "oklch(0.7 0.15 160)", filter: "blur(100px)", opacity: 0.05 }}
        animate={{ x: [0, 40, -40, 25, 0], y: [0, -50, -100, -35, 0], scale: [1, 1.2, 0.8, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "border-b border-border/50 bg-background/60 backdrop-blur-2xl shadow-xl shadow-black/5"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a href="#" className="flex items-center gap-3" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={logoUrl} alt="NextGenIoT" className="w-9 h-9 rounded-lg object-cover" />
          </motion.div>
          <span className="font-semibold text-lg tracking-tight">
            NextGen<span className="text-accent">IoT</span>
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Services", "Work", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors relative group underline-sweep"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px oklch(0.72 0.15 195 / 0.35), 0 4px 15px oklch(0 0 0 / 0.2)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          Get a Free Quote
        </motion.a>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={ref} className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Hero ambient glow */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.15 195 / 0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y: y1, opacity, scale }} className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <Reveal direction="down" delay={0.15}>
              <motion.p
                className="text-accent text-sm font-medium tracking-widest mb-6 uppercase"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                IoT · Full-Stack · Mobile · Hardware
              </motion.p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                We turn ideas into
                <br />
                <span className="text-gradient-animated">working products.</span>
                <motion.span
                  className="inline-block ml-1 text-accent"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  _
                </motion.span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.45}>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                NextGenIoT builds end-to-end solutions — from embedded firmware and circuit design to full-stack web platforms and mobile apps. If it connects, we engineer it.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.55}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium breathe-glow"
                  whileHover={{ scale: 1.06, boxShadow: "0 0 40px oklch(0.72 0.15 195 / 0.4), 0 8px 25px oklch(0 0 0 / 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <Send className="w-4 h-4" />
                  Get a Free Quote
                </motion.a>
                <motion.a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border text-foreground font-medium hover:bg-card/50"
                  whileHover={{ scale: 1.04, borderColor: "oklch(0.72 0.15 195 / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  See What We Build
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </div>
            </Reveal>

            {/* Animated counters */}
            <Reveal direction="up" delay={0.7}>
              <div className="mt-14 flex items-center gap-10">
                {[
                  { end: 60, suffix: "+", label: "Projects shipped" },
                  { end: 24, suffix: "h", label: "Response time" },
                  { end: 100, suffix: "%", label: "Custom built" },
                ].map((stat) => {
                  const { count, ref: statRef } = useCountUp(stat.end, 2000, 0, stat.suffix);
                  return (
                    <motion.div
                      key={stat.label}
                      ref={statRef}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <div className="text-2xl font-bold text-accent tabular-nums">{count}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right — Visual card with parallax */}
          <Reveal direction="scale" delay={0.35} className="hidden lg:block">
            <motion.div
              style={{ y: y2 }}
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border p-8 glow-border breathe-glow"
                whileHover={{ borderColor: "oklch(0.72 0.15 195 / 0.25)", scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                {/* Window dots */}
                <div className="flex items-center gap-3 mb-6">
                  {[
                    { color: "bg-destructive/70", delay: 0 },
                    { color: "oklch(0.78 0.2 55)", delay: 0.3 },
                    { color: "oklch(0.85 0.22 150)", delay: 0.6 },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ background: dot.color }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay }}
                    />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground font-mono">nextgeniot.dev</span>
                </div>

                {/* Animated bars */}
                <div className="space-y-4 font-mono text-sm">
                  {[
                    { icon: Cpu, widths: ["w-24", "w-16", "w-20"] },
                    { icon: Code2, widths: ["w-20", "w-28", "w-12"] },
                    { icon: Smartphone, widths: ["w-28", "w-14", "w-24"] },
                    { icon: Cloud, widths: ["w-16", "w-32", "w-14"] },
                  ].map((row, ri) => {
                    const Icon = row.icon;
                    return (
                      <motion.div
                        key={ri}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + ri * 0.18, duration: 0.5, ease: smoothEase }}
                      >
                        <Icon className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                        {row.widths.map((w, wi) => (
                          <motion.div
                            key={wi}
                            className={`h-2.5 rounded-full ${w}`}
                            style={{
                              background: wi === 0
                                ? "linear-gradient(90deg, oklch(0.72 0.15 195 / 0.4), oklch(0.72 0.15 195 / 0.15))"
                                : wi === 1
                                  ? "oklch(0.6 0.02 250 / 0.15)"
                                  : "oklch(0.6 0.02 250 / 0.08)",
                            }}
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.3 + ri * 0.18 + wi * 0.12, duration: 0.6, ease: "easeOut" }}
                          />
                        ))}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Status bar */}
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-accent relative"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-muted-foreground">All systems operational</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">v2.4.1</span>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-5 -right-5 rounded-xl bg-card/90 backdrop-blur-sm border border-border px-4 py-2.5 shadow-xl shadow-black/10"
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium">60+ projects delivered</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-5 rounded-xl bg-card/90 backdrop-blur-sm border border-border px-4 py-2.5 shadow-xl shadow-black/10"
                animate={{ y: [0, 8, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium">Worldwide clients</span>
                </div>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════════ */

const services = [
  { icon: Cpu, title: "IoT Projects", desc: "ESP32-based devices with firmware, cloud dashboards, and real-time monitoring. Smart home, industrial, and environmental sensing.", color: "from-accent/20 to-accent/5" },
  { icon: Code2, title: "Full-Stack Web", desc: "Portfolios, e-commerce, dashboards, and SaaS platforms. Type-safe backends, fast frontends, and clean architecture.", color: "from-blue-500/20 to-blue-500/5" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform iOS and Android apps. Offline-first, smooth animations, and tight IoT device integration.", color: "from-purple-500/20 to-purple-500/5" },
  { icon: Globe, title: "Business Sites", desc: "SEO-optimized, accessible, and fast. Corporate sites, landing pages, and lead-gen funnels that convert.", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Package, title: "Project Kits", desc: "Curated hardware kits with components, code, and guides. From your first blink to a connected product.", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Cloud, title: "Deploy & Support", desc: "Cloud hosting, CI/CD pipelines, database management, and ongoing maintenance. We ship and we stay.", color: "from-cyan-500/20 to-cyan-500/5" },
];

function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6 border-t border-border/50 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-accent text-sm font-medium tracking-widest mb-3 uppercase">What We Build</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Six disciplines. One team.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From silicon to cloud — we cover the full journey of bringing a connected product to life.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <motion.a
                  href="#work"
                  className="group rounded-xl bg-card/60 backdrop-blur-sm border border-border p-7 block glow-border ripple-container h-full"
                  whileHover={{
                    y: -8,
                    borderColor: "oklch(0.72 0.15 195 / 0.3)",
                    boxShadow: "0 12px 40px oklch(0.72 0.15 195 / 0.06), 0 4px 20px oklch(0 0 0 / 0.1)",
                    background: "oklch(0.15 0.015 250 / 0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"
                    whileHover={{ scale: 1.15, rotate: 8, backgroundColor: "oklch(0.72 0.15 195 / 0.15)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                    Learn more
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </div>
                </motion.a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WORK / PROCESS
   ═══════════════════════════════════════════════════════════════ */

const processSteps = [
  { step: "01", title: "Discovery", desc: "We start by understanding your problem, your users, and your constraints. No boilerplate — just a focused conversation about what needs to be built." },
  { step: "02", title: "Design & Architecture", desc: "Circuit schematics, system architecture, API design, and UI wireframes. We plan before we build so there are no surprises." },
  { step: "03", title: "Build & Iterate", desc: "Firmware, frontend, backend, mobile — built in parallel with regular check-ins. You see progress every week, not just at the end." },
  { step: "04", title: "Ship & Support", desc: "Deployment, monitoring, documentation, and ongoing maintenance. We don't disappear after launch." },
];

function WorkSection() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-28 px-6 border-t border-border/50 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-accent text-sm font-medium tracking-widest mb-3 uppercase">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              A process that ships.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              No black boxes. No vague timelines. Just a clear path from idea to working product.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated connecting line */}
          <motion.div
            ref={lineRef}
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px overflow-hidden"
          >
            <motion.div
              className="h-full w-full"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.15 195 / 0.5), transparent)" }}
              initial={{ x: "-100%" }}
              animate={lineInView ? { x: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.div>

          {processSteps.map((s, i) => (
            <StaggerItem key={s.step}>
              <motion.div
                className="rounded-xl bg-card/60 backdrop-blur-sm border border-border p-7 relative glow-border h-full"
                whileHover={{
                  y: -8,
                  borderColor: "oklch(0.72 0.15 195 / 0.3)",
                  boxShadow: "0 12px 40px oklch(0.72 0.15 195 / 0.06), 0 4px 20px oklch(0 0 0 / 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <motion.div
                  className="relative inline-flex items-center justify-center w-12 h-12 mb-5"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.18, type: "spring", stiffness: 180, damping: 14 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent/10"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 + 0.5 }}
                  />
                  <span className="text-accent text-sm font-mono font-bold relative z-10">{s.step}</span>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TECH STACK
   ═══════════════════════════════════════════════════════════════ */

const techCategories = [
  { label: "Hardware", items: ["ESP32", "Arduino", "Raspberry Pi", "STM32", "Sensors", "PCB Design"], hue: 195 },
  { label: "Firmware", items: ["C/C++", "MicroPython", "FreeRTOS", "MQTT", "BLE", "Wi-Fi"], hue: 260 },
  { label: "Web", items: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "TypeScript"], hue: 160 },
  { label: "Mobile", items: ["React Native", "Expo", "iOS", "Android", "Push Notifications", "Offline Sync"], hue: 55 },
  { label: "DevOps", items: ["Docker", "GitHub Actions", "AWS", "Vercel", "Cloudflare", "Monitoring"], hue: 320 },
];

function TechSection() {
  return (
    <section className="py-28 px-6 border-t border-border/50 bg-card/20 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.15 195 / 0.04) 0%, transparent 70%)" }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-accent text-sm font-medium tracking-widest mb-3 uppercase">Our Stack</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tools we actually use.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              No hype. Just reliable tools chosen for the job.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8" staggerDelay={0.12}>
          {techCategories.map((cat) => (
            <StaggerItem key={cat.label}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2.5">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full relative"
                    style={{ backgroundColor: `oklch(0.72 0.15 ${cat.hue} / 0.5)` }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  {cat.label}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <motion.li
                      key={item}
                      className="text-sm text-muted-foreground flex items-center gap-2.5 group cursor-default"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                      whileHover={{ x: 4 }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: `oklch(0.72 0.15 ${cat.hue} / 0.3)` }}
                        whileHover={{ scale: 2.5 }}
                      />
                      <span className="group-hover:text-foreground transition-colors duration-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 px-6 border-t border-border/50 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-14">
          {/* Left — Info */}
          <Reveal direction="left" className="lg:col-span-2">
            <p className="text-accent text-sm font-medium tracking-widest mb-3 uppercase">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Let's build something.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Have a project in mind? Fill out the form or reach out directly. We typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@nextgeniot.com", href: "mailto:hello@nextgeniot.com" },
                { icon: Instagram, label: "Instagram", value: "@nextgeniot", href: "https://instagram.com/nextgeniot" },
                { icon: Clock, label: "Response Time", value: "Within 24 hours, usually faster", href: null },
                { icon: MapPin, label: "Location", value: "Working with clients worldwide", href: null },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: smoothEase }}
                >
                  <motion.div
                    className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:border-accent/25 transition-colors duration-300"
                    whileHover={{ scale: 1.12, rotate: 6, backgroundColor: "oklch(0.72 0.15 195 / 0.05)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <item.icon className="w-4 h-4 text-accent" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline-sweep inline-block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal direction="right" className="lg:col-span-3">
            <motion.div
              className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border p-9 glow-border"
              whileHover={{ borderColor: "oklch(0.72 0.15 195 / 0.12)" }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }} className="py-16 text-center">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}>
                      <CheckCircle className="w-14 h-14 text-accent mx-auto mb-5" />
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                      className="text-xl font-semibold mb-2">Message sent</motion.h3>
                    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                      className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thanks for reaching out. We'll review your project and get back to you within 24 hours.
                    </motion.p>
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                      onClick={() => setSubmitted(false)} className="mt-6 text-sm text-accent hover:underline">
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                        { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                      ].map((field) => (
                        <motion.div key={field.id} whileFocus={{ scale: 1.01 }}>
                          <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                          <input id={field.id} type={field.type} required placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-accent/30 transition-all duration-300" />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">What do you need?</label>
                      <select id="service" required
                        className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-accent/30 transition-all duration-300 appearance-none">
                        <option value="">Select a service</option>
                        <option value="iot">IoT / Hardware Project</option>
                        <option value="fullstack">Full-Stack Web Application</option>
                        <option value="mobile">Mobile App</option>
                        <option value="business">Business Website</option>
                        <option value="kits">Project Kit</option>
                        <option value="deploy">Deployment & Support</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">Budget range</label>
                      <select id="budget"
                        className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-accent/30 transition-all duration-300 appearance-none">
                        <option value="">Select a range (optional)</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 – $10,000</option>
                        <option value="10k-25k">$10,000 – $25,000</option>
                        <option value="25k-50k">$25,000 – $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Project details</label>
                      <textarea id="message" required rows={5}
                        placeholder="Tell us about your project — what you want to build, the timeline, and any specific requirements."
                        className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-accent/30 transition-all duration-300 resize-none" />
                    </div>
                    <motion.button type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 35px oklch(0.72 0.15 195 / 0.35), 0 8px 25px oklch(0 0 0 / 0.2)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                      <Send className="w-4 h-4" />
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <motion.footer
      className="border-t border-border/50 py-10 px-6 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.04 }}>
          <img src={logoUrl} alt="NextGenIoT" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-semibold">NextGen<span className="text-accent">IoT</span></span>
        </motion.div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {["Services", "Work", "Contact"].map((item) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors duration-200 underline-sweep"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              {item}
            </motion.a>
          ))}
          <motion.a href="https://instagram.com/nextgeniot" target="_blank" rel="noreferrer"
            className="hover:text-foreground transition-colors duration-200 underline-sweep"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            Instagram
          </motion.a>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} NextGenIoT
        </div>
      </div>
    </motion.footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export function LandingPage() {
  const mouseGlow = useMouseGlow();

  return (
    <main className="relative overflow-hidden page-reveal">
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Mouse-following glow */}
      <motion.div
        className="cursor-glow hidden md:block"
        style={{ left: mouseGlow.x, top: mouseGlow.y }}
      />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Particle network canvas */}
      <ParticleNetwork />

      {/* Ambient gradient orbs */}
      <AmbientBackground />

      {/* Content */}
      <Nav />
      <Hero />
      <CircuitDivider />
      <ServicesSection />
      <CircuitDivider />
      <WorkSection />
      <CircuitDivider />
      <TechSection />
      <CircuitDivider />
      <ContactSection />
      <Footer />
    </main>
  );
}
