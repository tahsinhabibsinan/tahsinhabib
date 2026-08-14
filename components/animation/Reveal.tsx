"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Fades and lifts content into view as it enters the viewport.
 * transform + opacity only, GPU-friendly, no layout shift.
 * Renders content statically (no animation) under reduced motion.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced, delay, y]);

  const Component = as as React.ElementType;

  return (
    <Component ref={ref} className={className} style={reduced ? undefined : { opacity: 0 }}>
      {children}
    </Component>
  );
}
