"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 transition-opacity duration-300 md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex flex-col gap-2">
        {siteConfig.nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="border-b border-border py-4 text-[clamp(2rem,10vw,3rem)] font-medium leading-none text-foreground"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {siteConfig.availability}
      </p>
    </div>
  );
}
