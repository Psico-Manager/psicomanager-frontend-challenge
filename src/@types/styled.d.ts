import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // Cores base
      text: string;
      surface: string;
      bg: string;
      muted: string;
      overlay: string;
      border: string;

      // Cores da marca
      primary: string;
      primaryHover: string;
      danger: string;
      
      // Cores dos alertas
      alertBlueBg: string;
      alertBlueText: string;
      alertYellowBg: string;
      alertYellowText: string;

      // Cores de status
      successBg: string;
      successText: string;

      // Cores da sidebar
      sidebarMuted: string;
      sidebarText: string;
      sidebarBg: string;

      // Cores específicas de componentes
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
