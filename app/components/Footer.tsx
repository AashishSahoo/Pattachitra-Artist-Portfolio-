"use client";
import { Icon } from "@iconify/react";
import { artist } from "../data/artist";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "1px solid rgba(200,64,26,0.2)" }}>
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              style={{ background: "var(--vermilion)", color: "var(--cream)", fontFamily: "serif" }}
            >
              SM
            </span>
            <div>
              <div className="font-bold" style={{ color: "var(--cream)", fontFamily: "serif" }}>{artist.name}</div>
              <div className="text-xs tracking-widest" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>Patachitra Artist</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--parchment)", opacity: 0.5, fontFamily: "sans-serif" }}>
            Keeping the ancient living. One brushstroke at a time, from the sacred village
            of Raghurajpur, Odisha.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>Navigate</h4>
          <ul className="space-y-2">
            {["Home", "About", "Gallery", "Process", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-sm hover:text-amber-400 transition-colors"
                  style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif" }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>Connect</h4>
          <div className="space-y-3 mb-6">
            <a
              href={`mailto:${artist.contact.email}`}
              className="flex items-center gap-3 text-sm hover:opacity-100 transition-opacity"
              style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif" }}
            >
              <Icon icon="mdi:email-outline" width={16} style={{ color: "var(--turmeric)" }} />
              {artist.contact.email}
            </a>
            <a
              href={`tel:${artist.contact.whatsapp}`}
              className="flex items-center gap-3 text-sm hover:opacity-100 transition-opacity"
              style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif" }}
            >
              <Icon icon="mdi:whatsapp" width={16} style={{ color: "var(--turmeric)" }} />
              {artist.contact.phone}
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm hover:opacity-100 transition-opacity"
              style={{ color: "var(--parchment)", opacity: 0.6, fontFamily: "sans-serif" }}
            >
              <Icon icon="mdi:instagram" width={16} style={{ color: "var(--turmeric)" }} />
              {artist.contact.instagram}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { icon: "mdi:instagram", href: "#" },
              { icon: "mdi:facebook", href: "#" },
              { icon: "mdi:youtube", href: "#" },
              { icon: "mdi:whatsapp", href: "#" },
            ].map((s) => (
              <a
                key={s.icon}
                href={s.href}
                className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(200,64,26,0.15)", color: "var(--turmeric)" }}
              >
                <Icon icon={s.icon} width={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="border-t py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: "rgba(200,64,26,0.15)" }}
      >
        <p className="text-xs" style={{ color: "var(--parchment)", opacity: 0.35, fontFamily: "sans-serif" }}>
          © {new Date().getFullYear()} {artist.name}. All artworks are original and protected under copyright.
        </p>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--turmeric)", fontFamily: "sans-serif" }}>
          <Icon icon="mdi:om" width={16} />
          <span>Jay Jagannath</span>
          <Icon icon="mdi:om" width={16} />
        </div>
      </div>
    </footer>
  );
}
