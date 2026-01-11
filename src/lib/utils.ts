import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// 🧠 Hay que oscurecer el lila claro 
function cyberpunkGradients() {
  // Paleta original con ajustes en verdes y negros para toque lila/rosa cyberpunk
  const cyberpunkColors: [string, string][] = [
    ["#aa367c", "#4a2fbd"], // rosa a azul
    ["#e100ff", "#7f00ff"], // fucsia a violeta neón
    ["#ff2079", "#430089"], // rosa neón a púrpura oscuro
    // verdes con toque lila: mezclamos verde con lila usando rgba con transparencia para matiz
    ["#e100ff", "rgba(8, 50, 60, 0.7)"], // verde con alpha y rosa base
    ["#aa367c", "rgba(14, 23, 38, 0.5)"], // verde muy oscuro + rosa base
    // negros con toque lila
    ["#aa367c", "rgba(26, 26, 46, 0.9)"], // negro azulado fuerte con rosa lila base
    ["#aa367c", "rgba(22, 33, 62, 0.7)"],
    ["#aa367c", "rgba(14, 8, 33, 0.5)"],
    ["#ff2079", "rgba(44, 37, 74, 0.7)"], // negro violeta con rosa base
  ];

  const angles = [85, 90.21, 95];
  const fromAlphas = [0.5, 0.7, 0.9];
  const toAlphas = [0.5, 0.7, 0.9];

  const gradients: string[] = [];
  cyberpunkColors.forEach(([from, to]) => {
    angles.forEach((angle) => {
      fromAlphas.forEach((fromAlpha) => {
        toAlphas.forEach((toAlpha) => {
          gradients.push(
            `linear-gradient(${angle}deg, ${hexToRgba(from, fromAlpha)} -5.91%, ${hexToRgba(to, toAlpha)} 111.58%)`
          );
        });
      });
    });
  });

  return gradients;
}

export function hexToRgba(hex: string, alpha: number) {
  if (hex.startsWith('rgba')) return hex;
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
  const num = parseInt(hex, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export const gradients = cyberpunkGradients();
