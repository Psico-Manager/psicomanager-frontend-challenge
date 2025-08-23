// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      surface: string;
      text: string;
      muted: string;
      border: string;
      primary: string;
      primaryHover: string;
      danger: string;
      successBg: string;
      successText: string;
      overlay: string;
      sidebarBg: string;
      sidebarText: string;
      sidebarMuted: string;
      stepBg: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
    };
    space: (n: number) => string;
  }
}
