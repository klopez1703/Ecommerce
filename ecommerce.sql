-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `nomCategoria` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria`),
  KEY `idProduc_idx` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Tecnologia'),(2,'Moda'),(3,'Hogar');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallecarrito`
--

DROP TABLE IF EXISTS `detallecarrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallecarrito` (
  `idProducto` int NOT NULL,
  `idusuario` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `fecha` date DEFAULT NULL,
  `idCarrito` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idCarrito`),
  KEY `producto_idx` (`idProducto`),
  KEY `usuario_idx` (`idusuario`),
  CONSTRAINT `producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProductos`),
  CONSTRAINT `usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallecarrito`
--

LOCK TABLES `detallecarrito` WRITE;
/*!40000 ALTER TABLE `detallecarrito` DISABLE KEYS */;
INSERT INTO `detallecarrito` VALUES (8,5,1,NULL,17),(8,5,1,NULL,18),(9,5,1,NULL,19),(9,8,1,NULL,20),(14,9,1,NULL,21),(13,9,1,NULL,22),(9,9,1,NULL,23);
/*!40000 ALTER TABLE `detallecarrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleorden`
--

DROP TABLE IF EXISTS `detalleorden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleorden` (
  `idDetalle` int NOT NULL AUTO_INCREMENT,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int NOT NULL,
  `idProductos` int NOT NULL,
  `idOrden` int NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `fk_detalleOrden_productos1_idx` (`idProductos`),
  KEY `fk_detalleOrden_orden1_idx` (`idOrden`),
  CONSTRAINT `fk_detalleOrden_orden1` FOREIGN KEY (`idOrden`) REFERENCES `orden` (`idOrden`),
  CONSTRAINT `fk_detalleOrden_productos1` FOREIGN KEY (`idProductos`) REFERENCES `productos` (`idProductos`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleorden`
--

LOCK TABLES `detalleorden` WRITE;
/*!40000 ALTER TABLE `detalleorden` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleorden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden` (
  `idOrden` int NOT NULL AUTO_INCREMENT,
  `monto` decimal(10,2) NOT NULL,
  `direccionEnvio` varchar(100) NOT NULL,
  `correoOrden` varchar(45) NOT NULL,
  `fechaOrden` date NOT NULL,
  `estadoOrden` enum('en proceso','recibido') NOT NULL DEFAULT 'en proceso',
  `idusuario` int NOT NULL,
  `subtotal` double NOT NULL,
  `impuesto` enum('15%','18%') NOT NULL DEFAULT '15%',
  `descuento` double NOT NULL,
  PRIMARY KEY (`idOrden`),
  KEY `fk_orden_usuario1_idx` (`idusuario`),
  CONSTRAINT `fk_orden_usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProductos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `stock` int NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `idCategoria` int NOT NULL,
  `codProducto` varchar(10) NOT NULL,
  `estadoProducto` enum('Nuevo','Usado') NOT NULL DEFAULT 'Nuevo',
  PRIMARY KEY (`idProductos`),
  KEY `produc_categoria_idx` (`idCategoria`),
  CONSTRAINT `produc_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (8,'destornillador',80,'mediano',3,'b0ee2df7-a25b-4df4-8277-6a2e6ba08a67.jpg',1,'dsfsd543','Nuevo'),(9,'Destornillador',15,'Grande phillips con tres vellocidades para mayor satisfacción',2,'427d51e3-280e-4821-a54f-e0e06b1f0473.jpg',2,'76566','Usado'),(10,'Celular',2000,'huawei Nova 5t',1,'549d3e6d-3302-42f6-91f1-3599d04cd959.jpg',1,'504','Nuevo'),(11,'Teclado',1600,'Kumara tkl',4,'f3b22e4c-ed87-40d3-a099-d6911f4e31ee.jpg',1,'507','Nuevo'),(12,'figura de accion',56,'batman con capa',4,'3ddeb549-100e-4d29-a8fc-dabcbe00064c.jpg',1,'675678fgy','Nuevo'),(13,'Camisa',200,'Cuello V',4,'8321b1fc-492e-47b0-8a8a-855ba1a2ce25.png',2,'1v545','Nuevo'),(14,'Mesa',1500,'Mesa de Comedor',4,'34a06444-2036-4450-bc16-aa2c3fa335f2.png',3,'1x1545','Usado');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rolUsuario` enum('admin','cliente') NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `fechanacimiento` date NOT NULL,
  `genero` enum('Femenino','Masculino') NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'Oscar','Herrera','oswaldoherrera@gmail.com','oscarh','$2b$10$Yt8nve.1U7RJE.jOUnCgrudlfl.hgtAiWlZ5UPY3jwOq0W/FWbEzm','admin',1,'1996-03-22','Masculino'),(4,'Kevin','Lopez','klopez@gmail.com','oscarh','$2b$10$ahiEmdOq7cx8xswE1c141.Z.d63ZOJr.mHDURhumwgZt9FxbIg9.y','admin',1,'1996-03-22','Masculino'),(5,'Oscar','Herrera','oscarherrera25@gmail.com','oherrera','$2b$10$TVVgWIcg3y839kHherCyf.MRM/DgdDFUaEP/p90S8biKX33Jk0ge.','cliente',1,'1996-03-22','Masculino'),(6,'Oscar','Herrera','oscarh@gmail.com','oherrera','$2b$10$0PeDg5WzKdLo.Gw/CvNi1.btS7YaBpjXy4MoUOkUQpgsmSBIl99Lu','cliente',1,'1996-03-22','Masculino'),(7,'menchito','flores','menchitof@gmail.com','menchitof','$2b$10$KGVQZKFTg9xJzkXbmqYLKObGS5GHSc9ZR2mDZyDRtPDnjODVf42tC','cliente',1,'1996-03-22','Masculino'),(8,'Kevin','Lopez','kevin03_17@gmail.com','klopez1703','$2b$10$wi/8bFgwyEICLaxLzRQb3uRcxuQNcNpVdv869GZe.8nJvYs5d0e6W','cliente',1,'1999-03-17','Masculino'),(9,'Jostin','Aleman','jostinaleman@unicah.edu','Jostin123','$2b$10$zmbRlSDIgbti.ANRq1/LG.Lk4euvrCM.duN9FJswTPaKZioH8nlza','cliente',1,'1999-03-17','Masculino'),(10,'Manuel','Lopez','manue2022@gmail.com','mani2022','$2b$10$FwZxFDVTZOiIHJxNbE2d6./.cg82Dgyra9shcXy/yJhRegPWHEM9a','cliente',1,'1999-03-17','Masculino'),(11,'Estefany','Lopez','estefany2022@gmail.com','estefa2022','$2b$10$JrxhZGDInzaQsIYnmQIoce3KHczuJFJJZ53797IBgAdy2MH21Tc8y','cliente',1,'1999-03-17','Femenino');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06  2:38:18
