CREATE TABLE `message` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `subject` varchar(120) NOT NULL,
  `message` TEXT NOT NULL,
  `from` INT NOT NULL,
  `to` INT NOT NULL,
  `date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`from`) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (`to`) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO `messages` (`subject`, `message`, `from`, `to`, `date`)
VALUES ('mon premier test', 'test', 1, 2, NOW());

SELECT CONCAT(`userfrom`.`firstname`, ' ',`userfrom`.`lastname`) AS `From`,
  CONCAT(`userto`.`firstname`, ' ', `userto`.`lastname`) AS `To`,
  `messages`.`subject`,
  `messages`.`message`,
  `messages`.`date`
FROM `messages`
  INNER JOIN `users` AS `userfrom` ON `messages`.`from` = `userfrom`.`id` 
  INNER JOIN `users` AS `userto` ON `messages`.`to` = `userto`.`id` 
WHERE `messages`.`id` = 1;

UPDATE `messages` SET `subject`= 'message modifié' WHERE `id`=1;

INSERT INTO `messages` (`to`, `from`, `subject`, `message`, `date`) VALUES (2, 1, 'mon premier test', 'test', NOW());