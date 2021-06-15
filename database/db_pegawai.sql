-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: db_pegawai
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `biodata_pegawai`
--

DROP TABLE IF EXISTS `biodata_pegawai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biodata_pegawai` (
  `idpegawai` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `telepon` varchar(45) DEFAULT NULL,
  `idposisi` int NOT NULL,
  `idstatus` varchar(45) NOT NULL,
  PRIMARY KEY (`idpegawai`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biodata_pegawai`
--

LOCK TABLES `biodata_pegawai` WRITE;
/*!40000 ALTER TABLE `biodata_pegawai` DISABLE KEYS */;
INSERT INTO `biodata_pegawai` VALUES (1,'allysa r','allysa@mail.com','abc123','0811111',1,'1'),(2,'Upin','upin@mail.com','123abc','08293423',2,'1'),(3,'Ipin','ipinganteng@mail.com','abc123','08324234',4,'1'),(4,'jarjit','jarjit@mail.com','abc123','082933',4,'1'),(5,'Fizi','fizi@mail.com','abc123','080382932',5,'1'),(6,'Jeno','jeno@mail.com','abc123','082321323',6,'1'),(7,'Nana','nana@mail.com','abc123','082322374',3,'1');
/*!40000 ALTER TABLE `biodata_pegawai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_task`
--

DROP TABLE IF EXISTS `job_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_task` (
  `idjob_task` int NOT NULL AUTO_INCREMENT,
  `idpegawai` varchar(45) NOT NULL,
  `jobtask` varchar(45) NOT NULL,
  `deadline` datetime NOT NULL,
  PRIMARY KEY (`idjob_task`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_task`
--

LOCK TABLES `job_task` WRITE;
/*!40000 ALTER TABLE `job_task` DISABLE KEYS */;
INSERT INTO `job_task` VALUES (2,'3','Mencuci Baju','2021-06-14 00:00:00'),(3,'2','Memasak','2021-06-14 00:00:00'),(4,'1','Mencuci mobil','2021-06-14 00:00:00');
/*!40000 ALTER TABLE `job_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posisi`
--

DROP TABLE IF EXISTS `posisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posisi` (
  `idposisi` int NOT NULL AUTO_INCREMENT,
  `posisi` varchar(45) NOT NULL,
  `parentId` int DEFAULT NULL,
  `idrole` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idposisi`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posisi`
--

LOCK TABLES `posisi` WRITE;
/*!40000 ALTER TABLE `posisi` DISABLE KEYS */;
INSERT INTO `posisi` VALUES (1,'Owner',NULL,'1'),(2,'Finance',1,'2'),(3,'Operational',1,'2'),(4,'Auditor',2,'3'),(5,'Sales',3,'3'),(6,'Cashier',3,'3');
/*!40000 ALTER TABLE `posisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `idrole` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Super Admin'),(2,'Admin'),(3,'Guest');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idstatus` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Aktif'),(2,'Non-Aktif');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_pegawai'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-15 13:19:47
