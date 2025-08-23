import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html,body,#root { height:100%; }
  body {
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: ${({theme})=> theme.colors.bg};
    color: ${({theme})=> theme.colors.text};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; }
  input, select, textarea { font: inherit; }
  ::selection { background: rgba(79,70,229,.15); }
  .ql-toolbar.ql-snow { border-radius: ${({theme})=> theme.radii.md} ${({theme})=> theme.radii.md} 0 0; }
  .ql-container.ql-snow { border-radius: 0 0 ${({theme})=> theme.radii.md} ${({theme})=> theme.radii.md}; min-height: 150px; }
`
