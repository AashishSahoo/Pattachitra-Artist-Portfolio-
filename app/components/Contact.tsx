"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { artist } from "../data/artist";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", artType: "", message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.fromTo(formRef.current, { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    gsap.to(formRef.current, {
      scale: 0.98, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => setSubmitted(true),
    });
  };

  const contactItems = [
    { icon: "mdi:email-outline", label: "Email", value: artist.contact.email, href: `mailto:${artist.contact.email}` },
    { icon: "mdi:phone-outline", label: "Phone / WhatsApp", value: artist.contact.phone, href: `tel:${artist.contact.whatsapp}` },
    { icon: "mdi:instagram", label: "Instagram", value: artist.contact.instagram, href: `https://instagram.com/${artist.contact.instagram.replace("@", "")}` },
    { icon: "mdi:map-marker-outline", label: "Studio", value: artist.location, href: "#" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, var(--vermilion), var(--turmeric), var(--vermilion), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--vermilion)", fontFamily: "sans-serif" }}>
              Commission & Contact
            </span>
            <span className="block h-px w-16" style={{ background: "var(--vermilion)" }} />
          </div>
          <h2
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "Georgia, serif", color: "var(--ink)", lineHeight: 1.15 }}
          >
            Own a Piece of Odisha
          </h2>
          <p
            style={{ color: "var(--ink)", opacity: 0.6, fontFamily: "sans-serif", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.7 }}
          >
            Commission original Patachitra or sketch work. Custom sizes, subjects, and
            mediums. Ships worldwide with full documentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div ref={leftRef} className="lg:col-span-2">
            <div
              className="p-8 mb-8"
              style={{ background: "var(--ink)", border: "1px solid rgba(200,64,26,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--vermilion)", color: "var(--cream)", fontFamily: "serif", fontSize: "1.2rem" }}>
                  SM
                </div>
                <div>
                  <div className="font-bold" style={{ color: "var(--cream)", fontFamily: "serif" }}>{artist.name}</div>
                  <div className="text-xs" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>{artist.title}</div>
                </div>
              </div>
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: "rgba(200,64,26,0.15)" }}
                    >
                      <Icon icon={item.icon} width={18} style={{ color: "var(--turmeric)" }} />
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: "var(--parchment)", opacity: 0.5, fontFamily: "sans-serif" }}>{item.label}</div>
                      <div className="text-sm group-hover:underline" style={{ color: "var(--cream)", fontFamily: "sans-serif" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Commission info */}
            <div className="space-y-3">
              {[
                { icon: "mdi:truck-fast-outline", text: "Ships worldwide in archival packaging" },
                { icon: "mdi:certificate-outline", text: "Certificate of authenticity with every piece" },
                { icon: "mdi:clock-outline", text: "Commission turnaround: 4–12 weeks" },
                { icon: "mdi:shield-check-outline", text: "50% advance, balance on completion" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <Icon icon={item.icon} width={18} style={{ color: "var(--turmeric)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "var(--ink)", opacity: 0.7, fontFamily: "sans-serif" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div ref={formRef} className="lg:col-span-3">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center p-16"
                style={{ background: "var(--ink)", border: "1px solid rgba(200,64,26,0.2)", minHeight: 400 }}
              >
                <Icon icon="mdi:check-circle" width={64} style={{ color: "var(--turmeric)", marginBottom: 20 }} />
                <h3
                  className="mb-3"
                  style={{ fontFamily: "Georgia, serif", color: "var(--cream)", fontSize: "1.5rem" }}
                >
                  Jay Jagannath! 🙏
                </h3>
                <p style={{ color: "var(--parchment)", opacity: 0.7, fontFamily: "sans-serif", lineHeight: 1.7 }}>
                  Your message has reached the studio. Sudarshan will respond within 48
                  hours with details and initial sketches for your commission.
                </p>
              </div>
            ) : (
              <div
                className="p-10"
                style={{ background: "var(--ink)", border: "1px solid rgba(200,64,26,0.2)" }}
              >
                <h3
                  className="mb-8"
                  style={{ fontFamily: "Georgia, serif", color: "var(--cream)", fontSize: "1.4rem" }}
                >
                  Commission Request
                </h3>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label="Your Name *" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full name" />
                    <FormField label="Email *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <FormField label="Phone / WhatsApp" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 ..." />

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
                      Art Type
                    </label>
                    <select
                      name="artType"
                      value={form.artType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: "rgba(245,237,216,0.05)",
                        border: "1px solid rgba(200,64,26,0.3)",
                        color: "var(--cream)",
                        fontFamily: "sans-serif",
                      }}
                    >
                      <option value="">Select medium...</option>
                      <option value="patachitra-cloth">Patachitra on Cloth</option>
                      <option value="patachitra-silk">Patachitra on Silk</option>
                      <option value="sketch-charcoal">Charcoal Sketch</option>
                      <option value="sketch-ink">Ink Illustration</option>
                      <option value="palm-leaf">Palm Leaf Engraving</option>
                      <option value="custom">Custom / Discuss</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
                      Message & Subject *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe the subject, size, occasion, and any references..."
                      className="w-full px-4 py-3 text-sm outline-none resize-none"
                      style={{
                        background: "rgba(245,237,216,0.05)",
                        border: "1px solid rgba(200,64,26,0.3)",
                        color: "var(--cream)",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 font-bold tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(90deg, var(--deep-red), var(--vermilion))",
                      color: "var(--cream)",
                      fontFamily: "sans-serif",
                      fontSize: "0.95rem",
                    }}
                  >
                    <Icon icon="mdi:send" width={18} />
                    Send Commission Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, name, type, value, onChange, placeholder,
}: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm outline-none"
        style={{
          background: "rgba(245,237,216,0.05)",
          border: "1px solid rgba(200,64,26,0.3)",
          color: "var(--cream)",
          fontFamily: "sans-serif",
        }}
      />
    </div>
  );
}
