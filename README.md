# 🚀 API REST para Controle de Transações Financeiras

> Projeto desenvolvido durante a **Pós Tech Developer 360** da **Faculdade de Tecnologia da RocketSeat**

Uma API REST robusta para gerenciamento de transações financeiras, desenvolvida com Node.js, TypeScript e Fastify. O sistema permite aos usuários criar, listar e acompanhar suas transações de crédito e débito de forma segura e eficiente.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Endpoints da API](#-endpoints-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Regras de Negócio](#-regras-de-negócio)
- [Contribuição](#-contribuição)

## ✨ Funcionalidades

### Requisitos Funcionais (RF)

- ✅ **Criar transações**: Permite ao usuário criar novas transações financeiras
- ✅ **Resumo da conta**: Visualizar o saldo total das transações
- ✅ **Listar transações**: Visualizar todas as transações do usuário
- ✅ **Transação específica**: Buscar uma transação por ID

### Características Principais

- 🔐 **Autenticação por cookies**: Sistema de sessão baseado em cookies HTTP
- 💰 **Transações de crédito e débito**: Suporte completo a entradas e saídas
- 🏦 **Banco de dados SQLite**: Armazenamento local eficiente
- 🔍 **Validação de dados**: Validação rigorosa com Zod
- 🚀 **Performance**: Construído com Fastify para alta performance
- 📊 **Migrações**: Controle de versão do banco de dados

## 🛠 Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Fastify](https://www.fastify.io/)** - Framework web de alta performance

### Banco de Dados

- **[SQLite](https://www.sqlite.org/)** - Banco de dados SQL leve
- **[Knex.js](https://knexjs.org/)** - Query builder SQL

### Validação e Utilitários

- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript
- **[Dotenv](https://github.com/motdotla/dotenv)** - Gerenciamento de variáveis de ambiente

### Desenvolvimento

- **[TSX](https://github.com/esbuild-kit/tsx)** - Execução TypeScript em tempo real
- **[ESLint](https://eslint.org/)** - Linting de código

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

```
src/
├── @types/          # Definições de tipos TypeScript
├── env/             # Configuração de ambiente e documentação
├── middlewares/     # Middlewares da aplicação
├── routes/          # Definição das rotas da API
├── database.ts      # Configuração do banco de dados
└── server.ts        # Servidor principal
```

### Padrões Utilizados

- **Repository Pattern**: Abstração do acesso aos dados
- **Middleware Pattern**: Interceptação e processamento de requisições
- **Schema Validation**: Validação de entrada de dados
- **Cookie-based Sessions**: Gerenciamento de sessão sem estado

## 🚀 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/joaooliveira10/02-api-rest-nodejs
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

4. **Execute as migrações do banco**

```bash
npm run knex migrate:latest
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
DATABASE_URL=./db/app.db
PORT=3333
```

### Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
npm run dev

# Executar comandos Knex
npm run knex

# Linting do código
npm run lint
```

## 📖 Uso

### Fluxo Básico

1. **Criar uma transação** - POST `/transactions`
2. **Listar transações** - GET `/transactions`
3. **Ver resumo** - GET `/transactions/summary`
4. **Buscar transação específica** - GET `/transactions/:id`

### Exemplo de Transação

```json
{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

## 🌐 Endpoints da API

### Base URL

```
http://localhost:3333
```

### Transações

#### Criar Transação

```http
POST /transactions
Content-Type: application/json

{
  "title": "Freelance projeto X",
  "amount": 1500,
  "type": "credit"
}
```

**Resposta**: `201 Created`

#### Listar Transações

```http
GET /transactions
Cookie: sessionId=<session-id>
```

**Resposta**:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Freelance projeto X",
      "amount": 1500,
      "created_at": "2024-01-15T10:30:00Z",
      "session_id": "uuid"
    }
  ]
}
```

#### Buscar Transação por ID

```http
GET /transactions/:id
Cookie: sessionId=<session-id>
```

#### Resumo da Conta

```http
GET /transactions/summary
Cookie: sessionId=<session-id>
```

**Resposta**:

```json
{
  "summary": {
    "amount": 3500
  }
}
```

## 📁 Estrutura do Projeto

```
02-api-rest-nodejs/
├── db/
│   ├── app.db                 # Banco SQLite
│   └── migrations/            # Migrações do banco
├── src/
│   ├── @types/
│   │   └── knex.d.ts         # Tipos do Knex
│   ├── env/
│   │   ├── index.ts          # Configuração ambiente
│   │   └── Regras&Requisitos.md
│   ├── middlewares/
│   │   └── check-session-id-exist.ts
│   ├── routes/
│   │   └── transactions.ts    # Rotas das transações
│   ├── database.ts           # Configuração banco
│   └── server.ts             # Servidor principal
├── knexfile.ts               # Configuração Knex
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 Regras de Negócio

### Transações

- **Tipos**: `credit` (crédito) ou `debit` (débito)
- **Crédito**: Valor positivo, soma ao total
- **Débito**: Valor negativo, subtrai do total
- **Identificação**: Cada usuário possui um `session_id` único
- **Isolamento**: Usuários só visualizam suas próprias transações

### Sessões

- **Cookies**: Sessão gerenciada via cookies HTTP
- **Duração**: 7 dias de validade
- **Criação**: Automática na primeira transação
- **Segurança**: Middleware de verificação obrigatório

### Requisitos Não Funcionais

- ⚡ **Performance**: Suporte a 1000 transações/segundo
- 🕐 **Resposta**: Criação de transação < 1 segundo
- 🔒 **Segurança**: Isolamento de dados por usuário

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como parte do curso **Pós Tech Developer 360** da **Faculdade de Tecnologia da RocketSeat**.

---

<div align="center">
  <strong>Desenvolvido com ❤️ durante a Pós Tech Developer 360</strong>
  <br>
  <img src="https://img.shields.io/badge/RocketSeat-Education-8257E6" alt="RocketSeat">
</div>
