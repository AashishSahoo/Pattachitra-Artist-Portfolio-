"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { artist } from "../data/artist";

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Animate border frame in
    tl.fromTo(borderRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(greetRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.3")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.2");

    // Floating animation for decorative elements
    gsap.to(floatingRef.current, {
      y: -20,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(containerRef.current, { y: self.progress * 80, ease: "none" });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        <defs>
          <pattern id="diamond-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,30 30,60 0,30" fill="none" stroke="var(--vermilion)" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="4" fill="var(--turmeric)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-grid)" />
      </svg>



      {/* Background mandala / decorative SVG (kept as overlay) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(200,64,26,0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212,134,26,0.3) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(26,107,107,0.3) 0%, transparent 40%)
          `,
        }}
      />

      {/* Patachitra-style top border */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-2"
        style={{ background: "linear-gradient(90deg, var(--deep-red), var(--vermilion), var(--turmeric), var(--gold), var(--vermilion), var(--deep-red))", transformOrigin: "center" }}
      />


      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
        {/* Jay Jagannath greeting */}
        <div ref={greetRef} className="mb-6 flex items-center justify-center gap-3">
          <span className="block w-16 h-px" style={{ background: "var(--vermilion)" }} />
          <span
            className="text-sm tracking-[0.3em] uppercase font-semibold"
            style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}
          >
            {artist.greeting}
          </span>
          <span className="block w-16 h-px" style={{ background: "var(--vermilion)" }} />
        </div>

        {/* Artist name */}
        <h1
          ref={titleRef}
          className="leading-none mb-6"
          style={{
            fontSize: "clamp(3rem, 9vw, 8rem)",
            fontFamily: "'Georgia', serif",
            color: "var(--cream)",
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          <span style={{ display: "block" }}>Sudarshan</span>
          <span style={{ display: "block", color: "var(--vermilion)" }}>Mohanty</span>
        </h1>

        {/* Tagline */}
        <p
          ref={subtitleRef}
          className="mx-auto mb-10"
          style={{
            maxWidth: "600px",
            color: "var(--parchment)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.7,
            fontFamily: "sans-serif",
            fontWeight: 300,
          }}
        >
          Patachitra master & sketch artist from{" "}
          <span style={{ color: "var(--turmeric)" }}>Raghurajpur, Odisha</span> — painting
          devotion, mythology, and everyday life with ancient pigments and a living hand.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#gallery"
            className="flex items-center gap-2 px-8 py-4 font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "var(--vermilion)",
              color: "var(--cream)",
              fontSize: "0.95rem",
              fontFamily: "sans-serif",
            }}
          >
            <Icon icon="mdi:image-multiple" width={18} />
            View Gallery
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid var(--turmeric)",
              color: "var(--turmeric)",
              background: "transparent",
              fontSize: "0.95rem",
              fontFamily: "sans-serif",
            }}
          >
            <Icon icon="mdi:palette" width={18} />
            Commission a Piece
          </a>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-4"
          style={{ borderTop: "1px solid rgba(200,64,26,0.25)", borderBottom: "1px solid rgba(200,64,26,0.25)" }}
        >
          {artist.stats.map((stat) => (
            <div key={stat.label} className="py-6 px-4 text-center" style={{ background: "rgba(245,237,216,0.03)" }}>
              <div
                className="font-bold mb-1"
                style={{ fontSize: "1.8rem", color: "var(--turmeric)", fontFamily: "Georgia, serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <Icon icon="mdi:chevron-double-down" width={24} style={{ color: "var(--vermilion)", opacity: 0.7 }} />
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, var(--vermilion), var(--turmeric), var(--vermilion), transparent)" }}
      />

    </section>
  );
}