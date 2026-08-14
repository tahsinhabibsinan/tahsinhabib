"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Subtle custom cursor for desktop pointer devices only. Automatically
 * disabled on touch devices and never becomes the only way to interact —
 * every hover state it augments has a keyboard/touch equivalent.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [variant, setVariant] = useState<"default" | "interactive" | "view" | "visit" | "email">(
    "default"
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-active");

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let raf: number;

    function move(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    }

    function render() {
      if (dot) dot.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      raf = requestAnimationFrame(render);
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) {
        setVariant("view");
      } else if (target.closest("[data-cursor='visit']")) {
        setVariant("visit");
      } else if (target.closest("[data-cursor='email']")) {
        setVariant("email");
      } else if (target.closest("a, button, [role='button']")) {
        setVariant("interactive");
      } else {
        setVariant("default");
      }
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full border border-[var(--color-fg)] mix-blend-difference transition-[width,height] duration-200 ease-out"
      style={{
        width: variant === "default" ? 10 : variant === "interactive" ? 44 : 64,
        height: variant === "default" ? 10 : variant === "interactive" ? 44 : 64,
        marginLeft: variant === "default" ? 7 : variant === "interactive" ? -10 : -20,
        marginTop: variant === "default" ? 7 : variant === "interactive" ? -10 : -20,
        background: variant === "default" ? "var(--color-fg)" : "transparent",
      }}
    >
      {variant === "view" && (
        <span className="text-[10px] font-medium tracking-wider text-[var(--color-fg)]">
          VIEW ↗
        </span>
      )}
      {variant === "visit" && (
        <span className="text-[10px] font-medium tracking-wider text-[var(--color-fg)]">
          VISIT ↗
        </span>
      )}
      {variant === "email" && (
        <span className="text-[10px] font-medium tracking-wider text-[var(--color-fg)]">
          EMAIL
        </span>
      )}
    </div>
  );
}
