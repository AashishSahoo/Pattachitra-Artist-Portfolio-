"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: "mdi:image-filter-hdr",
    label: "01",
    title: "Prepare the Khadda",
    description:
      "Old cloth (cotton or silk) is layered with chalk paste and tamarind seed resin, dried, and polished smooth with a conch shell until it has the texture of fine paper. This ground is the khadda.",
    time: "3–5 days",
  },
  {
    icon: "mdi:pencil-outline",
    label: "02",
    title: "Charcoal Sketch",
    description:
      "The composition is drawn freehand in charcoal — never with rulers or projections. Proportions follow the ancient Chitrasutra canon, passed down through generations of Chitrakar families.",
    time: "1–3 days",
  },
  {
    icon: "mdi:palette",
    label: "03",
    title: "Natural Pigments",
    description:
      "Stone pigments (hingula red, ramaraja blue, haritala yellow) are ground in water with natural gum. No synthetic colours. The palette is the same used in the Jagannath temple murals.",
    time: "Ongoing",
  },
  {
    icon: "mdi:brush",
    label: "04",
    title: "Filling & Shading",
    description:
      "Colour is filled flat, then shaded with gradients — a more demanding technique that separates the classical Puri school. Backgrounds are built up in five or six transparent washes.",
    time: "5–15 days",
  },
  {
    icon: "mdi:vector-line",
    label: "05",
    title: "Black Outline",
    description:
      "The definitive outlines are drawn with a fine brush loaded with lamp-black — the final and most unforgiving step. A shaky line cannot be corrected. This is where the training shows.",
    time: "2–4 days",
  },
  {
    icon: "mdi:star-four-points",
    label: "06",
    title: "Lacquer & Delivery",
    description:
      "The finished work is sealed with lac varnish, dried in sun, and rolled or stretched. Each piece ships with a certificate of authenticity, pigment notes, and care instructions.",
    time: "1–2 days",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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

      if (stepsRef.current?.children) {
        gsap.fromTo(
          Array.from(stepsRef.current.children),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      gsap.fromTo(
        quoteRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-32 relative"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}>
              The Making
            </span>
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
          </div>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "Georgia, serif", color: "var(--ink)", lineHeight: 1.15 }}
          >
            A Thousand-Year Process
          </h2>
          <p
            style={{ color: "var(--ink)", opacity: 0.6, fontFamily: "sans-serif", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}
          >
            Patachitra is not simply painted — it is grown. Every stage follows the same
            method described in the ancient Silpa Shastras.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={stepsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {steps.map((step) => (
            <div
              key={step.label}
              className="p-8 relative group hover:shadow-lg transition-shadow duration-300"
              style={{ background: "var(--ink)", border: "1px solid rgba(200,64,26,0.2)" }}
            >
              {/* Step number - faint background */}
              <span
                className="absolute top-4 right-4 text-5xl font-bold select-none"
                style={{ color: "rgba(200,64,26,0.08)", fontFamily: "Georgia, serif", lineHeight: 1 }}
              >
                {step.label}
              </span>

              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ background: "rgba(200,64,26,0.15)" }}
              >
                <Icon icon={step.icon} width={24} style={{ color: "var(--turmeric)" }} />
              </div>

              <h3
                className="font-bold mb-3 leading-snug"
                style={{ fontFamily: "Georgia, serif", color: "var(--cream)", fontSize: "1.1rem" }}
              >
                {step.title}
              </h3>
              <p
                className="mb-4 leading-relaxed text-sm"
                style={{ color: "var(--parchment)", opacity: 0.65, fontFamily: "sans-serif", lineHeight: 1.7 }}
              >
                {step.description}
              </p>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:clock-outline" width={14} style={{ color: "var(--turmeric)", opacity: 0.7 }} />
                <span className="text-xs" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
                  {step.time}
                </span>
              </div>

              {/* Bottom accent on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: "linear-gradient(90deg, var(--vermilion), var(--turmeric))" }}
              />
            </div>
          ))}
        </div>

        {/* Full-width quote */}
        <div
          ref={quoteRef}
          className="text-center p-12 relative"
          style={{ background: "var(--ink)", border: "1px solid rgba(200,64,26,0.25)" }}
        >
          {/* Patachitra corner ornament SVG */}
          {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos, i) => (
            <svg
              key={i}
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className={`absolute ${pos} opacity-40`}
              fill="none"
            >
              <path d="M2 2 L20 2 Q24 2 24 6 L24 24" stroke="#C8401A" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="4" fill="#E8A020" opacity="0.7" />
              <circle cx="6" cy="6" r="2" fill="#C8401A" opacity="0.7" />
            </svg>
          ))}
          <Icon icon="mdi:leaf" width={32} style={{ color: "var(--turmeric)", opacity: 0.5, marginBottom: 16 }} />
          <p
            className="italic mx-auto mb-4 leading-relaxed"
            style={{ fontFamily: "Georgia, serif", color: "var(--cream)", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", maxWidth: 700, lineHeight: 1.6 }}
          >
            "The chitrakar does not rush the colour. He waits for it the way a farmer waits
            for rain — with patience and absolute faith."
          </p>
          <p className="text-sm" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
            Guru Ananta Mohanty, National Award-winning Chitrakar, Raghurajpur
          </p>
        </div>
      </div>
    </section>
  );
}
