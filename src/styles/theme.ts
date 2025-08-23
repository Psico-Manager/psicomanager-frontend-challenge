import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    bg: "#F6F7F9",
    surface: "#FFFFFF",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
    primary: "#4F46E5",
    primaryHover: "#4338CA",
    danger: "#DC2626",
    successBg: "#ECFDF5",
    successText: "#065F46",
    overlay: "rgba(0,0,0,.45)",
    sidebarBg: "#0F172A",
    sidebarText: "#E5E7EB",
    sidebarMuted: "#94A3B8",
    stepBg: "#EEF2FF",
  },
  radii: { sm: "8px", md: "10px", lg: "16px" },
  space: (n: number) => `${n * 4}px`,
} as const;
