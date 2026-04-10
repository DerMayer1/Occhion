<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<<<<<<< HEAD
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8b635416-3c39-49a6-a012-e059309b7b96

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======
# Ótica Premium

Vitrine institucional e comercial para ótica premium, construída com React, Vite, TypeScript e Tailwind CSS.

## Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- React Router

## Estrutura

- `src/components/layout`: layout global, navegação e rodapé
- `src/components/product`: componentes de catálogo
- `src/components/ui`: componentes visuais reutilizáveis
- `src/config`: rotas e dados institucionais compartilhados
- `src/data`: dados do catálogo
- `src/lib`: utilitários
- `src/pages`: páginas da aplicação
- `src/types`: tipagens do domínio

## Como rodar localmente

**Pré-requisito:** Node.js

1. Instale as dependências:
   `npm install`
2. Inicie o ambiente de desenvolvimento:
   `npm run dev`
3. Gere a versão de produção:
   `npm run build`

## Observações

- O catálogo atual é estático e usa dados mockados em `src/data/products.ts`.
- Formulário de contato, newsletter, busca e carrinho permanecem como interface visual, sem integração de backend.
>>>>>>> edacafd (feat: initial Occhion site (clean structure + catalog))
