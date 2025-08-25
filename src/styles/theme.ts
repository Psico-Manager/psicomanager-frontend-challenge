import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    bg: "#F6F7F9",
    surface: "#FFFFFF",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
    primary: "#334094",
    primaryHover: "#4338CA",
    danger: "#DC2626",
    successBg: "#ECFDF5",
    successText: "#065F46",
    overlay: "rgba(0,0,0,.45)",
    sidebarBg: "#0F172A",
    sidebarText: "#25272aff",
    sidebarMuted: "#94A3B8",
    stepBg: "#EEF2FF",

    // Cores do AlertBox
    alertYellowBg: "#FFFAD6",
    alertYellowText: " #CCB400",

    alertBlueBg: "#ECF5FE",
    alertBlueText: "#2196F3",
  },
  radii: { sm: "8px", md: "10px", lg: "16px" },
  space: (n: number) => `${n * 4}px`,
} as const;
