import { useState } from "react";
import { ArrowRight, Cpu, Code2, Smartphone, Globe, Package, Cloud, Instagram, Send, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

/* ─── Nav ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img
            src="/src/logo.jpeg"
            alt="NextGenIoT"
            className="w-9 h-9 rounded-md object-cover"
          />
          <span className="font-semibold text-lg tracking-tight">
            NextGen<span className="text-accent">IoT</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get a Free Quote
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <p className="text-accent text-sm font-medium tracking-wide mb-5">
              IoT · Full-Stack · Mobile · Hardware
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              We turn ideas into
              <br />
              <span className="text-accent">working products.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              NextGenIoT builds end-to-end solutions — from embedded firmware and circuit design to full-stack web platforms and mobile apps. If it connects, we engineer it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Get a Free Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border text-foreground font-medium hover:bg-card transition-colors"
              >
                See What We Build
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-14 flex items-center gap-10">
              {[
                { value: "60+", label: "Projects shipped" },
                { value: "24h", label: "Response time" },
                { value: "100%", label: "Custom built" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main visual card */}
              <div className="rounded-xl bg-card border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-neon-orange" style={{ background: "oklch(0.78 0.2 55)" }} />
                  <div className="w-3 h-3 rounded-full bg-neon-green" style={{ background: "oklch(0.85 0.22 150)" }} />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">nextgeniot.dev</span>
                </div>

                {/* Code-like layout showing what they build */}
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                    <div className="h-2.5 w-24 rounded bg-accent/30" />
                    <div className="h-2.5 w-16 rounded bg-muted-foreground/20" />
                    <div className="h-2.5 w-20 rounded bg-muted-foreground/10" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                    <div className="h-2.5 w-20 rounded bg-accent/30" />
                    <div className="h-2.5 w-28 rounded bg-muted-foreground/20" />
                    <div className="h-2.5 w-12 rounded bg-muted-foreground/10" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                    <div className="h-2.5 w-28 rounded bg-accent/30" />
                    <div className="h-2.5 w-14 rounded bg-muted-foreground/20" />
                    <div className="h-2.5 w-24 rounded bg-muted-foreground/10" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Cloud className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                    <div className="h-2.5 w-16 rounded bg-accent/30" />
                    <div className="h-2.5 w-32 rounded bg-muted-foreground/20" />
                    <div className="h-2.5 w-14 rounded bg-muted-foreground/10" />
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs text-muted-foreground">All systems operational</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">v2.4.1</span>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-4 -right-4 rounded-lg bg-card border border-border px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium">60+ projects delivered</span>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-card border border-border px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium">Worldwide clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
const services = [
  { icon: Cpu, title: "IoT Projects", desc: "ESP32-based devices with firmware, cloud dashboards, and real-time monitoring. Smart home, industrial, and environmental sensing.", href: "#work" },
  { icon: Code2, title: "Full-Stack Web", desc: "Portfolios, e-commerce, dashboards, and SaaS platforms. Type-safe backends, fast frontends, and clean architecture.", href: "#work" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform iOS and Android apps. Offline-first, smooth animations, and tight IoT device integration.", href: "#work" },
  { icon: Globe, title: "Business Sites", desc: "SEO-optimized, accessible, and fast. Corporate sites, landing pages, and lead-gen funnels that convert.", href: "#work" },
  { icon: Package, title: "Project Kits", desc: "Curated hardware kits with components, code, and guides. From your first blink to a connected product.", href: "#work" },
  { icon: Cloud, title: "Deploy & Support", desc: "Cloud hosting, CI/CD pipelines, database management, and ongoing maintenance. We ship and we stay.", href: "#work" },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="text-accent text-sm font-medium tracking-wide mb-3">What We Build</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Six disciplines. One team.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From silicon to cloud — we cover the full journey of bringing a connected product to life.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.title}
                href={s.href}
                className="group rounded-lg bg-card border border-border p-6 hover:border-primary/40 transition-colors"
              >
                <Icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Work / Process ─── */
const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "We start by understanding your problem, your users, and your constraints. No boilerplate — just a focused conversation about what needs to be built.",
  },
  {
    step: "02",
    title: "Design & Architecture",
    desc: "Circuit schematics, system architecture, API design, and UI wireframes. We plan before we build so there are no surprises.",
  },
  {
    step: "03",
    title: "Build & Iterate",
    desc: "Firmware, frontend, backend, mobile — built in parallel with regular check-ins. You see progress every week, not just at the end.",
  },
  {
    step: "04",
    title: "Ship & Support",
    desc: "Deployment, monitoring, documentation, and ongoing maintenance. We don't disappear after launch.",
  },
];

function WorkSection() {
  return (
    <section id="work" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="text-accent text-sm font-medium tracking-wide mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A process that ships.
          </h2>
          <p className="mt-3 text-muted-foreground">
            No black boxes. No vague timelines. Just a clear path from idea to working product.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((s) => (
            <div key={s.step} className="rounded-lg bg-card border border-border p-6">
              <span className="text-accent text-sm font-mono">{s.step}</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack ─── */
const techCategories = [
  {
    label: "Hardware",
    items: ["ESP32", "Arduino", "Raspberry Pi", "STM32", "Sensors", "PCB Design"],
  },
  {
    label: "Firmware",
    items: ["C/C++", "MicroPython", "FreeRTOS", "MQTT", "BLE", "Wi-Fi"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "TypeScript"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo", "iOS", "Android", "Push Notifications", "Offline Sync"],
  },
  {
    label: "DevOps",
    items: ["Docker", "GitHub Actions", "AWS", "Vercel", "Cloudflare", "Monitoring"],
  },
];

function TechSection() {
  return (
    <section className="py-24 px-6 border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="text-accent text-sm font-medium tracking-wide mb-3">Our Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tools we actually use.
          </h2>
          <p className="mt-3 text-muted-foreground">
            No hype. Just reliable tools chosen for the job.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {techCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{cat.label}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <div className="lg:col-span-2">
            <p className="text-accent text-sm font-medium tracking-wide mb-3">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Let's build something.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Have a project in mind? Fill out the form or reach out directly. We typically respond within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a href="mailto:hello@nextgeniot.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    hello@nextgeniot.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Instagram</p>
                  <a
                    href="https://instagram.com/nextgeniot"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    @nextgeniot
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-sm text-muted-foreground">Within 24 hours, usually faster</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">Working with clients worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl bg-card border border-border p-8">
              {submitted ? (
                <div className="py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message sent</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Thanks for reaching out. We'll review your project and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-md bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-md bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
                      What do you need?
                    </label>
                    <select
                      id="service"
                      required
                      className="w-full px-4 py-2.5 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors appearance-none"
                    >
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
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-1.5">
                      Budget range
                    </label>
                    <select
                      id="budget"
                      className="w-full px-4 py-2.5 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors appearance-none"
                    >
                      <option value="">Select a range (optional)</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project — what you want to build, the timeline, and any specific requirements."
                      className="w-full px-4 py-2.5 rounded-md bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/src/logo.jpeg"
            alt="NextGenIoT"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="font-semibold">
            NextGen<span className="text-accent">IoT</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          <a
            href="https://instagram.com/nextgeniot"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} NextGenIoT
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <ServicesSection />
      <WorkSection />
      <TechSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
