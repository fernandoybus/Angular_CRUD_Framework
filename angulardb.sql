-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Aug 25, 2015 at 04:31 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `javascript`
--

-- --------------------------------------------------------

--
-- Table structure for table `names`
--

CREATE TABLE `names` (
  `number` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `items` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `names`
--

INSERT INTO `names` (`number`, `first_name`, `last_name`, `date`, `items`) VALUES
(24, 'Fernando', 'Azevedo', '2015-08-06 06:55:56', 'item 1,item 2,item 3'),
(25, '', '', '2015-08-07 07:48:20', ''),
(26, '', '', '2015-08-07 07:49:30', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user` varchar(30) NOT NULL,
  `ordername` varchar(30) NOT NULL,
  `items` varchar(250) NOT NULL,
  `image` varchar(150) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user`, `ordername`, `items`, `image`, `timestamp`) VALUES
(20, 'fernandoybus', 'ordertest', 'item test,  item2', 'angularjs.png', '2015-08-22 15:04:51'),
(24, 'fernandoybus', 'order 3', 'item 3, item 7, item 8', 'angularjs.png', '2015-08-22 14:57:38'),
(60, 'fernandoybus', 'order 2', 'item 2, item 3, item 4', 'face book page.jpg', '2015-08-24 13:26:49'),
(115, 'fernandoybus', 'order 3', 'item 1,item 2', '', '2015-08-15 04:14:32'),
(178, 'fernandoybus', 'order 1', 'item 1, item 2', '', '2015-08-21 06:29:24'),
(179, 'fernandoybus', 'order 2', 'item 2, item 3, item 4', '', '2015-08-21 06:30:28'),
(213, 'fernandoybus', 'youtube', 'item 1', 'siscorem-projeto.png', '2015-08-22 07:34:10'),
(214, 'fernandoybus', 'saturday', 'test,  item2', 'angularjs.png', '2015-08-24 13:45:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(400) NOT NULL,
  `email` varchar(200) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `retrievepassword` varchar(400) NOT NULL,
  `cookie` varchar(400) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `timestamp`, `retrievepassword`, `cookie`) VALUES
(20, 'test', '$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC', 'fernandoybus@asas.com', '2015-08-11 06:51:27', '', ''),
(21, 'fernandoybus', '$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC', 'fernando.azevedo@gmail.com', '2015-08-17 04:38:45', '$2a$08$Cf1213eParGlBJoOM0F6a.wKB8ArdsLXCNblSojQSpLBaSFkCi9W.', '$2a$08$Cf1213eParGlBJoOM0F6a.aNnpA9lEkQpX.hz9vSlQ6JwDs5PZw2e'),
(22, 'fernandoybus2', '$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC', 'fernando.azevedo@gmail.com', '2015-08-24 03:04:43', '', ''),
(23, '', '$2a$08$Cf1213eParGlBJoOM0F6a.NxcLdCc60aQtsI3TVFZeNG9IiwseWVS', '', '2015-08-24 13:22:41', '', ''),
(24, 'fernandoybus3', '$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC', 'fernando.azeed@asdfasdf.com', '2015-08-24 13:24:15', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `names`
--
ALTER TABLE `names`
  ADD PRIMARY KEY (`number`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `names`
--
ALTER TABLE `names`
  MODIFY `number` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=215;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;