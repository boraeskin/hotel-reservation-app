CREATE DATABASE  IF NOT EXISTS `hotel_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hotel_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,3,2,'2025-12-24','2025-12-27',285.00),(2,3,1,'2025-12-24','2025-12-26',300.00),(3,8,6,'2025-12-24','2025-12-28',880.00),(4,7,4,'2025-12-24','2025-12-28',1200.00),(5,7,3,'2025-12-24','2025-12-28',480.00),(6,7,12,'2025-12-26','2025-12-30',1120.00),(8,5,1,'2025-12-31','2026-01-09',1350.00),(9,5,3,'2026-01-01','2026-01-15',1680.00),(11,11,2,'2025-12-31','2026-01-06',600.00),(12,11,4,'2025-12-31','2026-01-07',2100.00),(13,11,11,'2025-12-31','2026-01-01',350.00),(15,9,11,'2025-12-29','2025-12-30',360.00),(16,12,14,'2026-01-01','2026-01-10',9000.00),(17,13,6,'2026-01-05','2026-01-15',2200.00);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateEntered` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `names`
--

LOCK TABLES `names` WRITE;
/*!40000 ALTER TABLE `names` DISABLE KEYS */;
/*!40000 ALTER TABLE `names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_number` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,101,'Deluxe',150.00,'available','https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'),(2,102,'Single Room',100.00,'available','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdXJLfktZCpCbaENaOm-PKZOgQq_cZAPVlw&s'),(3,103,'Double Room',120.00,'available','https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600'),(4,104,'Roof Room',300.00,'available','https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=600'),(5,105,'Superior Room',180.00,'available','https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=600'),(6,201,'Executive Room',220.00,'available','https://images.pexels.com/photos/271625/pexels-photo-271625.jpeg?auto=compress&cs=tinysrgb&w=600'),(7,202,'Family Room',160.00,'available','https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=600'),(8,203,'Twin Room',130.00,'available','https://images.pexels.com/photos/271644/pexels-photo-271644.jpeg?auto=compress&cs=tinysrgb&w=600'),(9,204,'Premium Room',200.00,'available','https://ciraganhotel.com/wp-content/uploads/2025/04/King-Premium-2-scaled.jpg'),(10,205,'King Suite',450.00,'available','https://www.merithotels.com/en/uploads/source/mrhking-suite-3.jpg'),(11,301,'Honeymoon Suite',360.00,'available','https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=600'),(12,302,'Junior Suite',280.00,'available','https://images.pexels.com/photos/271647/pexels-photo-271647.jpeg?auto=compress&cs=tinysrgb&w=600'),(14,508,'Endr oda',1000.00,'available',NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'guest',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@example.com','$2a$10$A1nr4od4OjP0N1hNoB9Seur3OsWzU3ufT4G82XNTLV3','admin'),(2,'Guest1','guest1@example.com','$2a$10$A1nr4od4OjP0N1hNoB9Seur3OsWzU3ufT4G82XNTLV3','guest'),(3,'a','a@1.com','$2b$10$pnBZZKPNUTX143NsnK0p0u1xkB4NJmX2Q5.8VuahwjWaqr0M4dXrW','guest'),(4,'YeniAdmin','yeniadmin@example.com','$2b$10$EYjjD/TBL42Du5NUcw3QRuFNCH.y7wIB0L0xpKIjafVBU1PLN8gze','admin'),(5,'aa','a1@1a.com','$2b$10$IbUVksTWMDJpCB85XimqDuqWFq78KUAxahqEZUeb9DMgH8J/x6Kg6','guest'),(6,'dsfsdf','bora030303@hotmail.com','$2b$10$A.UW0LFTA6kyNje9/Z5L2uW2NBPIMUPz2./xNuFn1dURjY7h2jw1i','guest'),(7,'aba','a12@1.com','$2b$10$3CjlJtZlHRzWLaE9K0dOPevAxjfZniO9blVtybIZRaXm3P0pluLE.','guest'),(8,'dsdds','you@example.com','$2b$10$bk5Jls8ZYeasDH4ORSa8fOzPUWXd5Uw86D9GDaZtEOSbW3fT85cA.','guest'),(9,'ada','ada@outlook.com','$2b$10$f9h3FjyFmMzV5R1yvthSbOriON1gA/1RsBZDoAJWvD3Q6oAkA2iE6','guest'),(10,'admin3','admin3@outlook.com','$2b$10$HCj6yt/57t6rVJqRgxbQOuB.NbAzaqOIrU9YcKMZ8gY531l7ts2ca','admin'),(11,'sadaa','deneme11@outlook.com','$2b$10$3yNleiWzq/FgIUTRpHqTMey11k/UmO9yvV/Y7jIPB4QVUm1d9oa1u','guest'),(12,'enderr','ender@outlook.com','$2b$10$49bnBx0QOhjkDHC8v2iaaONsOwibM.8.pntkk6.gWy0/cxRTYy8JS','guest'),(13,'enderrr','ender2@outlook.com','$2b$10$.uFX3UqVYhjbQCG3WBc6tuRPr5RgSixE0hU/EhK5IhbQhZiJHPHIK','guest');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-30  0:23:43
