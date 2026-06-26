"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { artist } from "../data/artist";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        textRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      if (skillsRef.current?.children) {
        gsap.fromTo(
          Array.from(skillsRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: skillsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      if (awardsRef.current?.children) {
        gsap.fromTo(
          Array.from(awardsRef.current.children),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: awardsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="block h-px flex-1" style={{ background: "rgba(200,64,26,0.2)" }} />
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}
          >
            The Artist
          </span>
          <span className="block h-px flex-1" style={{ background: "rgba(200,64,26,0.2)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: image + awards */}
          <div ref={imgRef}>
            {/* Artist Image */}
            <div
              className="relative mb-8 rounded-xl overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                height: 520,
                background: "var(--ink)",
              }}
            >
              {/* Artist Image */}
              <Image
                src="/images/awardwin.png"
                alt="Pattachitra artist receiving a National Award"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0) 70%)",
                }}
              />

              {/* Decorative Gradient Border */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none z-10"
                style={{
                  border: "6px solid transparent",
                  background:
                    "linear-gradient(45deg,var(--vermilion),var(--turmeric),var(--teal),var(--turmeric),var(--vermilion)) border-box",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Location Badge */}
              <div
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-md text-xs"
                style={{
                  background: "rgba(26,15,8,0.85)",
                  color: "var(--turmeric)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "sans-serif",
                }}
              >
                <Icon icon="mdi:map-marker" width={14} />
                {artist.location}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3
                className="text-sm uppercase tracking-widest mb-5"
                style={{
                  color: "var(--vermilion)",
                  fontFamily: "sans-serif",
                }}
              >
                Honours & Awards
              </h3>

              <div ref={awardsRef} className="space-y-3">
                {artist.awards.map((a) => (
                  <div
                    key={a.year}
                    className="flex items-start gap-4 p-4"
                    style={{
                      background: "rgba(26,15,8,0.05)",
                      borderLeft: "3px solid var(--turmeric)",
                    }}
                  >
                    <span
                      className="text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{
                        color: "var(--turmeric)",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {a.year}
                    </span>

                    <div>
                      <div
                        className="font-semibold text-sm"
                        style={{
                          color: "var(--ink)",
                          fontFamily: "serif",
                        }}
                      >
                        {a.title}
                      </div>

                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color: "var(--ochre)",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {a.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: bio + skills */}
          <div ref={textRef}>
            <h2
              className="mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontFamily: "Georgia, serif",
                color: "var(--ink)",
                lineHeight: 1.15,
              }}
            >
              A Lifetime of{" "}
              <span style={{ color: "var(--vermilion)" }}>Sacred Craft</span>
            </h2>

            <p
              className="mb-6 leading-relaxed"
              style={{ color: "var(--ink)", opacity: 0.7, fontFamily: "Georgia, serif", fontSize: "1.05rem" }}
            >
              {artist.bio}
            </p>
            <p
              className="mb-10 leading-relaxed"
              style={{ color: "var(--ink)", opacity: 0.65, fontFamily: "Georgia, serif", fontSize: "1rem" }}
            >
              {artist.bioLong}
            </p>

            {/* Skills */}
            <div>
              <h3
                className="text-sm uppercase tracking-widest mb-5"
                style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}
              >
                Disciplines
              </h3>
              <div ref={skillsRef} className="flex flex-wrap gap-2">
                {artist.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-xs font-semibold tracking-wide"
                    style={{
                      background: "var(--ink)",
                      color: "var(--parchment)",
                      border: "1px solid rgba(200,64,26,0.3)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              className="mt-10 p-6 relative"
              style={{ background: "rgba(200,64,26,0.06)", borderLeft: "4px solid var(--vermilion)" }}
            >
              <Icon
                icon="mdi:format-quote-open"
                width={32}
                style={{ color: "var(--vermilion)", opacity: 0.5, position: "absolute", top: 12, left: 12 }}
              />
              <p
                className="italic pl-6 leading-relaxed"
                style={{ color: "var(--ink)", fontFamily: "Georgia, serif", fontSize: "1.05rem" }}
              >
                Every colour I grind, every line I draw, is an offering. The canvas is my
                temple and the brush is my aarati.
              </p>
              <p className="pl-6 mt-3 text-xs" style={{ color: "var(--ochre)", fontFamily: "sans-serif" }}>
                — Sudarshan Mohanty
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
