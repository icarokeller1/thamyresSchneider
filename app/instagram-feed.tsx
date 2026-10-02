"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { instagramPosts, instagramProfile } from "./instagram-posts";

export default function InstagramFeed() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState(0);

  function showPost(index: number) {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - (rail.firstElementChild as HTMLElement).offsetLeft, behavior: reduced ? "instant" : "smooth" });
  }

  return <section id="instagram" className="instagram-section section-pad" aria-labelledby="instagram-heading">
    <motion.div className="instagram-heading" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .75 }}>
      <h2 id="instagram-heading">Além da rotina.<br /><em>Mais conexões.</em></h2>
      <div><p>Registros, encontros e momentos que fazem parte do meu caminho. Acompanhe também no meu Instagram profissional.</p><a href={instagramProfile} target="_blank" rel="noopener noreferrer" className="text-link dark-link">Acompanhe meu Instagram <ArrowUpRight size={18} /></a></div>
    </motion.div>

    <div className="instagram-rail" ref={railRef} role="region" aria-label="Publicações do meu Instagram; deslize no celular para explorar" tabIndex={0}
      onScroll={event => {
        const rail = event.currentTarget;
        const cards = Array.from(rail.children) as HTMLElement[];
        const origin = cards[0].offsetLeft;
        const closest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - origin - rail.scrollLeft) < Math.abs(cards[best].offsetLeft - origin - rail.scrollLeft) ? index : best, 0);
        setActivePost(closest);
      }}
      onKeyDown={event => {
        if (event.currentTarget.scrollWidth <= event.currentTarget.clientWidth) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          showPost(Math.max(0, Math.min(instagramPosts.length - 1, activePost + (event.key === "ArrowRight" ? 1 : -1))));
        }
      }}>
      {instagramPosts.map((post, index) => <motion.article key={post.shortcode} className="instagram-post" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : index * .12, ease: [.22, 1, .36, 1] }}>
        <a href={`https://www.instagram.com/p/${post.shortcode}/`} target="_blank" rel="noopener noreferrer" aria-label={`${post.title} Abrir publicação no Instagram`}>
          <div className="instagram-photo"><Image src={`/instagram/${post.shortcode}.jpg`} alt={post.alt} fill sizes="(max-width: 700px) 82vw, (max-width: 1000px) 42vw, 28vw" style={{ objectPosition: post.imagePosition }} /><span className="instagram-open" aria-hidden="true"><ArrowUpRight size={23} /></span></div>
          <div className="instagram-post-copy"><h3>{post.title}</h3><span>Ver publicação no Instagram <ArrowUpRight size={17} /></span></div>
        </a>
      </motion.article>)}
    </div>
    <div className="instagram-controls"><span>Deslize para explorar <ArrowRight size={16} /></span><div>{instagramPosts.map((post, index) => <button key={post.shortcode} onClick={() => showPost(index)} aria-label={`Mostrar publicação: ${post.title}`} aria-pressed={activePost === index} />)}</div></div>
  </section>;
}
