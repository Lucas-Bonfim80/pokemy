from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio
from schemas import Pokemon

from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/pokes"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

app = FastAPI()

Base.metadata.create_all(engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
        "id": data["id"],
        "nome": data["name"],
        "imagem": data["sprites"]["front_default"],
        "imagem_costas": data["sprites"]["back_default"],
        "imagem_shiny": data["sprites"]["front_shiny"],
        "altura": data["height"],
        "peso": data["weight"],
        "base_experience": data["base_experience"],
        "tipos": [t["type"]["name"] for t in data["types"]],
        "habilidades": data["abilities"],
        "stats": data["stats"],
        "som": data["cries"]["latest"] if "cries" in data else None
    }

    db = SessionLocal()

    try:
        pokemon_existente = db.query(Pokemon).filter(Pokemon.nome == pokemon_data["nome"]).first()

        if pokemon_existente:
            return {
                "mensagem": "Pokemon já estava salvo",
                "pokemon": pokemon_data
            }

        novo = Pokemon(**pokemon_data)

        db.add(novo)
        db.commit()
        db.refresh(novo)

        return {
            "mensagem": "Pokemon salvo com sucesso",
            "pokemon": pokemon_data
        }

    finally:
        db.close()


@app.get("/pokemons")
def listar_pokemons():

    db = SessionLocal()

    try:
        pokemons = db.query(Pokemon).all()
        return pokemons

    finally:
        db.close()


@app.delete("/pokemon/{nome}")
def deletar_pokemon(nome: str):

    db = SessionLocal()

    try:
        pokemon = db.query(Pokemon).filter(Pokemon.nome == nome).first()

        if not pokemon:
            return {"erro": "Pokemon não encontrado"}

        db.delete(pokemon)
        db.commit()

        return {"mensagem": f"{nome} deletado com sucesso"}

    finally:
        db.close()


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
                "peso": detalhe["weight"],
                "altura": detalhe["height"],
                "tipos": [t["type"]["name"] for t in detalhe["types"]]
            }

        tarefas = [pegar_detalhe(url) for url in urls]

        pokemons = await asyncio.gather(*tarefas)

        return {
            "total": len(pokemons),
            "pokemons": pokemons
        }