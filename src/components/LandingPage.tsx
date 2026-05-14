import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  Code2,
  Smartphone,
  Globe,
  Package,
  Cloud,
  ArrowRight,
  Zap,
  Sparkles,
  Wifi,
  Instagram,
  Send,
  Activity,
  ShieldCheck,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center glow-cyan">
              <Wifi className="w-4 h-4 text-background" strokeWidth={3} />
            </div>
          </div>
          <span className="font-bold tracking-tight text-lg">
            NextGen<span className="text-gradient-primary">IoT</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#iot" className="hover:text-foreground transition-colors">IoT</a>
          <a href="#kits" className="hover:text-foreground transition-colors">Kits</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <a
          href="#contact"
          className="text-xs font-mono tracking-wider px-4 py-2 rounded-full bg-foreground/5 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 transition-all"
        >
          DM "BUILD"
        </a>
      </div>
    </motion.nav>
  );
}

function HeroOrb() {
  return (
    <div className="relative w-[500px] h-[500px] max-w-full">
      {/* Concentric rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: `oklch(0.85 0.19 210 / ${0.4 - i * 0.08})`,
            margin: `${i * 40}px`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-3 h-3 rounded-full bg-[var(--neon-cyan)] glow-cyan"
            style={{ top: -6, left: "50%", transform: "translateX(-50%)" }}
          />
        </motion.div>
      ))}

      {/* Core */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 m-auto w-48 h-48 rounded-3xl glass flex items-center justify-center animate-pulse-glow"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.2 0.04 262 / 0.8), oklch(0.15 0.04 262 / 0.6))",
        }}
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
        </div>
        <div className="relative text-center">
          <Cpu className="w-16 h-16 mx-auto text-[var(--neon-cyan)]" strokeWidth={1.5} />
          <div className="mt-2 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)]">
            ESP32
          </div>
        </div>
      </motion.div>

      {/* Floating tech dots */}
      {[
        { icon: Code2, color: "var(--neon-purple)", x: "10%", y: "15%" },
        { icon: Smartphone, color: "var(--neon-pink)", x: "80%", y: "10%" },
        { icon: Cloud, color: "var(--neon-green)", x: "85%", y: "75%" },
        { icon: Globe, color: "var(--neon-orange)", x: "5%", y: "70%" },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-2xl glass flex items-center justify-center animate-float"
            style={{
              left: item.x,
              top: item.y,
              animationDelay: `${i * 0.6}s`,
              boxShadow: `0 0 20px ${item.color}`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={2} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 circuit-bg opacity-50" />

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-widest text-[var(--neon-cyan)] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-cyan)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon-cyan)]" />
            </span>
            CONNECT • AUTOMATE • INNOVATE
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            From Idea
            <span className="block">
              → <span className="text-gradient-primary">Working Product</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            We design and build IoT systems, full-stack apps, and connected products that ship.
            Premium engineering for the next generation of hardware-meets-software.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-background overflow-hidden"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--glow-cyan)" }}
            >
              <span className="absolute inset-0 animate-shimmer" />
              <span className="relative">DM "BUILD" TO GET STARTED</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium glass hover:border-[var(--neon-cyan)]/50 transition-colors"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex gap-8 text-sm">
            {[
              { v: "60+", l: "Projects shipped" },
              { v: "24h", l: "Response time" },
              { v: "100%", l: "Custom built" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-gradient-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <HeroOrb />
        </motion.div>
      </motion.div>

      {/* Scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-50" />
    </section>
  );
}

type Service = {
  icon: typeof Cpu;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  href: string;
};

const services: Service[] = [
  { icon: Cpu, title: "IoT Projects", subtitle: "Smart • Connected • Reliable", color: "var(--neon-cyan)", glow: "var(--glow-cyan)", href: "#iot" },
  { icon: Code2, title: "Full-Stack Websites", subtitle: "Portfolio • E-com • Dashboards", color: "var(--neon-purple)", glow: "var(--glow-purple)", href: "#fullstack" },
  { icon: Smartphone, title: "Mobile Apps", subtitle: "iOS • Android • Cross-platform", color: "var(--neon-pink)", glow: "var(--glow-pink)", href: "#mobile" },
  { icon: Globe, title: "Business Websites", subtitle: "Professional • SEO • Scalable", color: "var(--neon-green)", glow: "var(--glow-green)", href: "#business" },
  { icon: Package, title: "Project Kits", subtitle: "Learn by Building • Ready-to-use", color: "var(--neon-orange)", glow: "var(--glow-orange)", href: "#kits" },
  { icon: Cloud, title: "Deployment & Support", subtitle: "Hosting • Cloud • Maintenance", color: "var(--neon-cyan)", glow: "var(--glow-cyan)", href: "#deploy" },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const Icon = s.icon;
  return (
    <motion.a
      href={s.href}
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative rounded-3xl p-px overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${s.color}, transparent 60%)`,
      }}
    >
      <div className="relative h-full rounded-3xl glass p-7 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30 blur-3xl group-hover:opacity-60 transition-opacity"
          style={{ background: s.color }}
        />
        <div className="relative">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            style={{ background: `${s.color.replace("var(--", "color-mix(in oklab, var(--").replace(")", ") 15%, transparent)")}`, boxShadow: s.glow }}
          >
            <Icon className="w-6 h-6" style={{ color: s.color }} strokeWidth={2} />
          </div>
          <div className="text-xs font-mono text-muted-foreground tracking-widest mb-2">
            0{i + 1} / SERVICE
          </div>
          <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
          <p className="text-sm text-muted-foreground mb-6">{s.subtitle}</p>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: s.color }}>
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-widest text-[var(--neon-purple)] mb-6">
            <Sparkles className="w-3 h-3" /> WHAT WE BUILD
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight">
            Six services. <span className="text-gradient-primary">One stack.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
            From silicon to cloud — we cover the full journey of bringing a connected product to life.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureSection({
  id,
  badge,
  badgeColor,
  title,
  desc,
  features,
  examples,
  visual,
  reverse = false,
}: {
  id: string;
  badge: string;
  badgeColor: string;
  title: React.ReactNode;
  desc: string;
  features: string[];
  examples: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={reverse ? "md:order-2" : ""}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-widest mb-6"
            style={{ color: badgeColor, boxShadow: `0 0 20px ${badgeColor}` }}
          >
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground mb-8 max-w-md">{desc}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {features.map((f) => (
              <span
                key={f}
                className="text-xs font-mono px-3 py-1.5 rounded-full glass border"
                style={{ borderColor: `${badgeColor.replace("var(--", "color-mix(in oklab, var(--").replace(")", ") 30%, transparent)")}`, color: badgeColor }}
              >
                {f}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-muted-foreground">EXAMPLES</div>
            {examples.map((ex, i) => (
              <motion.div
                key={ex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: badgeColor, boxShadow: `0 0 10px ${badgeColor}` }}
                />
                <span className="text-foreground/90 group-hover:text-foreground transition-colors">{ex}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={reverse ? "md:order-1" : ""}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}

function IoTVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl glass overflow-hidden circuit-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-transparent" />

        {/* Board representation */}
        <div className="absolute inset-12 rounded-2xl border border-[var(--neon-cyan)]/40 bg-background/40 backdrop-blur p-6 flex flex-col items-center justify-center">
          <div className="grid grid-cols-8 gap-1 w-full mb-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-2 rounded-sm bg-[var(--neon-cyan)]/30" />
            ))}
          </div>
          <div className="flex-1 w-full rounded-lg bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 flex items-center justify-center border border-[var(--neon-cyan)]/30">
            <div className="text-center">
              <Cpu className="w-12 h-12 mx-auto text-[var(--neon-cyan)] mb-2" />
              <div className="font-mono text-xs tracking-widest text-[var(--neon-cyan)]">ESP32-WROOM</div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 w-full mt-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-2 rounded-sm bg-[var(--neon-cyan)]/30" />
            ))}
          </div>
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--neon-green)]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ boxShadow: "0 0 10px var(--neon-green)" }}
          />
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 400" fill="none">
          <motion.path
            d="M 50 200 Q 200 50, 350 200"
            stroke="var(--neon-cyan)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M 50 200 Q 200 350, 350 200"
            stroke="var(--neon-purple)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>
      </div>
    </div>
  );
}

function LaptopVisual() {
  return (
    <div className="relative aspect-[4/3] max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl glass p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent" />
        <div className="relative h-full rounded-2xl border border-[var(--neon-purple)]/40 bg-background/60 overflow-hidden">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/50">
            <div className="w-2 h-2 rounded-full bg-destructive/70" />
            <div className="w-2 h-2 rounded-full bg-[var(--neon-orange)]/70" />
            <div className="w-2 h-2 rounded-full bg-[var(--neon-green)]/70" />
            <div className="ml-2 flex-1 h-4 rounded bg-muted/40" />
          </div>
          {/* Dashboard content */}
          <div className="p-4 grid grid-cols-3 gap-3">
            {[
              { v: "$24.8k", l: "Revenue", c: "var(--neon-cyan)" },
              { v: "1,284", l: "Users", c: "var(--neon-purple)" },
              { v: "98.2%", l: "Uptime", c: "var(--neon-green)" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg p-3 border border-border/50"
                style={{ background: `linear-gradient(135deg, ${s.c}15, transparent)` }}
              >
                <div className="text-base font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">{s.l}</div>
              </motion.div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-lg h-32 border border-border/50 p-3 flex items-end gap-1">
              {[40, 65, 35, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-sm"
                  style={{ background: "linear-gradient(to top, var(--neon-purple), var(--neon-cyan))" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center gap-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          animate={{ y: [0, -8, 0] }}
          style={{ animationDelay: `${i * 0.5}s` }}
          className="w-32 h-64 rounded-3xl glass p-2 relative"
        >
          <div
            className="h-full rounded-2xl border overflow-hidden relative"
            style={{
              borderColor: ["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-purple)"][i] + "60",
              background: `linear-gradient(180deg, ${["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-purple)"][i]}20, transparent)`,
            }}
          >
            <div className="p-3">
              <div className="w-16 h-1 rounded-full bg-foreground/20 mx-auto mb-3" />
              <div className="text-[8px] font-mono tracking-widest text-muted-foreground mb-2">
                {["DELIVERY", "CONTROL", "SHOP"][i]}
              </div>
              <div className="space-y-1.5">
                {[1, 2, 3, 4].map((k) => (
                  <div
                    key={k}
                    className="h-6 rounded-md"
                    style={{
                      background: `${["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-purple)"][i]}25`,
                    }}
                  />
                ))}
              </div>
              <div
                className="absolute bottom-3 left-3 right-3 h-8 rounded-lg flex items-center justify-center text-[8px] font-bold"
                style={{
                  background: ["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-purple)"][i],
                  color: "var(--background)",
                  boxShadow: `0 0 20px ${["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-purple)"][i]}`,
                }}
              >
                ACTION
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BusinessVisual() {
  return (
    <div className="relative aspect-[4/3] max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl glass p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-green)]/10 to-transparent" />
        <div className="relative h-full rounded-2xl border border-[var(--neon-green)]/40 bg-background/60 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[var(--neon-green)]/30 border border-[var(--neon-green)]/50" />
              <div className="h-2 w-16 rounded bg-foreground/30" />
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((k) => (
                <div key={k} className="h-1.5 w-8 rounded bg-foreground/20" />
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-3/4 rounded bg-gradient-to-r from-[var(--neon-green)] to-transparent" />
              <div className="h-3 w-1/2 rounded bg-foreground/40" />
              <div className="h-2 w-full rounded bg-foreground/15 mt-3" />
              <div className="h-2 w-5/6 rounded bg-foreground/15" />
              <div className="h-2 w-4/6 rounded bg-foreground/15" />
              <div className="h-7 w-24 rounded-full bg-[var(--neon-green)] mt-3" style={{ boxShadow: "0 0 20px var(--neon-green)" }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {["SEO", "FAST", "SECURE"].map((t) => (
              <div key={t} className="text-center text-[9px] font-mono py-1.5 rounded border border-[var(--neon-green)]/30 text-[var(--neon-green)]">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KitsVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-3 h-full">
        {[
          { l: "ESP32", c: "var(--neon-cyan)" },
          { l: "DHT22", c: "var(--neon-orange)" },
          { l: "OLED", c: "var(--neon-purple)" },
          { l: "RELAY", c: "var(--neon-pink)" },
          { l: "SERVO", c: "var(--neon-green)" },
          { l: "CAM", c: "var(--neon-cyan)" },
          { l: "RFID", c: "var(--neon-orange)" },
          { l: "BUZZER", c: "var(--neon-purple)" },
          { l: "LDR", c: "var(--neon-green)" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
            className="rounded-2xl glass p-3 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ borderColor: item.c }}
          >
            <div
              className="w-8 h-8 rounded-lg mb-2"
              style={{ background: item.c, boxShadow: `0 0 15px ${item.c}` }}
            />
            <div className="text-[9px] font-mono tracking-widest" style={{ color: item.c }}>
              {item.l}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CloudVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl glass overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 rounded-3xl glass flex items-center justify-center mx-auto"
            style={{ boxShadow: "var(--glow-cyan)" }}
          >
            <Cloud className="w-16 h-16 text-[var(--neon-cyan)]" strokeWidth={1.5} />
          </motion.div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[Activity, ShieldCheck, Layers].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className="w-16 h-16 rounded-2xl glass flex items-center justify-center"
              >
                <Icon className="w-6 h-6 text-[var(--neon-cyan)]" />
              </motion.div>
            ))}
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1="100"
                y1="80"
                x2={40 + i * 60}
                y2="160"
                stroke="var(--neon-cyan)"
                strokeWidth="1"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-widest text-[var(--neon-cyan)] mb-8">
          <Zap className="w-3 h-3" /> READY WHEN YOU ARE
        </div>

        <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.05]">
          From Idea
          <span className="block">→ <span className="text-gradient-primary text-glow-cyan">Working Product</span></span>
        </h2>

        <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
          Tell us what you want to build. We'll come back within 24 hours with a plan, timeline, and quote.
        </p>

        <motion.a
          href="https://instagram.com/nextgeniot"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-12 relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-background text-lg overflow-hidden animate-pulse-glow"
          style={{ background: "var(--gradient-primary)" }}
        >
          <span className="absolute inset-0 animate-shimmer" />
          <Send className="w-5 h-5 relative" />
          <span className="relative tracking-wider">DM "BUILD" TO GET STARTED</span>
        </motion.a>

        <div className="mt-8 font-mono text-xs tracking-widest text-muted-foreground">
          @NextGenIoT • INSTAGRAM
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
            <Wifi className="w-4 h-4 text-background" strokeWidth={3} />
          </div>
          <div>
            <div className="font-bold">
              NextGen<span className="text-gradient-primary">IoT</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">CONNECT • AUTOMATE • INNOVATE</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/nextgeniot"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-[var(--neon-pink)] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NextGenIoT. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <main className="relative noise">
      <Nav />
      <Hero />
      <ServicesSection />

      <FeatureSection
        id="iot"
        badge="01 — IOT PROJECTS"
        badgeColor="var(--neon-cyan)"
        title={<>Smart hardware that <span className="text-gradient-primary">just works</span>.</>}
        desc="ESP32-powered devices with rock-solid firmware, cloud sync, and beautiful dashboards. Production-ready, not prototype-ready."
        features={["Smart", "Connected", "Reliable"]}
        examples={["Smart Home Automation", "Smart Dustbin Monitoring", "Water Level Monitor", "RFID Attendance System"]}
        visual={<IoTVisual />}
      />

      <FeatureSection
        id="fullstack"
        badge="02 — FULL-STACK"
        badgeColor="var(--neon-purple)"
        title={<>End-to-end web platforms with <span style={{color:"var(--neon-purple)"}}>real depth</span>.</>}
        desc="From frontend craft to scalable APIs and dashboards. Type-safe, fast, and built to grow with your product."
        features={["Type-safe", "Realtime", "Scalable"]}
        examples={["Portfolio & Marketing Sites", "E-commerce Platforms", "Admin Dashboards", "Booking & Reservation Apps"]}
        visual={<LaptopVisual />}
        reverse
      />

      <FeatureSection
        id="mobile"
        badge="03 — MOBILE APPS"
        badgeColor="var(--neon-pink)"
        title={<>Mobile apps that feel <span style={{color:"var(--neon-pink)"}}>native</span>.</>}
        desc="iOS and Android from one codebase. Smooth animations, offline-first, and tightly integrated with your IoT devices."
        features={["iOS", "Android", "Offline-first"]}
        examples={["Delivery & Logistics App", "IoT Device Control App", "Shop & Catalog App"]}
        visual={<PhoneVisual />}
      />

      <FeatureSection
        id="business"
        badge="04 — BUSINESS WEBSITES"
        badgeColor="var(--neon-green)"
        title={<>Sites that <span style={{color:"var(--neon-green)"}}>convert</span>.</>}
        desc="Lightning-fast, SEO-tuned, and accessible. Designed to make your brand feel premium from the first scroll."
        features={["Professional", "SEO", "Scalable"]}
        examples={["Corporate Sites", "Landing Pages", "Service Showcases", "Lead-gen Funnels"]}
        visual={<BusinessVisual />}
        reverse
      />

      <FeatureSection
        id="kits"
        badge="05 — PROJECT KITS"
        badgeColor="var(--neon-orange)"
        title={<>Learn by <span style={{color:"var(--neon-orange)"}}>building real things</span>.</>}
        desc="Curated kits with components, code, and step-by-step guides. From your first blink to a connected product."
        features={["Curated", "Documented", "Ready-to-use"]}
        examples={["Beginner ESP32 Kit", "Smart Home Starter", "Sensor Pack Pro", "Robotics Bundle"]}
        visual={<KitsVisual />}
      />

      <FeatureSection
        id="deploy"
        badge="06 — DEPLOY & SUPPORT"
        badgeColor="var(--neon-cyan)"
        title={<>We don't just ship — we <span className="text-gradient-primary">stay</span>.</>}
        desc="Hosting, monitoring, and maintenance handled. Cloud-native deployments with uptime you can trust."
        features={["Hosting", "Monitoring", "24/7 Support"]}
        examples={["Cloud Hosting Setup", "CI/CD Pipelines", "Database Management", "Ongoing Maintenance"]}
        visual={<CloudVisual />}
        reverse
      />

      <CTASection />
      <Footer />
    </main>
  );
}
