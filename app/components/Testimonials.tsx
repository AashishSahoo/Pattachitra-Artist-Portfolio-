"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { testimonials } from "../data/artist";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current?.children) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(200,64,26,0.8) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-12" style={{ background: "var(--vermilion)" }} />
            <Icon icon="mdi:format-quote-open" width={24} style={{ color: "var(--turmeric)" }} />
            <span className="block h-px w-12" style={{ background: "var(--vermilion)" }} />
          </div>
          <h2
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "Georgia, serif", color: "var(--cream)" }}
          >
            Voices of Collectors
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 relative"
              style={{
                background: "rgba(245,237,216,0.04)",
                border: "1px solid rgba(200,64,26,0.2)",
                borderTop: "3px solid var(--vermilion)",
              }}
            >
              <Icon
                icon="mdi:format-quote-open"
                width={36}
                style={{ color: "var(--vermilion)", opacity: 0.3, marginBottom: 16 }}
              />
              <p
                className="italic mb-6 leading-relaxed"
                style={{ color: "var(--parchment)", fontFamily: "Georgia, serif", lineHeight: 1.7 }}
              >
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: "var(--vermilion)", color: "var(--cream)", fontFamily: "sans-serif" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--cream)", fontFamily: "sans-serif" }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
