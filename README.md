# Raízes do Nordeste

Aplicação front-end para a **Rede Raízes do Nordeste** — sistema de pedidos online para lanchonetes, desenvolvido como trabalho acadêmico.

## Demo

| Item | Valor |
|------|-------|
| Login demo | `maria@email.com` / `123456` |
| Cupons teste | `BEMVINDO`, `TAPIOCA15`, `FAMILIA20` |
| Pagamento recusado | Cartão terminado em **0** |
| Erro simulado | Adicionar `?simulateError=true` na URL |

## Stack

- React 18 + TypeScript
- Vite + React Router v6
- CSS Modules + variáveis CSS globais
- Context API + localStorage (mock)

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Verificação ESLint |

## Estrutura de pastas

```
src/
├── assets/          # Imagens e ícones
├── components/
│   ├── ui/          # Componentes base reutilizáveis
│   ├── domain/      # Componentes de negócio
│   └── layout/      # Navbar, Footer, etc.
├── contexts/        # Estado global (Context API)
├── data/            # Mock data
├── hooks/           # Custom hooks
├── interfaces/      # Contratos entre camadas
├── layouts/         # Layouts de página
├── pages/           # Telas/rotas
├── routes/          # Configuração de rotas
├── services/        # Lógica de negócio simulada
├── styles/          # CSS global, variáveis, reset
├── types/           # Tipos TypeScript
└── utils/           # Funções utilitárias
```

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [01-arquitetura.md](docs/01-arquitetura.md) | Decisões técnicas e diagramas |
| [02-estrutura-pastas.md](docs/02-estrutura-pastas.md) | Organização do projeto |
| [03-documentacao-academica.md](docs/03-documentacao-academica.md) | Documento completo para PDF |

Para gerar PDF: abra `docs/03-documentacao-academica.md` no VS Code/Cursor e exporte via extensão "Markdown PDF", ou use [md-to-pdf](https://www.npmjs.com/package/md-to-pdf).

## Licença

Projeto acadêmico — uso educacional.
