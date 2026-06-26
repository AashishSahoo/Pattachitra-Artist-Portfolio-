"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { artworks, categories } from "../data/artist";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<(typeof artworks)[0] | null>(null);

  const filtered = activeCategory === "all" ? artworks : artworks.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-32 relative"
      style={{ background: "var(--ink)" }}
    >
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--turmeric), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
              Collection
            </span>
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
          </div>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "Georgia, serif", color: "var(--cream)", lineHeight: 1.15 }}
          >
            The Art I Breathe
          </h2>
          <p style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Each work is an original, painted with natural stone colours, hand-ground pigments,
            and the devotion of a lifetime's practice.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300"
              style={{
                background: activeCategory === cat.id ? "var(--vermilion)" : "transparent",
                color: activeCategory === cat.id ? "var(--cream)" : "var(--parchment)",
                border: `1px solid ${activeCategory === cat.id ? "var(--vermilion)" : "rgba(245,237,216,0.2)"}`,
                fontFamily: "sans-serif",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((art) => (
            <ArtCard key={art.id} art={art} onOpen={() => setSelected(art)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox art={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function ArtCard({ art, onOpen }: { art: (typeof artworks)[0]; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = (enter: boolean) => {
    gsap.to(cardRef.current, {
      y: enter ? -6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
    const overlay = cardRef.current?.querySelector(".art-overlay");
    if (overlay) {
      gsap.to(overlay, {
        opacity: enter ? 1 : 0,
        duration: 0.3,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="cursor-pointer group"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={onOpen}
      style={{ willChange: "transform" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", background: "#2d1410" }}
      >
        <Image
          src={art.imageUrl}
          alt={art.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay */}
        <div
          className="art-overlay absolute inset-0 flex flex-col justify-end p-4"
          style={{
            opacity: 0,
            background: "linear-gradient(to top, rgba(26,15,8,0.95) 0%, rgba(26,15,8,0.3) 60%, transparent 100%)",
          }}
        >
          <Icon icon="mdi:magnify-plus" width={28} style={{ color: "var(--turmeric)", marginBottom: 8 }} />
          <p className="text-xs" style={{ color: "var(--parchment)", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            {art.medium} · {art.year}
          </p>
        </div>
        {/* Available badge */}
        {!art.available && (
          <div
            className="absolute top-3 right-3 px-2 py-1 text-xs font-bold uppercase"
            style={{ background: "var(--teal)", color: "var(--cream)", fontFamily: "sans-serif" }}
          >
            Sold
          </div>
        )}
      </div>
      {/* Info */}
      <div
        className="p-4"
        style={{ background: "rgba(245,237,216,0.04)", borderBottom: "1px solid rgba(200,64,26,0.2)" }}
      >
        <h3
          className="font-semibold mb-1 leading-snug"
          style={{ color: "var(--cream)", fontFamily: "Georgia, serif", fontSize: "0.95rem" }}
        >
          {art.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--parchment)", opacity: 0.5, fontFamily: "sans-serif" }}>
            {art.medium}
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
            {art.price}
          </span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ art, onClose }: { art: (typeof artworks)[0]; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(boxRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current, {
      opacity: 0, scale: 0.95, duration: 0.25, ease: "power3.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,15,8,0.95)", backdropFilter: "blur(8px)" }}
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        className="max-w-4xl w-full grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-auto"
        style={{ background: "var(--warm-white)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative" style={{ minHeight: 320, background: "#2d1410" }}>
          <Image src={art.imageUrl} alt={art.title} fill className="object-cover" sizes="50vw" />
        </div>
        {/* Details */}
        <div className="p-8 flex flex-col">
          <button
            onClick={handleClose}
            className="self-end mb-4 text-xs uppercase tracking-widest flex items-center gap-1"
            style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}
          >
            <Icon icon="mdi:close" width={18} />
            Close
          </button>
          <span
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}
          >
            {art.category === "patachitra" ? "Patachitra" : "Sketch & Illustration"}
          </span>
          <h3
            className="mb-4 leading-snug"
            style={{ fontSize: "1.5rem", fontFamily: "Georgia, serif", color: "var(--ink)" }}
          >
            {art.title}
          </h3>
          <p className="mb-6 leading-relaxed text-sm" style={{ color: "var(--ink)", opacity: 0.7, fontFamily: "Georgia, serif" }}>
            {art.description}
          </p>
          <div className="space-y-2 mb-6 text-sm" style={{ fontFamily: "sans-serif" }}>
            {[["Medium", art.medium], ["Year", art.year], ["Size", art.size], ["Price", art.price]].map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <span style={{ color: "var(--ochre)", minWidth: 60 }}>{k}</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mb-auto">
            {art.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs"
                style={{ background: "var(--ink)", color: "var(--parchment)", fontFamily: "sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>
          {art.available ? (
            <a
              href="#contact"
              onClick={handleClose}
              className="mt-6 flex items-center justify-center gap-2 py-3 font-semibold text-sm tracking-wide"
              style={{ background: "var(--vermilion)", color: "var(--cream)", fontFamily: "sans-serif" }}
            >
              <Icon icon="mdi:handshake" width={18} />
              Enquire / Purchase
            </a>
          ) : (
            <div
              className="mt-6 flex items-center justify-center gap-2 py-3 text-sm"
              style={{ background: "var(--teal)", color: "var(--cream)", fontFamily: "sans-serif" }}
            >
              <Icon icon="mdi:check-circle" width={18} />
              Sold — Commission a similar piece
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
