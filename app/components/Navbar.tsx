"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import { artist } from "../data/artist";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          mobileRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    }
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(26,15,8,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(200,64,26,0.3)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--vermilion)", color: "var(--cream)", fontFamily: "serif" }}
          >
            SM
          </span>
          <div>
            <div className="text-sm font-bold tracking-wide" style={{ color: "var(--cream)" }}>
              {artist.name}
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--turmeric)", fontSize: "9px" }}>
              Patachitra Artist · Odisha
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide transition-colors duration-200 hover:text-amber-400 relative group"
                style={{ color: "var(--parchment)", fontFamily: "sans-serif" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--turmeric)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--vermilion)",
            color: "var(--cream)",
            borderRadius: "2px",
            fontFamily: "sans-serif",
          }}
        >
          <Icon icon="mdi:palette-outline" width={16} />
          Commission Art
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--cream)" }}
        >
          <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} width={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileRef} style={{ overflow: "hidden", height: 0, opacity: 0 }}>
        <div style={{ background: "rgba(26,15,8,0.98)", borderTop: "1px solid rgba(200,64,26,0.2)" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-sm border-b"
              style={{
                color: "var(--cream)",
                borderColor: "rgba(200,64,26,0.1)",
                fontFamily: "sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
