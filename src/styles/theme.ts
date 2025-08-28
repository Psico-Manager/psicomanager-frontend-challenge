import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    overlay: "rgba(0,0,0,.45)",
    sidebarBg: "#0F172A",
    sidebarText: "#25272aff",
    sidebarMuted: "#94A3B8",
    stepBg: "#EEF2FF",
    bg: "#F6F7F9",
    surface: "#FFFFFF",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
    primary: "#334094",
    primaryHover: "#00127A",
    danger: "#DC2626",
    successBg: "#ECFDF5",
    successText: "#065F46",
    alertBlueBg: "#ECF5FE",
    alertBlueText: "#2196F3",
    alertYellowBg: "#FFFAD6",
    alertYellowText: "#CCB400",
  },

  radii: {
    lg: "16px",
    md: "10px",
    sm: "8px",
  },

  space: (n: number) => `${n * 4}px`,
} as const;
