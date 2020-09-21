-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Sep 15, 2020 at 03:50 AM
-- Server version: 10.1.46-MariaDB-1~bionic
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Contacts`
--

CREATE TABLE `Contacts` (
  `ContactID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL DEFAULT '"',
  `LastName` varchar(50) NOT NULL DEFAULT '"',
  `Phone` varchar(50) NOT NULL DEFAULT '"',
  `Address` varchar(50) NOT NULL DEFAULT '"',
  `Email` varchar(50) NOT NULL DEFAULT '"'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Contacts`
--

INSERT INTO `Contacts` (`ContactID`, `UserID`, `FirstName`, `LastName`, `Phone`, `Address`, `Email`) VALUES
(14, 1, 'Dingle', 'Dorb', '123-456-789', '555 Road', 'dingus@dingus.com'),
(15, 2, 'jimbo', 'dorb', '3219111234', '4321 happy ln', 'jimbo@gmail.com'),
(16, 3, 'jimbo', 'dorb', '3219111234', '4321 happy ln', 'jimbo@gmail.com'),
(18, 5, 'Somebody', 'Cool', '123', 'Poop', 'someone@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL DEFAULT '"',
  `LastName` varchar(50) NOT NULL DEFAULT '"',
  `Login` varchar(50) NOT NULL DEFAULT '"',
  `Password` varchar(50) NOT NULL DEFAULT '"'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`ID`, `FirstName`, `LastName`, `Login`, `Password`) VALUES
(1, 'Rick', 'Leinecker', 'RickL', 'COP4331'),
(2, 'Sam', 'Hill', 'SamH', 'Test'),
(7, 'dingle', 'dorb', 'dorb123', 'jingle'),
(23, 'Foo', 'Barr', 'stuff', 'things'),
(24, 'Foo2', 'Bar2', 'stuff2', 'things'),
(25, 'asdf', 'asdf', 'asdf', 'asdf'),
(26, 'Jenn', 'Brown', 'sup', 'dude'),
(27, 'Jenn', 'Brown', 'sup1', 'dude'),
(28, 'asdas', 'adasdsasad', 'asdadfa', 'adfadfda'),
(29, 'osome', 'sieormekow', 'mekwomre', 'mskroemk'),
(30, 'Jenn', 'Brown', 'sup2', 'dude'),
(31, 'oh', 'ye', 'sup7', 'things'),
(32, 'Jenn', 'Brown', 'test', 'stuff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Contacts`
--
ALTER TABLE `Contacts`
  ADD PRIMARY KEY (`ContactID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Contacts`
--
ALTER TABLE `Contacts`
  MODIFY `ContactID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
