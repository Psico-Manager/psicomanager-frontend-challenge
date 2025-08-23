# PsicoBank • Final (Figma-aligned, Clean Code)

Este projeto é uma implementação do desafio do PsicoBank seguindo o protótipo Figma.
Stack:
- React + TypeScript
- Styled-Components
- React-Hook-Form + Zod
- React-Quill
- Mobile-first e responsivo

Funcionalidades principais:
- Sidebar fixa (Financeiro ativo)
- Modal wizard com 3 passos (conta, canais/mensagem, forma de pagamento)
- Validação em tempo real com Zod
- Máscaras para CPF/CNPJ/Telefone/CEP
- Persistência de dados entre passos (estado local)
- Flag de sucesso e console.log do payload final

Como rodar:
1. `npm install`
2. `npm run dev`

Observações:
- Este projeto prioriza clean code e componentes reutilizáveis.
- Para ficar 100% pixel-perfect com o Figma, ajustar tokens no arquivo `src/styles/theme.ts`.
