/// <reference types="vite/client" />
declare module 'client' {
  interface Client {
    content: string; // ✅ só aqui, ou só no outro lugar
  }
}
