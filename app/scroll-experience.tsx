"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";

export function ScrollOrnament({ variant = "rings" }: { variant?: "rings" | "bloom" | "star" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 65]);
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.75, 1.1, 1.3]);
  return <div ref={ref} className={`scroll-ornament ornament-${variant}`} aria-hidden="true">
    <motion.div style={reduced ? undefined : { y, rotate, scale }}>
      {variant === "star" ? <span>✦</span> : <><i /><i /><i /></>}
    </motion.div>
  </div>;
}

export function ScrollCard({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, .35, .8, 1], [65 + index * 16, 0, 0, -25]);
  const rotate = useTransform(scrollYProgress, [0, .35, .8, 1], [index % 2 ? 3 : -3, 0, 0, index % 2 ? -1 : 1]);
  return <div ref={ref} className="scroll-card-track"><motion.div className="scroll-card-inner" style={reduced ? undefined : { y, rotate }}>{children}</motion.div></div>;
}

function ScrollWord({ children, progress, index, total }: { children: string; progress: MotionValue<number>; index: number; total: number }) {
  const reduced = useReducedMotion();
  const start = .05 + index / total * .65;
  const opacity = useTransform(progress, [start, start + .13], [.18, 1]);
  const y = useTransform(progress, [start, start + .13], [12, 0]);
  return <motion.span className="narrative-word" style={reduced ? undefined : { opacity, y }}>{children}{" "}</motion.span>;
}

export function ScrollNarrative() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const rotate = useTransform(progress, [0, 1], [-35, 65]);
  const scale = useTransform(progress, [0, 1], [.7, 1.35]);
  const lineScale = useTransform(progress, [0, .9], [0, 1]);
  const words = ["Menos", "ruído.", "Mais", "espaço", "para", "ir", "além."];
  return <section ref={ref} className={`scroll-narrative ${reduced ? "motion-static" : ""}`} aria-label="Uma nova perspectiva">
    <div className="narrative-sticky">
      <motion.div className="narrative-orbits" aria-hidden="true" style={reduced ? undefined : { rotate, scale }}><i /><i /><span>✦</span></motion.div>
      
      <h2 aria-label="Menos ruído. Mais espaço para ir além."><span aria-hidden="true"><span className="narrative-line">{words.slice(0, 2).map((word, i) => <ScrollWord key={word} progress={progress} index={i} total={words.length}>{word}</ScrollWord>)}</span><span className="narrative-line narrative-gold">{words.slice(2).map((word, i) => <ScrollWord key={word} progress={progress} index={i + 2} total={words.length}>{word}</ScrollWord>)}</span></span></h2>
      <motion.div className="narrative-rule" style={reduced ? undefined : { scaleX: lineScale }} />
      <p>Cuido dos detalhes para que você tenha<br />mais espaço para o próximo passo.</p>
      <span className="narrative-scroll"><ArrowDown size={15} /> CONTINUE DESCOBRINDO</span>
    </div>
  </section>;
}

export function ParallaxPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-32, 32]);
  const scale = useTransform(scrollYProgress, [0, .6, 1], [1.12, 1, 1.04]);
  return <div className="parallax-portrait" ref={ref}><motion.div style={reduced ? undefined : { y, scale }}><Image src="/thamyres-portrait.png" alt="Retrato profissional de Thamyres Schneider" fill sizes="(max-width: 700px) 43vw, 35vw" /></motion.div></div>;
}

export function MobileHero({ contactHref }: { contactHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  return <div className="mobile-hero" ref={ref}>
    <div className="mobile-hero-photo"><motion.div style={reduced ? undefined : { y: photoY, scale: photoScale }}><Image src="/thamyres-portrait.png" alt="Thamyres Schneider" fill sizes="(max-width: 700px) 100vw, 1px" /></motion.div></div>
    <div className="mobile-hero-shade" />
    <motion.div className="mobile-hero-orbit" aria-hidden="true" style={reduced ? undefined : { rotate: titleY }}><span>✦</span></motion.div>
    <motion.div className="mobile-hero-copy" style={reduced ? undefined : { y: titleY }}>
      
      <motion.h1 initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .8, delay: .15 }}>Seu próximo passo.<br /><em>Com confiança.</em></motion.h1>
      <p>Como secretária executiva, cuido dos detalhes<br />para você ter espaço para ir além.</p>
      <a href={contactHref} className="button button-gold">Vamos conversar <ArrowUpRight size={19} /></a>
      <a href="#atuacao" className="mobile-discover">Explore as possibilidades <ArrowDown size={15} /></a>
    </motion.div>
    
  </div>;
}

const steps = [
  { number: "01", title: "Escutar", lead: "Tudo começa com você.", text: "Escuto para entender seu contexto, suas prioridades e o que precisa de atenção.", symbol: "◌" },
  { number: "02", title: "Conectar", lead: "Aproximar o que faz sentido.", text: "Conecto suas necessidades às soluções certas e desenho esse caminho com você.", symbol: "◎" },
  { number: "03", title: "Organizar", lead: "Dar forma às possibilidades.", text: "Organizo processos, pessoas e próximos passos para que sua rotina flua melhor.", symbol: "✳" },
  { number: "04", title: "Acompanhar", lead: "Caminhar ao seu lado.", text: "Acompanho cada etapa, cuido dos detalhes e ajusto o percurso com você.", symbol: "✦" },
];

export function ProcessJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const rotate = useTransform(progress, [0, 1], [0, 180]);
  const orbitScale = useTransform(progress, [0, .5, 1], [.8, 1.2, .9]);
  useMotionValueEvent(scrollYProgress, "change", value => setActive(Math.min(3, Math.max(0, Math.floor(value * 4)))));

  function navigate(index: number) {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, ref.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + distance * (index === 0 ? 0 : (index + .12) / 4), behavior: reduced ? "auto" : "smooth" });
  }

  return <section id="processo" ref={ref} className={`process-journey ${reduced ? "motion-static" : ""}`}>
    <div className="journey-sticky">
      <div className="journey-heading"><h2>Como trabalho.<br /><em>Ao seu lado.</em></h2><p>Escuto, organizo e acompanho<br />cada etapa com você.</p></div>
      <div className="journey-stage">
        <motion.div className="journey-orbits" aria-hidden="true" style={reduced ? undefined : { rotate, scale: orbitScale }}><i /><i /><i /></motion.div>
        <span className="journey-watermark" aria-hidden="true">{steps[active].number}</span>
        <AnimatePresence mode="wait" initial={false}><motion.div className="journey-current" key={active} initial={{ opacity: 0, y: reduced ? 0 : 30, filter: reduced ? "none" : "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: reduced ? 0 : -20, filter: reduced ? "none" : "blur(8px)" }} transition={{ duration: reduced ? 0 : .3 }}>
          <span className="journey-symbol" aria-hidden="true">{steps[active].symbol}</span>
          
          <h3>{steps[active].title}<em>.</em></h3>
          <strong>{steps[active].lead}</strong><p>{steps[active].text}</p>
        </motion.div></AnimatePresence>
      </div>
      <nav className="journey-navigation" aria-label="Etapas do trabalho"><div className="journey-progress-track"><motion.div style={{ scaleX: reduced ? 1 : progress }} /></div>{steps.map((step, i) => <button key={step.number} aria-label={`${step.number}. ${step.title}`} onClick={() => navigate(i)} aria-current={active === i ? "step" : undefined} className={active === i ? "current" : i < active ? "completed" : ""}><span>{step.number}</span><strong>{step.title}</strong><ChevronRight size={16} /></button>)}</nav>
      <div className="journey-static-steps">{steps.map(step => <article key={step.number}><span>{step.number} / {step.symbol}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      <a href="#contato" className="journey-next">O próximo capítulo começa com uma conversa <ArrowUpRight size={16} /></a>
    </div>
  </section>;
}
