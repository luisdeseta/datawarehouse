-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: datawarehouse
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channels` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='canales disponibles.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels`
--

LOCK TABLES `channels` WRITE;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cities_countries1_idx` (`country_id`),
  CONSTRAINT `fk_cities_countries1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_companies_cities1_idx` (`city_id`),
  CONSTRAINT `fk_companies_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_channels`
--

DROP TABLE IF EXISTS `contact_channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_channels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contacs_id` int NOT NULL,
  `channels_id` int NOT NULL,
  `account` varchar(200) DEFAULT NULL,
  `preference` enum('0','1','2') DEFAULT NULL COMMENT '0 - no molestar\n1 - sin preferencia\n2 - favorito \n',
  PRIMARY KEY (`id`),
  KEY `fk_contact_channels_contacs1_idx` (`contacs_id`),
  KEY `fk_contact_channels_channels1_idx` (`channels_id`),
  CONSTRAINT `fk_contact_channels_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`),
  CONSTRAINT `fk_contact_channels_contacs1` FOREIGN KEY (`contacs_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_channels`
--

LOCK TABLES `contact_channels` WRITE;
/*!40000 ALTER TABLE `contact_channels` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `job_title` varchar(45) NOT NULL,
  `email` varchar(200) NOT NULL,
  `company_id` int NOT NULL,
  `city_id` int NOT NULL,
  `address` varchar(200) NOT NULL,
  `interest` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacs_companies1_idx` (`company_id`),
  KEY `fk_contacs_cities1_idx` (`city_id`),
  CONSTRAINT `fk_contacs_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `fk_contacs_companies1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_countries_regions1_idx` (`region_id`),
  CONSTRAINT `fk_countries_regions1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (10,'Norteamerica');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profile` varchar(1) DEFAULT NULL COMMENT 'A - Admin\nU - User\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@email.com.ar','$2b$10$vH.wJZptwK2GZ.TEiZI.OuXtTxzmocO/3qaoyCWZKJCzyzBy6rcia','A'),(3,'Luis','De Seta','luis.deseta@gmail.com','123','U'),(4,'roberto','roberto','luis@gmail.com','$2b$10$Y9fjPbXTmSLe3HgyI9Pit.mv6pjj7lrmsDkpBsUHd83/YqyeLY9Ma','U'),(5,'Luis','De Seta','luisz@gmail.com','$2b$10$64YVzZ1n4HhWg2WHgZT38OllKvLSEttoBGKMfE7Owhi/rVt4wMsAG','U'),(7,'cacho','cacho','cacho@gmail.com','$2b$10$HAZiCRnqdtkj.FUrQsRCPOLovQnOB1Nlgv1OE4YrpHKp2MCUBUPde','U'),(17,'q','q','admin@acamica.com','$2b$10$nX7lVAitMjuvKuzbibd6PuvfV.MUKouV5FfX7XMS7RZDay2aDED..','u'),(18,'cacho2','cacho','cacho11@gmail.com','$2b$10$OCJ9emabqEranhFjRkIunO/7gxQPReqYJZLvDodBVFHMyUONPL8.i','U'),(19,'aa','aa','robertoaa@acamica.com','$2b$10$yKOYWh./MZwPodFdpoTLCu62DFSn5sNZQDDcoP25JihV/3KAQFPbe','A'),(20,'cacho2','cacho','cacho11@gmail.com','$2b$10$QX.xRN8cDfhGprZp.2k1y.lb/ltpWVzvlXIRzUVDlnnnMybXLajoC','U'),(21,'qq','qq','roberto@acamica.com','$2b$10$mSb6yoENKfpU0fVZXmtEweFKbXG6yQhstngJU7K/6VCax6NZTgHQe','A'),(22,'cacho2','cacho','cacho11@gmail.com','$2b$10$sxc2Uv84pc7zENAGYNpdJ.sv6T9WEY29LPnHF1iLK0RXr0HsryU8S','U'),(23,'cacho2','cacho','cacho11@gmail.com','$2b$10$zIbUQE1IVzgGZACFzD5NJermV947riHzCTMuokkEyVv9Fcxq7iTvW','U'),(24,'cacho2','cacho','cacho11@gmail.com','$2b$10$fge0dGe46Vh6ZwI/QbAPNuN56A597VqFUIKtkoUJQpWGis6anDhHa','U'),(25,'cacho2','cacho','cacho11@gmail.com','$2b$10$mJbe61aWIoVodfPHVFLe0uaykcJeQoYCRCDC2HyWxcL1/tZgynJJa','U');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'datawarehouse'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-14 15:31:02
