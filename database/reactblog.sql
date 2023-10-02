-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-10-2023 a las 06:49:24
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reactblog`
--
CREATE DATABASE IF NOT EXISTS `reactblog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `reactblog`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `img` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `userid` int(11) NOT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `img`, `date`, `userid`, `category`) VALUES
(1, 'Delicias Estivales: Descubre los Sabores del Verano en un Solo Bocado', '<p>Sumérgete en un viaje culinario a través de los colores y sabores del verano. Desde ensaladas frescas hasta barbacoas irresistibles, te llevamos a un festín de temporada que deleitará tus sentidos. ¡Prepárate para una experiencia gastronómica veraniega</p>', '1696221522301--sabores-estivales.jpg', '0000-00-00 00:00:00', 1, 'comida'),
(2, 'El Futuro en tus Manos: Las Tendencias Tecnológicas que Revolucionarán el 2023', '<p>Explora el emocionante panorama tecnológico que nos espera este año. Desde la inteligencia artificial hasta la realidad virtual, te presentamos las innovaciones más recientes que están moldeando nuestro mundo. ¡No te quedes atrás, sé parte del futuro tecnológico ahora!</p>', '1696219027437--manos-tecnologicas.jpg', '0000-00-00 00:00:00', 1, 'tecnologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `img`) VALUES
(1, 'Juank', 'juank2001estevezvargas@gmail.com', '$2b$10$sMi7zF.RBtdef/COdK5KAOjYzYyT.t7r/XebHRyhbewOCjlUMIrUe', NULL),
(2, 'Martina', 'martina@mail.com', '$2b$10$2Ves2Mt5BacYMUxxXJcqOumoGaNP069MTX.xY3hMZY7/wxfcnwIZi', NULL),
(3, 'Miranda', 'miranda@mail.com', '$2b$10$oKh0D6vH34ovlbGeMe4e2.Tf5k7LXI1o6F5Rjm6vpmCnMKagzL5zi', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid_idx` (`userid`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
