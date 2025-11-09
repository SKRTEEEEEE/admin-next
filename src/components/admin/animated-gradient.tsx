"use client";

import { useEffect, useMemo, useState } from "react";
import { gradients } from "@/lib/utils";

const REFRESH_INTERVAL = 6000;

export function AnimatedGradientBackground() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * gradients.length));

  const gradient = useMemo(() => gradients[index] ?? gradients[0], [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % gradients.length);
    }, REFRESH_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="admin-gradient pointer-events-none absolute inset-0 -z-10 opacity-80 blur-3xl transition-[background-image] duration-1000"
      style={{ backgroundImage: gradient }}
    />
  );
}
