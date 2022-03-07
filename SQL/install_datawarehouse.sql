-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema datawarehouse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema datawarehouse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `datawarehouse` ;
-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `datawarehouse` ;

-- -----------------------------------------------------
-- Table `datawarehouse`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(200) NULL,
  `password` VARCHAR(45) NULL,
  `profile` VARCHAR(1) NULL COMMENT 'A - Admin\nU - User\n',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`regions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`countries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `region_id` INT NOT NULL,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_countries_regions1_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_countries_regions1`
    FOREIGN KEY (`region_id`)
    REFERENCES `datawarehouse`.`regions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` INT NOT NULL,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cities_countries1_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_cities_countries1`
    FOREIGN KEY (`country_id`)
    REFERENCES `datawarehouse`.`countries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_companies_cities1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_companies_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `datawarehouse`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `job_title` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `company_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `interest` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contacs_companies1_idx` (`company_id` ASC) VISIBLE,
  INDEX `fk_contacs_cities1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_contacs_companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `datawarehouse`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacs_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `datawarehouse`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datawarehouse`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`channels` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'canales disponibles.';


-- -----------------------------------------------------
-- Table `datawarehouse`.`contact_channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawarehouse`.`contact_channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contacs_id` INT NOT NULL,
  `channels_id` INT NOT NULL,
  `account` VARCHAR(200) NULL,
  `preference` ENUM('0', '1', '2') NULL COMMENT '0 - no molestar\n1 - sin preferencia\n2 - favorito \n',
  PRIMARY KEY (`id`),
  INDEX `fk_contact_channels_contacs1_idx` (`contacs_id` ASC) VISIBLE,
  INDEX `fk_contact_channels_channels1_idx` (`channels_id` ASC) VISIBLE,
  CONSTRAINT `fk_contact_channels_contacs1`
    FOREIGN KEY (`contacs_id`)
    REFERENCES `datawarehouse`.`contacts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contact_channels_channels1`
    FOREIGN KEY (`channels_id`)
    REFERENCES `datawarehouse`.`channels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `delilah` ;

-- -----------------------------------------------------
-- Table `delilah`.`platos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`platos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `shortname` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `photo` VARCHAR(45) NULL DEFAULT NULL,
  `available` INT NULL DEFAULT NULL COMMENT '1 - yes\\n0 - no\\n',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  `completeName` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `adress` VARCHAR(45) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT 'C',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usuario_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`favoritos` (
  `usuario_id` INT NOT NULL,
  `plato_id` INT NOT NULL,
  INDEX `fk_favoritos_usuarios_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_favoritos_platos1_idx` (`plato_id` ASC) VISIBLE,
  CONSTRAINT `fk_favoritos_platos1`
    FOREIGN KEY (`plato_id`)
    REFERENCES `delilah`.`platos` (`id`),
  CONSTRAINT `fk_favoritos_usuarios`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `delilah`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `payment` VARCHAR(45) NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `status` VARCHAR(40) NULL DEFAULT NULL COMMENT 'borrador\\npagado / confirmado\\nen preparacion\\npreparado\\nen camino\\nentregado\\n',
  `adress` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_usuarios1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `delilah`.`usuarios` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `plato_id` INT NOT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `item_price` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_pedidos1_idx` (`pedido_id` ASC) VISIBLE,
  INDEX `fk_items_platos1_idx` (`plato_id` ASC) VISIBLE,
  CONSTRAINT `fk_items_pedidos1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `delilah`.`pedidos` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_items_platos1`
    FOREIGN KEY (`plato_id`)
    REFERENCES `delilah`.`platos` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
