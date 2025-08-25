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

      // Adicione estas cores do AlertBox
      alertYellowBg: string;
      alertYellowText: string;
      alertBlueBg: string;
      alertBlueText: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
    };
    space: (n: number) => string;
  }
}
