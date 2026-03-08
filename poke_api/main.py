from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
from schemas import Pokemon
import httpx
import asyncio
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/pokes"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pokemon/buscar-e-salvar/{nome}")
def buscar_e_salvar_pokemon(nome: str):

    url = f"https://pokeapi.co/api/v2/pokemon/{nome}"
    response = requests.get(url)

    if response.status_code != 200:
        return {"erro": "Pokemon não encontrado"}

    data = response.json()

    pokemon_data = {
        "nome": data["name"],
        "imagem": data["sprites"]["front_default"],
        "imagem_costas": data["sprites"]["back_default"],
        "tamanho": data["weight"],
        "altura": data["height"],
        "tipos": [t["type"]["name"] for t in data["types"]]
    }
    

    db = SessionLocal()

    pokemon_existente = db.query(Pokemon).filter(Pokemon.nome == pokemon_data["nome"]).first()

    if pokemon_existente:
        db.close()
        return {
            "mensagem": "Pokemon já estava salvo",
            "pokemon": pokemon_data
        }

    novo = Pokemon(**pokemon_data)

    db.add(novo)
    db.commit()
    db.refresh(novo)

    db.close()

    return {
        "mensagem": "Pokemon salvo com sucesso",
        "pokemon": pokemon_data
    }

@app.get("/pokemons")
def listar_pokemons():
    db = SessionLocal()
    pokemons = db.query(Pokemon).all()
    return pokemons

@app.delete("/pokemon/{nome}")
def deletar_pokemon(nome: str):

    db = SessionLocal()

    pokemon = db.query(Pokemon).filter(Pokemon.nome == nome).first()

    if not pokemon:
        db.close()
        return {"erro": "Pokemon não encontrado"}

    db.delete(pokemon)
    db.commit()
    db.close()

    return {"mensagem": f"{nome} deletado com sucesso"}


@app.get("/pokemon/buscar-todos")
async def buscar_todos_pokemons():

    async with httpx.AsyncClient() as client:

        lista = await client.get("https://pokeapi.co/api/v2/pokemon?limit=151")
        data = lista.json()

        urls = [p["url"] for p in data["results"]]

        async def pegar_detalhe(url):
            r = await client.get(url)
            detalhe = r.json()

            return {
                "nome": detalhe["name"],
                "imagem": detalhe["sprites"]["front_default"],
                "imagem_costas": detalhe["sprites"]["back_default"],
                "tamanho": detalhe["weight"],
                "altura": detalhe["height"],
                "tipos": [t["type"]["name"] for t in detalhe["types"]]
            }

        tarefas = [pegar_detalhe(url) for url in urls]

        pokemons = await asyncio.gather(*tarefas)

        return {
            "total": len(pokemons),
            "pokemons": pokemons
        }