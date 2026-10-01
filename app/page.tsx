"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, ArrowRight, ArrowDown, Check, ChevronDown, X, Menu, Mail, Phone, MapPin, BriefcaseBusiness, Network, Landmark, Workflow, GraduationCap, Sparkles, Palette, Plus, Minus, Send, House, MessageCircle } from "lucide-react";
import { MobileHero, ParallaxPortrait, ProcessJourney, ScrollCard, ScrollNarrative, ScrollOrnament } from "./scroll-experience";

function Instagram({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>;
}

function Linkedin({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M11 17v-7h3v1c2-2 4-1 4 2v4M7.5 7v.2" strokeLinecap="round" /></svg>;
}

const phone = "5551995470953";
const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent("Olá, Thamyres! Gostaria de conversar sobre sua assessoria.")}`;
const services = [
  { id: "01", icon: BriefcaseBusiness, name: "Assessoria executiva", tagline: "Mais tempo para o que importa.", description: "Organização, visão estratégica e atenção aos detalhes para uma rotina executiva mais fluida.", details: "Um apoio próximo à liderança, que conecta prioridades, organiza informações e acompanha as demandas do dia a dia.", items: ["Organização de agendas e compromissos", "Preparação e acompanhamento de reuniões", "Comunicação e suporte à liderança", "Organização de documentos e informações"] },
  { id: "02", icon: Workflow, name: "Gestão de processos", tagline: "Clareza em cada etapa.", description: "Processos bem desenhados para transformar a complexidade em eficiência e continuidade.", details: "Um olhar atento aos fluxos de trabalho para identificar oportunidades de melhoria e construir uma organização mais consistente.", items: ["Mapeamento de rotinas e fluxos de trabalho", "Organização de responsabilidades e etapas", "Padronização de processos e documentos", "Acompanhamento de melhorias"] },
  { id: "03", icon: Landmark, name: "Assessoria parlamentar", tagline: "Apoio que aproxima e organiza.", description: "Suporte à organização de gabinetes, demandas e agendas no contexto parlamentar.", details: "Apoio à rotina parlamentar com organização, atenção ao contexto institucional e cuidado com as relações.", items: ["Organização de agendas institucionais", "Acompanhamento de demandas de gabinete", "Apoio à comunicação e documentação", "Articulação de informações e prioridades"] },
  { id: "04", icon: Network, name: "Relações institucionais", tagline: "Conexões com propósito.", description: "Pontes entre pessoas, organizações e interesses, com comunicação cuidadosa e intencional.", details: "Cuidado com cada contato para aproximar pessoas e organizações e facilitar uma comunicação institucional alinhada.", items: ["Organização de contatos e interlocutores", "Apoio em encontros institucionais", "Acompanhamento de demandas e retornos", "Comunicação entre equipes e instituições"] },
];
const atmospheres = [
  { id: "immersive", name: "Imersiva", note: "Azul profundo & luz dourada", colors: ["#102e3c", "#d8b87d"] },
  { id: "organic", name: "Orgânica", note: "Verde sálvia & formas livres", colors: ["#334d40", "#b8c9a0"] },
  { id: "classic", name: "Provençal", note: "Lavanda & elegância clássica", colors: ["#494354", "#d3b9cb"] },
  { id: "rustic", name: "Natural", note: "Terra & texturas acolhedoras", colors: ["#4d382b", "#d2b183"] },
  { id: "glam", name: "Glam", note: "Ônix & brilho sofisticado", colors: ["#232329", "#decba3"] },
  { id: "playful", name: "Lúdica", note: "Ameixa & um toque de surpresa", colors: ["#493149", "#f0b9a0"] },
];
const faqs = [
  { q: "Como funciona o primeiro contato?", a: "Começamos com uma conversa para entender sua rotina, suas necessidades e seus objetivos. A partir disso, alinhamos o escopo de trabalho e os próximos passos. Você pode iniciar esse contato pelo WhatsApp ou por e-mail." },
  { q: "Posso contratar mais de uma área de assessoria?", a: "Sim. As áreas de atuação se complementam. Na conversa inicial, podemos avaliar uma combinação de serviços que faça sentido para suas demandas e definir um escopo personalizado." },
  { q: "O atendimento é presencial ou remoto?", a: "A base de atuação é Porto Alegre, RS. O formato de atendimento — presencial, remoto ou híbrido — é alinhado no primeiro contato, conforme as necessidades e a disponibilidade." },
  { q: "Como recebo uma proposta?", a: "Envie uma mensagem com uma breve descrição da sua necessidade. Após compreender o contexto e alinhar o escopo, Thamyres poderá apresentar uma proposta adequada à sua demanda." },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 35, filter: reduced ? "none" : "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function MagneticLink({ children, href, className = "", external = false }: { children: ReactNode; href: string; className?: string; external?: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ x: (event.clientX - rect.left - rect.width / 2) * .1, y: (event.clientY - rect.top - rect.height / 2) * .15 });
  }
  return <motion.a href={href} className={className} onMouseMove={move} onMouseLeave={() => setPosition({ x: 0, y: 0 })} animate={position} transition={{ type: "spring", stiffness: 220, damping: 20 }} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</motion.a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atmosphere, setAtmosphere] = useState("immersive");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [profileTab, setProfileTab] = useState("formacao");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("inicio");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactService, setContactService] = useState("");
  const [activeService, setActiveService] = useState(0);
  const serviceRailRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const saved = localStorage.getItem("ts-atmosphere");
    if (saved && atmospheres.some(a => a.id === saved)) setAtmosphere(saved);
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: "-20% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach(section => observer.observe(section));
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.atmosphere = atmosphere;
    localStorage.setItem("ts-atmosphere", atmosphere);
  }, [atmosphere]);

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => { if ((event.target as Element).closest("[data-palette-toggle]")) return; if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) setPaletteOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setPaletteOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    if (selectedService === null && !menuOpen) return;
    const previous = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (selectedService !== null) closeModalRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelectedService(null); setMenuOpen(false); }
      if (event.key === "Tab") {
        const scope = document.querySelector(selectedService !== null ? ".service-modal" : ".mobile-menu");
        const elements = scope?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
        if (!elements?.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [selectedService, menuOpen]);

  function heroMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    heroRef.current?.style.setProperty("--pointer-x", `${(event.clientX - rect.left - rect.width / 2) / 55}px`);
    heroRef.current?.style.setProperty("--pointer-y", `${(event.clientY - rect.top - rect.height / 2) / 55}px`);
    heroRef.current?.style.setProperty("--light-x", `${event.clientX - rect.left}px`);
    heroRef.current?.style.setProperty("--light-y", `${event.clientY - rect.top}px`);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Olá, Thamyres! Meu nome é ${String(data.get("name")).trim()}.\n\nTenho interesse em: ${contactService || "Conversar sobre assessoria"}.\n\n${String(data.get("message")).trim()}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  function scrollService(index: number) {
    const rail = serviceRailRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    rail.scrollTo({ left: index * (card.offsetWidth + 16), behavior: reduced ? "auto" : "smooth" });
  }

  const nav = [{ id: "sobre", label: "Sobre mim" }, { id: "atuacao", label: "Áreas de atuação" }, { id: "processo", label: "Como trabalho" }];

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#inicio" className="brand" aria-label="Thamyres Schneider, início"><span className="monogram">T<span>S</span></span><span className="brand-name">THAMYRES SCHNEIDER<small>ASSESSORIA EXECUTIVA & INSTITUCIONAL</small></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(item => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""}>{item.label}</a>)}</nav>
      <MagneticLink href="#contato" className="header-contact">Vamos conversar <ArrowUpRight size={16} /></MagneticLink>
      <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-expanded={menuOpen}><Menu /></button>
    </header>
    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navegação" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu" autoFocus><X /></button><span className="eyebrow">THAMYRES SCHNEIDER</span>{[...nav, { id: "contato", label: "Vamos conversar" }].map((item, i) => <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}><small>0{i + 1}</small>{item.label}<ArrowUpRight /></a>)}</motion.div>}</AnimatePresence>

    <main id="conteudo">
      <section className="hero" id="inicio" ref={heroRef} onMouseMove={heroMove} onMouseLeave={() => { heroRef.current?.style.setProperty("--pointer-x", "0px"); heroRef.current?.style.setProperty("--pointer-y", "0px"); }}>
        <div className="hero-desktop">
        <div className="hero-glow" /><div className="hero-grain" />
        <ScrollOrnament />
        <div className="hero-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15, duration: .8 }}><span /> PRESENÇA QUE ORGANIZA. ESTRATÉGIA QUE CONECTA.</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: 1 }}>Seu próximo passo.<br />Com <em>clareza.</em><br />Com <em>confiança.</em></motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .8 }}>Assessoria executiva e institucional para transformar<br className="desktop-break" /> a complexidade do dia a dia em possibilidades.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6, duration: .8 }}><MagneticLink href="#contato" className="button button-gold">Vamos construir o próximo passo <ArrowUpRight size={18} /></MagneticLink><a href="#atuacao" className="text-link">Conheça minha atuação <ArrowRight size={16} /></a></motion.div>
          <motion.div className="hero-location" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}><span className="location-dot" /><span>Porto Alegre, RS</span><i /><span>Conexões que vão além.</span></motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: 1.1 }}>
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <div className="portrait-frame"><Image src="/thamyres-portrait.png" alt="Thamyres Schneider, assessora executiva e institucional" fill priority sizes="(max-width: 700px) 85vw, 42vw" className="portrait-image" /><div className="portrait-shade" /></div>
          <span className="portrait-star" aria-hidden="true">✦</span>
          <div className="portrait-caption"><span className="caption-line" /><span>THAMYRES <strong>SCHNEIDER</strong><small>ASSESSORA EXECUTIVA E INSTITUCIONAL</small></span></div>
          <div className="portrait-note"><Sparkles size={16} /><span>O cuidado está nos detalhes.</span></div>
        </motion.div>
        <a href="#atuacao" className="scroll-cue"><span>DESCUBRA MAIS</span><ArrowDown size={15} /></a>
        <span className="hero-index">01 — UM NOVO OLHAR</span>
        </div>
        <MobileHero contactHref="#contato" />
      </section>

      <div className="values-ribbon" aria-label="Valores da assessoria"><div>{[0, 1].map(n => <span className="ribbon-set" key={n} aria-hidden={n === 1}>{["Estratégia", "Organização", "Conexão", "Confiança", "Cuidado"].map(word => <span key={word}>{word}<span className="ribbon-star">✦</span></span>)}</span>)}</div></div>

      <section className="services section-pad" id="atuacao">
        <ScrollOrnament variant="star" />
        <Reveal className="section-heading"><div><span className="eyebrow"><span /> ÁREAS DE ATUAÇÃO</span><h2>Onde sua rotina encontra<br /><em>novas possibilidades.</em></h2></div><p>Um olhar integrado. Uma atuação próxima.<br />Soluções que fazem sentido para você.</p></Reveal>
        <div className="service-grid" ref={serviceRailRef} role="region" aria-label="Áreas de atuação; no celular, deslize para explorar" tabIndex={0} onScroll={event => { const rail = event.currentTarget; if (rail.scrollWidth <= rail.clientWidth) return; const card = rail.firstElementChild as HTMLElement; setActiveService(Math.min(3, Math.max(0, Math.round(rail.scrollLeft / (card.offsetWidth + 16))))); }} onKeyDown={event => { if (event.currentTarget.scrollWidth <= event.currentTarget.clientWidth) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); scrollService(Math.max(0, Math.min(3, activeService + (event.key === "ArrowRight" ? 1 : -1)))); } }}>{services.map((service, index) => <ScrollCard key={service.id} index={index}><button className="service-card" onClick={() => setSelectedService(index)} aria-label={`Saiba mais sobre ${service.name}`} onMouseMove={event => { if (reduced) return; const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--card-x", `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty("--card-y", `${event.clientY - rect.top}px`); }}><div className="service-card-top"><service.icon strokeWidth={1.3} size={30} /><span>{service.id}</span></div><h3>{service.name}</h3><span className="service-tagline">{service.tagline}</span><p>{service.description}</p><span className="service-link">Explore as possibilidades <span><ArrowUpRight size={18} /></span></span></button></ScrollCard>)}</div>
        <div className="service-carousel-controls"><span>DESLIZE PARA EXPLORAR <ArrowRight size={13} /></span><div>{services.map((service, index) => <button key={service.id} aria-label={`Mostrar ${service.name}`} aria-pressed={activeService === index} onClick={() => scrollService(index)} className={activeService === index ? "selected" : ""} />)}</div><span className="service-carousel-count">0{activeService + 1} / 04</span></div>
        <Reveal className="services-footnote"><span>✦</span> Cada necessidade é única. A assessoria também deve ser.<a href="#contato">Vamos encontrar o seu caminho <ArrowUpRight size={15} /></a></Reveal>
      </section>

      <ScrollNarrative />

      <section className="about section-pad" id="sobre">
        <ScrollOrnament variant="bloom" />
        <div className="about-mobile-heading"><span className="eyebrow">QUEM ESTÁ AO SEU LADO</span><h2>Estratégia.<br /><em>Sensibilidade.</em></h2><p>Prazer, sou<br /><strong>Thamyres.</strong></p><span className="mobile-about-line" /></div>
        <Reveal className="about-art"><div className="about-arch"><ParallaxPortrait /><span className="about-image-label">PESSOAS NO CENTRO. PROPÓSITO EM CADA AÇÃO.</span></div><div className="about-stamp"><span>ESTRATÉGIA</span><Sparkles size={27} strokeWidth={1} /><span>COM SENSIBILIDADE</span></div><span className="about-handwriting">Prazer, Thamyres.</span></Reveal>
        <Reveal className="about-content" delay={.15}><span className="eyebrow"><span /> QUEM ESTÁ AO SEU LADO</span><h2>Uma visão estratégica.<br /><em>Um jeito humano.</em></h2><p className="about-intro">Sou Thamyres Schneider, assessora executiva e institucional. Acredito no poder de uma rotina bem organizada e de relações construídas com atenção e propósito.</p><p>Minha formação conecta secretariado executivo, gestão de processos e assessoria parlamentar. É desse encontro entre organização e sensibilidade que nasce minha forma de atuar.</p><div className="profile-tabs" role="tablist" aria-label="Conheça Thamyres"><button id="tab-formacao" role="tab" aria-selected={profileTab === "formacao"} aria-controls="profile-panel" onClick={() => setProfileTab("formacao")}>Minha formação</button><button id="tab-olhar" role="tab" aria-selected={profileTab === "olhar"} aria-controls="profile-panel" onClick={() => setProfileTab("olhar")}>Meu olhar</button></div><div id="profile-panel" role="tabpanel" aria-labelledby={`tab-${profileTab}`} className="profile-panel">{profileTab === "formacao" ? <><div><GraduationCap size={20} /><span>Secretariado Executivo Trilíngue<small>ULBRA</small></span></div><div><Workflow size={20} /><span>MBA em Gestão de Processos<small>UniRitter</small></span></div><div><Landmark size={20} /><span>Assessoria Parlamentar e Gestão de Gabinetes<small>Pós-graduação em andamento</small></span></div></> : <div className="profile-perspective"><Sparkles size={22} /><span>Escuta, organização e presença.<small>Cada contexto merece atenção. Meu ponto de partida é compreender suas prioridades, aproximar as pessoas certas e cuidar dos detalhes para que o trabalho flua.</small></span></div>}</div><a href="https://www.linkedin.com/in/thamyres-schneider" target="_blank" rel="noopener noreferrer" className="text-link dark-link">Vamos nos conectar no LinkedIn <ArrowUpRight size={16} /></a></Reveal>
      </section>

      <ProcessJourney />

      <section className="faq section-pad"><Reveal><span className="eyebrow"><span /> PARA COMEÇARMOS BEM</span><h2>Um pouco mais<br /><em>de clareza.</em></h2><p>Respostas para os primeiros passos<br />da nossa conversa.</p></Reveal><div className="faq-list">{faqs.map((faq, index) => <Reveal key={faq.q} delay={index * .06}><div className={`faq-item ${openFaq === index ? "faq-open" : ""}`}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-${index}`}><span>{faq.q}</span>{openFaq === index ? <Minus size={19} /> : <Plus size={19} />}</button><AnimatePresence initial={false}>{openFaq === index && <motion.div id={`faq-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }}><p>{faq.a}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></section>

      <section className="contact section-pad" id="contato"><ScrollOrnament /><Reveal className="contact-intro"><span className="eyebrow"><span /> O PRÓXIMO PASSO É UMA CONVERSA</span><h2>Vamos dar espaço<br /><em>ao que vem a seguir?</em></h2><p>Conte o que você precisa. Vamos descobrir<br />juntos como posso estar ao seu lado.</p><div className="contact-links"><a href={`tel:+${phone}`}><Phone size={18} /><span>(51) 99547-0953</span><ArrowUpRight size={16} /></a><a href="mailto:thamyres.schneider@gmail.com"><Mail size={18} /><span>thamyres.schneider@gmail.com</span><ArrowUpRight size={16} /></a><div><MapPin size={18} /><span>Porto Alegre, RS</span></div></div><div className="social-links"><a href="https://www.instagram.com/thamyres_schneider_executiva/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Thamyres"><Instagram size={20} /></a><a href="https://www.linkedin.com/in/thamyres-schneider" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Thamyres"><Linkedin size={20} /></a><span>Conexões começam por aqui.</span></div></Reveal><Reveal className="contact-form-wrap" delay={.15}><form onSubmit={submitContact} className="contact-form"><span className="form-eyebrow">UMA MENSAGEM. NOVAS POSSIBILIDADES.</span><label htmlFor="name">Como posso te chamar?</label><input id="name" name="name" placeholder="Seu nome" required maxLength={100} autoComplete="name" onChange={() => setSubmitted(false)} /><label htmlFor="interest">Como posso ajudar?</label><div className="select-wrap"><select id="interest" value={contactService} onChange={e => { setContactService(e.target.value); setSubmitted(false); }}><option value="">Selecione uma área de interesse</option>{services.map(service => <option key={service.id}>{service.name}</option>)}<option>Quero entender as possibilidades</option></select><ChevronDown size={16} /></div><label htmlFor="message">Conte um pouco sobre sua necessidade</label><textarea id="message" name="message" placeholder="Seu próximo capítulo começa aqui…" required rows={3} maxLength={2000} onChange={() => setSubmitted(false)} /><button type="submit" className="button button-gold">Iniciar conversa no WhatsApp <Send size={17} /></button><span className="form-note">Sua mensagem será aberta no WhatsApp para você enviar.</span>{submitted && <p className="form-status" role="status"><Check size={16} />Mensagem preparada. Confirme o envio no WhatsApp.</p>}</form></Reveal></section>
    </main>
    <footer className="site-footer"><a href="#inicio" className="brand"><span className="monogram">T<span>S</span></span><span className="brand-name">THAMYRES SCHNEIDER<small>ASSESSORIA EXECUTIVA & INSTITUCIONAL</small></span></a><p>Com estratégia. Com cuidado. Com você.</p><span>© {new Date().getFullYear()} Thamyres Schneider.</span><a href="#inicio" className="back-top" aria-label="Voltar ao início"><ArrowUpRight size={20} /></a></footer>

    <div className="atmosphere-control" ref={paletteRef}><AnimatePresence>{paletteOpen && <motion.div className="atmosphere-panel" initial={{ opacity: 0, y: 12, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .96 }}><span className="eyebrow">UM ESPAÇO, DIFERENTES SENSAÇÕES</span><h3>Escolha sua atmosfera.</h3><p>Um novo olhar, a mesma essência.</p><div className="atmosphere-options">{atmospheres.map(a => <button key={a.id} onClick={() => setAtmosphere(a.id)} aria-pressed={atmosphere === a.id} className={atmosphere === a.id ? "selected" : ""}><span className="theme-swatch" style={{ background: `linear-gradient(135deg, ${a.colors[0]} 50%, ${a.colors[1]} 50%)` }} /><span>{a.name}<small>{a.note}</small></span>{atmosphere === a.id && <Check size={16} />}</button>)}</div></motion.div>}</AnimatePresence><button className="atmosphere-trigger" aria-expanded={paletteOpen} aria-label="Escolher atmosfera visual do site" onClick={() => setPaletteOpen(!paletteOpen)}>{paletteOpen ? <X size={17} /> : <Palette size={17} />}<span>Mude a atmosfera</span><span className="theme-indicator" /></button></div>
    <MagneticLink href={whatsapp} external className="whatsapp-float"><svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 11.8a8 8 0 0 1-11.8 7L4 20l1.2-4.2A8 8 0 1 1 20 11.8Z"/><path d="M9 8c-.8 0-1.2.5-1.2 1.3 0 2.5 3.5 5.8 5.8 5.8.8 0 1.4-.6 1.4-1.3l-2-1-1 .6a7 7 0 0 1-2.3-2.3l.5-1L9 8Z"/></svg><span>Vamos conversar</span></MagneticLink>
    <nav className="mobile-dock" aria-label="Navegação do celular"><a href="#inicio" aria-current={activeSection === "inicio" ? "location" : undefined}><House size={20} strokeWidth={1.5} /><span>Início</span></a><a href="#atuacao" aria-current={activeSection === "atuacao" ? "location" : undefined}><BriefcaseBusiness size={20} strokeWidth={1.5} /><span>Atuação</span></a><a href="#sobre" aria-current={activeSection === "sobre" ? "location" : undefined}><GraduationCap size={21} strokeWidth={1.5} /><span>Sobre</span></a><button data-palette-toggle onClick={() => setPaletteOpen(!paletteOpen)} aria-expanded={paletteOpen}><Palette size={20} strokeWidth={1.5} /><span>Atmosfera</span></button><a href="#contato" className="dock-contact" aria-current={activeSection === "contato" ? "location" : undefined}><MessageCircle size={20} strokeWidth={1.5} /><span>Conversar</span></a></nav>

    <AnimatePresence>{selectedService !== null && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => { if (event.target === event.currentTarget) setSelectedService(null); }}><motion.div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" initial={{ opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }}><button className="modal-close" ref={closeModalRef} onClick={() => setSelectedService(null)} aria-label="Fechar detalhes"><X size={22} /></button><span className="eyebrow">ÁREA DE ATUAÇÃO / {services[selectedService].id}</span><h2 id="service-modal-title">{services[selectedService].name}</h2><em>{services[selectedService].tagline}</em><p>{services[selectedService].details}</p><ul>{services[selectedService].items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><a href="#contato" className="button button-navy" onClick={() => { setContactService(services[selectedService].name); setSelectedService(null); }}>Vamos conversar sobre essa área <ArrowUpRight size={18} /></a><small>O escopo de trabalho é alinhado à sua necessidade na conversa inicial.</small></motion.div></motion.div>}</AnimatePresence>
  </>;
}
