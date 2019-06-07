CREATE TABLE `leads_planner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `toUserId` int(11) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `guests` int(11) DEFAULT NULL,
  `budget` int(11) DEFAULT NULL,
  `message` blob,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1