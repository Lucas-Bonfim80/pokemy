from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Pokemon(Base):
    __tablename__ = "pokemon"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    imagem = Column(String(255))
    imagem_costas = Column(String(255))
    tamanho = Column(Integer)
    altura = Column(Integer)
    tipos = Column(JSON)