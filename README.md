# 🧢 Pokédex Web

Uma aplicação web que permite **buscar Pokémons, visualizar suas informações e salvá-los em um banco de dados**.

O projeto consome dados da PokéAPI e armazena os Pokémons favoritos no banco de dados.

---

# 🚀 Tecnologias utilizadas

### Frontend

* React
* Vite
* CSS

### Backend

* FastAPI
* SQLAlchemy
* Requests

### Banco de dados

* MySQL

### API externa

* PokéAPI

---

# 📸 Funcionalidades

✅ Buscar Pokémon pelo nome
✅ Exibir imagem, tipos, altura e peso
✅ Salvar Pokémon no banco de dados
✅ Evitar Pokémon duplicados
✅ Listar Pokémons salvos
✅ Layout em cards responsivos

---

# 📂 Estrutura do Projeto

```
pokedex-project
│
├── backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   └── Salvos.jsx
│   │   ├── components
│   │   │   └── Header.jsx
│   │   ├── assets
│   │   └── index.css
│
└── README.md
```

---

# 🔎 Endpoints da API

### Buscar e salvar Pokémon

```
POST /pokemon/buscar-e-salvar/{nome}
```

Busca o Pokémon na PokéAPI e salva no banco caso ele ainda não exista.

---

### Listar Pokémons salvos

```
GET /pokemon/salvos
```

Retorna todos os Pokémons armazenados no banco.

---

### Deletar Pokémon

```
DELETE /pokemon/{nome}
```

Remove um Pokémon salvo do banco de dados.

---

# ⚙️ Como executar o projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-usuario/pokedex.git
```

---

## 2️⃣ Rodar o Backend

Instale as dependências:

```
pip install fastapi uvicorn sqlalchemy mysql-connector-python requests
```

Inicie o servidor:

```
uvicorn main:app --reload
```

A API estará disponível em:

```
http://127.0.0.1:8000
```

Documentação automática:

```
http://127.0.0.1:8000/docs
```

---

## 3️⃣ Rodar o Frontend

Entre na pasta do frontend:

```
cd frontend
```

Instale as dependências:

```
npm install
```

Inicie o projeto:

```
npm run dev
```

A aplicação ficará d
