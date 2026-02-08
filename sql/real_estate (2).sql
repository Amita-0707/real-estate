-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 08:16 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real_estate`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password`, `is_active`, `created_at`) VALUES
(1, 'admin@gmail.com', '$2y$10$iTz6vP4p9lEw3Q3R6Y9jQO.h6t.7.r1s8t9A7xJ2v4F6gA2F9A9D9', 1, '2025-09-29 13:09:20');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `property_title` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `land_area` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `property_image` varchar(255) NOT NULL,
  `status` enum('available','sold') NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `owner_name`, `phone`, `email`, `property_title`, `address`, `land_area`, `price`, `description`, `property_image`, `status`) VALUES
(11, 'Raj Sharma', '9563332555', 'raj@gmail.com', 'Agricultural Land', 'near pune-solapur highway road touch', '5 acres', '800000.00', '5', 'uploads/1760638071_download (3).jpg', 'available'),
(12, 'Soni Singh', '9632451785', 'singh@gmail.com', 'Row House', 'smruti vihara\r\nnear new rto office solapur', '1200 sq ft row house', '500000.00', '0', 'uploads/1760638173_download (1).jpg', 'available'),
(13, 'Amita Chavan', '7066042612', 'amitaschavan.07@gmail.com', 'Bunglow 4bhk', 'Plot 7A smruti vihara\r\nnear new rto office solapur', '2000 sq ft', '10000000.00', '4', 'uploads/1760638324_images (1).jpg', 'available'),
(14, 'Hari Agarwal', '7066042612', 'rohinischavan4@gmail.com', 'Land', 'Highway', '3acres', '500000.00', '0', 'uploads/1760638472_images.jpg', 'sold');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
