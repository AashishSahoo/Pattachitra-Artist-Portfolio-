"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  "🏆 National Award for Crafts — Ministry of Textiles",
  "🪷 Jay Jagannath — Raghurajpur Heritage Village",
  "🎨 Patachitra · Talapatrachitra · Charcoal · Ink",
  "🌿 Natural Stone Pigments · Ancient Techniques",
  "🏅 Odisha Shilpa Gaurav 2021",
  "✈️ Ships Worldwide",
  "🖌️ Custom Commissions Open",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const width = track.scrollWidth / 2;

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -width,
        duration: 30,
        ease: "none",
        repeat: -1,
      }
    );
  }, []);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-4 relative"
      style={{ background: "var(--vermilion)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--cream)", fontFamily: "sans-serif" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
