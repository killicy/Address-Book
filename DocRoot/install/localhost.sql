-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 07, 2020 at 04:03 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dylan_addressbook`
--
CREATE DATABASE IF NOT EXISTS `dylan_addressbook` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dylan_addressbook`;

-- --------------------------------------------------------

--
-- Table structure for table `Contacts`
--

CREATE TABLE `Contacts` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL DEFAULT '"',
  `LastName` varchar(50) NOT NULL DEFAULT '"',
  `Phone` varchar(50) NOT NULL DEFAULT '"',
  `Address` varchar(50) NOT NULL DEFAULT '"',
  `Email` varchar(50) NOT NULL DEFAULT '"',
  `UserID` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Contacts`
--

INSERT INTO `Contacts` (`ID`, `FirstName`, `LastName`, `Phone`, `Address`, `Email`, `UserID`) VALUES
(1, 'Dingle', 'Dorb', '123-456-789', '555 Road', 'dingus@dingus.com', 0),
(2, 'jimbo', 'dorb', '3219111234', '4321 happy ln', 'jimbo@gmail.com', 0),
(3, 'timbo', 'torb', '7219111234', '64321 happy ln', 'jihbo@gmail.com', 3),
(4, 'timbo', 'torb', '7219111234', '64321 happy ln', 'jihbo@gmail.com', 1),
(8, 'jimbo', 'jorb', '1245623412', '556 srt', 'no6ya@gmail.com', 3);

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
(8, '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Contacts`
--
ALTER TABLE `Contacts`
  ADD PRIMARY KEY (`ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
