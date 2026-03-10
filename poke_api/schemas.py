from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100))
    altura = Column(Integer)
    peso = Column(Integer)
    base_experience = Column(Integer)

    imagem = Column(String(255))
    imagem_costas = Column(String(255))
    imagem_shiny = Column(String(255))

    tipos = Column(JSON)
    habilidades = Column(JSON)
    stats = Column(JSON)

    som = Column(String(255))