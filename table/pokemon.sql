CREATE TABLE `pokemons` (
  id INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `altura` INT DEFAULT NULL,
  `peso` INT DEFAULT NULL,
  `base_experience` INT DEFAULT NULL,
  `imagem` TEXT,
  `imagem_costas` TEXT,
  `imagem_shiny` TEXT,
  `tipos` TEXT,
  `habilidades` TEXT,
  `stats` TEXT,
  `som` TEXT
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_0900_ai_ci;
