# Dashboard Frontend - Sistema de Gerenciamento de Vendas

Frontend desenvolvido com React para gerenciamento de vendas, clientes, produtos e usuários consumindo uma API Laravel REST.

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React.js
- JavaScript
- Vite
- React Router DOM
- Axios
- Context API

## Estilização

- Tailwind CSS
- Flexbox
- Grid Layout

## Integrações

- API REST Laravel
- Autenticação com Sanctum

---

# 📋 Funcionalidades

## 🔐 Autenticação

- Login de usuários
- Persistência de autenticação
- Rotas privadas
- Controle de acesso

## 📊 Dashboard

- Resumo de vendas
- Cards informativos
- Estatísticas do sistema
- Visualização rápida de dados

## 📦 Produtos

- Cadastro de produtos
- Atualização de produtos
- Exclusão de produtos
- Listagem de produtos

## 🛒 Vendas

- Criação de vendas
- Atualização de vendas
- Exclusão de vendas
- Associação de produtos
- Cálculo automático de valores

---

# 🏗️ Estrutura do Projeto

```bash
src/
 ├── assets/
 │
 ├── components/
 │    ├── Sidebar/
 │    ├── Header/
 │    ├── Cards/
 │    ├── Modal/
 │    ├── Table/
 │
 ├── contexts/
 │
 ├── hooks/
 │
 ├── layouts/
 │
 ├── pages/
 │    ├── Dashboard/
 │    ├── Login/
 │    ├── Products/
 │    ├── Customers/
 │    ├── Sales/
 │
 ├── routes/
 │
 ├── services/
 │    ├── api.js
 │
 ├── styles/
 │
 ├── App.jsx
 ├── main.jsx
```

---

# ⚙️ Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/BarceloDev/commercium-web-app
```

---

## 2. Acesse a pasta do projeto

```bash
cd nome-do-frontend
```

---

## 3. Instale as dependências

```bash
npm install
```

---

# 🔧 Configuração

## Configure a URL da API

Crie um arquivo `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

# ▶️ Executando o Projeto

```bash
npm run dev
```

Servidor disponível em:

```bash
http://localhost:5173
```

---

# 🔌 Integração com API

## Exemplo de configuração Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

---

# 🔐 Sistema de Autenticação

## Fluxo de autenticação

- Usuário realiza login
- Backend retorna token
- Token é armazenado localmente
- Rotas privadas verificam autenticação
- Requisições autenticadas utilizam Bearer Token

---

# 📊 Dashboard

## Recursos

- Quantidade de vendas
- Total faturado
- Quantidade de clientes
- Quantidade de produtos
- Gráficos e estatísticas

---

# 🧠 Conceitos Aplicados

- Componentização
- React Hooks
- Context API
- Gerenciamento de estado
- Consumo de APIs REST
- Rotas privadas
- Organização escalável
- Reutilização de componentes
- Comunicação frontend/backend

---

# 📱 Responsividade

O sistema possui layout responsivo adaptado para:

- Desktop
- Mobile

---

# 🎨 Interface

## Componentes reutilizáveis

- Navbar
- Cards
- Botões

---

# 📈 Melhorias Futuras

- Dark mode
- Dashboard avançado
- Upload de imagens
- Filtros avançados
- Paginação
- Exportação PDF
- Notificações em tempo real
- WebSockets
- Testes automatizados

---

# 🧪 Scripts Disponíveis

## Rodar projeto

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Preview da build

```bash
npm run preview
```

---

# 👨‍💻 Autor

Desenvolvido por Barcelo.

- GitHub: https://github.com/BarceloDev
- LinkedIn: https://www.linkedin.com/in/guilherme-barcelo
